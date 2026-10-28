import { createFileRoute } from "@tanstack/react-router";

import { siteConfig } from "@/config/site.config";

/** Favicon da config'ten üretilir: marka renkleri + baş harfler. */
export const Route = createFileRoute("/favicon.svg")({
  server: {
    handlers: {
      GET: () => {
        const c = siteConfig.colors;
        const initials = siteConfig.logo.primaryLine
          .split(/\s+/)
          .map((w: string) => w[0])
          .join("")
          .slice(0, 2)
          .toLocaleUpperCase("tr-TR");

        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="${siteConfig.name}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${c.gradientFrom}"/>
      <stop offset="100%" stop-color="${c.gradientTo}"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="12" fill="url(#g)"/>
  <text x="32" y="43" text-anchor="middle" font-family="Georgia, serif" font-size="30" fill="${c.primaryForeground}">${initials}</text>
</svg>
`;

        return new Response(svg, {
          headers: {
            "content-type": "image/svg+xml; charset=utf-8",
            "cache-control": "public, max-age=86400",
          },
        });
      },
    },
  },
});
