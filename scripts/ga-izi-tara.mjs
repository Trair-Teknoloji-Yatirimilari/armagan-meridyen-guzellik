#!/usr/bin/env node
/**
 * Şablonun türetildiği eski siteye (Güler Ayaz) ait izlerin kalmadığını
 * doğrulayan tarayıcı. Büyük/küçük harf duyarsız çalışır.
 *
 * Kullanım: npm run check:ga-izi
 * Çıkış kodu: iz bulunursa 1, temizse 0.
 *
 * NOT: Bu dosyanın kendisi aranan kalıpları içerdiği için taramadan muaftır.
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const SELF = relative(ROOT, fileURLToPath(import.meta.url));

const SKIP_DIRS = new Set([
  "node_modules",
  ".git",
  ".output",
  ".tanstack",
  ".wrangler",
  ".vinxi",
  ".nitro",
  "dist",
]);

const SKIP_FILES = new Set([SELF, join("scripts", "duplicate-tara.mjs"), "package-lock.json"]);

/** Aranan kalıplar: [etiket, RegExp] */
const PATTERNS = [
  ["eski marka adı (güler)", /g[uü]ler/i],
  ["eski marka adı (ayaz)", /ayaz/i],
  ["eski alan adı", /gulerayaz/i],
  ["eski semt (maslak)", /maslak/i],
  ["eski cep telefonu", /(\+?90)?\s*501\s*027\s*4?\s*777|905010274777/i],
  ["eski sabit telefon", /(\+?90)?\s*212\s*223\s*4?\s*777|902122234777/i],
  ["eski instagram", /gulerayaz_beautycenter/i],
  ["GA4 ölçüm kimliği", /\bG-[A-Z0-9]{7,}\b/],
  ["Google Tag Manager kimliği", /\bGTM-[A-Z0-9]{5,}\b/],
  ["Google Ads kimliği", /\bAW-[0-9]{8,}\b/],
  ["Meta Pixel çağrısı", /\bfbq\b/],
  ["Meta Pixel kimliği", /\b1807896346887596\b/],
  ["eski widget tenant anahtarı", /848d747e-89af-4c27-b379-c94dfda85cdf/i],
  ["eski IndexNow anahtarı", /53bedbd193a049399f4f5c0e54739d04/i],
];

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (SKIP_DIRS.has(entry)) continue;
    const st = statSync(full);
    if (st.isDirectory()) yield* walk(full);
    else yield full;
  }
}

function isBinary(buf) {
  return buf.includes(0);
}

const hits = [];
let scanned = 0;

for (const file of walk(ROOT)) {
  const rel = relative(ROOT, file);
  if (SKIP_FILES.has(rel) || SKIP_FILES.has(rel.split(sep).join(sep))) continue;

  const buf = readFileSync(file);
  if (isBinary(buf)) continue;
  scanned++;

  const lines = buf.toString("utf8").split("\n");
  lines.forEach((line, i) => {
    for (const [label, re] of PATTERNS) {
      if (re.test(line)) hits.push({ rel, line: i + 1, label, text: line.trim().slice(0, 120) });
    }
  });
}

console.log(`Taranan dosya: ${scanned}`);
console.log(`Muaf tutulan: ${[...SKIP_FILES].join(", ")}`);

if (hits.length === 0) {
  console.log("SONUÇ: 0 iz bulundu. Depo temiz.");
  process.exit(0);
}

console.log(`SONUÇ: ${hits.length} iz bulundu:\n`);
for (const h of hits) console.log(`  ${h.rel}:${h.line}  [${h.label}]  ${h.text}`);
process.exit(1);
