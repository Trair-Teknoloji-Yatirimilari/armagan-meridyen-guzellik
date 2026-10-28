#!/usr/bin/env node
/**
 * Statik çıktıyı yayına hazır hâle getirir.
 *
 * 1. 404/index.html → 404.html  (nginx `error_page 404 /404.html` için)
 * 2. Sunucu paketini siler — site tamamen statik servis ediliyor, çalışma
 *    anında node süreci yok.
 * 3. Çıktıda kaynak haritası, .env ya da kaynak kod kalmadığını doğrular.
 *
 * `npm run build` sonrası npm tarafından otomatik çalıştırılır (postbuild).
 */

import { copyFileSync, existsSync, readdirSync, rmSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const OUT = ".output/public";

function fail(message) {
  console.error(`\n[static-postbuild] HATA: ${message}\n`);
  process.exit(1);
}

if (!existsSync(OUT)) fail(`${OUT} yok — önce "npm run build" çalıştırın.`);

// 1) 404 sayfası
const notFoundSource = join(OUT, "404", "index.html");
if (!existsSync(notFoundSource)) fail("404/index.html üretilmemiş.");
copyFileSync(notFoundSource, join(OUT, "404.html"));
console.log("[static-postbuild] 404.html yazıldı");

// 2) Sunucu paketi gerekmiyor
for (const leftover of [".output/server", ".output/nitro.json", ".output/public/_headers"]) {
  if (existsSync(leftover)) {
    rmSync(leftover, { recursive: true, force: true });
    console.log(`[static-postbuild] kaldırıldı: ${leftover}`);
  }
}

// 3) Çıktı denetimi
function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) yield* walk(full);
    else yield full;
  }
}

const files = [...walk(OUT)];
const forbidden = files.filter((f) => {
  const rel = relative(OUT, f);
  return /\.map$/.test(rel) || /^\.env/.test(rel) || /\.(ts|tsx)$/.test(rel);
});
if (forbidden.length) fail(`çıktıda olmaması gereken dosyalar:\n  ${forbidden.join("\n  ")}`);

const required = ["index.html", "404.html", "robots.txt", "sitemap.xml"];
const missing = required.filter((f) => !existsSync(join(OUT, f)));
if (missing.length) fail(`çıktıda eksik dosyalar: ${missing.join(", ")}`);

const totalBytes = files.reduce((sum, f) => sum + statSync(f).size, 0);
console.log(
  `[static-postbuild] ${files.length} dosya, ${(totalBytes / 1024 / 1024).toFixed(2)} MB — ${OUT}`,
);
