# Armağan Meridyen Güzellik

Sarıyer / Kilyos Caddesi'ndeki güzellik salonunun tanıtım sitesi.

- **Çatı:** TanStack Start (React 19 + Vite + Tailwind v4)
- **Veritabanı yok.** Blog ve yönetim paneli kapalı; site tamamen statik içerikten üretilir.
- **Üçüncü taraf istek yok.** Ölçümleme kimlikleri boş olduğu sürece sayfa hiçbir dış sunucuya istek atmaz; yazı tipleri sistem fontlarıdır.

## Geliştirme

```sh
npm install --legacy-peer-deps
npm run dev            # http://localhost:3000
```

Üretim derlemesi ve yerel önizleme:

```sh
NITRO_PRESET=node-server npm run build
node .output/server/index.mjs
```

## Her şeyin kaynağı: tek config

Marka verisinin tamamı `src/config/site.config.ts` içinde. Kodda sabit yazılmış
isim, adres, telefon, renk veya ölçüm kimliği yok.

| Alan | Ne işe yarar |
| --- | --- |
| `domain` | canonical, sitemap, OG ve JSON-LD adresleri |
| `colors` | `:root` değişkenleri ve OG görseli |
| `address`, `phone`, `whatsapp`, `hours` | görünür metinler **ve** BeautySalon şeması (NAP birebir aynı) |
| `analytics.*`, `widget.trairxTenantKey` | boşken ilgili etiket/betik **hiç render edilmez** |
| `features.blog` | `false` — blog rotası, menü bağlantısı ve sitemap kaydı üretilmez |
| `services[]` | hizmet sayfaları, menü, sitemap ve kartlar bu listeden üretilir; `enabled:false` olan hizmetin sayfası yoktur |

## Sırlar

Gerçek değerler yalnızca `.env` dosyasında tutulur; depoya girmez. Örnek için
`.env.example` dosyasına bakın. Site veritabanı kullanmadığı için `DATABASE_URL`
benzeri bir değişken bilinçli olarak yoktur.

## Marka görselleri

OG görseli ve simge, config'teki renk ve isimden üretilir:

```sh
npm run dev
npm run brand:assets -- http://localhost:3000
```

Kaynak sayfa: `/og-card` (robots.txt üzerinden taramaya kapatılmıştır).
Favicon `/favicon.svg` adresinde config'ten anlık üretilir.

## Kontroller

```sh
npm run check:ga-izi     # şablonun türetildiği eski siteye ait iz kalmadığını doğrular
npm run check:duplicate  # 8+ kelimelik birebir metin tekrarı var mı
npm run lint
```

## Açık kalan TODO'lar

`src/config/site.config.ts` içinde doldurulmayı bekleyenler: `geo`
(koordinatlar), `mapEmbedUrl` (harita gömme adresi), `logo.src` (görsel logo) ve
`colors` (şu an nötr bir başlangıç paleti).

Hakkımızda sayfasındaki kurucu biyografisinde `[YIL]` ve `[DENEYİM]` yer
tutucuları bilgi teyit edilince doldurulacak.

Ayrıca gerçek fotoğraflar — sitedeki her yer tutucu, oraya hangi fotoğrafın
geleceğini yazar.
