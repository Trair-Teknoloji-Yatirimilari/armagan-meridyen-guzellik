import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Phone } from "lucide-react";
import { useState } from "react";

import { BrandMarkLink } from "@/components/BrandMark";
import { siteConfig, whatsappLink } from "@/config/site.config";

/**
 * Üst menü. Blog bayrağı kapalı olduğu için blog bağlantısı hiç üretilmez
 * (bkz. siteConfig.features.blog).
 */
const LINKS = [
  { to: "/", label: "Ana Sayfa" },
  { to: "/hizmetler", label: "Hizmetler" },
  { to: "/hakkimizda", label: "Hakkımızda" },
  { to: "/iletisim", label: "İletişim" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/40 bg-background/95">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20 lg:px-10">
        <BrandMarkLink />

        <nav aria-label="Ana menü" className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-primary" }}
              className="relative text-sm text-foreground/80 transition-colors hover:text-primary"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={siteConfig.phone.href}
            className="inline-flex items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-primary"
          >
            <Phone className="h-4 w-4 text-primary" strokeWidth={1.5} aria-hidden="true" />
            {siteConfig.phone.display}
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-primary/60 px-5 py-2 text-xs uppercase tracking-widest text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
          >
            Randevu <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="p-2 text-primary md:hidden"
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={open}
        >
          <span className="mb-1.5 block h-px w-6 bg-current" />
          <span className="mb-1.5 block h-px w-6 bg-current" />
          <span className="ml-auto block h-px w-4 bg-current" />
        </button>
      </div>

      {open && (
        <div className="border-t border-border/40 bg-background/95 md:hidden">
          <div className="flex flex-col gap-4 px-6 py-4">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-sm text-foreground/80"
              >
                {l.label}
              </Link>
            ))}
            <a href={siteConfig.phone.href} className="text-sm text-primary">
              {siteConfig.phone.display}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
