import { createFileRoute } from "@tanstack/react-router";

import { addressLine, siteConfig } from "@/config/site.config";

/**
 * Paylaşım görselinin (public/og-image.png) kaynağı.
 *
 * Krem zemin üzerinde ortalanmış gerçek logo + adres satırı. Renkler, logo ve
 * metin config'ten gelir; `npm run brand:assets` bu sayfanın 1200x630 ekran
 * görüntüsünü alıp PNG'ye çevirir.
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
        const logo = siteConfig.logo.src2x ?? siteConfig.logo.src ?? "";

        const body = icon
          ? `<div class="icon"><img src="${logo}" alt=""></div>`
          : `<div class="card">
      <img class="logo" src="${logo}" alt="">
      <p class="meta">${addressLine()}</p>
      <p class="meta">${siteConfig.tagline} &middot; ${siteConfig.phone.display}</p>
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
    display:flex;align-items:center;justify-content:center;
    background:linear-gradient(135deg, ${c.background} 0%, ${c.muted} 100%);
    color:${c.foreground};
    font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;
  }
  .card{display:flex;flex-direction:column;align-items:center;text-align:center;gap:12px}
  .logo{width:340px;height:auto;display:block}
  .meta{font-size:26px;color:${c.mutedForeground}}
  .icon{width:180px;height:180px;display:flex;align-items:center;justify-content:center;
        background:${c.background}}
  .icon img{width:150px;height:auto}
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
