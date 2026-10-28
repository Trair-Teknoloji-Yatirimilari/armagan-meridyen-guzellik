import { Link } from "@tanstack/react-router";
import { Clock, Instagram, Mail, MapPin, Phone, Star } from "lucide-react";

import { BrandMark } from "@/components/BrandMark";
import { blogEnabled, blogPath } from "@/lib/blog";
import {
  addressLine,
  enabledServices,
  instagramHandle,
  instagramUrl,
  mapsSearchLink,
  reviewUrl,
  servicePath,
  siteConfig,
} from "@/config/site.config";

export function SiteFooter() {
  const instagram = instagramUrl();
  const handle = instagramHandle();
  const review = reviewUrl();

  return (
    <footer className="relative border-t border-border/40 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-start gap-10 md:grid-cols-4 md:gap-8">
          <div>
            <BrandMark size="lg" />
            <p className="mt-5 max-w-[22rem] text-sm leading-relaxed text-muted-foreground">
              Kilyos Caddesi üzerinde, mahallenin içinde bir salon. Randevular kişiye göre
              planlanıyor, işlem sonrası bakım anlatılıyor.
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
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-3 break-all text-sm text-foreground/80 transition-colors hover:text-primary"
            >
              <Mail
                className="h-4 w-4 shrink-0 text-primary"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              {siteConfig.email}
            </a>
            <a
              href={mapsSearchLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 text-sm text-foreground/80 transition-colors hover:text-primary"
            >
              <MapPin
                className="mt-0.5 h-4 w-4 shrink-0 text-primary"
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

          <div className="space-y-4 md:text-right">
            <h2 className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">Takip</h2>
            {instagram && handle && (
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-primary md:justify-end"
              >
                <Instagram className="h-4 w-4" aria-hidden="true" />@{handle}
              </a>
            )}
            {review && (
              <a
                href={review}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-primary md:justify-end"
              >
                <Star
                  className="h-4 w-4 shrink-0 text-primary"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                Google'da yorum bırakın
              </a>
            )}
          </div>
        </div>

        <div className="mt-12 border-t border-border/40 pt-8">
          <p className="text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-[10px] text-muted-foreground">
            {blogEnabled && (
              <>
                <Link
                  to={blogPath()}
                  className="underline underline-offset-2 transition-colors hover:text-primary"
                >
                  Blog
                </Link>
                <span className="hidden sm:inline">·</span>
              </>
            )}
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
            kişiye değişir. Hizmet sayfalarındaki görseller temsilidir.
          </p>
          <p className="mt-6 text-center text-[11px] text-muted-foreground">
            {siteConfig.name}, {siteConfig.partner.name} partneridir
            <span className="mx-2">·</span>
            Web tasarım &amp; geliştirme:{" "}
            <a
              href={siteConfig.credit.url}
              rel="noopener"
              className="font-medium transition-colors hover:text-foreground"
            >
              {siteConfig.credit.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
