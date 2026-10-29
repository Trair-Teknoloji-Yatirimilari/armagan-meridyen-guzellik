import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock, HelpCircle, MapPin, Phone, Star } from "lucide-react";

import { CtaRow, PageShell, SectionLabel, WhatsAppCta } from "@/components/Layout";
import { BrandPanel } from "@/components/BrandPanel";
import { ServiceImage } from "@/components/ServiceImage";
import { TanitimVideosu } from "@/components/TanitimVideosu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  addressLine,
  enabledServices,
  mapsSearchLink,
  reviewUrl,
  servicePath,
  signatureServices,
  siteConfig,
} from "@/config/site.config";
import { videoJsonLd } from "@/components/TanitimVideosu";
import { pageHead } from "@/lib/seo";

const HOME_FAQ = [
  {
    q: "Randevusuz gelebilir miyim?",
    a: "Uğrayabilirsiniz, ama uygulamaların çoğu için size ayrı zaman ayırmamız gerekiyor. Gelmeden önce WhatsApp'tan yazarsanız o günün uygun saatlerini paylaşır, boşa yol yürümemiş olursunuz.",
  },
  {
    q: "Hangi günler açıksınız?",
    a: "Her gün 10:00–19:00 arası açığız, hafta sonu dahil. Size uyan saati WhatsApp'tan birlikte seçiyoruz.",
  },
  {
    q: "Kilyos Caddesi'nde tam olarak neredesiniz?",
    a: `${siteConfig.address.streetAddress} adresindeyiz. Cadde üzerinde, ${siteConfig.address.addressLocality} tarafında. Yol tarifi için haritaya dokunmanız yeterli.`,
  },
  {
    q: "Fiyatları neden sitede yazmıyorsunuz?",
    a: "Çünkü aynı uygulama herkeste aynı sürmüyor; boy, form ve cilt durumu değişince süre de değişiyor. Ne istediğinizi konuşmadan rakam söylemek yerine, WhatsApp'tan yazdığınızda net bilgi veriyoruz.",
  },
];

const STEPS = [
  {
    title: "Yazın",
    text: "WhatsApp'tan ne düşündüğünüzü anlatın. Fotoğraf gönderirseniz daha baştan net konuşabiliriz.",
  },
  {
    title: "Saati birlikte seçelim",
    text: "O haftanın uygun saatlerini paylaşıyoruz. İşten çıkış ya da okul saati, size uyanı birlikte buluyoruz.",
  },
  {
    title: "Kişiye göre planlama",
    text: "Uygulamaya başlamadan önce beklentinizi konuşuyoruz. Uygun görmediğimiz bir şeyi önermiyoruz.",
  },
  {
    title: "İşlem sonrası bakım",
    text: "Evde nelere dikkat edeceğinizi anlatıyoruz. Sorunuz olursa aradan WhatsApp'tan yazabilirsiniz.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    ...pageHead({
      title: `${siteConfig.name} | Zekeriyaköy Sarıyer`,
      description:
        "Zekeriyaköy, Sarıyer'de 360 derece güzellik merkezi: kuaför, tırnak, kirpik, kaş, cilt bakımı, kafa ve meridyen masajı. Her gün 10:00–19:00.",
      path: "/",
    }),
    // Hero görseli mobilde LCP ögesi; önceden bildirerek keşif gecikmesi sıfırlanır.
    links: [
      ...pageHead({ title: "", description: "", path: "/" }).links,
      {
        rel: "preload",
        as: "image",
        href: "/images/salon/dis-cephe-1080.webp",
        imageSrcSet:
          "/images/salon/dis-cephe-720.webp 720w, /images/salon/dis-cephe-1080.webp 1080w",
        imageSizes: "(min-width: 1024px) 40vw, 100vw",
        fetchPriority: "high",
      },
    ],
    // Sayfada gömülü tanıtım videosu için VideoObject
    scripts: [{ type: "application/ld+json", children: JSON.stringify(videoJsonLd()) }],
  }),
  component: HomePage,
});

function HomePage() {
  const review = reviewUrl();

  return (
    <PageShell>
      {/* HERO */}
      <section className="relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-36">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
          <div className="min-w-0">
            <p className="hero-reveal text-xs uppercase tracking-[0.35em] text-primary">
              ZEKERİYAKÖY · SARIYER
            </p>
            <h1
              className="hero-reveal mt-6 font-display text-4xl leading-[1.1] md:text-6xl"
              style={{ "--hero-delay": "80ms" } as React.CSSProperties}
            >
              Zekeriyaköy, Sarıyer bölgesinde{" "}
              <span className="text-brand-gradient">360 derece hizmet alacağınız merkez</span>
            </h1>
            <div
              className="hero-line mt-8 max-w-sm"
              style={{ "--hero-delay": "220ms" } as React.CSSProperties}
            />
            <p
              className="hero-reveal mt-7 max-w-xl text-lg leading-relaxed text-foreground/75"
              style={{ "--hero-delay": "180ms" } as React.CSSProperties}
            >
              Armağan Meridyen Güzellik, Kilyos Caddesi üzerinde bir salon. Tırnaktan kirpiğe,
              kaştan cilde ve masaja kadar her uygulamaya kısa bir ön görüşmeyle başlıyoruz; hijyene
              ve işlem sonrası bakıma aynı özeni gösteriyoruz.
            </p>
            <div
              className="hero-reveal mt-10"
              style={{ "--hero-delay": "260ms" } as React.CSSProperties}
            >
              <CtaRow />
            </div>
            <p
              className="hero-reveal mt-6 text-sm text-muted-foreground"
              style={{ "--hero-delay": "320ms" } as React.CSSProperties}
            >
              {siteConfig.hours.displayShort}
            </p>
          </div>

          <div className="hero-reveal aspect-4/3 min-w-0 overflow-hidden rounded-sm shadow-elegant lg:aspect-4/5">
            <ServiceImage
              image={{
                base: "/images/salon/dis-cephe",
                alt: "Armağan Meridyen Güzellik salonunun dış cephesi ve vitrini",
                widths: [720, 1080],
                width: 1080,
                height: 1350,
              }}
              sizes="(min-width: 1024px) 40vw, 100vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* İMZA UYGULAMALAR */}
      {signatureServices.length > 0 && (
        <section id="imza" className="relative border-y border-border/40 bg-card/40 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <SectionLabel>İmza uygulamalarımız</SectionLabel>
            <h2 className="max-w-2xl font-display text-3xl leading-tight md:text-4xl">
              İmza uygulamalarımız:{" "}
              <span className="text-brand-gradient">kafa ve meridyen masajı</span>
            </h2>
            <p className="mt-5 max-w-2xl leading-relaxed text-foreground/75">
              Bu iki seansa ayrı bir önem veriyoruz. Randevularını ayrı planlıyor, seansın temposunu
              ve baskısını baştan sona size göre ayarlıyoruz.
            </p>

            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {signatureServices.map((s) => (
                <Link
                  key={s.slug}
                  to={servicePath(s.slug)}
                  className="group flex flex-col overflow-hidden rounded-sm border border-border/60 bg-background/60 transition-colors hover:border-primary/50"
                >
                  <div className="aspect-16/9 overflow-hidden">
                    {s.image ? (
                      <ServiceImage image={s.image} sizes="(min-width: 768px) 50vw, 100vw" />
                    ) : (
                      <BrandPanel title={s.navLabel} />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="font-display text-2xl leading-snug">{s.navLabel}</h3>
                    <p className="mt-3 flex-1 leading-relaxed text-foreground/70">{s.summary}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary">
                      Seansı tanıyın
                      <ArrowUpRight
                        className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SALON */}
      <section id="salon" className="relative py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
          <div className="aspect-16/9 overflow-hidden rounded-sm">
            <ServiceImage
              image={{
                base: "/images/salon/salon-ici",
                alt: "Armağan Meridyen Güzellik salonunun içi",
                widths: [720, 1080],
                width: 1080,
                height: 607,
              }}
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </div>
          <div>
            <SectionLabel>Salon</SectionLabel>
            <h2 className="font-display text-3xl leading-tight md:text-4xl">Nasıl çalışıyoruz</h2>
            <div className="page-content mt-6 max-w-xl">
              <p>
                Her uygulamaya kısa bir ön görüşmeyle başlıyoruz: ne istediğinizi, günlük
                hayatınızda ellerinizi ya da cildinizi nasıl kullandığınızı konuşuyoruz. Neyin
                gerçekçi olduğunu baştan söylüyor, uygun görmediğimiz bir uygulamayı yapmıyoruz.
              </p>
              <p>
                Hijyene özen gösteriyor, her randevuya hazırlanmış bir alanla başlıyoruz. Randevu
                bittiğinde evde nelere dikkat edeceğinizi anlatıyor, gerekirse WhatsApp'tan yazılı
                olarak da gönderiyoruz.
              </p>
            </div>
            <Link
              to="/hakkimizda"
              className="mt-7 inline-flex items-center gap-2 text-sm uppercase tracking-widest text-primary underline underline-offset-4 transition-colors hover:text-foreground"
            >
              Salonu tanıyın <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* HİZMETLER */}
      <section
        id="hizmetler"
        className="relative border-y border-border/40 bg-card/40 py-20 md:py-28"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionLabel>Hizmetler</SectionLabel>
          <h2 className="max-w-2xl font-display text-3xl leading-tight md:text-4xl">
            Salonda yapılan uygulamalar
          </h2>
          <p className="mt-5 max-w-2xl leading-relaxed text-foreground/75">
            Kuaförden tırnak ve cilt bakımına, masajdan solaryuma kadar her uygulamanın kendi
            sayfası var. Hangisinin size uyduğundan emin değilseniz yazın, konuşarak karar verelim.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {enabledServices.map((s) => (
              <Link
                key={s.slug}
                to={servicePath(s.slug)}
                className="group flex flex-col overflow-hidden rounded-sm border border-border/60 bg-background/60 transition-colors hover:border-primary/50"
              >
                <div className="aspect-4/3 overflow-hidden">
                  {s.image ? (
                    <ServiceImage
                      image={s.image}
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    />
                  ) : (
                    <BrandPanel title={s.navLabel} />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl leading-snug">{s.navLabel}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/70">
                    {s.summary}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary">
                    Ayrıntılar
                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10">
            <Link
              to="/hizmetler"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-primary underline underline-offset-4 transition-colors hover:text-foreground"
            >
              Tüm hizmetler <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* TANITIM VİDEOSU */}
      <section id="video" className="relative py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <TanitimVideosu />
        </div>
      </section>

      {/* NASIL İLERLİYOR */}
      <section id="nasil" className="relative py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionLabel>Nasıl ilerliyor</SectionLabel>
          <h2 className="max-w-2xl font-display text-3xl leading-tight md:text-4xl">
            Randevu almaktan çıkışa kadar
          </h2>
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <li key={step.title}>
                <span className="font-display text-3xl text-primary">0{i + 1}</span>
                <h3 className="mt-3 font-display text-xl">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* SSS */}
      <section id="sss" className="relative border-t border-border/40 py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <SectionLabel>Sık sorulanlar</SectionLabel>
          <h2 className="font-display text-3xl leading-tight md:text-4xl">Merak edilenler</h2>
          <Accordion type="single" collapsible className="mt-10 w-full">
            {HOME_FAQ.map((f, idx) => (
              <AccordionItem
                key={f.q}
                value={`home-faq-${idx}`}
                className="border-b border-border/60"
              >
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

      {/* İLETİŞİM */}
      <section id="iletisim" className="relative border-t border-border/40 py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
          <div>
            <SectionLabel>İletişim</SectionLabel>
            <h2 className="font-display text-3xl leading-tight md:text-4xl">Uğrayın ya da yazın</h2>
            <dl className="mt-8 space-y-5">
              <div className="flex items-start gap-3">
                <dt className="sr-only">Adres</dt>
                <MapPin
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <dd>
                  <a
                    href={mapsSearchLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/85 underline-offset-4 hover:underline"
                  >
                    {addressLine()}
                  </a>
                </dd>
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
                  </dd>
                </div>
              )}
            </dl>
            <div className="mt-10">
              <WhatsAppCta label="WhatsApp'tan yazın" />
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Ayrıntılı yol tarifi ve iletişim formu için{" "}
              <Link to="/iletisim" className="text-primary underline underline-offset-4">
                iletişim sayfasına
              </Link>{" "}
              bakabilirsiniz.
            </p>
          </div>

          <div className="aspect-4/3 overflow-hidden rounded-sm border border-border/60">
            <BrandPanel brand subtitle={addressLine()} />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
