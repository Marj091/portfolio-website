import ffmpegPath from "ffmpeg-static";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const dir = "C:/Users/marjo/Documents/Nieuwe Website/Portfolio-werk beeldmateriaal";
const files = fs.readdirSync(dir).filter((f) => /\.mp4$/i.test(f));

for (const f of files) {
  let info = "";
  try {
    execFileSync(ffmpegPath, ["-i", path.join(dir, f)], { stdio: ["ignore", "ignore", "pipe"] });
  } catch (e) {
    info = e.stderr?.toString() || "";
  }
  const dur = info.match(/Duration: ([\d:.]+)/)?.[1] ?? "?";
  const res = info.match(/, (\d{3,4}x\d{3,4})/)?.[1] ?? "?";
  console.log(`${dur}  ${res}  ${f}`);
}
