import sharp from "sharp";
import ffmpegPath from "ffmpeg-static";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const srcDir = "C:/Users/marjo/Documents/Nieuwe Website/Portfolio-werk beeldmateriaal";
const out = path.resolve("public/projecten");
fs.mkdirSync(out, { recursive: true });

// 1) Invoer-video (individuele urenregistratie): browserbalk eraf, 3x versneld
const invoerSrc = path.join(srcDir, "Urenregistratie – Team Design a.s.r. — Mozilla Firefox 2026-07-04 12-24-38.mp4");
const invoerMp4 = path.join(out, "urenregistratie-invoer.mp4");
console.log("Invoer-video verwerken...");
execFileSync(ffmpegPath, [
  "-y", "-i", invoerSrc,
  "-vf", "crop=2560:1268:0:124,setpts=PTS/3,scale=1280:-2,fps=24",
  "-an", "-c:v", "libx264", "-crf", "26", "-preset", "veryfast",
  "-pix_fmt", "yuv420p", "-movflags", "+faststart", invoerMp4,
], { stdio: "ignore" });
console.log("  ->", Math.round(fs.statSync(invoerMp4).size / 1024), "KB");

// 2) Poster uit de invoer-video (frame halverwege, toont ingevulde data)
const invoerPoster = path.join(out, "urenregistratie-invoer-vid.jpg");
execFileSync(ffmpegPath, ["-y", "-ss", "11", "-i", invoerMp4, "-frames:v", "1", "-q:v", "3", invoerPoster], { stdio: "ignore" });
console.log("Invoer-poster klaar");

// 3) Invoer-screenshot (los, clean) optimaliseren
await sharp(path.join(srcDir, "Urenregistratietool-1.jpg"))
  .resize({ width: 1600, withoutEnlargement: true })
  .jpeg({ quality: 86 })
  .toFile(path.join(out, "urenregistratie-invoer.jpg"));
console.log("Invoer-screenshot klaar");

// 4) Word -> InDesign, tweede afbeelding (Stijlen kiezen / export)
await sharp(path.join(srcDir, "Word-tabel-indesign-Tool-3.jpg"))
  .resize({ width: 1400, withoutEnlargement: true })
  .jpeg({ quality: 86 })
  .toFile(path.join(out, "word-indesign-2.jpg"));
console.log("Word-2 klaar");
