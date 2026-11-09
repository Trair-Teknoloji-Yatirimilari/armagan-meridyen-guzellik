# Görsel kaynakları

İki ayrı kaynak var: **işletmenin kendi kareleri** ve kalan birkaç **stok
görsel**. Hangisinin ne olduğu alt metinlerden de anlaşılır — stok görsellerin
alt metni salonun kendi işi gibi sunulmaz, footer'da da "Hizmet sayfalarındaki
görseller temsilidir" notu bulunur.

---

## İşletmeye ait kareler

**Kaynak: işletmeye ait tanıtım videosundan (2026).** Salonun kendi çekimi;
kullanım hakkı işletmeye ait. Karelerin alt kenarında videodan gelen küçük
Armağan filigranı var — kırpılmadı, bilerek bırakıldı.

Üretim: WebP, **720 ve 1080 genişlik**, kalite 80, metadata temizlendi.
Kaynak kareler 1080 piksel genişliğinde olduğu için **büyütme yapılmadı**.

| Dosya | Kaynak kare | Kullanıldığı yer |
| --- | --- | --- |
| `salon/dis-cephe` | `dis-cephe.jpg` (1080x1350, 4:5) | Ana sayfa hero |
| `salon/salon-ici` | `salon-ici.jpg` (1080x607) | Ana sayfa salon bölümü + Hakkımızda |
| `hizmetler/tirnak-uygulamasi-gercek` | `tirnak-uygulamasi.jpg` | /hizmetler/tirnak-bakimi-protez-tirnak |
| `hizmetler/manikur-pedikur-gercek` | `manikur-pedikur-istasyonu.jpg` | /hizmetler/manikur-pedikur |
| `hizmetler/cilt-bakimi-gercek` | `cilt-bakimi-cihazi.jpg` | /hizmetler/cilt-bakimi |
| `hizmetler/meridyen-masaji-gercek` | `meridyen-masaji.jpg` | /hizmetler/meridyen-masaji + ana sayfa imza bölümü |
| `hizmetler/kafa-masaji-gercek` | `kafa-masaji-head-spa.jpg` | /hizmetler/kafa-masaji + ana sayfa imza bölümü |
| `hizmetler/solaryum-gercek` | `solaryum-kabini.jpg` | /hizmetler/solaryum |
| `hizmetler/ems-gercek` | `ems-five-star.jpg` (1080x1080, kare) | /hizmetler/ems — kartta `object-position: center` |
| `kurucu/armagan-baysal` | `armagan-baysal.jpg` (941x1672) | Hakkımızda, kurucu bölümü. 4:5 kırpım, 480/800 |
| `video/armagan-tanitim-720.mp4` | tanıtım videosu (720x1280, 1:40) | Ana sayfa + Hakkımızda |
| `video/armagan-tanitim.jpg` | video posteri | `<video poster>` |

### Logo ve ikonlar

| Dosya | Kaynak | Not |
| --- | --- | --- |
| `logo/armagan-logo-yatay.svg` | `armaganlogo.pdf` (vektör) | Yatay kilit — `pdftocairo -svg` ile açıldı, işaret ve yazı ayrı gruplara bölünüp işaret sol / yazı sağ olarak yeniden dizildi. Harfler orijinal çizimin eğrileri; font kullanılmadı |
| `logo/armagan-logo-yatay-268.webp` · `-536.webp` | yukarıdaki SVG | Header 1x/2x (56 px yükseklik) |
| `logo/armagan-isaret.svg` · `armagan-isaret-56.webp` · `-111.webp` | aynı PDF, yalnız işaret yolları | 380 px altı ekranlarda header |
| `logo/armagan-logo-240.webp` · `-480.webp` · `-480.png` | `armagan-logo-1024-seffaf.png` | Saydam kenar boşluğu kırpıldı (887x816). Footer ve JSON-LD `logo` alanı — kareye yakın oran Google için bilinçli tercih |
| `favicon.ico` · `favicon-32.png` · `apple-touch-icon.png` · `icon-192.png` · `icon-512.png` | `armagan-ikon-512.png` | `site.webmanifest` bunları kullanır |
| `og-image.png` | `/og-card` ekran görüntüsü | Krem zemin üstünde ortalanmış logo |

**Yatay kilitte tek sapma — işaret/yazı oranı.** Orijinal dikey çizimde yazı
bloğu işaretin altında ve ona göre çok küçük. Bu oran yatayda korunsaydı 56 px
yükseklikte "MERİDYEN & GÜZELLİK" satırı ~4 px'e düşüyordu, yani okunmuyordu.
Yazı bloğu işarete göre **2,6 kat** büyütüldü. Harf biçimleri, harf aralığı,
blok içi oranlar ve renkler değişmedi — değişen tek şey işaret ile yazı
arasındaki ölçek ilişkisi. Aradaki boşluk işaret genişliğinin %25'i, yazı
dikeyde ortalanmış. Kaynak PDF: Adobe Illustrator 28.2, 595x595 pt, 37 yol,
gömülü font ya da raster yok.

> `armagan-logo-1024-beyaz.png` **kullanılmadı**: beyaz *yazı* değil, beyaz
> *zeminli* bir karo. Sitede koyu yüzey olmadığı için gerekmedi.
> `armagan-kapak-1640x820.png` istek üzerine hiç kullanılmadı.

---

## Blog kapakları

Her yazının kapağı `public/images/blog/<slug>-<genişlik>.webp`. Oran **16:10**,
merkezden kırpım, kalite 80, metadata temizlendi. **Büyütme yok** — bu yüzden
salonun kendi karelerinden üretilenler 1600'e çıkmıyor (kaynak 1080 piksel
genişliğinde). 800 basamağı yalnızca en büyük sürüm 900 pikselden genişse
üretiliyor; `src/lib/blog.ts` srcset'i aynı kurala göre kuruyor.

| Yazı | Dosya | Kaynak | Kredi |
| --- | --- | --- | --- |
| kafa-masaji-nedir | `-971`, `-800` | işletmenin tanıtım videosu (`kafa-masaji-head-spa.jpg`) | Armağan Meridyen Güzellik |
| protez-tirnak-ne-kadar-dayanir | `-843` | işletmenin tanıtım videosu (`tirnak-uygulamasi.jpg`) | Armağan Meridyen Güzellik |
| kirpik-lifting-mi-ipek-kirpik-mi | `-1600`, `-800` | Unsplash `lrC3LSnlyW8` | Unsplash / Cyprien Da Silva |
| lazer-epilasyon-kac-seans-surer | `-1600`, `-800` | Unsplash `szpFxaqS658` | Unsplash / Farhad Ibrahimzade |
| ipek-kirpik-ne-kadar-dayanir | `-1600`, `-800` | Unsplash `sRSRuxkOuzI` | Unsplash / Hayley Kim Studios |
| kas-laminasyonu-nedir | — | **kapak yok**, yer tutucu gösteriliyor | — |

Unsplash kapaklarının alt metni genel tutuldu ("İpek kirpik uygulaması") ve
kapağın altında "Görsel: Unsplash / &lt;ad&gt;" notu basılıyor; salonun kendi
çekimi gibi sunulmuyor.

**`protez-tirnak` kırpım notu:** kare 1080x607 ve tırnak uygulaması sol
tarafta. Merkezden 16:10 kırpım müşterinin saçını öne çıkarıyordu; bu yüzden
yatayda %2–80 aralığı alındı. Sonuç 843 piksel, 800'e yakın olduğu için ikinci
bir dosya üretilmedi.

**`kas-laminasyonu-nedir` neden kapaksız:** Unsplash'te ücretsiz lisanslı,
aydınlık, kaş odaklı yakın çekim bulunamadı — uygun olanlar Unsplash+
aboneliğine kilitli. Değerlendirilip elenen adaylar: `MyeBX9azc4E` ve
`t4KX_UZeHEM` (premium), `otYarkxbZzo` (siyah-beyaz, paletle uyumsuz),
`U88HKDGynE4` (kaş değil, kirpik uygulaması). Yanlış yönlendiren bir görsel
koymak yerine yer tutucu tercih edildi. Frontmatter'a `image` eklendiği anda
sayfa kendiliğinden gerçek görsele geçer.

---

## Stok görseller (Unsplash)

Altı hizmet sayfasında hâlâ stok görsel var. Unsplash Lisansı ticari kullanıma
izin verir ve atıf zorunlu değildir; kayıt olarak tutuluyor.
Üretim: WebP 800/1600.

| Dosya | Unsplash ID | Fotoğraf sayfası | Fotoğrafçı | İndirme | Kullanıldığı sayfa |
| --- | --- | --- | --- | --- | --- |
| `kirpik-lifting-sariyer` | `kA74I2XMiSQ` | https://unsplash.com/photos/kA74I2XMiSQ | Victor Sirbu | 2026-10-28 | /hizmetler/ipek-kirpik — **takas edildi** |
| `ipek-kirpik-sariyer` | `-9UpJoyA3Ag` | https://unsplash.com/photos/-9UpJoyA3Ag | Ahmed Rajgoli Shoaib Shakeel | 2026-10-28 | /hizmetler/kirpik-lifting — **takas edildi** |
| `kas-laminasyonu-sariyer` | `x0r5YvOJFCg` | https://unsplash.com/photos/x0r5YvOJFCg | Sum Sum | 2026-10-28 | /hizmetler/kas-laminasyonu |
| `sac-spa-sariyer` | `Md_DhaFsnCQ` | https://unsplash.com/photos/Md_DhaFsnCQ | Lindsay Cash | 2026-10-28 | /hizmetler/sac-spa |
| `kuafor-sariyer` | `MmDO1-ezCE4` | https://unsplash.com/photos/MmDO1-ezCE4 | Jenna Oslin | 2026-10-29 | /hizmetler/kuafor |
| `epilasyon-sariyer` | `cZQetI50v7Q` | https://unsplash.com/photos/cZQetI50v7Q | Sum Sum | 2026-10-28 | /hizmetler/epilasyon |

**Takas notu:** `kirpik-lifting-sariyer` cımbızla kirpiğe tel eklenmesini
gösteriyor — bu ipek kirpik uygulaması. `ipek-kirpik-sariyer` ise doğal kirpiğin
makro çekimi. Kirpik lifting sayfası "yeni kirpik eklenmiyor" dediği için
görseller yer değiştirdi; dosya adları indirildiği gibi korundu, eşleşme
`site.config.ts` içinde yorumla açıklandı.

**`kas-laminasyonu-sariyer` notu:** kaş bölgesinde bir uygulama gösteriyor;
laminasyon mu başka bir kaş işlemi mi görselden kesin anlaşılmıyor.

---

## Kaldırılanlar

| Dosya | Sebep |
| --- | --- |
| `tirnak-uygulamasi-sariyer`, `manikur-sariyer`, `pedikur-sariyer`, `cilt-bakimi-sariyer`, `kafa-masaji-sariyer`, `meridyen-masaji-sariyer`, `solaryum-sariyer`, `ems-sariyer` | Yerlerini işletmenin kendi kareleri aldı |
| İki hizmetin stok görselleri | 29 Eki 2026'da o hizmetler listeden tamamen çıkarıldı; adları git geçmişinde |
| `protez-tirnak-sariyer` (`r-Ej0NQmFlQ`) | İstek üzerine silinmişti |

Bir hizmete gerçek fotoğraf geldiğinde `site.config.ts` içindeki `image`
alanını yeni dosyaya çevirmek yeterli; sayfa kendiliğinden geçer.
