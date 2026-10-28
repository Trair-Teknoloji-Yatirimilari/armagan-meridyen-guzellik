import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
  Scripts,
  useRouter,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "../styles.css?url";
import { Analytics } from "@/components/Analytics";
import { ChatWidget } from "@/components/ChatWidget";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { siteConfig } from "@/config/site.config";
import { beautySalonJsonLd, pageHead } from "@/lib/seo";

/** Config'teki palet :root değişkenlerine buradan basılır — renk tek yerden değişir. */
function brandCss(): string {
  const c = siteConfig.colors;
  return `:root{--background:${c.background};--foreground:${c.foreground};--card:${c.card};--muted:${c.muted};--secondary:${c.muted};--muted-foreground:${c.mutedForeground};--border:${c.border};--primary:${c.primary};--primary-foreground:${c.primaryForeground};--accent:${c.accent};--gradient-brand:linear-gradient(135deg, ${c.gradientFrom}, ${c.gradientTo});}`;
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <p className="font-display text-7xl text-brand-gradient">404</p>
        <h1 className="mt-4 font-display text-2xl text-foreground">Bu sayfa yerinde değil</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Aradığınız sayfanın adresi değişmiş ya da hiç var olmamış olabilir. Hizmetlere göz
          atabilir ya da doğrudan bize yazabilirsiniz.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Ana sayfa
          </Link>
          <Link
            to="/hizmetler"
            className="inline-flex items-center justify-center rounded-full border border-primary/60 px-6 py-2.5 text-sm text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Hizmetler
          </Link>
        </div>
      </div>
    </div>
  );
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
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground hover:bg-primary/90"
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
  title: `${siteConfig.name} | Sarıyer Güzellik Salonu`,
  description:
    "Sarıyer Kilyos Caddesi'nde tırnak bakımı, kirpik lifting, kaş laminasyonu ve cilt bakımı. Randevu için WhatsApp'tan yazabilirsiniz.",
  path: "/",
});

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#f7f5f1" },
      ...defaultHead.meta,
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
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
  notFoundComponent: NotFoundComponent,
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
