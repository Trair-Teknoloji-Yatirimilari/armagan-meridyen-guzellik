import { createFileRoute } from "@tanstack/react-router";

import { addressLine, siteConfig } from "@/config/site.config";

/**
 * Paylaşım görselinin (public/og-image.png) kaynağı.
 *
 * Bu adres, config'teki renk ve isimle 1200x630'luk kartı HTML olarak üretir;
 * `npm run brand:assets` komutu sayfanın ekran görüntüsünü alıp PNG'ye çevirir.
 * Böylece OG görseli ayrı bir tasarım dosyasına değil, doğrudan config'e bağlı.
 *
 * Arama motorlarına robots.txt üzerindeki Disallow ile kapatılmıştır;
 * sayfaya meta robots etiketi eklenmez.
 */
export const Route = createFileRoute("/og-card")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const url = new URL(request.url);
        const icon = url.searchParams.get("format") === "icon";
        const c = siteConfig.colors;

        const initials = siteConfig.logo.text
          .split(/\s+/)
          .map((w) => w[0])
          .join("")
          .slice(0, 2)
          .toLocaleUpperCase("tr-TR");

        const body = icon
          ? `<div class="icon"><span>${initials}</span></div>`
          : `<div class="card">
      <div class="rule"></div>
      <p class="kicker">${siteConfig.address.addressLocality} · Kilyos Caddesi</p>
      <h1>${siteConfig.name}</h1>
      <p class="meta">${addressLine()}</p>
      <p class="meta">${siteConfig.phone.display}</p>
    </div>`;

        const html = `<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<title>${siteConfig.name}</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{
    width:${icon ? 180 : 1200}px;height:${icon ? 180 : 630}px;
    display:flex;align-items:center;justify-content:${icon ? "center" : "flex-start"};
    background:linear-gradient(135deg, ${c.background} 0%, ${c.muted} 100%);
    color:${c.foreground};
    font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;
  }
  .card{padding:0 96px;max-width:1000px}
  .rule{width:120px;height:3px;background:linear-gradient(90deg, ${c.gradientFrom}, ${c.gradientTo});margin-bottom:40px}
  .kicker{font-size:24px;letter-spacing:.32em;text-transform:uppercase;color:${c.mutedForeground};margin-bottom:28px}
  h1{font-family:ui-serif,Georgia,serif;font-size:92px;font-weight:400;line-height:1.05;letter-spacing:-.02em;
     background:linear-gradient(135deg, ${c.gradientFrom}, ${c.gradientTo});-webkit-background-clip:text;background-clip:text;color:transparent}
  .meta{margin-top:24px;font-size:28px;color:${c.mutedForeground}}
  .meta + .meta{margin-top:8px}
  .icon{width:180px;height:180px;display:flex;align-items:center;justify-content:center;
        background:linear-gradient(135deg, ${c.gradientFrom}, ${c.gradientTo})}
  .icon span{font-family:ui-serif,Georgia,serif;font-size:86px;color:${c.primaryForeground};letter-spacing:.02em}
</style>
</head>
<body>${body}</body>
</html>`;

        return new Response(html, {
          headers: { "content-type": "text/html; charset=utf-8" },
        });
      },
    },
  },
});
