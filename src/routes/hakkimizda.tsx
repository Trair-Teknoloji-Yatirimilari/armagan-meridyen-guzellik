import { createFileRoute } from "@tanstack/react-router";

import { CtaRow, PageShell, SectionLabel } from "@/components/Layout";
import { Placeholder } from "@/components/Placeholder";
import { siteConfig } from "@/config/site.config";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/hakkimizda")({
  head: () =>
    pageHead({
      title: `Hakkımızda | ${siteConfig.name} Sarıyer`,
      description:
        "Sarıyer Kilyos Caddesi'ndeki salonumuz, nasıl çalıştığımız ve randevuya neden tek tek zaman ayırdığımız üzerine kısa bir yazı.",
      path: "/hakkimizda",
    }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell>
      <section className="relative pb-14 pt-28 md:pb-20 md:pt-36">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <SectionLabel>Hakkımızda</SectionLabel>
          <h1 className="max-w-3xl font-display text-4xl leading-tight md:text-6xl">
            Kilyos Caddesi'nde küçük bir salon
          </h1>
          <div className="hairline mt-7 max-w-xs" />

          <div className="mt-10 aspect-16/9 overflow-hidden rounded-sm shadow-elegant">
            <Placeholder label="Salon içi geniş açı fotoğrafı gelecek" ratio="16/9" />
          </div>
        </div>
      </section>

      <section className="relative pb-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <div className="page-content">
            <p>
              Armağan Egemen Güzellik, {siteConfig.address.addressLocality} tarafında, Kilyos
              Caddesi üzerinde. Büyük bir merkez değil; aynı anda birkaç kişiye birden yetişmeye
              çalışmayan, bir kişiye düzgün vakit ayırabilen bir yer. Bunu bilerek seçtik.
            </p>

            <h2>Neden randevuyla çalışıyoruz</h2>
            <p>
              Tırnak, kirpik ya da cilt — hepsinin kendi süresi var ve bu süre kişiden kişiye
              değişiyor. Randevuları üst üste bindirdiğimizde ya işi aceleye getirmek ya da birini
              bekletmek zorunda kalırdık. İkisini de istemediğimiz için gün içindeki saatleri tek
              tek planlıyoruz.
            </p>
            <p>
              Bu yüzden kapıya gelmeden önce yazmanızı rica ediyoruz. Yazdığınızda o haftanın boş
              saatlerini paylaşıyoruz ve size uyanı birlikte seçiyoruz.
            </p>

            <h2>Konuşarak karar veriyoruz</h2>
            <p>
              Randevunun ilk birkaç dakikası konuşmakla geçiyor: ne istediğinizi, günlük hayatınızda
              ellerinizi ya da cildinizi nasıl kullandığınızı anlatıyorsunuz. Sonrasında neyin
              gerçekçi olduğunu açık açık söylüyoruz. Bize uygun gelmeyen bir uygulamayı sırf
              istendi diye yapmıyoruz; sebebini de anlatıyoruz.
            </p>

            <h2>Mahalleden geliyor çoğumuz</h2>
            <p>
              Buraya gelen insanların çoğu yürüme mesafesinde oturuyor. Birbirini tanıyan bir
              mahallede çalışmanın güzel tarafı şu: bir işi savsaklamanın imkânı yok. Aynı insan
              ertesi hafta fırında ya da markette karşınıza çıkıyor.
            </p>

            <h2>Fiyatları neden burada yazmıyoruz</h2>
            <p>
              Aynı uygulama herkeste aynı sürmüyor; tırnak boyu, cildin durumu ya da istenen form
              değişince süre de değişiyor. Baştan rakam yazmak yerine, ne istediğinizi konuştuktan
              sonra net bilgi vermeyi tercih ediyoruz. WhatsApp'tan yazmanız yeterli.
            </p>
          </div>

          <div className="mt-12">
            <CtaRow />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
