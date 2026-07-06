import sharp from "sharp";
import ffmpegPath from "ffmpeg-static";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const dir = "C:/Users/marjo/Documents/Nieuwe Website/Filmpjes portfolio/Filmpjes portfolio";
const out = path.resolve("public/projecten");
fs.mkdirSync(out, { recursive: true });

const enc = ["-an", "-c:v", "libx264", "-crf", "26", "-preset", "veryfast", "-pix_fmt", "yuv420p", "-movflags", "+faststart"];

function run(args) {
  try {
    execFileSync(ffmpegPath, args, { stdio: ["ignore", "ignore", "pipe"] });
  } catch (e) {
    const err = e.stderr?.toString() || "";
    console.error(err.split("\n").slice(-15).join("\n"));
    throw new Error("ffmpeg mislukt");
  }
}

// 1) eMood: deel1 (eerste 12s) + deel2 (eerste 27s), genormaliseerd, zonder geluid
console.log("eMood-video samenvoegen...");
// Deel2 wordt gesplitst: alleen het diagram vóór (6-10s) en ná (20-27s), NIET de verkenner (11-18s)
const norm = "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,fps=25";
const emoodFilter =
  `[0:v]trim=start=0:end=12,setpts=PTS-STARTPTS,${norm}[a];` +
  `[1:v]split=2[s0][s1];` +
  `[s0]trim=start=6:end=10,setpts=PTS-STARTPTS,${norm}[b];` +
  `[s1]trim=start=20:end=27,setpts=PTS-STARTPTS,${norm}[c];` +
  `[a][b][c]concat=n=3:v=1:a=0[out]`;
run([
  "-y",
  "-i", path.join(dir, "eMood-narrowcasting-deel1.mp4"),
  "-i", path.join(dir, "eMood-narrowcasting-deel2.mp4"),
  "-filter_complex", emoodFilter, "-map", "[out]",
  ...enc, path.join(out, "emood.mp4"),
]);
console.log("  -> emood.mp4", Math.round(fs.statSync(path.join(out, "emood.mp4")).size / 1024), "KB");

// 2) eMood stilstaand dashboard
await sharp(path.join(dir, "Narrowcasting E mood dashboard_wk26.jpg"))
  .resize({ width: 1500, withoutEnlargement: true })
  .jpeg({ quality: 86 })
  .toFile(path.join(out, "emood.jpg"));
console.log("  -> emood.jpg");

// 3) Word converter: beide samenvoegen, 2.2x versneld + frame-interpolatie voor smoothness
console.log("Word-converter-video samenvoegen + smoother maken...");
const wordFilter =
  "[0:v]setpts=PTS/2.2,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1[v0];" +
  "[1:v]setpts=PTS/2.2,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1[v1];" +
  "[v0][v1]concat=n=2:v=1:a=0,framerate=fps=30[out]";
run([
  "-y",
  "-i", path.join(dir, "Word-tabel-indesign-converter-1.mp4"),
  "-i", path.join(dir, "Word-tabel-indesign-converter-2.mp4"),
  "-filter_complex", wordFilter, "-map", "[out]",
  ...enc, path.join(out, "word-video.mp4"),
]);
console.log("  -> word-video.mp4", Math.round(fs.statSync(path.join(out, "word-video.mp4")).size / 1024), "KB");

console.log("Klaar.");
