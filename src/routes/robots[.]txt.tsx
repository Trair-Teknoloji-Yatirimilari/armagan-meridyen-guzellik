import { createFileRoute } from "@tanstack/react-router";

import { SITE_URL } from "@/config/site.config";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () => {
        // /og-card yalnızca paylaşım görselini üretmek için var; indekslenmesine
        // gerek yok. Sitenin hiçbir sayfasında meta robots etiketi bulunmaz.
        const body = [
          "User-agent: *",
          "Allow: /",
          "Disallow: /og-card",
          "",
          `Sitemap: ${SITE_URL}/sitemap.xml`,
          "",
        ].join("\n");

        return new Response(body, {
          headers: {
            "content-type": "text/plain; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
