import { createFileRoute } from "@tanstack/react-router";

import { enabledServices, servicePath, siteUrl } from "@/config/site.config";
import { blogPath, postLastmod, publishedPosts } from "@/lib/blog";

/**
 * Sitemap config'ten otomatik üretilir. Adresler her zaman config.domain'den
 * gelir — isteğin host başlığına bakılmaz, böylece yerel önizlemede de
 * üretimdeki kanonik adresler yazılır.
 *
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
      GET: () => {
        const entries: {
          path: string;
          changefreq: string;
          priority: string;
          lastmod?: string;
        }[] = [
          ...STATIC_PAGES,
          ...enabledServices.map((s) => ({
            path: servicePath(s.slug),
            changefreq: "monthly",
            priority: "0.8",
          })),
          // Blog yalnızca yayındaki yazı varsa sitemap'e girer.
          ...(publishedPosts.length
            ? [{ path: blogPath(), changefreq: "weekly", priority: "0.7" }]
            : []),
          ...publishedPosts.map((p) => ({
            path: blogPath(p.slug),
            changefreq: "monthly",
            priority: "0.6",
            lastmod: postLastmod(p),
          })),
        ];

        const urls = entries
          .map(
            (p) =>
              `  <url><loc>${siteUrl(p.path)}</loc>${p.lastmod ? `<lastmod>${p.lastmod}</lastmod>` : ""}<changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority></url>`,
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
