import { createFileRoute } from "@tanstack/react-router";
import { Clock, Instagram, Mail, MapPin, MessageCircle, Phone, Star } from "lucide-react";

import { ContactForm } from "@/components/ContactForm";
import { PageShell, SectionLabel, WhatsAppCta } from "@/components/Layout";
import { BrandPanel } from "@/components/BrandPanel";
import {
  addressLine,
  instagramHandle,
  instagramUrl,
  mapsSearchLink,
  reviewUrl,
  siteConfig,
} from "@/config/site.config";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/iletisim")({
  head: () =>
    pageHead({
      title: `İletişim | ${siteConfig.name} Sarıyer`,
      description:
        "Maden Mah. Kilyos Cd. No:151/A Sarıyer. Telefon, WhatsApp, e-posta ve yol tarifi. Her gün 10:00–19:00 açığız.",
      path: "/iletisim",
    }),
  component: ContactPage,
});

function ContactPage() {
  const instagram = instagramUrl();
  const handle = instagramHandle();
  const review = reviewUrl();

  return (
    <PageShell>
      <section className="relative pb-14 pt-28 md:pb-16 md:pt-36">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <SectionLabel>İletişim</SectionLabel>
          <h1 className="max-w-3xl font-display text-4xl leading-tight md:text-6xl">Bize ulaşın</h1>
          <div className="hairline mt-7 max-w-xs" />
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/75">
            En hızlı yol WhatsApp. Yazdığınızda o haftanın uygun saatlerini paylaşıyor, aklınızdaki
            uygulamayı birlikte netleştiriyoruz. Her gün aynı saatlerde salondayız.
          </p>
          <div className="mt-8">
            <WhatsAppCta label="WhatsApp'tan yazın" />
          </div>
        </div>
      </section>

      <section className="relative pb-20 md:pb-28">
        <div className="mx-auto grid max-w-5xl gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
          <div>
            <h2 className="font-display text-2xl">Salon bilgileri</h2>
            <dl className="mt-6 space-y-5">
              <div className="flex items-start gap-3">
                <dt className="sr-only">Adres</dt>
                <MapPin
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <dd className="text-foreground/85">{addressLine()}</dd>
              </div>
              <div className="flex items-start gap-3">
                <dt className="sr-only">Telefon</dt>
                <Phone
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <dd>
                  <a
                    href={siteConfig.phone.href}
                    className="text-foreground/85 underline-offset-4 hover:underline"
                  >
                    {siteConfig.phone.display}
                  </a>
                </dd>
              </div>
              <div className="flex items-start gap-3">
                <dt className="sr-only">WhatsApp</dt>
                <MessageCircle
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <dd className="text-foreground/85">
                  Aynı numaradan WhatsApp ile de yazabilirsiniz.
                </dd>
              </div>
              <div className="flex items-start gap-3">
                <dt className="sr-only">E-posta</dt>
                <Mail
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <dd>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="break-all text-foreground/85 underline-offset-4 hover:underline"
                  >
                    {siteConfig.email}
                  </a>
                </dd>
              </div>
              <div className="flex items-start gap-3">
                <dt className="sr-only">Çalışma saatleri</dt>
                <Clock
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <dd className="text-foreground/85">
                  {siteConfig.hours.displayLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </dd>
              </div>
              {instagram && handle && (
                <div className="flex items-start gap-3">
                  <dt className="sr-only">Instagram</dt>
                  <Instagram
                    className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <dd>
                    <a
                      href={instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/85 underline-offset-4 hover:underline"
                    >
                      @{handle}
                    </a>
                  </dd>
                </div>
              )}
              {review && (
                <div className="flex items-start gap-3">
                  <dt className="sr-only">Google yorumu</dt>
                  <Star
                    className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <dd>
                    <a
                      href={review}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/85 underline-offset-4 hover:underline"
                    >
                      Google'da yorum bırakın
                    </a>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      Yorumlar gönüllüdür; karşılığında indirim ya da hediye verilmez.
                    </span>
                  </dd>
                </div>
              )}
            </dl>

            <h2 className="mt-12 font-display text-2xl">Yol tarifi</h2>
            <p className="mt-4 leading-relaxed text-foreground/75">
              Kilyos Caddesi üzerindeyiz, kapı numarası 151/A. Cadde boyunca yürürken numaraları
              takip ederseniz kaçırmazsınız. Aşağıdaki bağlantı sizi doğrudan haritada adrese
              götürür.
            </p>
            <a
              href={mapsSearchLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm uppercase tracking-widest text-primary underline underline-offset-4 hover:text-foreground"
            >
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Haritada aç
            </a>

            <div className="mt-6 aspect-16/9 overflow-hidden rounded-sm border border-border/60">
              {siteConfig.mapEmbedUrl ? (
                <iframe
                  src={siteConfig.mapEmbedUrl}
                  title={`${siteConfig.name} konumu — ${addressLine()}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full border-0"
                />
              ) : (
                // Harita gömme adresi config'te doldurulunca burası kendiliğinden haritaya döner.
                <BrandPanel brand subtitle={addressLine()} />
              )}
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl">Mesaj bırakın</h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/70">
              Telefonda konuşmak yerine yazmayı tercih ediyorsanız aşağıyı doldurun. Form
              bilgilerinizi WhatsApp mesajına çevirir; göndermeden önce mesajı görürsünüz.
            </p>
            <div className="mt-8 rounded-sm border border-border/60 bg-card/60 p-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
