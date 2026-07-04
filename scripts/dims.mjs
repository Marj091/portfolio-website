import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const dir = "C:/Users/marjo/Documents/Nieuwe Website/Portfolio-werk beeldmateriaal";
const files = fs.readdirSync(dir).filter((f) => /\.(png|jpg|jpeg)$/i.test(f));

for (const f of files) {
  const meta = await sharp(path.join(dir, f)).metadata();
  console.log(`${meta.width} x ${meta.height}  ${f}`);
}
