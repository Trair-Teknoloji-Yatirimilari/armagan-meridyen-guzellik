#!/usr/bin/env node
/**
 * Marka görsellerini config'ten üretir.
 *
 * Kaynak: çalışan sitedeki /og-card adresi (renkler ve isim config'ten gelir).
 * Çıktı:
 *   public/og-image.png        1200x630 paylaşım görseli
 *   public/apple-touch-icon.png  180x180 simge
 *
 * Kullanım:
 *   1) Siteyi çalıştırın:   npm run dev     (ya da build + preview)
 *   2) Bu komutu çalıştırın: npm run brand:assets -- http://localhost:3000
 *
 * Gereksinim: Google Chrome (headless ekran görüntüsü için).
 */

import { existsSync, mkdirSync, renameSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const PUBLIC_DIR = join(ROOT, "public");
const BASE = process.argv[2] ?? process.env.PREVIEW_URL ?? "http://localhost:3000";

const CHROME_CANDIDATES = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
];

const chrome = CHROME_CANDIDATES.find((p) => existsSync(p));
if (!chrome) {
  console.error("Chrome bulunamadı. Ekran görüntüsü alınamıyor.");
  process.exit(1);
}

if (!existsSync(PUBLIC_DIR)) mkdirSync(PUBLIC_DIR, { recursive: true });

const SHOTS = [
  { url: `${BASE}/og-card`, size: "1200,630", out: "og-image.png" },
  { url: `${BASE}/og-card?format=icon`, size: "180,180", out: "apple-touch-icon.png" },
];

for (const shot of SHOTS) {
  const tmpDir = join(ROOT, ".brand-assets-tmp");
  rmSync(tmpDir, { recursive: true, force: true });
  mkdirSync(tmpDir, { recursive: true });

  const target = join(tmpDir, shot.out);
  execFileSync(
    chrome,
    [
      "--headless",
      "--disable-gpu",
      "--hide-scrollbars",
      "--force-device-scale-factor=1",
      `--window-size=${shot.size}`,
      `--screenshot=${target}`,
      "--virtual-time-budget=2000",
      shot.url,
    ],
    { stdio: "inherit" },
  );

  if (!existsSync(target)) {
    console.error(`Ekran görüntüsü üretilemedi: ${shot.url}`);
    process.exit(1);
  }

  renameSync(target, join(PUBLIC_DIR, shot.out));
  rmSync(tmpDir, { recursive: true, force: true });
  console.log(`✓ public/${shot.out}  (${shot.size})  ← ${shot.url}`);
}

console.log("Marka görselleri güncellendi.");
