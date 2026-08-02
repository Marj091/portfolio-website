import sharp from "sharp";
import path from "node:path";

const src = "C:/Users/marjo/Documents/Nieuwe Website/Marjolijn-bureau-hoek.png";
const out = path.resolve("public/marjolijn-bureau-groen.jpg");

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      default: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [h * 360, s, l];
}
function hslToRgb(h, s, l) {
  h /= 360;
  let r, g, b;
  if (s === 0) { r = g = b = l; }
  else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1; if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3); g = hue2rgb(p, q, h); b = hue2rgb(p, q, h - 1 / 3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
let shifted = 0;
for (let i = 0; i < info.width * info.height; i++) {
  const o = i * info.channels;
  const [h, s, l] = rgbToHsl(data[o], data[o + 1], data[o + 2]);
  // Alleen paars/violet met voldoende verzadiging omzetten naar emerald
  if (s > 0.12 && h >= 225 && h <= 305) {
    const nh = 155 + (h - 265) * 0.6; // centreer op emerald, behoud wat variatie
    const [nr, ng, nb] = hslToRgb((nh + 360) % 360, s, l);
    data[o] = nr; data[o + 1] = ng; data[o + 2] = nb;
    shifted++;
  }
}
await sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } })
  .resize({ width: 1100, withoutEnlargement: true })
  .jpeg({ quality: 92 })
  .toFile(out);
console.log(`Klaar: ${out} (${shifted} pixels vergroend)`);
