import { SITE_URL, isFilled, siteConfig } from "@/config/site.config";

/**
 * robots.txt ve sitemap.xml için kök adres.
 *
 * Alan adı config'te doldurulmuşsa her zaman o kullanılır (kanonik adres
 * sunucunun Host başlığına bırakılmaz). Henüz TODO_DOMAIN ise yerel
 * önizlemede anlamlı çıktı üretebilmek için isteğin host'una düşülür.
 */
export function baseUrlFor(request: Request): string {
  if (isFilled(siteConfig.domain)) return SITE_URL;

  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!host) return SITE_URL;

  const proto =
    request.headers.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}
