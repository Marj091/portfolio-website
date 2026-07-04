import sharp from "sharp";
import path from "node:path";

const src = path.resolve("public/marjolijn-cutout-raw.png");
const out = path.resolve("public/marjolijn-cutout.png");
const preview = path.resolve("scripts/_cutout-on-dark.png");

// Werk vanaf een ruwe kopie zodat herhaald draaien niet stapelt
import fs from "node:fs";
if (!fs.existsSync(src)) fs.copyFileSync(out, src);

const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;

// Alpha uitlezen
const A = new Uint8ClampedArray(W * H);
for (let i = 0; i < W * H; i++) A[i] = data[i * 4 + 3];

// Erosie (~1px inkrimpen): min over 3x3 -> snijdt het randje van de oude achtergrond weg
const A2 = new Uint8ClampedArray(W * H);
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    let m = 255;
    for (let dy = -1; dy <= 1; dy++)
      for (let dx = -1; dx <= 1; dx++) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= W || ny >= H) { m = 0; continue; }
        const a = A[ny * W + nx];
        if (a < m) m = a;
      }
    A2[y * W + x] = m;
  }
}

// Despill: groen/teal-waas terugdringen + nieuwe alpha wegschrijven
for (let i = 0; i < W * H; i++) {
  const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2];
  const cap = Math.max(r, b);
  if (g > cap) data[i * 4 + 1] = cap; // groen niet hoger dan max(rood, blauw)
  data[i * 4 + 3] = A2[i];
}

// RGB los + alpha licht vervagen (feather = zachte rand)
const rgb = await sharp(Buffer.from(data), { raw: { width: W, height: H, channels: 4 } })
  .removeAlpha()
  .png()
  .toBuffer();
const alpha = await sharp(Buffer.from(data), { raw: { width: W, height: H, channels: 4 } })
  .extractChannel(3)
  .blur(0.8)
  .png()
  .toBuffer();

await sharp(rgb).joinChannel(alpha).png().toFile(out);
console.log("Verfijnde uitsnede:", out);

// Preview op donkere achtergrond zodat de randen te beoordelen zijn
await sharp({ create: { width: W, height: H, channels: 4, background: "#0F1624" } })
  .composite([{ input: out }])
  .png()
  .toFile(preview);
console.log("Preview op donker:", preview);
