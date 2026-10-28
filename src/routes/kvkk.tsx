import { createFileRoute } from "@tanstack/react-router";

import { PageShell, SectionLabel } from "@/components/Layout";
import { addressLine, isFilled, siteConfig } from "@/config/site.config";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/kvkk")({
  head: () =>
    pageHead({
      title: `KVKK Aydınlatma Metni | ${siteConfig.name}`,
      description:
        "Kişisel verilerin korunması hakkında aydınlatma metni: hangi verileri alıyoruz, neden alıyoruz, ne kadar saklıyoruz ve haklarınız neler.",
      path: "/kvkk",
    }),
  component: KvkkPage,
});

function KvkkPage() {
  // Ticari unvan henüz girilmediyse metinde marka adı kullanılır ve eksik olduğu belirtilir.
  const controller = isFilled(siteConfig.legalName) ? siteConfig.legalName : siteConfig.name;

  return (
    <PageShell>
      <section className="relative pb-14 pt-28 md:pt-36">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <SectionLabel>Yasal</SectionLabel>
          <h1 className="font-display text-4xl leading-tight md:text-5xl">
            Kişisel Verilerin Korunması Hakkında Aydınlatma Metni
          </h1>
          <div className="hairline mt-7 max-w-xs" />
        </div>
      </section>

      <section className="relative pb-20 md:pb-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <div className="page-content">
            <p>
              Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında, salonumuzla
              iletişime geçtiğinizde hangi bilgilerinizin işlendiğini anlatmak için hazırlandı.
            </p>

            <h2>Veri sorumlusu</h2>
            <p>
              Veri sorumlusu {controller}, {addressLine()} adresinde faaliyet göstermektedir.
              İletişim: {siteConfig.phone.display}.
              {!isFilled(siteConfig.legalName) && (
                <> (Ticari unvan bilgisi tamamlandığında bu bölüm güncellenecektir.)</>
              )}
            </p>

            <h2>Hangi verileri işliyoruz</h2>
            <ul>
              <li>
                <strong>İletişim bilgileri:</strong> bize telefonla ya da WhatsApp ile ulaştığınızda
                paylaştığınız ad ve telefon numarası.
              </li>
              <li>
                <strong>Randevu bilgisi:</strong> talep ettiğiniz uygulama ile tercih ettiğiniz gün
                ve saat.
              </li>
              <li>
                <strong>Kendi aktardığınız notlar:</strong> uygulama öncesi bize kendi isteğinizle
                ilettiğiniz hassasiyet veya tercih bilgileri.
              </li>
            </ul>

            <h2>Bu site üzerinden veri toplanmıyor</h2>
            <p>
              Sitede ziyaretçi takibi, reklam pikseli veya analiz aracı bulunmuyor; tarayıcınıza
              takip çerezi yerleştirilmiyor. Sitedeki iletişim formu da bilgilerinizi herhangi bir
              sunucuya göndermez — doldurduğunuz alanlar yalnızca tarayıcınızda bir WhatsApp mesajı
              taslağına dönüştürülür. Mesajı göndermeden önce içeriğini görür ve dilerseniz
              değiştirirsiniz.
            </p>
            <p>
              WhatsApp üzerinden yazdığınızda mesajlaşma, ilgili uygulamanın kendi koşullarına tabi
              olur. Bu hizmet salonumuza ait değildir.
            </p>

            <h2>İşleme amacı ve hukuki sebep</h2>
            <p>
              Bilgileriniz yalnızca randevunuzu planlamak, size geri dönüş yapmak ve talep ettiğiniz
              hizmeti sunmak için kullanılıyor. Hukuki sebep, Kanun'un 5. maddesi uyarınca
              sözleşmenin kurulması ve ifasıyla doğrudan ilgili olmasıdır. Pazarlama amaçlı mesaj
              göndermek için ayrıca açık rızanız istenir; vermemeniz hizmet almanızı etkilemez.
            </p>

            <h2>Aktarım</h2>
            <p>
              Bilgileriniz üçüncü kişilere satılmaz veya pazarlama amacıyla paylaşılmaz. Yalnızca
              yasal bir zorunluluk doğması hâlinde yetkili kurumlarla paylaşılabilir.
            </p>

            <h2>Saklama süresi</h2>
            <p>
              Randevu kaydınız, ilgili mevzuatın öngördüğü süreler boyunca saklanır; bu sürenin
              sonunda silinir. Daha erken silinmesini talep ederseniz, saklamayı zorunlu kılan bir
              yasal sebep yoksa talebiniz yerine getirilir.
            </p>

            <h2>Haklarınız</h2>
            <p>Kanun'un 11. maddesi uyarınca şunları talep edebilirsiniz:</p>
            <ul>
              <li>Kişisel verinizin işlenip işlenmediğini öğrenme ve işlenmişse bilgi isteme</li>
              <li>İşleme amacını ve amaca uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>Eksik veya yanlış işlenmiş verinin düzeltilmesini isteme</li>
              <li>Şartları oluştuğunda verinin silinmesini veya yok edilmesini isteme</li>
              <li>Düzeltme veya silme işleminin aktarıldığı taraflara bildirilmesini isteme</li>
              <li>
                Verilerin kanuna aykırı işlenmesi sebebiyle zarara uğramanız hâlinde zararın
                giderilmesini talep etme
              </li>
            </ul>

            <h2>Başvuru</h2>
            <p>
              Taleplerinizi {siteConfig.phone.display} numarasından veya salon adresine şahsen
              başvurarak iletebilirsiniz. Başvurunuz en kısa sürede ve her hâlükârda mevzuatta
              öngörülen süre içinde yanıtlanır.
            </p>

            <p className="text-sm text-muted-foreground">
              Bu metin, salonun iletişim ve randevu akışı değiştikçe güncellenir.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
