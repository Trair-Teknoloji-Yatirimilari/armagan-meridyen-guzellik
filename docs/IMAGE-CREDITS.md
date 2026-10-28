# Görsel kaynakları

Hizmet sayfalarındaki fotoğraflar [Unsplash](https://unsplash.com) üzerinden
indirilen stok görsellerdir. Unsplash Lisansı ticari kullanıma izin verir ve
atıf zorunlu değildir; yine de kayıt olarak burada tutuluyor.

**Bu görseller salonun kendi çalışması değildir.** Sitede hiçbir yerde
"bizim işimiz" ya da öncesi–sonrası olarak sunulmaz; footer'da
"Hizmet sayfalarındaki görseller temsilidir" notu bulunur.

Her dosya 1600x900 ve 800x450 WebP olarak üretildi; EXIF verisi temizlendi.

| Dosya | Unsplash ID | Fotoğraf sayfası | Fotoğrafçı | İndirme tarihi | Kullanıldığı sayfa |
| --- | --- | --- | --- | --- | --- |
| `protez-tirnak-sariyer` | `r-Ej0NQmFlQ` | https://unsplash.com/photos/r-Ej0NQmFlQ | Designecologist | 2026-10-28 | /hizmetler/tirnak-bakimi-protez-tirnak (ana görsel) |
| `tirnak-uygulamasi-sariyer` | `gb6gtiTZKB8` | https://unsplash.com/photos/gb6gtiTZKB8 | Giorgio Trovato | 2026-10-28 | /hizmetler/tirnak-bakimi-protez-tirnak (ikinci görsel) |
| `manikur-sariyer` | `SyCC0GQi5S4` | https://unsplash.com/photos/SyCC0GQi5S4 | Chelson Tamares | 2026-10-28 | /hizmetler/manikur-pedikur (ana görsel) |
| `pedikur-sariyer` | `WBuwkanEPiM` | https://unsplash.com/photos/WBuwkanEPiM | Konstantin Shmatov | 2026-10-28 | /hizmetler/manikur-pedikur (ikinci görsel) |
| `kirpik-lifting-sariyer` | `kA74I2XMiSQ` | https://unsplash.com/photos/kA74I2XMiSQ | Victor Sirbu | 2026-10-28 | /hizmetler/ipek-kirpik — **konu nedeniyle takas edildi** |
| `ipek-kirpik-sariyer` | `-9UpJoyA3Ag` | https://unsplash.com/photos/-9UpJoyA3Ag | Ahmed Rajgoli Shoaib Shakeel | 2026-10-28 | /hizmetler/kirpik-lifting — **konu nedeniyle takas edildi** |
| `kas-laminasyonu-sariyer` | `x0r5YvOJFCg` | https://unsplash.com/photos/x0r5YvOJFCg | Sum Sum | 2026-10-28 | /hizmetler/kas-laminasyonu |
| `microblading-sariyer` | `U88HKDGynE4` | https://unsplash.com/photos/U88HKDGynE4 | Nastiia Nikitenko | 2026-10-28 | **kullanılmıyor** — konu uyuşmuyor |
| `kalici-makyaj-sariyer` | `vKKO2MXBVOk` | https://unsplash.com/photos/vKKO2MXBVOk | Judy Beth Morris | 2026-10-28 | /hizmetler/kalici-makyaj |
| `cilt-bakimi-sariyer` | `g-m8EDc4X6Q` | https://unsplash.com/photos/g-m8EDc4X6Q | Engin Akyurt | 2026-10-28 | /hizmetler/cilt-bakimi |
| `kafa-masaji-sariyer` | `SwTXaZDkKRU` | https://unsplash.com/photos/SwTXaZDkKRU | Juan Miranda Ferris | 2026-10-28 | /hizmetler/kafa-masaji + ana sayfa imza bölümü |
| `meridyen-masaji-sariyer` | `YeekhTXpTgY` | https://unsplash.com/photos/YeekhTXpTgY | Charanjeet Dhiman | 2026-10-28 | /hizmetler/meridyen-masaji + ana sayfa imza bölümü |
| `epilasyon-sariyer` | `cZQetI50v7Q` | https://unsplash.com/photos/cZQetI50v7Q | Sum Sum | 2026-10-28 | **kullanılmıyor** — konu uyuşmuyor |
| `ems-sariyer` | `FIkfmwPTKqM` | https://unsplash.com/photos/FIkfmwPTKqM | Patient Perfect | 2026-10-28 | **kullanılmıyor** — konu uyuşmuyor |
| `sac-spa-sariyer` | `Md_DhaFsnCQ` | https://unsplash.com/photos/Md_DhaFsnCQ | Lindsay Cash | 2026-10-28 | /hizmetler/sac-spa |
| `solaryum-sariyer` | `pSJYz2gmaqw` | https://unsplash.com/photos/pSJYz2gmaqw | Samuel Mcgarrigle | 2026-10-28 | /hizmetler/solaryum |

## Konu uyuşmazlıkları

Dosyalar indirildiği adla duruyor; eşleşme yalnızca `src/config/site.config.ts`
içinde düzeltildi ve orada yorumla açıklandı.

- **kirpik-lifting-sariyer ↔ ipek-kirpik-sariyer (takas):** `kirpik-lifting-sariyer`
  cımbızla kirpiğe tel eklenmesini gösteriyor — bu ipek kirpik uygulaması.
  `ipek-kirpik-sariyer` ise doğal kirpiğin makro çekimi. Kirpik lifting sayfası
  "yeni kirpik eklenmiyor" dediği için görseller yer değiştirdi.
- **microblading-sariyer (kullanılmıyor):** görsel microblading değil, kirpik
  uygulaması gösteriyor. Sayfa yer tutucuda bırakıldı.
- **ems-sariyer (kullanılmıyor):** görsel EMS değil, karın bölgesine uygulanan
  başka bir vücut cihazı başlığı gösteriyor. Sayfa yer tutucuda bırakıldı.
- **epilasyon-sariyer (kullanılmıyor):** görsel lazer epilasyon cihazı gösteriyor.
  Lazer epilasyon teyit edilmiş bir hizmet olmadığı için kullanılmadı.
- **solaryum-sariyer (kullanılıyor, not):** kabin değil, "SOLARIUM / SUNBED" neon
  tabelası. Konu doğru ama uygulama görseli değil.
- **kas-laminasyonu-sariyer (kullanılıyor, not):** kaş bölgesinde bir uygulama
  gösteriyor; laminasyon mu başka bir kaş işlemi mi görselden kesin anlaşılmıyor.

Doğru görsel bulunduğunda config'teki yorum satırını açmak yeterli.
