import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock, HelpCircle, MapPin, Phone } from "lucide-react";

import { CtaRow, PageShell, SectionLabel, WhatsAppCta } from "@/components/Layout";
import { Placeholder } from "@/components/Placeholder";
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
  servicePath,
  siteConfig,
} from "@/config/site.config";
import { pageHead } from "@/lib/seo";

const HOME_FAQ = [
  {
    q: "Randevusuz gelebilir miyim?",
    a: "Boş saatimiz varsa elbette ağırlarız, ama salon küçük olduğu için çoğu gün program dolu oluyor. Gelmeden önce WhatsApp'tan yazarsanız boşa yol yürümemiş olursunuz.",
  },
  {
    q: "Kilyos Caddesi'nde tam olarak neredesiniz?",
    a: `${siteConfig.address.streetAddress} adresindeyiz. Cadde üzerinde, ${siteConfig.address.addressLocality} tarafında. Yol tarifi için haritaya dokunmanız yeterli.`,
  },
  {
    q: "Pazar günü açık mısınız?",
    a: "Evet, pazar günleri açığız. Kapalı olduğumuz tek gün pazartesi. Diğer günlerde 09:00 ile 20:00 arasında salondayız.",
  },
  {
    q: "Fiyatları neden sitede yazmıyorsunuz?",
    a: "Çünkü aynı işlem herkeste aynı sürmüyor. Ne istediğinizi konuşmadan rakam söylemek doğru gelmiyor; WhatsApp'tan yazdığınızda net bilgi veriyoruz.",
  },
];

const STEPS = [
  {
    title: "Yazın",
    text: "WhatsApp'tan ne düşündüğünüzü anlatın. Fotoğraf gönderirseniz daha baştan net konuşabiliriz.",
  },
  {
    title: "Saati birlikte seçelim",
    text: "O haftanın boş saatlerini paylaşıyoruz. İşten çıkış ya da okul saati, size uyanı birlikte buluyoruz.",
  },
  {
    title: "Acelesiz uygulama",
    text: "Randevular üst üste bindirilmiyor. Salonda aynı anda sıra bekleyen kalabalık olmuyor.",
  },
  {
    title: "Sonrası",
    text: "Evde nelere dikkat edeceğinizi anlatıyoruz. Bir sorunuz olursa aradan WhatsApp'tan yazabilirsiniz.",
  },
];

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: `${siteConfig.name} | Sarıyer Güzellik Salonu`,
      description:
        "Sarıyer Kilyos Caddesi'nde mahalle salonu: tırnak bakımı, protez tırnak, kirpik lifting, kaş laminasyonu ve cilt bakımı. Randevu için WhatsApp.",
      path: "/",
    }),
  component: HomePage,
});

function HomePage() {
  return (
    <PageShell>
      {/* HERO */}
      <section className="relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-36">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
          <div>
            <p className="hero-reveal text-xs uppercase tracking-[0.35em] text-primary">
              {siteConfig.address.addressLocality} · Kilyos Caddesi
            </p>
            <h1
              className="hero-reveal mt-6 font-display text-4xl leading-[1.1] md:text-6xl"
              style={{ "--hero-delay": "80ms" } as React.CSSProperties}
            >
              Mahallenizin içinde,
              <br />
              <span className="text-brand-gradient">acelesiz bir salon</span>
            </h1>
            <div
              className="hero-line mt-8 max-w-sm"
              style={{ "--hero-delay": "220ms" } as React.CSSProperties}
            />
            <p
              className="hero-reveal mt-7 max-w-xl text-lg leading-relaxed text-foreground/75"
              style={{ "--hero-delay": "180ms" } as React.CSSProperties}
            >
              Armağan Egemen Güzellik, Kilyos Caddesi üzerinde küçük bir salon. Tırnaktan kirpiğe,
              kaştan cilde kadar yaptığımız her iş tek tek planlanıyor; randevular üst üste
              bindirilmiyor. Buraya gelen çoğu kişi, yürüme mesafesindeki komşumuz.
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
              Pazartesi kapalıyız · Salı'dan pazara 09:00 – 20:00
            </p>
          </div>

          <div className="hero-reveal aspect-4/3 overflow-hidden rounded-sm shadow-elegant lg:aspect-3/4">
            <Placeholder label="Dış cephe fotoğrafı gelecek" ratio="3/4" />
          </div>
        </div>
      </section>

      {/* SALON */}
      <section id="salon" className="relative border-y border-border/40 bg-card/40 py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
          <div className="aspect-4/3 overflow-hidden rounded-sm">
            <Placeholder label="Salon içi fotoğrafı gelecek" ratio="4/3" />
          </div>
          <div>
            <SectionLabel>Salon</SectionLabel>
            <h2 className="font-display text-3xl leading-tight md:text-4xl">
              Küçük olması tercihimiz
            </h2>
            <div className="page-content mt-6 max-w-xl">
              <p>
                Büyük bir merkez kurmak yerine, aynı anda tek kişiye düzgün vakit ayırabileceğimiz
                bir yer açmayı seçtik. Böylece kapıdan girdiğinizde sıra beklemiyorsunuz; işlem
                arasında telefona koşulmuyor.
              </p>
              <p>
                Sarıyer'in bu tarafında herkes birbirini tanır. Komşunuzun tırnağını yaptıysak siz
                de gelip sorarsınız, biz de size ne yapıp ne yapamayacağımızı dürüstçe söyleriz.
                Yapmamamız gereken bir uygulama varsa onu da açıkça konuşuruz.
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
      <section id="hizmetler" className="relative py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionLabel>Hizmetler</SectionLabel>
          <h2 className="max-w-2xl font-display text-3xl leading-tight md:text-4xl">
            Az sayıda iş, düzgün yapılmış hâli
          </h2>
          <p className="mt-5 max-w-2xl leading-relaxed text-foreground/75">
            Her şeyi yapıyoruz demiyoruz. Aşağıdaki uygulamalarda yıllardır çalışıyoruz; listede
            olmayan bir şey sorduğunuzda da size güvendiğimiz bir adres tarif ediyoruz.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {enabledServices.map((s) => (
              <Link
                key={s.slug}
                to={servicePath(s.slug)}
                className="group flex flex-col overflow-hidden rounded-sm border border-border/60 bg-card/60 transition-colors hover:border-primary/50"
              >
                <div className="aspect-4/3 overflow-hidden">
                  <Placeholder label={s.placeholderLabel} ratio="4/3" size="sm" />
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

      {/* NASIL İLERLİYOR */}
      <section id="nasil" className="relative border-y border-border/40 bg-card/40 py-20 md:py-28">
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
      <section id="sss" className="relative py-20 md:py-28">
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
            <Placeholder label="Salonun sokaktan görünüşü — fotoğraf gelecek" ratio="4/3" />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
