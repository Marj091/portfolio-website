import ffmpegPath from "ffmpeg-static";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const src = "C:/Users/marjo/Documents/Nieuwe Website/Portfolio-werk beeldmateriaal/Uitgekookt Agent — Marjolijn 2026-07-03 21-47-02.mp4";
const out = path.resolve("public/projecten/maaltijden.mp4");

// segment met actieve log (t=45..105), 3.5x versneld zodat de agent zichtbaar 'werkt'
const vf = "setpts=PTS/3.5,scale=1200:-2,fps=24";

console.log("Maaltijden-video verwerken...");
execFileSync(ffmpegPath, [
  "-y",
  "-ss", "45",
  "-t", "60",
  "-i", src,
  "-vf", vf,
  "-an",
  "-c:v", "libx264",
  "-crf", "26",
  "-preset", "veryfast",
  "-pix_fmt", "yuv420p",
  "-movflags", "+faststart",
  out,
], { stdio: "ignore" });

console.log("Klaar:", out, `(${Math.round(fs.statSync(out).size / 1024)} KB)`);
