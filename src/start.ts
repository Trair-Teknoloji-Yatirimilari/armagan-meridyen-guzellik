import { createStart, createCsrfMiddleware, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

// Start, src/start.ts yoksa CSRF korumasını kendisi kuruyor; dosyayı tanımlamak
// bundan çıkmak anlamına geldiği için korumayı burada açıkça geri ekliyoruz.
// Ters vekil arkasında Origin başlığı iç host ile eşleşmeyebilir; izin verilen
// dış adresler ALLOWED_ORIGINS ortam değişkeniyle (virgülle ayrılmış) verilir.
const extraOrigins = (process.env.ALLOWED_ORIGINS ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn",
  origin: (value, ctx) => {
    try {
      if (value === new URL(ctx.request.url).origin) return true;
    } catch {
      /* yok say */
    }
    return extraOrigins.includes(value);
  },
});

export const startInstance = createStart(() => ({
  requestMiddleware: [errorMiddleware, csrfMiddleware],
}));
