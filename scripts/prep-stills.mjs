import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const srcDir = "C:/Users/marjo/Documents/Nieuwe Website/Portfolio-werk beeldmateriaal";
const outDir = path.resolve("public/projecten");
fs.mkdirSync(outDir, { recursive: true });

// 1) Maaltijden — donker dashboard, full-bleed. Alleen optimaliseren.
await sharp(path.join(srcDir, "Maaltijden-app-afbeelding.jpg"))
  .resize({ width: 1400, withoutEnlargement: true })
  .jpeg({ quality: 86 })
  .toFile(path.join(outDir, "maaltijden.jpg"));
console.log("maaltijden.jpg klaar");

// 2) Word -> InDesign — interne documentnaam blurren, dan optimaliseren.
{
  const src = path.join(srcDir, "Word-tabel-indesign-Tool-2.jpg");
  const { width: W, height: H } = await sharp(src).metadata();
  const r = { x: 0.30, y: 0.262, w: 0.37, h: 0.038 }; // bestandsnaam-regel
  const left = Math.round(r.x * W), top = Math.round(r.y * H);
  const w = Math.round(r.w * W), h = Math.round(r.h * H);
  const region = await sharp(src).extract({ left, top, width: w, height: h }).blur(14).toBuffer();
  await sharp(src)
    .composite([{ input: region, left, top }])
    .resize({ width: 1400, withoutEnlargement: true })
    .jpeg({ quality: 86 })
    .toFile(path.join(outDir, "word-indesign.jpg"));
  console.log("word-indesign.jpg klaar");
}

// 3) Urenregistratie — teamoverzicht frame, browserbalk (bovenkant) eraf.
{
  const src = path.resolve("scripts/_frames/team-12s.jpg");
  const { width: W, height: H } = await sharp(src).metadata();
  const cropTop = 124; // Firefox tabs + url + bladwijzers
  await sharp(src)
    .extract({ left: 0, top: cropTop, width: W, height: H - cropTop })
    .resize({ width: 1600, withoutEnlargement: true })
    .jpeg({ quality: 86 })
    .toFile(path.join(outDir, "urenregistratie.jpg"));
  console.log("urenregistratie.jpg klaar");
}
