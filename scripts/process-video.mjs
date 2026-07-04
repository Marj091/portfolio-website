import ffmpegPath from "ffmpeg-static";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const srcDir = "C:/Users/marjo/Documents/Nieuwe Website/Portfolio-werk beeldmateriaal";
const outDir = path.resolve("public/projecten");
fs.mkdirSync(outDir, { recursive: true });

const src = path.join(srcDir, "Teamoverzicht Urenregistratie – Team Design a.s.r. — Mozilla Firefox 2026-07-04 12-43-16.mp4");
const out = path.join(outDir, "urenregistratie.mp4");

// crop: browserbalk (bovenste 124px) eraf ; setpts: 2x sneller ; scale naar 1280 breed ; 24fps
const vf = "crop=2560:1268:0:124,setpts=PTS/2.0,scale=1280:-2,fps=24";

console.log("Video verwerken...");
execFileSync(ffmpegPath, [
  "-y",
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

const kb = Math.round(fs.statSync(out).size / 1024);
console.log("Klaar:", out, `(${kb} KB)`);
