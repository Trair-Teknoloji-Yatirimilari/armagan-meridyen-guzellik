import { createFileRoute } from "@tanstack/react-router";

import { CtaRow, PageShell, SectionLabel } from "@/components/Layout";
import { BrandPanel } from "@/components/BrandPanel";
import { ServiceImage } from "@/components/ServiceImage";
import { TanitimVideosu } from "@/components/TanitimVideosu";
import { siteConfig } from "@/config/site.config";
import { videoJsonLd } from "@/components/TanitimVideosu";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/hakkimizda")({
  head: () => ({
    ...pageHead({
      title: `Hakkımızda | ${siteConfig.name} Sarıyer`,
      description:
        "Sarıyer Kilyos Caddesi'ndeki salonumuz, kurucumuz ve nasıl çalıştığımız: ön görüşme, hijyen düzeni ve işlem sonrası bakım.",
      path: "/hakkimizda",
    }),
    // Sayfada gömülü tanıtım videosu için VideoObject
    scripts: [{ type: "application/ld+json", children: JSON.stringify(videoJsonLd()) }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { founder } = siteConfig;

  return (
    <PageShell>
      <section className="relative pb-14 pt-28 md:pb-20 md:pt-36">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <SectionLabel>Hakkımızda</SectionLabel>
          <h1 className="max-w-3xl font-display text-4xl leading-tight md:text-6xl">
            Kilyos Caddesi'nde bir güzellik salonu
          </h1>
          <div className="hairline mt-7 max-w-xs" />

          <div className="mt-10 aspect-16/9 overflow-hidden rounded-sm shadow-elegant">
            <ServiceImage
              image={{
                base: "/images/salon/salon-ici",
                alt: "Armağan Meridyen Güzellik salonunun içi",
                widths: [720, 1080],
                width: 1080,
                height: 607,
              }}
              sizes="(min-width: 1024px) 64rem, 100vw"
              priority
            />
          </div>
        </div>
      </section>

      <section className="relative pb-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <div className="page-content">
            <p>
              Armağan Meridyen Güzellik, {siteConfig.address.addressLocality} tarafında, Kilyos
              Caddesi üzerinde. Kuaförden tırnak ve cilt bakımına, masajdan solaryuma kadar birkaç
              farklı uygulamayı bir arada sunuyoruz. İmza uygulamalarımız kafa masajı ve meridyen
              masajı.
            </p>

            <h2>Neden randevuyla çalışıyoruz</h2>
            <p>
              Tırnak, kirpik, cilt ya da masaj — hepsinin kendi süresi var ve bu süre kişiden kişiye
              değişiyor. Gününüzü ve bizim programımızı birlikte planlayabilmek için randevu
              almanızı rica ediyoruz. Yazdığınızda o haftanın uygun saatlerini paylaşıyor, size
              uyanı birlikte seçiyoruz.
            </p>

            <h2>Önce konuşuyoruz</h2>
            <p>
              Randevunun ilk birkaç dakikası konuşmakla geçiyor: ne istediğinizi, günlük hayatınızda
              ellerinizi ya da cildinizi nasıl kullandığınızı anlatıyorsunuz. Sonrasında neyin
              gerçekçi olduğunu açık açık söylüyoruz. Uygun görmediğimiz bir uygulamayı sırf istendi
              diye yapmıyor, sebebini de anlatıyoruz.
            </p>

            <h2>Hijyen düzenimiz</h2>
            <p>
              Hijyene özen gösteriyor, her randevuya hazırlanmış bir alanla başlıyoruz. Bu konuda
              merak ettiğiniz bir şey olursa randevu sırasında sormaktan çekinmeyin, nasıl
              çalıştığımızı anlatmaktan memnun oluruz.
            </p>

            <h2>İşlem sonrası bakım</h2>
            <p>
              Randevu, siz salondan çıkınca bitmiyor. Her uygulamanın sonunda evde nelere dikkat
              etmeniz gerektiğini tek tek anlatıyor, isterseniz WhatsApp'tan yazılı olarak da
              gönderiyoruz. Aradan zaman geçtikten sonra aklınıza bir soru takılırsa aynı numaradan
              yazabilirsiniz.
            </p>

            <h2>Fiyatları neden burada yazmıyoruz</h2>
            <p>
              Aynı uygulama herkeste aynı sürmüyor; tırnak boyu, cildin durumu ya da istenen form
              değişince süre de değişiyor. Baştan rakam yazmak yerine, ne istediğinizi konuştuktan
              sonra net bilgi vermeyi tercih ediyoruz. WhatsApp'tan yazmanız yeterli.
            </p>
          </div>
        </div>
      </section>

      {/* KURUCU */}
      <section className="relative border-y border-border/40 bg-card/40 py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <SectionLabel>Kurucumuz</SectionLabel>
          <div className="mt-8 grid gap-8 sm:grid-cols-[200px_1fr] sm:items-start">
            <figure className="m-0">
              <div className="aspect-4/5 overflow-hidden rounded-sm border border-border/60">
                <img
                  src="/images/kurucu/armagan-baysal-480.webp"
                  srcSet="/images/kurucu/armagan-baysal-480.webp 480w, /images/kurucu/armagan-baysal-800.webp 800w"
                  sizes="(min-width: 640px) 200px, 100vw"
                  alt={`${founder.name} — ${founder.jobTitle}`}
                  width={800}
                  height={1000}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full min-w-0 object-cover"
                />
              </div>
              <figcaption className="mt-2 text-center text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {founder.name} · {founder.jobTitle}
              </figcaption>
            </figure>
            <div>
              <h2 className="font-display text-2xl leading-snug">{founder.name}</h2>
              <p className="mt-1 text-xs uppercase tracking-[0.28em] text-muted-foreground">
                {founder.jobTitle}
              </p>
              <div className="page-content mt-5">
                <p>
                  Salonun kurucusu. Randevu öncesi sorularınızı doğrudan WhatsApp hattımızdan
                  iletebilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <TanitimVideosu />
        </div>
      </section>

      <section className="relative pb-16 md:pb-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <CtaRow />
        </div>
      </section>
    </PageShell>
  );
}
