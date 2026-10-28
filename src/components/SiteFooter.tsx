import { Link } from "@tanstack/react-router";
import { Clock, Instagram, MapPin, Phone } from "lucide-react";

import { BrandMark } from "@/components/BrandMark";
import {
  addressLine,
  enabledServices,
  instagramUrl,
  mapsSearchLink,
  servicePath,
  siteConfig,
} from "@/config/site.config";

export function SiteFooter() {
  const instagram = instagramUrl();

  return (
    <footer className="relative border-t border-border/40 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-start gap-10 md:grid-cols-4 md:gap-8">
          <div>
            <BrandMark size="lg" />
            <p className="mt-5 max-w-[22rem] text-sm leading-relaxed text-muted-foreground">
              Kilyos Caddesi üzerinde, mahallenin içinde küçük bir salon. Randevular tek tek
              planlanıyor, acele edilmiyor.
            </p>
          </div>

          <nav aria-label="Hizmetler" className="space-y-3">
            <h2 className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
              Hizmetler
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/hizmetler"
                  className="text-sm text-primary transition-colors hover:text-primary/80"
                >
                  Tüm hizmetler
                </Link>
              </li>
              {enabledServices.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={servicePath(s.slug)}
                    className="text-sm text-foreground/80 transition-colors hover:text-primary"
                  >
                    {s.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-4">
            <h2 className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
              İletişim
            </h2>
            <a
              href={siteConfig.phone.href}
              className="flex items-center gap-3 text-sm text-foreground/80 transition-colors hover:text-primary"
            >
              <Phone className="h-4 w-4 text-primary" strokeWidth={1.5} aria-hidden="true" />
              {siteConfig.phone.display}
            </a>
            <a
              href={mapsSearchLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 text-sm text-foreground/80 transition-colors hover:text-primary"
            >
              <MapPin
                className="mt-0.5 h-4 w-4 text-primary"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span>{addressLine()}</span>
            </a>
            <div className="flex items-start gap-3 text-sm text-foreground/80">
              <Clock className="mt-0.5 h-4 w-4 text-primary" strokeWidth={1.5} aria-hidden="true" />
              <span>
                {siteConfig.hours.displayLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </div>
          </div>

          <div className="md:text-right">
            <h2 className="mb-4 text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
              Takip
            </h2>
            {instagram ? (
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-primary"
              >
                <Instagram className="h-4 w-4" aria-hidden="true" />@{siteConfig.instagram}
              </a>
            ) : (
              <p className="text-sm text-muted-foreground">
                Instagram hesabı yakında burada olacak.
              </p>
            )}
          </div>
        </div>

        <div className="mt-12 border-t border-border/40 pt-8">
          <p className="text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-[10px] text-muted-foreground">
            <Link
              to="/kvkk"
              className="underline underline-offset-2 transition-colors hover:text-primary"
            >
              KVKK Aydınlatma Metni
            </Link>
            <span className="hidden sm:inline">·</span>
            <Link
              to="/iletisim"
              className="underline underline-offset-2 transition-colors hover:text-primary"
            >
              Yol tarifi ve iletişim
            </Link>
          </div>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[10px] leading-relaxed text-muted-foreground">
            Sitedeki uygulamalar kişisel bakım hizmetidir. Uygulama süreleri ve sonuçları kişiden
            kişiye değişir.
          </p>
        </div>
      </div>
    </footer>
  );
}
