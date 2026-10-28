import { ArrowUpRight, Phone } from "lucide-react";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { siteConfig, whatsappLink } from "@/config/site.config";

/** Menü + içerik + footer iskeleti. Tüm sayfalar bunu kullanır. */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <SiteNav />
      <main id="icerik">{children}</main>
      <SiteFooter />
    </div>
  );
}

/** Bölüm üstündeki küçük başlık çizgisi. */
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span className="h-px w-10 bg-primary" aria-hidden="true" />
      <span className="text-xs uppercase tracking-[0.35em] text-primary">{children}</span>
    </div>
  );
}

export function WhatsAppCta({
  label = "Fiyat ve randevu için WhatsApp",
  message,
}: {
  label?: string;
  message?: string;
}) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex w-full max-w-full items-center justify-center gap-3 rounded-full bg-primary px-6 py-3.5 text-center text-xs uppercase tracking-[0.12em] text-primary-foreground transition-all hover:bg-primary/90 glow-soft sm:w-auto sm:px-8 sm:text-sm sm:tracking-widest"
    >
      {label}
      <ArrowUpRight
        className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </a>
  );
}

export function PhoneCta({ label = "Telefonla arayın" }: { label?: string }) {
  return (
    <a
      href={siteConfig.phone.href}
      className="inline-flex w-full max-w-full items-center justify-center gap-3 rounded-full border border-primary/60 px-6 py-3.5 text-center text-xs uppercase tracking-[0.12em] text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground sm:w-auto sm:px-8 sm:text-sm sm:tracking-widest"
    >
      <Phone className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
      {label}
    </a>
  );
}

/** WhatsApp + telefon ikilisi. */
export function CtaRow({ message, whatsappLabel }: { message?: string; whatsappLabel?: string }) {
  return (
    <div className="flex w-full min-w-0 flex-col flex-wrap items-stretch gap-4 sm:w-auto sm:flex-row sm:items-center">
      <WhatsAppCta message={message} label={whatsappLabel} />
      <PhoneCta />
    </div>
  );
}
