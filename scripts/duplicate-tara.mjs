#!/usr/bin/env node
/**
 * Metin tekrarı kontrolü.
 *
 * Bu sitedeki görünür Türkçe metinlerle, şablonun türetildiği eski sitenin
 * metinlerini karşılaştırır. 8 kelime ve daha uzun birebir aynı ifade
 * bulunursa rapor eder.
 *
 * Kullanım:
 *   npm run check:duplicate                  (varsayılan kaynak yolları denenir)
 *   node scripts/duplicate-tara.mjs <yol> [<yol2> ...]
 *
 * Kaynak depolar YALNIZCA OKUNUR; hiçbir dosyaya yazılmaz.
 * Çıkış kodu: örtüşme varsa 1, yoksa 0.
 */

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const SHINGLE = 8;

const DEFAULT_SOURCES = [
  join(ROOT, "..", "gulerayazbeauty-site"),
  join(ROOT, "..", "gulerayazbeauty"),
];

const SKIP_DIRS = new Set([
  "node_modules",
  ".git",
  ".output",
  ".tanstack",
  ".wrangler",
  ".vinxi",
  ".nitro",
  "dist",
  "scripts",
]);

function* walk(dir) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return;
  }
  for (const entry of entries) {
    if (SKIP_DIRS.has(entry)) continue;
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) yield* walk(full);
    else if (/\.(tsx?|mdx?|html)$/.test(entry)) yield full;
  }
}

/**
 * Tailwind sınıf listeleri, dosya yolları ve URL'ler görünür metin değildir;
 * karşılaştırmaya girerlerse her şablon türevinde sahte örtüşme üretirler.
 */
function looksLikeCode(text) {
  if (/^(https?:|\/|\.\/|@\/)/.test(text.trim())) return true;
  // Eşleşmeyen tırnaklar yüzünden kod parçaları dizge sanılabiliyor:
  // noktalı virgül, süslü parantez, atama veya JS anahtar sözcüğü varsa metin değildir.
  if (/[;{}=]|\b(const|let|function|return|import|export|typeof)\b/.test(text)) return true;
  const tokens = text.trim().split(/\s+/);
  if (tokens.length < 2) return false;
  const codey = tokens.filter((t) => /[:[\]]/.test(t) || /^[a-z0-9]+(-[a-z0-9./%[\]-]+)+$/.test(t));
  return codey.length / tokens.length > 0.35;
}

/**
 * Kod yorumlarını atar. Karşılaştırma ziyaretçinin GÖRDÜĞÜ metinler üzerinde
 * yapılır; kaynak koddaki Türkçe açıklama satırları sayfa metni değildir.
 */
function stripComments(source) {
  return source.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
}

/** Dosyadan görünür metin adaylarını çıkarır: uzun dizge sabitleri + JSX metni. */
function extractText(input) {
  const source = stripComments(input);
  const out = [];

  // "..." / '...' / `...` dizgeleri
  for (const m of source.matchAll(/(["'`])((?:\\.|(?!\1)[\s\S]){24,}?)\1/g)) {
    out.push(m[2]);
  }
  // JSX metin düğümleri. Kod karakterleri (= ; ( ) [ ]) dışlanır; aksi hâlde
  // iki `>` ... `<` arasına sıkışan kod parçaları metin sanılıyor.
  for (const m of source.matchAll(/>([^<>{}=;()[\]]{24,})</g)) {
    if (/[a-zçğıöşü]\s+[a-zçğıöşü]/i.test(m[1])) out.push(m[1]);
  }
  return out.filter((t) => !looksLikeCode(t));
}

const TR_LETTERS = "a-zçğıiöşüâîû";

function normalize(text) {
  return text
    .replace(/\\n|\\t/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .toLocaleLowerCase("tr-TR")
    .replace(new RegExp(`[^${TR_LETTERS}0-9\\s]`, "gu"), " ")
    .replace(/\s+/g, " ")
    .trim();
}

function shingles(normalized) {
  const words = normalized.split(" ").filter(Boolean);
  const out = [];
  for (let i = 0; i + SHINGLE <= words.length; i++) {
    out.push(words.slice(i, i + SHINGLE).join(" "));
  }
  return out;
}

function corpusShingles(root) {
  const map = new Map(); // shingle -> ilk görüldüğü dosya
  let files = 0;
  for (const file of walk(join(root, "src"))) {
    files++;
    const text = readFileSync(file, "utf8");
    for (const candidate of extractText(text)) {
      for (const s of shingles(normalize(candidate))) {
        if (!map.has(s)) map.set(s, relative(root, file));
      }
    }
  }
  return { map, files };
}

const sources = (process.argv.slice(2).length ? process.argv.slice(2) : DEFAULT_SOURCES).filter(
  (p) => existsSync(join(p, "src")),
);

if (!sources.length) {
  console.error("Karşılaştırılacak kaynak depo bulunamadı. Yolu argüman olarak verin.");
  process.exit(2);
}

const sourceShingles = new Map();
for (const src of sources) {
  const { map, files } = corpusShingles(src);
  console.log(`Kaynak: ${src}  (${files} dosya, ${map.size} adet ${SHINGLE}-kelimelik ifade)`);
  for (const [k, v] of map) if (!sourceShingles.has(k)) sourceShingles.set(k, `${src}:${v}`);
}

const mine = corpusShingles(ROOT);
console.log(`Bu site: ${mine.files} dosya, ${mine.map.size} adet ${SHINGLE}-kelimelik ifade`);

const overlaps = [];
for (const [s, file] of mine.map) {
  if (sourceShingles.has(s)) overlaps.push({ s, file, source: sourceShingles.get(s) });
}

console.log("");
if (overlaps.length === 0) {
  console.log(`SONUÇ: ${SHINGLE} kelime veya daha uzun birebir aynı ifade YOK (0 örtüşme).`);
  process.exit(0);
}

console.log(`SONUÇ: ${overlaps.length} örtüşen ifade bulundu:\n`);
for (const o of overlaps.slice(0, 40)) {
  console.log(`  "${o.s}"\n    bizde: ${o.file}\n    kaynak: ${o.source}\n`);
}
process.exit(1);
