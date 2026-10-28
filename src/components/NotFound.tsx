import { Link } from "@tanstack/react-router";

import { PageShell } from "@/components/Layout";
import { siteConfig } from "@/config/site.config";
import { pageHead } from "@/lib/seo";

/** 404 sayfasının head() tanımı — birden fazla rotadan kullanılır. */
export function notFoundHead() {
  return pageHead({
    title: `Sayfa bulunamadı | ${siteConfig.name}`,
    description:
      "Aradığınız sayfa bulunamadı. Hizmetlerimize göz atabilir ya da randevu için doğrudan bize yazabilirsiniz.",
    path: "/404",
  });
}

export function NotFoundPage() {
  return (
    <PageShell>
      <section className="relative flex min-h-[70vh] items-center justify-center px-6 pb-20 pt-32 md:pt-40">
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
      </section>
    </PageShell>
  );
}
