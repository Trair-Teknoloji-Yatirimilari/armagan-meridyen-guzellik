import manifesto from "@/generated/gorsel-manifest.json";

/**
 * Mantıksal görsel yolunu, içerik hash'li gerçek adrese çevirir.
 *
 *   /images/hizmetler/kuafor-sariyer-800.webp
 *   -> /images/hizmetler/kuafor-sariyer-800.a1b2c3d4.webp
 *
 * NEDEN: görseller `immutable` ve bir yıllık ömürle sunuluyor. Aynı adla
 * değiştirilen bir dosyayı Cloudflare ve tarayıcılar eski hâliyle vermeye
 * devam ediyor. Ada içerik hash'i girince içerik değiştiğinde adres de
 * değişiyor ve önbellek kendiliğinden geçersizleşiyor.
 *
 * Veride (site.config.ts, frontmatter) yine YALNIZCA kök ad duruyor;
 * hash'li adı yalnızca bu katman biliyor. Eşleme tablosunu
 * scripts/gorsel-hash.mjs üretir.
 *
 * Eşleşme bulunamazsa derleme bilerek patlar: sessizce hash'siz adrese
 * düşmek, bu hatanın ta kendisini geri getirirdi.
 */
export function hashliGorsel(yol: string): string {
  const m = /^\/images\/([^/]+)\/(.+)$/.exec(yol);
  if (!m) {
    throw new Error(`[gorsel] /images/<klasör>/<dosya> biçiminde değil: ${yol}`);
  }
  const anahtar = `${m[1]}/${m[2]}`;
  const hashli = (manifesto as Record<string, string>)[anahtar];
  if (!hashli) {
    throw new Error(
      `[gorsel] manifestoda yok: ${anahtar}\n` +
        `Dosya public/images altında mı? Değilse ekleyip "npm run gorsel:hash" çalıştırın.`,
    );
  }
  return `/images/${m[1]}/${hashli}`;
}
