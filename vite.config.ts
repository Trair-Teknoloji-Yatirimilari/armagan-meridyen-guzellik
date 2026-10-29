// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { load as parseYaml } from "js-yaml";

import { enabledServices, servicePath } from "./src/config/site.config";

/**
 * Prerender edilecek yolların listesi.
 *
 * Hizmet yolları config'ten, blog yolları content/blog altındaki dosyalardan
 * türetilir — elle tutulan ikinci bir liste yok. Site tamamen statik servis
 * edildiği için burada eksik kalan bir yol sunucuda 404 olur.
 */
function blogSlugs(): string[] {
  let files: string[] = [];
  try {
    files = readdirSync(join(process.cwd(), "content", "blog")).filter((f) => f.endsWith(".md"));
  } catch {
    return [];
  }
  return files
    .map((file) => {
      const raw = readFileSync(join(process.cwd(), "content", "blog", file), "utf8");
      const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      const data = (match ? (parseYaml(match[1]) ?? {}) : {}) as Record<string, unknown>;
      return { slug: file.replace(/\.md$/, ""), draft: data.draft === true };
    })
    .filter((p) => !p.draft)
    .map((p) => p.slug);
}

const posts = blogSlugs();

const PAGES = [
  "/",
  "/hizmetler",
  "/hakkimizda",
  "/iletisim",
  "/kvkk",
  ...enabledServices.map((s) => servicePath(s.slug)),
  // Blog yalnızca yayındaki yazı varsa üretilir; yoksa /blog diske yazılmaz ve
  // nginx 404.html döndürür.
  ...(posts.length ? ["/blog", ...posts.map((slug) => `/blog/${slug}`)] : []),
  // nginx error_page 404 bunu kullanır (build sonrası 404.html'e kopyalanır).
  "/404",
  // Sunucu rotaları da düz dosya olarak diske yazılır.
  "/robots.txt",
  "/sitemap.xml",
];

export default defineConfig({
  tanstackStart: {
    // Özel sunucu girişi YOK: site tamamen statik servis ediliyor, çalışma
    // anında sunucu kodu bulunmuyor. SSR yalnızca derleme sırasında, prerender
    // için çalışıyor.
    // Tam statik çıktı: her yol derleme sırasında HTML'e dönüşür.
    prerender: {
      enabled: true,
      crawlLinks: false,
      failOnError: true,
      autoSubfolderIndex: true,
      // Yalnızca yukarıdaki liste üretilir. Otomatik keşif kapalı: yazı yokken
      // /blog rotası da keşfedilip derlemeyi düşürüyordu.
      autoStaticPathsDiscovery: false,
    },
    pages: PAGES.map((path) => ({ path })),
  },
});
