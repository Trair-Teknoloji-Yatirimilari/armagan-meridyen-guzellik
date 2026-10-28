import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { CtaRow, PageShell, SectionLabel } from "@/components/Layout";
import { Placeholder } from "@/components/Placeholder";
import { ServiceImage } from "@/components/ServiceImage";
import { enabledServices, servicePath, siteConfig } from "@/config/site.config";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/hizmetler")({
  head: () =>
    pageHead({
      title: `Hizmetler | ${siteConfig.name} Sarıyer`,
      description:
        "Sarıyer Kilyos Caddesi'ndeki salonumuzda yaptığımız uygulamalar: tırnak bakımı, protez tırnak, kirpik lifting, kaş laminasyonu ve cilt bakımı.",
      path: "/hizmetler",
    }),
  component: ServicesHubPage,
});

function ServicesHubPage() {
  return (
    <PageShell>
      <section className="relative pb-14 pt-28 md:pb-20 md:pt-36">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <SectionLabel>Hizmetler</SectionLabel>
          <h1 className="max-w-3xl font-display text-4xl leading-tight md:text-6xl">
            Salonda neler yapıyoruz
          </h1>
          <div className="hairline mt-7 max-w-xs" />
          <div className="page-content mt-6 max-w-2xl">
            <p>
              Her uygulamanın kendi sayfası var: nasıl ilerlediğini, kimler için uygun olduğunu ve
              sık sorulanları orada anlattık. Uygulamaya başlamadan önce kısa bir ön görüşme
              yapıyor, beklentinizi birlikte netleştiriyoruz. Hangisinin size uyduğundan emin
              değilseniz WhatsApp'tan yazın, konuşarak karar verelim.
            </p>
          </div>
          <div className="mt-10">
            <CtaRow />
          </div>
        </div>
      </section>

      <section className="relative pb-20 md:pb-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <ul className="grid gap-8">
            {enabledServices.map((s) => (
              <li key={s.slug}>
                <Link
                  to={servicePath(s.slug)}
                  className="group grid gap-6 overflow-hidden rounded-sm border border-border/60 bg-card/60 transition-colors hover:border-primary/50 sm:grid-cols-[260px_1fr]"
                >
                  <div className="aspect-4/3 overflow-hidden sm:aspect-auto sm:h-full">
                    {s.image ? (
                      <ServiceImage
                        image={s.image}
                        sizes="(min-width: 640px) 260px, 100vw"
                        className="sm:min-h-full"
                      />
                    ) : (
                      <Placeholder label={s.placeholderLabel} ratio="4/3" size="sm" />
                    )}
                  </div>
                  <div className="flex flex-col justify-center p-6 sm:py-8 sm:pr-8">
                    <h2 className="font-display text-2xl leading-snug">
                      {s.name} {siteConfig.address.addressLocality}
                    </h2>
                    <p className="mt-3 leading-relaxed text-foreground/70">{s.summary}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary">
                      Sayfayı aç
                      <ArrowUpRight
                        className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-10 text-sm leading-relaxed text-muted-foreground">
            Aradığınız uygulama listede yoksa yine de yazabilirsiniz. Yapıp yapmadığımızı açıkça
            söyler, yapmıyorsak bunu baştan belirtiriz.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
