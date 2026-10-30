# Armağan Meridyen Güzellik

Sarıyer / Kilyos Caddesi'ndeki güzellik salonunun tanıtım sitesi.

- **Çatı:** TanStack Start (React 19 + Vite + Tailwind v4)
- **Tamamen statik.** Derleme sırasında her sayfa HTML'e dönüşür; sunucuda
  node süreci çalışmaz, nginx dosyaları servis eder.
- **Veritabanı yok.** Blog içeriği `content/blog` altındaki markdown dosyaları.
- **Ölçümleme yok.** GA4/GTM/pixel kimlikleri boş; yazı tipleri sistem
  fontlarıdır. Tek üçüncü taraf istek, `</body>` öncesine `defer` ile eklenen
  WellnessAllClub canlı destek widget'ıdır (`site.config.ts` → `widget`).

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
| `colors` | `:root` değişkenleri, markalı paneller, `theme-color` ve OG görseli |
| `address`, `phone`, `email`, `whatsapp`, `hours` | görünür metinler **ve** BeautySalon şeması (NAP birebir aynı) |
| `analytics.*`, `widget.trairxTenantKey` | boşken ilgili etiket/betik **hiç render edilmez** |
| `services[]` | hizmet sayfaları, menü, sitemap ve kartlar bu listeden üretilir |

Prerender edilecek yolların listesi de `vite.config.ts` içinde aynı config'ten
ve `content/blog` klasöründen türetilir — elle tutulan ikinci bir liste yok.

## Palet

Renkler logodan alındı: işaretin grisi ve şeridin şeftalisi. Hepsi
`site.config.ts` → `colors` içinde; `__root.tsx` bunları `:root` değişkenlerine
basar, `styles.css`'teki aynı değerler yalnızca yedektir.

| Token | Değer | Nerede | Krem zeminde |
| --- | --- | --- | --- |
| `primary` | `#5F6060` | buton zemini, çizgiler, odak halkası | 5.79:1 |
| `primaryHover` | `#4A4B4B` | buton hover'ı (açılmaz, koyulaşır) | — |
| `accent` | `#FABB98` | **yalnız dekor**: panel çerçevesi, doku | 1.53:1 |
| `accentStrong` | `#9A5A37` | şeftali tonunda **metin**: vurgu başlığı, üst etiket | 4.96:1 |
| `accentSoft` | `#FDF1EA` | yumuşak yüzey, outline/ghost hover zemini | — |
| `mutedForeground` | `#6A6762` | ikincil metin | 5.17:1 |

> **Kural:** `accent` (#FABB98) asla metin rengi değildir — krem zeminde 1.53:1.
> Şeftali tonunda yazı gerekiyorsa `accentStrong` kullanılır. `accent` bir
> zemin olarak kullanılırsa üstüne gelen yazı `--accent-foreground` ile koyu
> nötre düşer, beyaza değil.

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
npm run brand:assets -- http://localhost:8080
```

Kaynak sayfa: `/og-card` (robots.txt üzerinden taramaya kapatılmıştır) — krem
zemin üstünde ortalanmış gerçek logo. Favicon ve uygulama ikonları
`armagan-ikon-512.png`'den üretildi; `brand:assets` onları **ezmez**.

## Görseller

İki kaynak var: **işletmenin kendi tanıtım videosundan alınan kareler**
(WebP 720/1080, büyütme yok) ve kalan birkaç **Unsplash stok görseli**
(WebP 800/1600). Tam liste: [docs/IMAGE-CREDITS.md](docs/IMAGE-CREDITS.md).

Stok görsellerin alt metni salonun kendi işi gibi sunulmaz; footer'da
"Hizmet sayfalarındaki görseller temsilidir" notu bulunur. Config'te bir
hizmetin `image` alanı değiştirildiği anda sayfa yeni görsele geçer; `image`
yoksa markalı panel gösterilir.

## Kontroller

```sh
npm run check:ga-izi     # şablonun türetildiği eski siteye ait iz kalmadığını doğrular
npm run check:duplicate  # 8+ kelimelik birebir metin tekrarı var mı
npm run lint
```

## Açık kalan TODO'lar

**Fotoğraf:** dış cephe, salon içi, kurucu portresi, solaryum, EMS, tırnak,
manikür-pedikür, cilt bakımı, kafa ve meridyen masajı — hepsi **işletmenin kendi
tanıtım videosundan** alındı (29 Eki 2026). Kirpik lifting, ipek kirpik, kaş
laminasyonu, saç spa, kuaför ve epilasyon sayfalarında hâlâ stok görsel var;
gerçek kare geldiğinde `site.config.ts` içindeki `image` alanını değiştirmek
yeterli.

**Config:** `geo` (koordinatlar), `mapEmbedUrl` (harita gömme adresi).

**Kurucu biyografisi:** sayfada yalnızca ad ve unvan var — doğrulanmamış bilgi
yazılmadı. Bilgi teyit edilince hem biyografi eklenebilir hem de blog
yazılarındaki JSON-LD `author` alanı Organization yerine Person olur.

**Hijyen süreci teyidi:** metinlerde yalnızca "hijyene özen gösteriyoruz"
deniyor. Alet temizliği, sterilizasyon ve tek kullanımlık malzeme gibi süreç
ayrıntıları, salon doğrulayana kadar bilinçli olarak yazılmadı.
