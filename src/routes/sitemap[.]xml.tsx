import { createFileRoute } from "@tanstack/react-router";

import { enabledServices, servicePath } from "@/config/site.config";
import { baseUrlFor } from "@/lib/base-url";

/**
 * Sitemap config'ten otomatik üretilir.
 * Yalnızca açık (enabled) hizmetler listelenir; blog modülü kapalı olduğu
 * için blog adresi hiç üretilmez ve hiçbir veritabanı sorgusu yapılmaz.
 */
const STATIC_PAGES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/hizmetler", changefreq: "monthly", priority: "0.9" },
  { path: "/hakkimizda", changefreq: "yearly", priority: "0.6" },
  { path: "/iletisim", changefreq: "yearly", priority: "0.7" },
  { path: "/kvkk", changefreq: "yearly", priority: "0.3" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const base = baseUrlFor(request);

        const entries = [
          ...STATIC_PAGES,
          ...enabledServices.map((s) => ({
            path: servicePath(s.slug),
            changefreq: "monthly",
            priority: "0.8",
          })),
        ];

        const urls = entries
          .map(
            (p) =>
              `  <url><loc>${base}${p.path === "/" ? "/" : p.path}</loc><changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority></url>`,
          )
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

        return new Response(xml, {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
