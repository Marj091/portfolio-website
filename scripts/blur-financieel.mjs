import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const src = "C:/Users/marjo/Documents/Nieuwe Website/Portfolio-werk beeldmateriaal/Financieel-dasboard.jpg";
const outDir = path.resolve("public/projecten");
fs.mkdirSync(outDir, { recursive: true });
const out = path.join(outDir, "financieel.jpg");

const meta = await sharp(src).metadata();
const W = meta.width, H = meta.height;
console.log("Afbeelding:", W, "x", H);

// Regio's als fracties (x, y, breedte, hoogte) van de afbeelding
const rects = [
  { x: 0.185, y: 0.126, w: 0.135, h: 0.050 }, // inkomen
  { x: 0.365, y: 0.126, w: 0.135, h: 0.050 }, // uitgaven
  { x: 0.545, y: 0.126, w: 0.135, h: 0.050 }, // naar potjes
  { x: 0.725, y: 0.126, w: 0.140, h: 0.078 }, // totaal spaarpotjes + /mnd inleg
  { x: 0.44, y: 0.242, w: 0.12, h: 0.05 },    // groot totaal
  { x: 0.44, y: 0.30, w: 0.12, h: 0.20 },     // categorie-bedragen rechts
  { x: 0.573, y: 0.248, w: 0.278, h: 0.246 }, // spaarpotjes: hele lijst (namen + /mnd + bedragen)
  { x: 0.725, y: 0.49, w: 0.135, h: 0.048 },  // totaal gespaard
  { x: 0.148, y: 0.573, w: 0.405, h: 0.325 }, // transacties
];

const composites = [];
for (const r of rects) {
  const left = Math.round(r.x * W);
  const top = Math.round(r.y * H);
  const w = Math.round(r.w * W);
  const h = Math.round(r.h * H);
  console.log(`regio -> left:${left} top:${top} w:${w} h:${h}`);
  const region = await sharp(src)
    .extract({ left, top, width: w, height: h })
    .blur(9)
    .toBuffer();
  composites.push({ input: region, left, top });
}

await sharp(src).composite(composites).jpeg({ quality: 88 }).toFile(out);
console.log("Aantal regio's:", composites.length);
console.log("Klaar:", out);
