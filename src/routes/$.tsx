import { createFileRoute } from "@tanstack/react-router";

import { NotFoundPage, notFoundHead } from "@/components/NotFound";
import { markNotFoundResponse } from "@/lib/not-found-status";

/**
 * Özel 404 sayfası. Eşleşmeyen her yol buraya düşer.
 * Kendi head()'i olduğu için <title> "Sayfa bulunamadı" olarak basılır;
 * sunucu tarafında yanıt kodu da 404'e çekilir (yoksa SSR 200 dönerdi).
 */
export const Route = createFileRoute("/$")({
  loader: markNotFoundResponse,
  head: notFoundHead,
  component: NotFoundPage,
});
