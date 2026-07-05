import { removeBackground } from "@imgly/background-removal-node";
import fs from "node:fs";
import path from "node:path";

const src = "C:/Users/marjo/Documents/Nieuwe Website/MarjolijndeVries-zijkant.png";
const out = path.resolve("public/marjolijn-zijkant-raw.png");

console.log("Achtergrond verwijderen zijkant-foto...");
const inputBuffer = fs.readFileSync(src);
const blob = await removeBackground(new Blob([inputBuffer], { type: "image/png" }));
fs.writeFileSync(out, Buffer.from(await blob.arrayBuffer()));
console.log("Ruwe uitsnede klaar:", out);
