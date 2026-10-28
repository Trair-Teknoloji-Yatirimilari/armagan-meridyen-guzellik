# Armağan Meridyen Güzellik

Sarıyer / Kilyos Caddesi'ndeki güzellik salonunun tanıtım sitesi.

- **Çatı:** TanStack Start (React 19 + Vite + Tailwind v4)
- **Tamamen statik.** Derleme sırasında her sayfa HTML'e dönüşür; sunucuda
  node süreci çalışmaz, nginx dosyaları servis eder.
- **Veritabanı yok.** Blog içeriği `content/blog` altındaki markdown dosyaları.
- **Üçüncü taraf istek yok.** Ölçümleme kimlikleri boş olduğu sürece sayfa
  hiçbir dış sunucuya istek atmaz; yazı tipleri sistem fontlarıdır.

## Build

```sh
nvm use                       # .nvmrc → Node 20.20.2
npm install --legacy-peer-deps
npm run build                 # prerender + postbuild
npm run preview               # npx serve -l 3001 .output/public
```

| | |
| --- | --- |
| **Çıktı klasörü** | `.output/public` |
| **URL biçimi** | klasör + `index.html` (`/hizmetler/kafa-masaji/index.html`) |
| **404** | `.output/public/404.html` — nginx `error_page 404 /404.html` |
| **Node** | `.nvmrc` dosyasındaki sürüm |

`npm run build` sonrası `postbuild` adımı otomatik çalışır: `404.html`'i yazar,
kullanılmayan sunucu paketini siler ve çıktıda `.map` / `.env` / kaynak kod
kalmadığını doğrular.

Önerilen nginx eşlemesi (URL biçimi klasör tabanlı olduğu için):

```nginx
root /var/www/armaganmeridyenguzellik/current;
try_files $uri $uri/index.html $uri.html =404;
error_page 404 /404.html;
```

## Her şeyin kaynağı: tek config

Marka verisinin tamamı `src/config/site.config.ts` içinde. Kodda sabit yazılmış
isim, adres, telefon, renk veya ölçüm kimliği yok.

| Alan | Ne işe yarar |
| --- | --- |
| `domain` | canonical, sitemap, OG ve JSON-LD adresleri (build zamanında dosyaya yazılır) |
| `colors` | `:root` değişkenleri, markalı paneller ve OG görseli |
| `address`, `phone`, `email`, `whatsapp`, `hours` | görünür metinler **ve** BeautySalon şeması (NAP birebir aynı) |
| `analytics.*`, `widget.trairxTenantKey` | boşken ilgili etiket/betik **hiç render edilmez** |
| `services[]` | hizmet sayfaları, menü, sitemap ve kartlar bu listeden üretilir |

Prerender edilecek yolların listesi de `vite.config.ts` içinde aynı config'ten
ve `content/blog` klasöründen türetilir — elle tutulan ikinci bir liste yok.

## Blog

İçerik: `content/blog/<slug>.md`. Frontmatter alanları: `title`, `description`
(≤155 karakter), `date`, `updated`, `category`, `relatedServices` (hizmet
slug'ları), `faq` (q/a listesi), `image`, `imageAlt`, `draft`.

**Görünürlük kuralı:** `draft: false` olan yazı sayısı 0 ise blog yokmuş gibi
davranılır — menüde ve footer'da görünmez, sitemap'e girmez, `/blog` üretilmez
(nginx 404 döner). En az bir yayındaki yazı olduğunda kendiliğinden açılır.

### Yeni yazı ekleme

1. `content/blog/_ornek.md` dosyasını kopyalayın, adını `<slug>.md` yapın.
2. Frontmatter'ı doldurun, `draft: false` yapın, gövdeyi markdown olarak yazın
   (GFM tabloları desteklenir; `##` başlıkları içindekiler listesini üretir).
3. Görsel kullanacaksanız `public/images/blog/` altına koyup `image` alanına
   yazın.
4. `npm run build` — yazı HTML'e dönüşür, sitemap'e `lastmod` ile eklenir,
   `relatedServices`'teki hizmet sayfalarında "İlgili yazılar" bölümünde çıkar.
5. `git commit` → `git push`.
6. Sunucuda `deploy.sh`.

> `deploy.sh` doğrulama eşikleri kaynaktan türetilir: enabled hizmet sayısı +
> `draft:false` yazı sayısı.

## Sırlar

Gerçek değerler yalnızca `.env` dosyasında tutulur; depoya girmez. Örnek için
`.env.example`. Site statik olduğu için `.env` yalnızca **build zamanı**
değişkenleri içerir — çalışma anında okunan bir değişken yoktur.

## Marka görselleri

OG görseli ve simge, config'teki renk ve isimden üretilir:

```sh
npm run dev
npm run brand:assets -- http://localhost:3000
```

Kaynak sayfa: `/og-card` (robots.txt üzerinden taramaya kapatılmıştır).
Favicon `/favicon.svg` olarak config'ten üretilir.

## Görseller

Hizmet sayfalarındaki fotoğraflar Unsplash'ten alınan **temsili** stok
görsellerdir (`public/images/hizmetler`, 1600w + 800w WebP, EXIF temiz).
Kaynak listesi ve konu uyuşmazlıkları: [docs/IMAGE-CREDITS.md](docs/IMAGE-CREDITS.md).

Fotoğrafı olmayan yerlerde (dış cephe, salon içi, kurucu portresi, EMS) markalı
panel gösterilir. Config'te ilgili `image` alanı doldurulduğu anda sayfa
kendiliğinden fotoğrafa geçer.

## Kontroller

```sh
npm run check:ga-izi     # şablonun türetildiği eski siteye ait iz kalmadığını doğrular
npm run check:duplicate  # 8+ kelimelik birebir metin tekrarı var mı
npm run lint
```

## Açık kalan TODO'lar

**Fotoğraf (işletmeden gelecek):** dış cephe, salon içi, kurucu portresi,
solaryum kabini, EMS cihazı.

**Config:** `geo` (koordinatlar), `mapEmbedUrl` (harita gömme adresi),
`logo.src` (görsel logo), `colors` (şu an nötr bir başlangıç paleti).

**Hakkımızda:** kurucu biyografisindeki `[YIL]` ve `[DENEYİM]` yer tutucuları.
Bilgi teyit edilince blog yazılarındaki JSON-LD `author` alanı da Organization
yerine Person olacak.

**Hijyen süreci teyidi:** metinlerde yalnızca "hijyene özen gösteriyoruz"
deniyor. Alet temizliği, sterilizasyon ve tek kullanımlık malzeme gibi süreç
ayrıntıları, salon doğrulayana kadar bilinçli olarak yazılmadı.
