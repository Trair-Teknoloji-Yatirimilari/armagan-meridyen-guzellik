import { Link } from "@tanstack/react-router";
import { ChevronRight, HelpCircle } from "lucide-react";

import { CtaRow, PageShell, SectionLabel, WhatsAppCta } from "@/components/Layout";
import { Placeholder } from "@/components/Placeholder";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { addressLine, siteConfig, type Service } from "@/config/site.config";

/** Hizmet sayfası gövdesi. İçerik tamamen config'teki hizmet kaydından gelir. */
export function ServicePage({ service }: { service: Service }) {
  const city = siteConfig.address.addressLocality;
  const waMessage = `Merhaba, ${service.navLabel} için bilgi ve randevu almak istiyorum.`;

  return (
    <PageShell>
      <section className="relative pb-14 pt-28 md:pb-20 md:pt-36">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <nav
            aria-label="Konum izi"
            className="mb-8 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
          >
            <Link to="/" className="transition-colors hover:text-primary">
              Ana sayfa
            </Link>
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <Link to="/hizmetler" className="transition-colors hover:text-primary">
              Hizmetler
            </Link>
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <span className="text-foreground/70">{service.navLabel}</span>
          </nav>

          <h1 className="max-w-3xl font-display text-4xl leading-tight md:text-6xl">
            {service.name} {city}
          </h1>
          <div className="hairline mt-7 max-w-xs" />
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/75">
            {service.summary}
          </p>

          <div className="mt-10 aspect-16/9 overflow-hidden rounded-sm">
            <Placeholder label={service.placeholderLabel} ratio="16/9" />
          </div>

          <div className="mt-10">
            <CtaRow message={waMessage} />
          </div>
        </div>
      </section>

      <section className="relative pb-8">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <div className="page-content">
            {service.blocks.map((b, i) => {
              if (b.t === "h2") return <h2 key={i}>{b.text}</h2>;
              if (b.t === "ul")
                return (
                  <ul key={i}>
                    {b.items.map((item, j) => (
                      <li key={j} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </ul>
                );
              return <p key={i}>{b.text}</p>;
            })}
          </div>
        </div>
      </section>

      {service.faqs.length > 0 && (
        <section className="relative py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-6 lg:px-10">
            <SectionLabel>Sık sorulanlar</SectionLabel>
            <h2 className="sr-only">{service.navLabel} hakkında sık sorulan sorular</h2>
            <Accordion type="single" collapsible className="w-full">
              {service.faqs.map((f, idx) => (
                <AccordionItem key={f.q} value={`faq-${idx}`} className="border-b border-border/60">
                  <AccordionTrigger className="py-5 text-left text-base font-normal text-foreground/90 hover:text-primary hover:no-underline">
                    <span className="flex items-start gap-4">
                      <HelpCircle
                        className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                        strokeWidth={1.2}
                        aria-hidden="true"
                      />
                      {f.q}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 pl-9 text-sm leading-relaxed text-foreground/70">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      <section className="relative pb-20 md:pb-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <div className="rounded-sm border border-border/60 bg-card/85 px-6 py-10 text-center shadow-elegant md:px-12 md:py-12">
            <h2 className="font-display text-2xl leading-tight md:text-3xl">
              Uygun bir saat bulalım
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-foreground/70">
              {service.navLabel} için gün ve saati birlikte belirliyoruz. Yazın, salonun o haftaki
              boşluklarını paylaşalım.
            </p>
            <div className="mt-8 flex justify-center">
              <WhatsAppCta message={waMessage} />
            </div>
            <p className="mt-7 border-t border-border/40 pt-6 text-xs text-muted-foreground">
              {addressLine()} · {siteConfig.hours.displayLines.join(" · ")}
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
