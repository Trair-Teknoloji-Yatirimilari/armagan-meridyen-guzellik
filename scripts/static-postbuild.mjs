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

import { copyFileSync, existsSync, readFileSync, readdirSync, rmSync, statSync } from "node:fs";
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

// 4) Uzantısız /images yolları.
//
// Görsel verisinde tam yol tutulursa hidrasyon payload'ına düz metin olarak
// düşüyor ("/images/hizmetler/kuafor-sariyer"); Google bunu adres sanıp
// tarıyor ve Search Console'da 404 birikiyordu. Görsel yolları artık
// bileşende kuruluyor — bu denetim geri kaymayı build'de yakalar.
const UZANTISIZ_GORSEL = /"\/images\/[A-Za-z0-9/_-]+"/g;
const kirliler = [];
for (const f of files.filter((f) => f.endsWith(".html"))) {
  const eslesmeler = readFileSync(f, "utf8").match(UZANTISIZ_GORSEL);
  if (eslesmeler) kirliler.push(`${relative(OUT, f)}: ${[...new Set(eslesmeler)].join(", ")}`);
}
if (kirliler.length) {
  fail(
    `çıktıda uzantısız /images yolu var (Google bunları tarayıp 404 üretiyor):\n  ${kirliler.join("\n  ")}`,
  );
}
console.log("[static-postbuild] uzantısız /images yolu yok");

// 5) src ve srcset'te gösterilen yerel görseller gerçekten var mı?
//
// srcset basamakları kodda türetiliyor; üretilmemiş bir basamağı göstermek
// tarayıcıya 404 yükletir ve görsel kırık çıkar — ekrana bakmadan fark
// edilmeyen bir hata. Burada her yol diske karşı doğrulanıyor.
const GORSEL_YOLU =
  /(?:src|srcSet|href)="([^"]+)"|(\/images\/[^\s",]+\.(?:webp|jpg|jpeg|png|svg))/g;
const eksikGorseller = new Set();
for (const f of files.filter((f) => f.endsWith(".html"))) {
  const html = readFileSync(f, "utf8");
  for (const m of html.matchAll(GORSEL_YOLU)) {
    const ham = m[1] ?? m[2];
    for (const parca of ham.split(",")) {
      const yol = parca.trim().split(/\s+/)[0];
      if (!/^\/(images|logo|video)\//.test(yol)) continue;
      if (!existsSync(join(OUT, yol))) eksikGorseller.add(`${yol}  (${relative(OUT, f)})`);
    }
  }
}
if (eksikGorseller.size) {
  fail(`HTML'de gösterilen ama çıktıda olmayan görseller:\n  ${[...eksikGorseller].join("\n  ")}`);
}
console.log("[static-postbuild] gösterilen tüm yerel görseller mevcut");

// 6) /images altındaki her referans içerik hash'i taşımalı.
//
// Görseller `immutable` ve bir yıllık ömürle sunuluyor; aynı adla
// değiştirilen bir dosyayı Cloudflare ve tarayıcılar eski hâliyle vermeye
// devam ediyor (9 Kas 2026'da kaş görselinde yaşandı). Hash'li ad bunu
// kökten çözüyor — burada hash'siz bir referans kaçmadığı doğrulanıyor.
const HASHLI_AD = /\.[0-9a-f]{8}\.(webp|jpg|jpeg|png|svg)$/;
const hashsizlar = new Set();
for (const f of files.filter((f) => f.endsWith(".html"))) {
  const html = readFileSync(f, "utf8");
  for (const m of html.matchAll(GORSEL_YOLU)) {
    const ham = m[1] ?? m[2];
    for (const parca of ham.split(",")) {
      const yol = parca.trim().split(/\s+/)[0];
      if (!/^\/images\//.test(yol)) continue;
      if (!HASHLI_AD.test(yol)) hashsizlar.add(`${yol}  (${relative(OUT, f)})`);
    }
  }
}
if (hashsizlar.size) {
  fail(
    "hash'siz /images referansı var — önbellek eski kopyayı verir:\n  " +
      [...hashsizlar].join("\n  "),
  );
}
console.log("[static-postbuild] /images referanslarının tamamı hash'li");

const totalBytes = files.reduce((sum, f) => sum + statSync(f).size, 0);
console.log(
  `[static-postbuild] ${files.length} dosya, ${(totalBytes / 1024 / 1024).toFixed(2)} MB — ${OUT}`,
);
