import { createRootRoute, HeadContent, Outlet, Scripts, useRouter } from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "../styles.css?url";
import { Analytics } from "@/components/Analytics";
import { NotFoundPage } from "@/components/NotFound";
import { ChatWidget } from "@/components/ChatWidget";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { siteConfig } from "@/config/site.config";
import { beautySalonJsonLd, pageHead } from "@/lib/seo";

/** Config'teki palet :root değişkenlerine buradan basılır — renk tek yerden değişir. */
function brandCss(): string {
  const c = siteConfig.colors;
  const pairs: Record<string, string> = {
    "--background": c.background,
    "--foreground": c.foreground,
    "--card": c.card,
    "--muted": c.muted,
    "--secondary": c.muted,
    "--muted-foreground": c.mutedForeground,
    "--border": c.border,
    "--input": c.border,
    "--primary": c.primary,
    "--primary-hover": c.primaryHover,
    "--primary-foreground": c.primaryForeground,
    "--accent": c.accent,
    "--accent-strong": c.accentStrong,
    "--accent-soft": c.accentSoft,
    "--gradient-brand": `linear-gradient(135deg, ${c.gradientFrom}, ${c.gradientTo})`,
  };
  const body = Object.entries(pairs)
    .map(([k, v]) => `${k}:${v}`)
    .join(";");
  return `:root{${body};}`;
}

function ErrorComponent({ error, reset }: { error: unknown; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl text-foreground">Sayfa açılamadı</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Bir şeyler ters gitti. Sayfayı yenilemeyi deneyebilir ya da bize WhatsApp'tan
          yazabilirsiniz.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground hover:bg-primary-hover"
          >
            Tekrar dene
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-border px-5 py-2 text-sm text-foreground hover:bg-muted"
          >
            Ana sayfa
          </a>
        </div>
      </div>
    </div>
  );
}

const defaultHead = pageHead({
  title: `${siteConfig.name} | Zekeriyaköy Sarıyer`,
  description:
    "Zekeriyaköy, Sarıyer'de 360 derece güzellik merkezi: kuaför, tırnak, kirpik, kaş, cilt bakımı, kafa ve meridyen masajı. Her gün 10:00–19:00.",
  path: "/",
});

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: siteConfig.colors.background },
      ...defaultHead.meta,
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      // Gerçek marka ikonu (armagan-ikon-512.png'den üretildi)
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", href: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { rel: "icon", href: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(beautySalonJsonLd()),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundPage,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <HeadContent />
        <style dangerouslySetInnerHTML={{ __html: brandCss() }} />
      </head>
      <body>
        <a
          href="#icerik"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          İçeriğe geç
        </a>
        {children}
        <Scripts />
        <Analytics />
        <ChatWidget />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <Outlet />
      <WhatsAppButton />
    </>
  );
}
