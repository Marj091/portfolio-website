import { removeBackground } from "@imgly/background-removal-node";
import fs from "node:fs";
import path from "node:path";

const src = "C:/Users/marjo/Documents/Nieuwe Website/MarjolijndeVries.PNG";
const outDir = path.resolve("public");
const out = path.join(outDir, "marjolijn-cutout.png");

fs.mkdirSync(outDir, { recursive: true });

console.log("Achtergrond verwijderen... (kan even duren, model wordt geladen)");
const inputBuffer = fs.readFileSync(src);
const inputBlob = new Blob([inputBuffer], { type: "image/png" });
const blob = await removeBackground(inputBlob);
const buffer = Buffer.from(await blob.arrayBuffer());
fs.writeFileSync(out, buffer);
console.log("Klaar:", out, "(", Math.round(buffer.length / 1024), "KB )");
