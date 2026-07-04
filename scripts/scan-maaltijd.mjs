import ffmpegPath from "ffmpeg-static";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const dir = "C:/Users/marjo/Documents/Nieuwe Website/Portfolio-werk beeldmateriaal";
const video = "Uitgekookt Agent — Marjolijn 2026-07-03 21-47-02.mp4";
const tmp = path.resolve("scripts/_scan");
fs.mkdirSync(tmp, { recursive: true });

const times = [1, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 157];
for (const t of times) {
  const out = path.join(tmp, `t${String(t).padStart(3, "0")}.jpg`);
  try {
    execFileSync(ffmpegPath, ["-y", "-ss", String(t), "-i", path.join(dir, video), "-frames:v", "1", "-vf", "scale=960:-1", "-q:v", "4", out], { stdio: "ignore" });
    if (fs.existsSync(out)) console.log("frame t=" + t + "s");
  } catch {}
}
