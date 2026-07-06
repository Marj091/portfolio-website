import ffmpegPath from "ffmpeg-static";
import { execFileSync } from "node:child_process";
import path from "node:path";

const dir = "C:/Users/marjo/Documents/Nieuwe Website/Filmpjes portfolio/Filmpjes portfolio";
const files = [
  "eMood-narrowcasting-deel1.mp4",
  "eMood-narrowcasting-deel2.mp4",
  "Word-tabel-indesign-converter-1.mp4",
  "Word-tabel-indesign-converter-2.mp4",
];
for (const f of files) {
  let info = "";
  try { execFileSync(ffmpegPath, ["-i", path.join(dir, f)], { stdio: ["ignore", "ignore", "pipe"] }); }
  catch (e) { info = e.stderr?.toString() || ""; }
  const dur = info.match(/Duration: ([\d:.]+)/)?.[1] ?? "?";
  const res = info.match(/, (\d{3,4}x\d{3,4})/)?.[1] ?? "?";
  const fps = info.match(/([\d.]+) fps/)?.[1] ?? "?";
  const audio = /Audio:/.test(info) ? "audio" : "geen audio";
  console.log(`${dur}  ${res}  ${fps}fps  ${audio}  ${f}`);
}
