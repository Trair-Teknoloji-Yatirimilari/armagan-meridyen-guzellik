import { createFileRoute } from "@tanstack/react-router";

import { NotFoundPage, notFoundHead } from "@/components/NotFound";

/**
 * Statik çıktıda nginx'in `error_page 404` ile servis edeceği sayfa.
 *
 * Yanıt kodunu bilerek DEĞİŞTİRMİYOR: prerender sırasında 200 dönmesi gerekiyor
 * ki dosya diske yazılsın. Gerçek 404 kodunu nginx veriyor.
 * Build sonrası `404/index.html` → `404.html` olarak kopyalanır.
 */
export const Route = createFileRoute("/404")({
  head: notFoundHead,
  component: NotFoundPage,
});
