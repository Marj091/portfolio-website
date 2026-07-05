import sharp from "sharp";
import path from "node:path";

const src = "C:/Users/marjo/Documents/Nieuwe Website/Portfolio-werk beeldmateriaal/Financieel-DashboardV2.png";
const out = path.resolve("public/projecten/financieel-v2.jpg");

await sharp(src)
  .resize({ width: 1500, withoutEnlargement: true })
  .jpeg({ quality: 88 })
  .toFile(out);

console.log("financieel-v2.jpg aangemaakt (nieuwe bestandsnaam, geen cache-botsing)");
