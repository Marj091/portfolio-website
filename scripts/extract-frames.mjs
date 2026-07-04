import ffmpegPath from "ffmpeg-static";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const dir = "C:/Users/marjo/Documents/Nieuwe Website/Portfolio-werk beeldmateriaal";
const tmp = path.resolve("scripts/_frames");
fs.mkdirSync(tmp, { recursive: true });

const video = process.argv[2];
const label = process.argv[3] || "frame";
const times = ["1", "4", "8", "12", "16"];

for (const t of times) {
  const out = path.join(tmp, `${label}-${t}s.jpg`);
  try {
    execFileSync(ffmpegPath, ["-y", "-ss", t, "-i", path.join(dir, video), "-frames:v", "1", "-q:v", "3", out], { stdio: "ignore" });
    if (fs.existsSync(out)) console.log("frame:", out);
  } catch {
    // voorbij einde video
  }
}
