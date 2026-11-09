#!/usr/bin/env node
/**
 * Görsel dosya adlarına içerik hash'i ekler.
 *
 * NEDEN: görseller `Cache-Control: immutable, max-age=31536000` ile
 * sunuluyor. Bir görsel aynı adla değiştirildiğinde Cloudflare ve
 * tarayıcılar eski kopyayı bir yıl boyunca vermeye devam ediyor — 9 Kas
 * 2026'da kaş görseli değiştirildiğinde tam olarak bu oldu: origin yeni
 * dosyayı veriyordu, Cloudflare eskisini HIT olarak servis ediyordu.
 *
 * ÇÖZÜM: her dosyanın yanına içerik hash'li bir kopyası yazılır
 * (`kuafor-sariyer-800.a1b2c3d4.webp`) ve HTML yalnızca hash'li adı
 * gösterir. İçerik değişince ad da değişir, önbellek kendiliğinden
 * geçersizleşir.
 *
 * Eski adlar SİLİNMEZ: Google Görseller'in indekslediği adresler 404
 * vermesin diye diskte kalır, sadece artık referans verilmez.
 *
 * Betik fikirlidir (idempotent): içerik değişmediyse hiçbir dosya yazmaz,
 * manifesto da birebir aynı kalır. Bu yüzden sunucuda build sırasında
 * çalışsa bile git durumunu kirletmez.
 */

import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const GORSEL_KOKU = "public/images";
const MANIFESTO = "src/generated/gorsel-manifest.json";

/** Zaten hash'lenmiş dosyalar: ".<8 hex>." içerenler. */
const HASHLI = /\.[0-9a-f]{8}\.(webp|jpg|jpeg|png|svg)$/;
const KAPSAM = /\.(webp|jpg|jpeg|png|svg)$/;

function hashla(yol) {
  return createHash("sha256").update(readFileSync(yol)).digest("hex").slice(0, 8);
}

if (!existsSync(GORSEL_KOKU)) {
  console.error(`[gorsel-hash] ${GORSEL_KOKU} yok.`);
  process.exit(1);
}

const manifesto = {};
let yeni = 0;
let mevcut = 0;

for (const klasor of readdirSync(GORSEL_KOKU)) {
  const klasorYolu = join(GORSEL_KOKU, klasor);
  if (!statSync(klasorYolu).isDirectory()) continue;

  for (const dosya of readdirSync(klasorYolu).sort()) {
    if (!KAPSAM.test(dosya) || HASHLI.test(dosya)) continue;

    const kaynak = join(klasorYolu, dosya);
    const hash = hashla(kaynak);
    const nokta = dosya.lastIndexOf(".");
    const hashliAd = `${dosya.slice(0, nokta)}.${hash}${dosya.slice(nokta)}`;
    const hedef = join(klasorYolu, hashliAd);

    if (existsSync(hedef)) {
      mevcut += 1;
    } else {
      writeFileSync(hedef, readFileSync(kaynak));
      yeni += 1;
      console.log(`[gorsel-hash] + ${klasor}/${hashliAd}`);
    }
    manifesto[`${klasor}/${dosya}`] = hashliAd;
  }
}

const hedefKlasor = MANIFESTO.slice(0, MANIFESTO.lastIndexOf("/"));
if (!existsSync(hedefKlasor)) mkdirSync(hedefKlasor, { recursive: true });

// Anahtarlar sıralı yazılır; aksi halde dosya sistemi sırası değişince
// manifesto da değişir ve sahte bir git farkı doğar.
const sirali = Object.fromEntries(Object.entries(manifesto).sort(([a], [b]) => a.localeCompare(b)));
const icerik = `${JSON.stringify(sirali, null, 2)}\n`;
const oncekiIcerik = existsSync(MANIFESTO) ? readFileSync(MANIFESTO, "utf8") : "";
if (icerik !== oncekiIcerik) {
  writeFileSync(MANIFESTO, icerik);
  console.log(`[gorsel-hash] ${MANIFESTO} güncellendi`);
}

console.log(
  `[gorsel-hash] ${Object.keys(manifesto).length} görsel — ${yeni} yeni kopya, ${mevcut} zaten vardı`,
);
