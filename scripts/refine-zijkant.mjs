import sharp from "sharp";
import path from "node:path";

const src = path.resolve("public/marjolijn-zijkant-raw.png");
const out = path.resolve("public/marjolijn-zijkant.png");

const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;
const A = new Uint8ClampedArray(W * H);
for (let i = 0; i < W * H; i++) A[i] = data[i * 4 + 3];

// Erosie (~1px)
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
// Despill groen + nieuwe alpha
for (let i = 0; i < W * H; i++) {
  const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2];
  const cap = Math.max(r, b);
  if (g > cap) data[i * 4 + 1] = cap;
  data[i * 4 + 3] = A2[i];
}
const rgb = await sharp(Buffer.from(data), { raw: { width: W, height: H, channels: 4 } }).removeAlpha().png().toBuffer();
const alpha = await sharp(Buffer.from(data), { raw: { width: W, height: H, channels: 4 } }).extractChannel(3).blur(0.8).png().toBuffer();
await sharp(rgb).joinChannel(alpha).png().toFile(out);
console.log("Verfijnde zijkant-uitsnede klaar:", out, `(${W}x${H})`);
