import { createFileRoute } from "@tanstack/react-router";

import { baseUrlFor } from "@/lib/base-url";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const base = baseUrlFor(request);
        // /og-card yalnızca paylaşım görselini üretmek için var; indekslenmesine
        // gerek yok. Sitenin hiçbir sayfasında meta robots etiketi bulunmaz.
        const body = [
          "User-agent: *",
          "Allow: /",
          "Disallow: /og-card",
          "",
          `Sitemap: ${base}/sitemap.xml`,
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
