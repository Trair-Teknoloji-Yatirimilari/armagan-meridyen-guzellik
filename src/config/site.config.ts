/**
 * ARMAĞAN MERİDYEN GÜZELLİK — TEK MERKEZİ YAPILANDIRMA
 *
 * Sitedeki bütün marka verisi (isim, adres, telefon, saatler, renkler,
 * ölçümleme anahtarları, hizmet listesi) yalnızca bu dosyada tutulur.
 * Bileşenlerde ve sayfalarda sabit yazılmış marka değeri YOKTUR.
 *
 * TODO ile işaretli alanlar henüz teyit edilmedi.
 */

export type ServiceFaq = { q: string; a: string };

export type ServiceBlock =
  { t: "h2"; text: string } | { t: "p"; text: string } | { t: "ul"; items: string[] };

export type ServiceImageRef = {
  /** public altındaki yol, boy eki olmadan — "-<genişlik>.webp" eklenir */
  base: string;
  alt: string;
  /** Üretilmiş genişlikler (srcset bundan kurulur). Kaynaktan büyütme yapılmaz. */
  widths: number[];
  /** En büyük sürümün gerçek piksel ölçüsü — düzen kaymasını (CLS) önler */
  width: number;
  height: number;
  /** Kırpma odağı, örn. kare görsel 16:9 kutuda gösterilirken */
  objectPosition?: string;
};

export type Service = {
  /** URL parçası: /hizmetler/<slug> */
  slug: string;
  /** Menü ve kart etiketi */
  navLabel: string;
  /** H1'de kullanılan hizmet adı — başlık "<Hizmet> Sarıyer" olarak kurulur */
  name: string;
  /** false ise sayfa üretilmez, menüde ve sitemap'te görünmez */
  enabled: boolean;
  /** İmza uygulaması: ana sayfada ayrı bölümde öne çıkar */
  signature?: boolean;
  /** meta description — 155 karakteri geçmemeli */
  description: string;
  /** Kart ve hero altı kısa tanım */
  summary: string;
  /** Kartlarda ve sayfa başında kullanılan temsili görsel (stok). null ise yer tutucu. */
  image?: ServiceImageRef | null;
  /** Sayfa içinde ikinci bir temsili görsel. */
  secondaryImage?: ServiceImageRef | null;
  /** Sayfa gövdesi: tanım, uygulama süreci, kimler için */
  blocks: ServiceBlock[];
  /** Sayfa sonundaki sorumlu kullanım / uygunluk notu */
  note?: string;
  faqs: ServiceFaq[];
};

export const siteConfig = {
  /* ---------------- Kimlik ---------------- */
  name: "Armağan Meridyen Güzellik",
  /** KVKK aydınlatma metninde geçecek ticari unvan */
  legalName: "Armağan Meridyen Güzellik",
  /** Başlıklarda yer kalmadığında kullanılan kısa marka adı */
  shortName: "Armağan Meridyen",
  /** Hero üstündeki küçük konum etiketi ve OG kartı — logoda KULLANILMAZ */
  tagline: "Sarıyer · Kilyos Caddesi",

  /**
   * Sitenin kanonik kök adresi — protokol dahil, sonunda eğik çizgi olmadan.
   * Canonical, og:url, og:image, JSON-LD ve sitemap bu değerden üretilir.
   */
  domain: "https://www.armaganmeridyenguzellik.com",

  /**
   * Logo. Henüz görsel logo yok; metin logo kullanılıyor.
   * src dolduğunda SiteNav ve footer otomatik olarak görsele geçer.
   */
  logo: {
    type: "image" as "text" | "image",
    /** Metin logonun üst satırı — favicon baş harfleri de buradan türer */
    primaryLine: "Armağan Meridyen",
    /** Metin logonun alt satırı (iki yanında dekoratif çizgi) */
    secondaryLine: "Güzellik",
    /** Gerçek logo — saydam PNG'den üretilmiş WebP, 1x ve 2x */
    src: "/logo/armagan-logo-240.webp" as string | null,
    src2x: "/logo/armagan-logo-480.webp",
    /** Gerçek piksel ölçüsü (saydam kenar boşluğu kırpılmış hâli) */
    width: 240,
    height: 221,
    alt: "Armağan Meridyen Güzellik logosu",
  },

  /* ---------------- Renkler ----------------
   * Nötr bir başlangıç paleti. Marka rengi belirlenince yalnızca burası
   * değişir; :root değişkenleri __root.tsx tarafından buradan basılır,
   * OG görseli de aynı değerlerden üretilir.
   * TODO: marka paleti netleşince güncellenecek.
   */
  colors: {
    background: "oklch(0.975 0.004 85)",
    foreground: "oklch(0.26 0.012 75)",
    card: "oklch(0.995 0.002 85)",
    muted: "oklch(0.94 0.006 85)",
    mutedForeground: "oklch(0.50 0.012 75)",
    border: "oklch(0.88 0.008 85 / 75%)",
    primary: "oklch(0.52 0.028 70)",
    primaryForeground: "oklch(0.985 0.003 85)",
    accent: "oklch(0.66 0.035 70)",
    /** Markalı panellerin çerçeve ve doku rengi */
    gold: "oklch(0.74 0.06 82)",
    /** Başlık vurgularında kullanılan degrade */
    gradientFrom: "oklch(0.58 0.032 72)",
    gradientTo: "oklch(0.40 0.024 68)",
  },

  /* ---------------- Adres ---------------- */
  address: {
    streetAddress: "Maden Mah. Kilyos Cd. No:151/A",
    addressLocality: "Sarıyer",
    addressRegion: "İstanbul",
    postalCode: "34450",
    addressCountry: "TR",
  },

  /** Harita gömme adresi. null ise haritanın yerine yer tutucu basılır. */
  mapEmbedUrl: null as string | null,

  /** Enlem/boylam. null ise JSON-LD'ye geo eklenmez. TODO: ölçülecek. */
  geo: null as { latitude: number; longitude: number } | null,

  /* ---------------- İletişim ---------------- */
  phone: {
    /** Ekranda görünen biçim */
    display: "+90 532 470 09 84",
    /** tel: bağlantısı */
    href: "tel:+905324700984",
  },

  email: "info@armaganmeridyenguzellik.com",

  whatsapp: {
    /** wa.me numarası — başında + ve boşluk yok */
    number: "905324700984",
    /** Butonlara tıklayınca açılan hazır mesaj */
    defaultMessage: "Merhaba, bilgi ve randevu almak istiyorum.",
  },

  /** Instagram profil adresi. Boşsa bağlantı render edilmez. */
  instagram: "https://www.instagram.com/armaganmeridyenguzellik/",

  /** Google işletme yorumu bırakma bağlantısı. Boşsa bağlantı render edilmez. */
  reviewUrl: "https://g.page/r/CZAviIbw_eZoEBM/review",

  /* ---------------- Çalışma saatleri ----------------
   * Hem görünür metin hem JSON-LD openingHoursSpecification buradan üretilir;
   * ikisi birbirinden ayrılamaz. Salon haftanın yedi günü açık.
   */
  hours: {
    opens: "10:00",
    closes: "19:00",
    /** Açık günler (schema.org gün adları) */
    openDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    /** Ekranda görünen satırlar */
    displayLines: ["Her gün 10:00–19:00"],
    /** Kısa, cümle içinde kullanılan biçim */
    displayShort: "Her gün 10:00–19:00",
  },

  /* ---------------- Kurucu ---------------- */
  founder: {
    name: "Armağan Baysal",
    jobTitle: "Kurucu",
    /** Portre — 4:5 kırpım, WebP 480/800 */
    image: "/images/kurucu/armagan-baysal-800.webp",
  },

  /* ---------------- Footer künyesi ---------------- */
  partner: {
    name: "Wellness All Club",
  },
  credit: {
    name: "TrairX Technology",
    url: "https://www.trairx.com",
  },

  /* ---------------- Ölçümleme ve widget'lar ----------------
   * HEPSİ BOŞ. Boş olduğu sürece ilgili etiket veya betik HİÇ render edilmez;
   * sayfaya tek bir üçüncü taraf isteği gitmez.
   */
  analytics: {
    /** Google Search Console doğrulama meta içeriği */
    searchConsoleToken: "",
    /** GA4 ölçüm kimliği */
    ga4Id: "",
    /** Google Tag Manager kapsayıcı kimliği */
    gtmId: "",
    /**
     * Meta Pixel kimliği.
     * Pixel yükleyici betiği depoda BİLİNÇLİ olarak yok (bkz. Analytics.tsx).
     * İhtiyaç duyulursa Tag Manager üzerinden, çerez rızası alındıktan sonra
     * eklenmelidir.
     */
    metaPixelId: "",
  },

  /** Canlı destek widget'ı. Anahtar boşken widget yüklenmez. */
  widget: {
    /** WellnessAllClub canlı destek kiracı anahtarı */
    trairxTenantKey: "1fc74e56-47e8-491c-bb2c-61c2ad30070a",
    scriptSrc: "https://www.wellnessallclub.com/widget.js",
    title: "Canlı Destek",
    /** KVKK metnindeki veri sorumlusu adı widget'a bu alandan geçer */
    business: "Armağan Meridyen Güzellik",
    /** Sağ alttaki sabit WhatsApp butonuyla çakışmasın diye balon yukarı alınır */
    offset: "88",
    color: "#586060",
  },

  /* ---------------- Özellik bayrakları ---------------- */
  features: {
    /** Blog modülü kapalı: menüde, sitemap'te ve rotalarda yok, veritabanı bağlantısı yok. */
    blog: false,
    /** Galeri henüz yok. */
    gallery: false,
  },

  /** İletişim formunun alıcısı yalnızca .env'den okunur; boşsa form WhatsApp'a yönlenir. */
  contactFormRecipientEnvVar: "CONTACT_FORM_TO",
} as const;

/* ---------------- Hizmetler ----------------
 * Hizmet sayfaları bu listeden otomatik üretilir (bkz. src/routes/hizmetler_.$slug.tsx).
 * enabled:false olan hizmet için sayfa, menü girdisi ve sitemap kaydı oluşmaz.
 */
export const services: Service[] = [
  {
    slug: "tirnak-bakimi-protez-tirnak",
    navLabel: "Tırnak Bakımı & Protez Tırnak",
    name: "Tırnak Bakımı & Protez Tırnak",
    enabled: true,
    description:
      "Sarıyer Kilyos Caddesi'nde tırnak bakımı ve protez tırnak. Form, boy ve dolum planı için WhatsApp'tan ön görüşme yapabilirsiniz.",
    summary:
      "Tırnağın kendi yapısına bakıp, günlük hayatınıza uyan bir boy ve forma birlikte karar veriyoruz.",
    image: {
      base: "/images/hizmetler/tirnak-uygulamasi-gercek",
      alt: "Armağan Meridyen Güzellik'te tırnak uygulaması",
      widths: [720, 1080],
      width: 1080,
      height: 607,
    },

    blocks: [
      {
        t: "p",
        text: "Tırnak bakımında işe tırnağınızın o günkü hâlini görmekle başlıyoruz. Kendi tırnağınızın kalınlığı, uzama yönü ve ellerinizi gün içinde nasıl kullandığınız; seçilecek boyu da, formu da belirliyor. Klasik bakım da protez uygulaması da aynı hazırlık adımlarıyla ilerliyor.",
      },
      { t: "h2", text: "Uygulama nasıl ilerliyor?" },
      {
        t: "ul",
        items: [
          "<strong>Ön görüşme.</strong> Nasıl bir boy, hangi form ve hangi renk istediğinizi konuşuyoruz.",
          "<strong>Hazırlık.</strong> Hijyene özen gösterilen, hazırlanmış bir alanda çalışıyoruz; tırnak yüzeyi ve etrafı uygulamaya hazırlanıyor.",
          "<strong>Şekillendirme.</strong> Protezde seçilen forma göre uzatma yapılıyor, kalınlık tırnak boyunca dengeleniyor.",
          "<strong>Renk ve kapanış.</strong> Renk ya da şeffaf kaplama uygulanıyor, kenarlar temizleniyor, el ve tırnak çevresi nemlendiriliyor.",
          "<strong>Dolum planı.</strong> Tırnağınızın uzama hızına göre bir sonraki randevu için aralık öneriyoruz.",
        ],
      },
      { t: "h2", text: "Kimler için uygun?" },
      {
        t: "ul",
        items: [
          "Kendi tırnağı çabuk kırıldığı için boy tutturamayanlar",
          "Özel bir gün öncesi derli toplu bir el görünümü isteyenler",
          "Klavye ve ev işiyle çok vakit geçirdiği için kısa ve sağlam bir form arayanlar",
          "Uzun süredir oje kullanmayıp sade bir bakımla başlamak isteyenler",
        ],
      },
    ],
    faqs: [
      {
        q: "Randevu ne kadar sürüyor?",
        a: "Klasik bakım, protez uygulamasına göre daha kısa sürüyor. Protezde ilk randevu daha uzun, çünkü boy ve form birlikte kararlaştırılıyor. Size ayıracağımız süreyi randevuyu verirken söylüyoruz; böylece gününüzü ona göre planlayabiliyorsunuz. Aklınızdaki uygulamayı WhatsApp'tan yazarsanız süreyi önceden paylaşırız. Süre konusunda sürpriz yaşamamanız bizim için de önemli.",
      },
      {
        q: "Dolum için ne sıklıkla gelmeliyim?",
        a: "Tırnağın uzama hızı kişiden kişiye değişiyor, bu yüzden herkes için geçerli tek bir aralık söylemiyoruz. Uygulamanın sonunda sizin tırnağınıza bakarak bir aralık öneriyoruz. Arada emin olamazsanız tırnağınızın fotoğrafını WhatsApp'tan gönderin, gelmeden önce birlikte değerlendirelim. Erken gelmeniz gerekiyorsa bunu da açıkça söylüyoruz, bekletmeden randevu ayarlıyoruz.",
      },
      {
        q: "Kendi tırnağım çok kısa, yine de yapılabilir mi?",
        a: "Çoğu durumda yapılabiliyor, ama karar vermeden önce tırnağınızı yerinde görmek istiyoruz. Salona uğradığınızda birkaç dakikada bakıp uygun olup olmadığını açıkça söylüyoruz. Uygun değilse zorlamıyor, önce tırnağın toparlanması için ne yapılabileceğini konuşuyoruz. Bu kısa değerlendirme için randevu almanıza gerek yok, gün içinde uğramanız yeterli.",
      },
      {
        q: "Uygulama sonrası nelere dikkat etmeliyim?",
        a: "İlk saatlerde tırnağı darbeden ve uzun süreli sıcak sudan korumanızı öneriyoruz. Ev işlerinde eldiven kullanmak kenarların daha uzun süre düzgün kalmasını sağlıyor. Randevu sonunda size özel bakım notlarını tek tek anlatıyor, sonrasında aklınıza takılanı WhatsApp'tan sorabiliyorsunuz. Gerekirse bu notları WhatsApp'tan yazılı olarak da gönderiyoruz.",
      },
    ],
  },
  {
    slug: "manikur-pedikur",
    navLabel: "Manikür & Pedikür",
    name: "Manikür & Pedikür",
    enabled: true,
    description:
      "Sarıyer'de manikür ve pedikür randevusu. El ve ayak bakımı, tırnak eti düzeni ve nemlendirme için WhatsApp'tan yazabilirsiniz.",
    summary: "El ve ayağın bakımını acele etmeden yapan, klasik ve sade bir randevu.",
    image: {
      base: "/images/hizmetler/manikur-pedikur-gercek",
      alt: "Armağan Meridyen Güzellik'te manikür ve pedikür istasyonu",
      widths: [720, 1080],
      width: 1080,
      height: 607,
    },

    blocks: [
      {
        t: "p",
        text: "Manikür ve pedikür, çoğu zaman en çok ihmal edilen bakım oluyor. Oysa tırnak etinin düzenli olması ve ayak derisinin yumuşaması, günlük konforu doğrudan etkiliyor. Randevuda elinizin ve ayağınızın o günkü ihtiyacına göre ilerliyoruz.",
      },
      { t: "h2", text: "Uygulama nasıl ilerliyor?" },
      {
        t: "ul",
        items: [
          "<strong>Yumuşatma.</strong> El ya da ayak, bakıma hazırlanacak şekilde yumuşatılıyor.",
          "<strong>Tırnak düzeni.</strong> Boy ve form istediğiniz şekilde ayarlanıyor, tırnak eti düzenleniyor.",
          "<strong>Deri bakımı.</strong> Pedikürde sertleşmiş bölgeler, rahatsızlık vermeyecek şekilde inceltiliyor.",
          "<strong>Nemlendirme.</strong> Bakım, el ya da ayak masajı ve nemlendirme ile tamamlanıyor.",
          "<strong>İsteğe bağlı renk.</strong> Oje ya da şeffaf kaplama isterseniz kapanışta uygulanıyor.",
        ],
      },
      { t: "h2", text: "Kimler için uygun?" },
      {
        t: "ul",
        items: [
          "Ayakta çok vakit geçirdiği için ayak derisi sertleşenler",
          "Tırnak eti düzensizliğinden rahatsız olanlar",
          "Açık ayakkabı sezonuna hazırlık yapmak isteyenler",
          "Ojesiz, yalnızca bakım isteyenler",
        ],
      },
    ],
    faqs: [
      {
        q: "Manikür ve pedikürü aynı randevuda yaptırabilir miyim?",
        a: "Evet, ikisi aynı randevuda yapılabiliyor. Bu durumda size ayrılacak süre doğal olarak uzuyor, bu yüzden randevuyu birlikte planlamamız gerekiyor. WhatsApp'tan ikisini birden istediğinizi yazarsanız o güne yeterli zamanı baştan ayırırız ve beklemeden başlarız. Böylece tek gelişte hem el hem ayak bakımı tamamlanmış oluyor.",
      },
      {
        q: "Hijyen konusunda nasıl çalışıyorsunuz?",
        a: "Hijyene özen gösteriyor, her randevuya hazırlanmış bir alanla başlıyoruz. Bu konuda merak ettiğiniz bir şey varsa randevu sırasında sormaktan çekinmeyin; nasıl çalıştığımızı anlatmaktan memnun oluruz. Soru sormanızı tuhaf karşılamıyoruz, aksine doğru buluyoruz. Salona geldiğinizde çalışma alanını kendiniz de görebilir, dilediğinizi sorabilirsiniz.",
      },
      {
        q: "Oje istemiyorum, yine de gelebilir miyim?",
        a: "Elbette. Randevuların önemli bir kısmı yalnızca bakım için alınıyor: tırnak boyu, tırnak eti düzeni ve nemlendirme. Renk istemediğinizi baştan söylemeniz yeterli, bakımı şeffaf kaplamayla ya da tamamen ürünsüz bitiriyoruz. Bakımın kendisi zaten tırnağın ve derinin düzeni için yapılıyor, renk tamamen isteğe bağlı.",
      },
    ],
  },
  {
    slug: "kirpik-lifting",
    navLabel: "Kirpik Lifting",
    name: "Kirpik Lifting",
    enabled: true,
    description:
      "Sarıyer'de kirpik lifting uygulaması. Kendi kirpiğinizin duruşunu değiştiren işlem için randevu ve bilgi WhatsApp üzerinden alınabilir.",
    summary: "Yeni kirpik eklemeden, kendi kirpiğinizin duruşunu değiştiren sade bir uygulama.",
    image: {
      base: "/images/hizmetler/ipek-kirpik-sariyer",
      alt: "Kirpik lifting uygulaması – örnek görsel",
      widths: [800, 1600],
      width: 1600,
      height: 900,
    },
    blocks: [
      {
        t: "p",
        text: "Kirpik lifting, kendi kirpiklerinizin yukarı doğru kıvrılmasını sağlayan bir uygulama. Yeni kirpik eklenmiyor; var olanın duruşu değişiyor. Sabah aynanın karşısında geçen süreyi kısaltmak isteyenlerin sık tercih ettiği işlerden biri.",
      },
      { t: "h2", text: "Uygulama nasıl ilerliyor?" },
      {
        t: "ul",
        items: [
          "<strong>Göz çevresi hazırlanıyor.</strong> Makyaj kalıntıları temizleniyor, alt kirpikler ayrılıyor.",
          "<strong>Kalıp seçimi.</strong> Kirpik boyunuza uygun kıvrım kalıbı seçiliyor — istediğiniz etkiyi burada birlikte konuşuyoruz.",
          "<strong>Uygulama.</strong> Kirpikler kalıp üzerine tek tek yerleştiriliyor ve belirlenen sürelerde bekletiliyor.",
          "<strong>Bakım ve kapanış.</strong> Son adımda kirpik besleyici uygulanıyor, göz çevresi temizleniyor.",
          "<strong>Sonrası.</strong> İlk saatlerde nelere dikkat etmeniz gerektiğini yazılı olarak da paylaşıyoruz.",
        ],
      },
      { t: "h2", text: "Kimler için uygun?" },
      {
        t: "ul",
        items: [
          "Kirpiği düz uzadığı için maskarayla istediği açıklığı yakalayamayanlar",
          "Takma kirpikle uğraşmak istemeyenler",
          "Gözlük kullandığı için kirpiğinin cama değmesinden rahatsız olanlar",
          "Sade ve bakımlı bir günlük görünüm arayanlar",
        ],
      },
    ],
    faqs: [
      {
        q: "Kendi kirpiğime zarar verir mi?",
        a: "Uygulamada kirpiğe yeni bir ek yapılmıyor, var olan kirpik kalıp üzerinde şekillendiriliyor. Kirpiklerinizin o günkü durumunu randevu başında birlikte değerlendiriyoruz. Kirpik yapınız uygulamaya uygun görünmüyorsa açıkça söylüyor ve yapmıyoruz; bu kararı sizden saklamıyoruz. Kirpiğinizin durumunu uygulamadan sonraki haftalarda da birlikte takip edebiliyoruz.",
      },
      {
        q: "Etkisi ne kadar sürüyor?",
        a: "Kirpiğin kendi yenilenme döngüsüne bağlı olduğu için kişiden kişiye değişiyor; herkese uyan tek bir süre söylemek doğru olmaz. Uygulamadan sonra sizin kirpiğinize bakarak gerçekçi bir aralık söylüyoruz. Bu aralık, bir sonraki randevunuzu planlamak için yeterli oluyor. Bu aralık yaklaşıktır; kesin bir süre garantisi vermiyoruz.",
      },
      {
        q: "Aynı gün makyaj yapabilir miyim?",
        a: "İlk saatlerde göz çevresini olabildiğince rahat bırakmanızı öneriyoruz; su ve ürün teması bu aşamada iyi sonuç vermiyor. Randevu sonunda ilk gün ne yapıp ne yapmamanız gerektiğini tek tek anlatıyoruz. Önemli bir davetiniz varsa randevuyu ona göre öne almanız daha rahat oluyor. Böylece ilk günü rahat geçirmiş olursunuz.",
      },
      {
        q: "Kaş laminasyonuyla aynı randevuda yapılabilir mi?",
        a: "Çoğu zaman mümkün oluyor. İkisini birlikte düşünüyorsanız WhatsApp'tan yazın; aynı güne iki uygulamanın da hakkını verecek süreyi birlikte ayarlayalım. Böylece tek gelişte hem kaş hem kirpik tamamlanmış oluyor ve ikinci bir randevuya gerek kalmıyor. Hangi sırayla yapılacağını da randevu başında birlikte belirliyoruz.",
      },
    ],
  },
  {
    slug: "ipek-kirpik",
    navLabel: "İpek Kirpik",
    name: "İpek Kirpik",
    enabled: true,
    description:
      "Sarıyer Kilyos Caddesi'nde ipek kirpik uygulaması. Yoğunluk ve boy tercihini konuşmak için WhatsApp'tan ön görüşme yapabilirsiniz.",
    summary: "Kirpiklere tek tek eklenen tellerle, istediğiniz yoğunlukta bir bakış.",
    image: {
      base: "/images/hizmetler/kirpik-lifting-sariyer",
      alt: "İpek kirpik uygulaması – örnek görsel",
      widths: [800, 1600],
      width: 1600,
      height: 900,
    },
    blocks: [
      {
        t: "p",
        text: "İpek kirpikte teller, kendi kirpiklerinize tek tek ekleniyor. Ne kadar yoğun bir görünüm istediğiniz tamamen size bağlı: günlük hayatta fark edilmeyecek kadar sade de olabilir, daha belirgin de. Bu tercihi uygulamaya başlamadan önce birlikte netleştiriyoruz.",
      },
      { t: "h2", text: "Uygulama nasıl ilerliyor?" },
      {
        t: "ul",
        items: [
          "<strong>Tercih konuşması.</strong> İstediğiniz yoğunluk ve boy, göz şeklinize göre birlikte seçiliyor.",
          "<strong>Hazırlık.</strong> Göz çevresi temizleniyor, alt kirpikler bantla ayrılıyor.",
          "<strong>Uygulama.</strong> Teller, kendi kirpiklerinize tek tek yerleştiriliyor.",
          "<strong>Kontrol.</strong> Simetri ve dağılım kontrol ediliyor, gerekirse tamamlanıyor.",
          "<strong>Dolum planı.</strong> Kirpikler doğal döngüsüyle döküldükçe yapılacak dolum için aralık öneriliyor.",
        ],
      },
      { t: "h2", text: "Kimler için uygun?" },
      {
        t: "ul",
        items: [
          "Maskara kullanmayı bırakmak isteyenler",
          "Özel bir gün öncesi daha belirgin bir bakış isteyenler",
          "Kendi kirpiği seyrek göründüğü için yoğunluk arayanlar",
          "Günlük hazırlık süresini kısaltmak isteyenler",
        ],
      },
    ],
    faqs: [
      {
        q: "Uygulama sırasında rahatsızlık duyar mıyım?",
        a: "Uygulama boyunca gözleriniz kapalı şekilde uzanıyorsunuz ve işlem kirpik tellerine yapılıyor. Rahatsızlık hissederseniz söylemeniz yeterli, ara veriyoruz. Göz çevrenizde hassasiyet ya da bilinen bir alerjiniz varsa randevu başında paylaşın; buna göre nasıl ilerleyeceğimize birlikte karar verelim. Konforunuz bizim için uygulamanın hızından daha önemli.",
      },
      {
        q: "Ne sıklıkla dolum gerekiyor?",
        a: "Kirpikler kendi döngüsünde döküldüğü için dolum ihtiyacı kişiden kişiye değişiyor. Uygulamanın ardından sizin kirpik yapınıza göre bir aralık öneriyoruz. Aradan zaman geçtiyse ve emin değilseniz fotoğraf gönderin; dolum mu yoksa yeni uygulama mı gerektiğini önceden söyleyelim. Dolum zamanını geçirirseniz yeni uygulama gerekebilir; bunu baştan söylüyoruz.",
      },
      {
        q: "İpek kirpik mi, kirpik lifting mi bana uygun?",
        a: "İkisi farklı sonuç veriyor: lifting kendi kirpiğinizin duruşunu değiştiriyor, ipek kirpik ise yoğunluk ekliyor. Hangisinin size uyacağına kirpik yapınıza ve istediğiniz görünüme bakarak birlikte karar veriyoruz. Kararsızsanız WhatsApp'tan yazın, ikisinin farkını örneklerle anlatalım. Hangisini seçerseniz seçin, uygulamaya başlamadan önce beklentinizi birlikte netleştiriyoruz.",
      },
      {
        q: "Günlük bakımı nasıl olmalı?",
        a: "Kirpikleri ovalamamak ve yağ içeriği yüksek göz temizleyicilerinden kaçınmak genel öneri. Tarakla nazikçe taramak dağınık görünmesini engelliyor. Randevu sonunda size yazılı bir bakım notu veriyoruz; uygulanması kolay, kısa bir liste olmasına özen gösteriyoruz. Bakım adımlarını uygulamak zorunda hissetmeyin; sorularınızı istediğiniz zaman sorabilirsiniz.",
      },
    ],
  },
  {
    slug: "kas-laminasyonu",
    navLabel: "Kaş Laminasyonu",
    name: "Kaş Laminasyonu",
    enabled: true,
    description:
      "Sarıyer Kilyos Caddesi'nde kaş laminasyonu. Kaş kıllarının yönünü toparlayan uygulama için randevu WhatsApp'tan alınabilir.",
    summary: "Dağınık uzayan kaş kıllarını tek yöne toplayan, dolgun bir görünüm veren uygulama.",
    image: {
      base: "/images/hizmetler/kas-laminasyonu-sariyer",
      alt: "Kaş laminasyonu uygulaması – örnek görsel",
      widths: [800, 1600],
      width: 1600,
      height: 900,
    },
    blocks: [
      {
        t: "p",
        text: "Kaş laminasyonu, farklı yönlere uzayan kaş kıllarını tek bir yönde toparlıyor. Kaşın kendi kıllarıyla çalışıldığı için sonuç doğal duruyor ve sabah kaş fırçasıyla uğraşma ihtiyacı azalıyor.",
      },
      { t: "h2", text: "Uygulama nasıl ilerliyor?" },
      {
        t: "ul",
        items: [
          "<strong>Kaş okuması.</strong> Kaşınızın doğal yönünü, boşlukları ve yüz hatlarınıza göre istediğiniz formu konuşuyoruz.",
          "<strong>Temizlik.</strong> Kaş ve çevresi uygulamaya hazırlanıyor.",
          "<strong>Yönlendirme.</strong> Kıllar belirlenen forma göre yerleştiriliyor ve ürün belirlenen sürelerde bekletiliyor.",
          "<strong>Şekil ve bakım.</strong> Gerekirse alt-üst hat düzenleniyor, kapanışta kaş bakım ürünü uygulanıyor.",
        ],
      },
      { t: "h2", text: "Kimler için uygun?" },
      {
        t: "ul",
        items: [
          "Kaş kılları düzensiz uzadığı için her sabah fırçayla uğraşanlar",
          "Kaşı seyrek görünenler ve daha dolgun bir hat isteyenler",
          "Kaş kalemini azaltıp daha sade bir görünüm arayanlar",
          "Uzun süredir kaşına dokunmamış, baştan bir form isteyenler",
        ],
      },
    ],
    faqs: [
      {
        q: "Kaşımın şekli tamamen değişir mi?",
        a: "Amaç kaşı baştan yaratmak değil, var olan kılları toparlayıp daha derli toplu göstermek. Kaşınızda boşluk varsa laminasyon bunu tek başına kapatmaz. Hangi formun sizin kaşınızda gerçekçi olduğunu uygulamaya başlamadan önce açıkça konuşuyor, abartılı bir sonuç vaat etmiyoruz. Gerçekçi olmayan bir sonuç için sizi ikna etmeye çalışmıyoruz.",
      },
      {
        q: "Ne kadar sürüyor?",
        a: "Uygulama tek randevuda tamamlanıyor. Kaşınızın yoğunluğuna ve istenen forma göre süre biraz değişiyor; randevuyu verirken size ayıracağımız zamanı söylüyoruz. Aynı gün başka bir uygulama da düşünüyorsanız bunu baştan belirtin, planlamayı ona göre yapalım. Kaşınızda düzeltme gerekiyorsa bunu da aynı randevuda tamamlamaya çalışıyoruz.",
      },
      {
        q: "Sonrasında nelere dikkat etmeliyim?",
        a: "İlk saatlerde kaşı suyla fazla temas ettirmemek ve ovalamamak genel öneri. Sonraki günlerde kaş bakım ürününü düzenli kullanmak, kılların daha yumuşak kalmasına yardımcı oluyor. Randevu sonunda size özel notları tek tek anlatıyoruz ve istediğinizde WhatsApp'tan tekrar paylaşıyoruz. Notları yazılı olarak da paylaşıyoruz, unutma ihtimaliniz kalmasın.",
      },
      {
        q: "Uygunluk için nasıl bilgi alırım?",
        a: "WhatsApp'tan yazmanız yeterli. Kaşınızın fotoğrafını gönderirseniz uygulamanın size uygun olup olmadığını önceden konuşabiliriz. Uygun görünmüyorsa bunu baştan söyler, bunun yerine kaş bakımı için ne yapılabileceğini anlatırız. Randevuyu ondan sonra planlıyoruz. Böylece randevuya gelmeden önce ne bekleyeceğinizi bilmiş olursunuz ve boşa yol yürümezsiniz.",
      },
    ],
  },
  {
    slug: "cilt-bakimi",
    navLabel: "Cilt Bakımı",
    name: "Cilt Bakımı",
    enabled: true,
    description:
      "Sarıyer'de cilt bakımı randevusu. Cildinizi dinleyerek planlanan temizlik ve bakım adımları için WhatsApp'tan yazabilirsiniz.",
    summary: "Cildinize zaman ayırmak: temizlik, nemlendirme ve size uygun bir ev rutini.",
    image: {
      base: "/images/hizmetler/cilt-bakimi-gercek",
      alt: "Armağan Meridyen Güzellik'te cilt bakımı cihazı",
      widths: [720, 1080],
      width: 1080,
      height: 607,
    },

    blocks: [
      {
        t: "p",
        text: "Cilt bakımını tek bir kalıp uygulama olarak görmüyoruz. Kuru bir cilde yapılan bakımla, gün içinde parlayan bir cilde yapılan bakım aynı değil. Randevunun başında cildinizi ve alışkanlıklarınızı konuşuyor, adımları ona göre seçiyoruz.",
      },
      { t: "h2", text: "Randevu nasıl ilerliyor?" },
      {
        t: "ul",
        items: [
          "<strong>Sohbet.</strong> Cildinizin gün içindeki hâlini, kullandığınız ürünleri ve varsa hassasiyetlerinizi dinliyoruz.",
          "<strong>Temizlik.</strong> Yüzey temizliği yapılıyor, cilt bakıma hazırlanıyor.",
          "<strong>Bakım adımları.</strong> Cildinizin o günkü ihtiyacına göre seçilen adımlar sırayla uygulanıyor.",
          "<strong>Nemlendirme ve kapanış.</strong> Bakım nemlendirme ile tamamlanıyor.",
          "<strong>Ev rutini.</strong> Evde sürdürebileceğiniz sade bir sıralama öneriyoruz — uzun listeler yerine uygulanabilir olanı.",
        ],
      },
      { t: "h2", text: "Kimler için uygun?" },
      {
        t: "ul",
        items: [
          "Cilt bakımına yeni başlayan ve nereden başlayacağını bilmeyenler",
          "Gün içinde cildi parlayan ya da gergin hissedenler",
          "Özel bir gün öncesinde cildini dinlendirmek isteyenler",
          "Düzenli bir bakım alışkanlığı kurmak isteyenler",
        ],
      },
    ],
    note: "Burada yapılan bakım kozmetik bir uygulamadır, tıbbi tedavi değildir. Cildinizle ilgili tıbbi bir şüpheniz varsa önce bir hekime danışmanızı öneriyoruz.",
    faqs: [
      {
        q: "Hangi bakımın bana uygun olduğunu nasıl anlarız?",
        a: "Randevunun ilk bölümünde cildinize bakıyor ve günlük alışkanlıklarınızı konuşuyoruz. Adımları bu görüşmeye göre birlikte seçiyoruz. Emin olmadığımız bir şeyi uygulamıyor, cildinizin o gün uygun olmadığını düşünürsek bakımı sadeleştiriyoruz. Kararı sizden gizlemeden, sebebiyle birlikte anlatıyoruz. Bu değerlendirmeyi her randevuda yeniden yapıyoruz, çünkü cilt haftadan haftaya değişebiliyor.",
      },
      {
        q: "Ne sıklıkla gelmeliyim?",
        a: "Bu, cildin ihtiyacına ve evde sürdürdüğünüz rutine göre değişiyor. İlk randevudan sonra size gerçekçi bir aralık öneriyoruz ve bunu zorunlu bir program gibi sunmuyoruz. Aradaki değişimi WhatsApp'tan da konuşabiliyor, gerekirse randevuyu öne ya da geriye alıyoruz. Bütçenize ve zamanınıza uyan bir düzen bulmak bizim için de önemli.",
      },
      {
        q: "Hassas cildim var, yine de gelebilir miyim?",
        a: "Hassasiyetinizi randevu başında söylemeniz yeterli. Adımları buna göre sadeleştiriyor, cildi yormayacak bir sıra izliyoruz. Uygun olmadığını düşündüğümüz bir uygulamayı önermiyoruz. Doktor takibinde olduğunuz bir durum varsa, bakımdan önce hekiminize danışmanızı rica ediyoruz. Hassasiyet bildirmeniz bakımın kalitesini düşürmez, aksine doğru adımları seçmemizi sağlar.",
      },
      {
        q: "Randevu almadan gelebilir miyim?",
        a: "Cilt bakımı için size ayrı bir zaman ayırmamız gerektiğinden randevuyla gelmenizi öneriyoruz. WhatsApp'tan yazarsanız o haftanın uygun saatlerini paylaşırız ve size uyan saati birlikte seçeriz. Böylece geldiğinizde doğrudan başlıyoruz, bekleme ihtimali ortadan kalkıyor. Aynı gün için yer kalmışsa onu da memnuniyetle paylaşıyoruz.",
      },
    ],
  },
  {
    slug: "kafa-masaji",
    navLabel: "Kafa Masajı",
    name: "Kafa Masajı",
    enabled: true,
    signature: true,
    description:
      "Sarıyer Kilyos Caddesi'nde kafa masajı. Saçlı deri ve ense bölgesine uygulanan rahatlatıcı seans için WhatsApp'tan randevu alabilirsiniz.",
    summary: "Saçlı deri, ense ve omuz hattına uygulanan, rahatlamaya yönelik bir seans.",
    image: {
      base: "/images/hizmetler/kafa-masaji-gercek",
      alt: "Armağan Meridyen Güzellik'te kafa masajı (head spa)",
      widths: [720, 1080],
      width: 1080,
      height: 607,
    },

    blocks: [
      {
        t: "p",
        text: "Kafa masajı, salonumuzun imza uygulamalarından biri. Saçlı deri, ense ve omuz hattı boyunca ilerleyen, tamamen rahatlamaya yönelik bir seans. Ekran başında geçen uzun günlerden sonra en çok istenen randevulardan.",
      },
      { t: "h2", text: "Seans nasıl ilerliyor?" },
      {
        t: "ul",
        items: [
          "<strong>Kısa görüşme.</strong> Baskı tercihinizi ve rahatsız olduğunuz bir bölge olup olmadığını konuşuyoruz.",
          "<strong>Yerleşme.</strong> Sırtüstü ya da oturur konumda, rahat edeceğiniz şekilde yerleşiyorsunuz.",
          "<strong>Uygulama.</strong> Saçlı deri, ense ve omuz hattı sırayla çalışılıyor; baskı seans boyunca size göre ayarlanıyor.",
          "<strong>Kapanış.</strong> Seans yavaşlayarak bitiyor; isterseniz birkaç dakika daha dinlenebiliyorsunuz.",
        ],
      },
      {
        t: "p",
        text: 'Aynı gün saçınızla da ilgilenmek isterseniz <a href="/hizmetler/kuafor">kuaför</a> ya da <a href="/hizmetler/sac-spa">saç spa</a> randevusunu arka arkaya planlayabiliyoruz.',
      },
      { t: "h2", text: "Kimler için uygun?" },
      {
        t: "ul",
        items: [
          "Gün boyu ekran başında oturduğu için ense ve omzu yorulanlar",
          "Kendine ayıracak kısa ama sakin bir zaman arayanlar",
          "Saç bakımıyla birlikte rahatlatıcı bir seans isteyenler",
          "Masaj deneyimi olmayan ve hafif bir uygulamayla başlamak isteyenler",
        ],
      },
    ],
    note: "Bu uygulama rahatlama amaçlıdır; tıbbi bir tedavi ya da teşhis yerine geçmez. Bilinen bir rahatsızlığınız varsa randevu öncesinde bize söyleyin.",
    faqs: [
      {
        q: "Saçım yağlanır mı?",
        a: "Seansı ürünlü ya da ürünsüz yapabiliyoruz; tercihinizi baştan sorduğumuz için karar sizde. Ürün kullanılmasını istemezseniz uygulama kuru yapılıyor ve saçınızda kalıntı kalmıyor. Randevu sonrası planınız varsa bunu söyleyin, seansı ona göre planlayalım. Ürünlü seansta da saçınız seans sonunda yıkanabiliyor, bunu birlikte kararlaştırıyoruz.",
      },
      {
        q: "Ne kadar sürüyor?",
        a: "Seans süresini randevuyu verirken paylaşıyoruz; isteğinize göre daha kısa ya da daha uzun planlanabiliyor. İlk kez geliyorsanız daha ölçülü bir süreyle başlamanızı öneriyoruz. Nasıl geçtiğini birlikte değerlendirip bir sonraki randevuyu ona göre ayarlıyoruz. Süreyi uzatmak isterseniz bunu randevu alırken söylemeniz yeterli, programı ona göre açıyoruz.",
      },
      {
        q: "Baskı sert mi olacak?",
        a: "Baskıyı seans boyunca siz belirliyorsunuz. Başlarken tercih ettiğiniz seviyeyi soruyor, uygulama sırasında da zaman zaman kontrol ediyoruz. Rahatsız eden bir nokta olursa söylemeniz yeterli, hemen hafifletiyoruz. Amaç gevşemek, bu yüzden hiçbir aşamada zorlamıyoruz. Baskıyı artırmak isterseniz de aynı şekilde söylemeniz yeterli; tempoyu size göre ayarlıyoruz.",
      },
      {
        q: "Meridyen masajıyla birlikte alınabilir mi?",
        a: "Evet, iki imza uygulamamızı aynı randevuda birleştirebiliyoruz. Bu durumda size ayıracağımız süre uzuyor, bu yüzden planı önceden yapmamız gerekiyor. WhatsApp'tan ikisini birden istediğinizi yazın; o güne yeterli zamanı ayırıp size uygun saati paylaşalım. İki seansı aynı güne sığdırmak her zaman mümkün olmayabilir; takvime birlikte bakalım.",
      },
    ],
  },
  {
    slug: "meridyen-masaji",
    navLabel: "Meridyen Masajı",
    name: "Meridyen Masajı",
    enabled: true,
    signature: true,
    description:
      "Sarıyer'de meridyen masajı. Geleneksel meridyen hatları boyunca ilerleyen rahatlatıcı seans için WhatsApp'tan randevu alabilirsiniz.",
    summary:
      "Geleneksel meridyen hatları boyunca ilerleyen, baştan sona rahatlamaya yönelik bir seans.",
    image: {
      base: "/images/hizmetler/meridyen-masaji-gercek",
      alt: "Armağan Meridyen Güzellik'te meridyen masajı",
      widths: [720, 1080],
      width: 1080,
      height: 607,
    },

    blocks: [
      {
        t: "p",
        text: "Meridyen masajı, salonumuzun imza uygulamalarından biri. Geleneksel meridyen hatları boyunca ilerleyen, yavaş tempolu ve rahatlamaya yönelik bir seans. Bu uygulamaya ayrı bir önem veriyoruz; randevuyu da buna göre planlıyoruz.",
      },
      { t: "h2", text: "Seans nasıl ilerliyor?" },
      {
        t: "ul",
        items: [
          "<strong>Ön görüşme.</strong> Beklentinizi, baskı tercihinizi ve çalışılmasını istemediğiniz bölgeleri konuşuyoruz.",
          "<strong>Hazırlık.</strong> Seans alanı hazırlanıyor, rahat edeceğiniz şekilde yerleşiyorsunuz.",
          "<strong>Uygulama.</strong> Meridyen hatları boyunca, yavaş ve düzenli bir tempoda ilerleniyor.",
          "<strong>Kapanış.</strong> Seans kademeli olarak yavaşlayarak bitiyor, ardından dinlenme süresi veriliyor.",
        ],
      },
      { t: "h2", text: "Kimler için uygun?" },
      {
        t: "ul",
        items: [
          "Yoğun bir haftanın ardından sakin bir seans arayanlar",
          "Hızlı tempolu masaj yerine yavaş bir uygulamayı tercih edenler",
          "Kendine düzenli bir dinlenme zamanı ayırmak isteyenler",
          "Salonun imza uygulamalarını merak edenler",
        ],
      },
    ],
    note: "Bu uygulama rahatlama amaçlıdır; tıbbi bir tedavi ya da teşhis yerine geçmez, hastalık iyileştirme iddiası taşımaz. Bilinen bir rahatsızlığınız veya hamilelik durumunuz varsa randevu öncesinde bize bildirin.",
    faqs: [
      {
        q: "Meridyen masajı tedavi amaçlı mı?",
        a: "Hayır. Bu seans rahatlama ve dinlenme amacıyla uygulanıyor; tıbbi bir tedavi, teşhis ya da iyileştirme iddiası taşımıyor. Sağlıkla ilgili bir şikâyetiniz varsa önce hekiminize danışmanızı rica ediyoruz. Doktor takibindeyseniz, seansın uygun olup olmadığını onunla konuşmanız en doğrusu. Beklentinizi gerçekçi tutmak, bu seansın bizim için en önemli kuralı.",
      },
      {
        q: "İlk kez geliyorum, nasıl hazırlanmalıyım?",
        a: "Özel bir hazırlık gerekmiyor. Seanstan hemen önce ağır yemek yememenizi ve rahat kıyafetle gelmenizi öneriyoruz. Gelmeden önce aklınızdaki soruları WhatsApp'tan sorabilirsiniz. Randevu başında da kısa bir görüşme yapıyor, beklentinizi ve baskı tercihinizi birlikte netleştiriyoruz. Seans boyunca rahatsız olursanız durdurmamızı isteyebilirsiniz; bu tamamen sizin tercihiniz.",
      },
      {
        q: "Seans ne kadar sürüyor?",
        a: "Süreyi randevuyu verirken paylaşıyoruz ve isteğinize göre ayarlayabiliyoruz. İlk seansta daha ölçülü bir süre tercih etmenizi öneriyoruz; uygulamanın size nasıl geldiğini böyle daha rahat değerlendiriyorsunuz. Sonraki randevuları bu deneyime göre birlikte planlıyoruz. Seans sonrası birkaç dakika dinlenmek isterseniz bunun için de zaman ayırıyoruz.",
      },
      {
        q: "Kafa masajıyla farkı ne?",
        a: "Kafa masajı saçlı deri, ense ve omuz hattına odaklanıyor ve daha kısa bir seans. Meridyen masajı ise vücut hatları boyunca ilerleyen, daha geniş kapsamlı ve yavaş tempolu bir uygulama. Hangisinin size uyacağından emin değilseniz WhatsApp'tan yazın, ikisini örnekleyerek anlatalım. İkisini aynı gün denemek de mümkün.",
      },
    ],
  },
  {
    slug: "solaryum",
    navLabel: "Solaryum",
    name: "Solaryum",
    enabled: true,
    description:
      "Sarıyer Kilyos Caddesi'nde solaryum. Seans süresi uzman tarafından belirlenir, koruyucu gözlük zorunludur. Bilgi için WhatsApp.",
    summary: "Seans süresinin uzman tarafından belirlendiği, kurallı bir kullanım.",
    image: {
      base: "/images/hizmetler/solaryum-gercek",
      alt: "Armağan Meridyen Güzellik'te solaryum kabini",
      widths: [720, 1080],
      width: 1080,
      height: 607,
    },

    blocks: [
      {
        t: "p",
        text: "Solaryumu kurallı bir uygulama olarak ele alıyoruz. Seansa başlamadan önce cilt tipiniz değerlendiriliyor ve süreyi uzmanımız belirliyor. Kendi isteğinizle süre uzatma yapılmıyor; bu konuda esnek davranmıyoruz.",
      },
      { t: "h2", text: "Kullanım kuralları" },
      {
        t: "ul",
        items: [
          "<strong>Süreyi uzman belirler.</strong> Seans süresi cilt tipinize göre belirlenir; talep üzerine uzatılmaz.",
          "<strong>Koruyucu gözlük zorunludur.</strong> Gözlüksüz seans yapılmaz.",
          "<strong>18 yaşından küçüklere uygulanmaz.</strong>",
          "<strong>Cilt durumu sorulur.</strong> Güneş yanığı, yeni yapılmış bir cilt uygulaması ya da ilaç kullanımı varsa seans ertelenir.",
          "<strong>Kabin her seanstan sonra temizlenir.</strong>",
        ],
      },
      { t: "h2", text: "Kimler için uygun değil?" },
      {
        t: "ul",
        items: [
          "18 yaşından küçükler",
          "Güneşe karşı hassasiyeti olduğunu bilenler",
          "Işığa duyarlılık yapabilecek ilaç kullananlar",
          "Yakın zamanda cilt uygulaması yaptırmış olanlar",
        ],
      },
    ],
    note: "Solaryum kozmetik bir uygulamadır; herhangi bir sağlık faydası vaat edilmez. Cildinizle ilgili bir şüpheniz varsa kullanmadan önce hekiminize danışın.",
    faqs: [
      {
        q: "Seans süresini ben seçebilir miyim?",
        a: "Hayır. Süreyi cilt tipinize bakarak uzmanımız belirliyor ve talep üzerine uzatmıyoruz. Bu kuralı istisnasız uyguluyoruz, çünkü sürenin kişiye göre ayarlanması kullanımın en önemli parçası. Size uygun süreyi ilk seansta birlikte belirliyor ve sonraki seanslarda da onu esas alıyoruz. İlk kez geliyorsanız daha kısa bir süreyle başlıyoruz.",
      },
      {
        q: "Koruyucu gözlük şart mı?",
        a: "Evet, gözlüksüz seans yapmıyoruz. Göz çevresi bu tür ışığa karşı korunması gereken bir bölge ve bu konuda esneklik tanımıyoruz. Gözlük salonda hazır bulunuyor, ayrıca getirmenize gerek yok. Kuralı baştan söylüyoruz ki randevuya geldiğinizde sürpriz olmasın. Gözlüğü seans boyunca çıkarmamanız gerekiyor, bunu da hatırlatıyoruz.",
      },
      {
        q: "Ne sıklıkla kullanılabilir?",
        a: "Sıklık cilt tipine göre değişiyor ve sık kullanımı teşvik etmiyoruz. İlk seansın ardından uzmanımız size uygun bir aralık söylüyor. Bu aralığın altına inmenizi önermiyoruz. Cildinizde bir değişiklik fark ederseniz kullanmaya ara verin ve bir hekime danışın. Sık kullanım için bizden onay beklemeyin; böyle bir öneride bulunmuyoruz.",
      },
    ],
  },
  {
    slug: "ems",
    navLabel: "EMS",
    name: "EMS",
    enabled: true,
    description:
      "Sarıyer'de EMS seansı. Uygunluk ön görüşmede değerlendirilir. Bilgi ve randevu için WhatsApp'tan yazabilirsiniz.",
    summary: "Uygunluğun ön görüşmede değerlendirildiği, kurallı bir seans.",
    // Elinizdeki stok görsel EMS cihazını göstermiyor; salondan gerçek fotoğraf
    image: {
      base: "/images/hizmetler/ems-gercek",
      alt: "Armağan Meridyen Güzellik'te EMS Five Star cihazı",
      widths: [720, 1080],
      width: 1080,
      height: 1080,
      objectPosition: "center",
    },

    blocks: [
      {
        t: "p",
        text: "Salonumuzda EMS Five Star cihazıyla uygulama yapıyoruz. EMS seansına başlamadan önce bir ön görüşme yapıyoruz. Bu görüşmede sağlık geçmişinizi ve varsa bilinen rahatsızlıklarınızı soruyoruz; uygunluk bu görüşmede değerlendiriliyor. Sonuç vaat etmiyoruz, seansın nasıl ilerleyeceğini anlatıyoruz.",
      },
      { t: "h2", text: "Seans nasıl ilerliyor?" },
      {
        t: "ul",
        items: [
          "<strong>Ön görüşme.</strong> Uygunluk değerlendiriliyor; uygun görülmezse seans yapılmıyor.",
          "<strong>Hazırlık.</strong> Ekipman ve seans alanı hazırlanıyor, nasıl ilerleyeceği anlatılıyor.",
          "<strong>Uygulama.</strong> Seans boyunca şiddet, konforunuza göre ayarlanıyor.",
          "<strong>Kapanış.</strong> Seans sonrası nelere dikkat etmeniz gerektiği anlatılıyor.",
        ],
      },
      { t: "h2", text: "Kimler için uygun değil?" },
      {
        t: "ul",
        items: [
          "Kalp pili veya benzeri implant kullananlar",
          "Hamileler",
          "Doktor takibinde olup hekiminden onay almamış olanlar",
          "Uygulama bölgesinde açık yara veya cilt sorunu bulunanlar",
        ],
      },
    ],
    note: "Uygunluk ön görüşmede değerlendirilir. Bu uygulama tıbbi bir tedavi değildir; sağlıkla ilgili bir sonuç ya da kalıcı bir değişim vaat edilmez. Doktor takibindeyseniz önce hekiminize danışın.",
    faqs: [
      {
        q: "Bana uygun olup olmadığını nasıl anlarız?",
        a: "Seanstan önce bir ön görüşme yapıyoruz ve sağlık geçmişinizi soruyoruz. Verdiğiniz bilgilere göre uygun görmezsek seansı yapmıyoruz; bunu sebebiyle birlikte açıkça söylüyoruz. Doktor takibinde olduğunuz bir durum varsa, önce hekiminizin görüşünü almanızı rica ediyoruz. Verdiğiniz bilgiler yalnızca uygunluk değerlendirmesi için kullanılıyor.",
      },
      {
        q: "Sonuç garanti ediyor musunuz?",
        a: "Hayır. Hiçbir sonuç, süre ya da kalıcı değişim vaat etmiyoruz. Seansın nasıl ilerlediğini ve neler hissedebileceğinizi anlatıyoruz, bunun ötesinde bir iddiada bulunmuyoruz. Beklentinizi ön görüşmede açık açık konuşuyoruz ki gerçekçi olmayan bir umutla başlamayın. Sonuç vaat eden bir anlatımla randevu almanızı istemiyoruz.",
      },
      {
        q: "Seans sırasında rahatsızlık duyarsam ne olur?",
        a: "Seans boyunca şiddet sizin konforunuza göre ayarlanıyor. Rahatsızlık hissederseniz söylemeniz yeterli; hemen hafifletiyor, gerekirse seansı durduruyoruz. Bunu bir aksaklık olarak görmüyoruz. Nasıl hissettiğinizi seans sırasında zaman zaman biz de soruyoruz. Seansı yarıda bırakmak isterseniz bu tamamen sizin kararınız; bunu hiçbir şekilde sorun etmiyoruz.",
      },
    ],
  },
  {
    slug: "kuafor",
    navLabel: "Kuaför",
    name: "Kuaför",
    enabled: true,
    description:
      "Zekeriyaköy, Sarıyer'de kuaför: saç kesimi, fön, boya, röfle ve balyaj, keratin bakımı, özel gün saçı. Randevu için WhatsApp.",
    summary: "Kesimden föne, boyadan özel gün saçına kadar saçla ilgili her işin tek adresi.",
    image: {
      base: "/images/hizmetler/kuafor-sariyer",
      alt: "Kuaförde fırçayla saç şekillendirme – örnek görsel",
      widths: [800, 1600],
      width: 1600,
      height: 900,
    },
    blocks: [
      {
        t: "p",
        text: "Kuaför bölümünde saçla ilgili işlerin tamamını bir arada yapıyoruz: kesim, fön ve şekillendirme, boya, röfle ve balyaj, keratin ve bakım uygulamaları, özel günler için topuz ve maşa. Hepsinde aynı sırayı izliyoruz — önce konuşuyor, sonra başlıyoruz.",
      },
      { t: "h2", text: "Hizmetler" },
      {
        t: "ul",
        items: [
          "<strong>Saç kesimi</strong> — saç tipinize ve günlük bakım alışkanlığınıza göre",
          "<strong>Fön ve şekillendirme</strong> — günlük kullanım ya da özel bir program için",
          "<strong>Saç boyama</strong> — dip boyası ya da baştan renk değişimi",
          "<strong>Röfle / balyaj</strong> — saç boyunca ton geçişi",
          "<strong>Keratin ve saç bakımı</strong> — saçın o günkü durumuna göre seçilen bakım",
          "<strong>Özel gün saçı</strong> — topuz, maşa ve toplama modeller",
        ],
      },
      { t: "h2", text: "Nasıl ilerler?" },
      {
        t: "ul",
        items: [
          "<strong>Ön görüşme.</strong> Saç tipinizi, saçınıza daha önce uygulanmış işlemleri ve istediğiniz görünümü konuşuyoruz. Varsa referans fotoğrafınıza birlikte bakıyoruz.",
          "<strong>Ne gerçekçi, onu söylüyoruz.</strong> Saçınızın mevcut rengi ve yapısı, istenen sonucun tek seansta mümkün olup olmadığını belirler; bunu baştan açıkça konuşuyoruz.",
          "<strong>Hazırlık ve uygulama.</strong> Seçilen işlem adım adım uygulanıyor; kimyasal işlemlerde bekleme süreleri takip ediliyor.",
          "<strong>Kapanış.</strong> Fön ve şekillendirmeyle bitiriyor, evde saçı nasıl taşıyacağınızı anlatıyoruz.",
        ],
      },
      { t: "h2", text: "Bilmeniz gerekenler" },
      {
        t: "ul",
        items: [
          "Boya, röfle, balyaj ve keratin gibi kimyasal işlemlerden önce hassasiyetinizi sormamız gerekiyor; daha önce bir tepki yaşadıysanız mutlaka söyleyin.",
          "Bu işlemlerden önce <strong>tutam testi</strong> önerilir. İsterseniz işlemi ayrı bir güne alıp önce testi yapıyoruz.",
          "Saçlı deride yara, tahriş ya da yeni yapılmış bir işlem varsa randevuyu erteleyebiliriz.",
          "Sonuç; saçın mevcut rengine, yapısına ve geçmiş işlemlere göre kişiden kişiye değişir. Belirli bir ton ya da kalıcılık garantisi vermiyoruz.",
        ],
      },
      { t: "h2", text: "Saç bakımıyla birlikte" },
      {
        t: "p",
        text: 'Saçlı deriyi dinlendirmek isterseniz kuaför randevusunu <a href="/hizmetler/sac-spa">saç spa</a> ile birleştirebiliriz. Ense ve omuz hattında gerginlik varsa <a href="/hizmetler/kafa-masaji">kafa masajı</a> aynı güne eklenebilir; ikisini birden düşünüyorsanız randevuyu önceden planlamamız gerekiyor.',
      },
    ],
    note: "Kimyasal işlemler kozmetik uygulamalardır. Saç ya da saçlı deriyle ilgili tıbbi bir şikâyetiniz varsa önce bir hekime danışmanızı öneriyoruz.",
    faqs: [
      {
        q: "Boya için önce test yapılması şart mı?",
        a: "Zorunlu tutmuyoruz ama öneriyoruz, özellikle daha önce boya ya da keratin sonrası bir tepki yaşadıysanız. Test için işlemi ayrı bir güne alıyoruz; küçük bir tutamda deneyip sonucu birlikte değerlendiriyoruz. Hassasiyetinizi randevu alırken söylemeniz, günü ona göre planlamamız için yeterli.",
      },
      {
        q: "İstediğim rengi tek seansta alabilir miyim?",
        a: "Saçınızın mevcut rengi, yapısı ve geçmiş işlemleri bunu belirliyor; koyudan açığa geçişlerde çoğu zaman birden fazla seans gerekiyor. Ön görüşmede saçınıza bakıp neyin gerçekçi olduğunu açıkça söylüyoruz. Tek seansta mümkün değilse zorlamıyor, kaç adımda gidilebileceğini anlatıyoruz.",
      },
      {
        q: "Özel gün saçı için ne kadar önceden randevu almalıyım?",
        a: "Topuz ve toplama modeller için randevuyu mümkün olduğunca erken almanızı öneriyoruz; düğün ve nişan dönemlerinde saatler hızlı doluyor. Provalı çalışmak isterseniz bunu da baştan söyleyin, iki ayrı randevu planlıyoruz. WhatsApp'tan yazdığınızda o haftanın boş saatlerini paylaşıyoruz.",
      },
    ],
  },
  {
    slug: "sac-spa",
    navLabel: "Saç Spa",
    name: "Saç Spa",
    enabled: true,
    description:
      "Sarıyer Kilyos Caddesi'nde saç spa. Saçlı deri temizliği, bakım ve rahatlatıcı masajla ilerleyen seans için WhatsApp.",
    summary: "Saçlı deri temizliği, bakım maskesi ve rahatlatıcı bir masajla ilerleyen seans.",
    image: {
      base: "/images/hizmetler/sac-spa-sariyer",
      alt: "Saç spa uygulaması – örnek görsel",
      widths: [800, 1600],
      width: 1600,
      height: 900,
    },
    blocks: [
      {
        t: "p",
        text: "Saç spa, saç bakımını acele etmeden yapan bir seans. Saçlı derinin temizliğiyle başlıyor, bakım adımlarıyla devam ediyor ve rahatlatıcı bir masajla bitiyor. Saç yapınıza göre hangi adımların uygun olduğunu randevu başında birlikte seçiyoruz.",
      },
      { t: "h2", text: "Seans nasıl ilerliyor?" },
      {
        t: "ul",
        items: [
          "<strong>Saç ve saçlı deri değerlendirmesi.</strong> Saçınızın o günkü durumunu ve alışkanlıklarınızı konuşuyoruz.",
          "<strong>Temizlik.</strong> Saçlı deri, bakıma hazırlanacak şekilde temizleniyor.",
          "<strong>Bakım.</strong> Saç yapınıza uygun bakım adımı uygulanıyor ve bekletiliyor.",
          "<strong>Masaj.</strong> Saçlı deri ve ense bölgesine rahatlatıcı bir masaj yapılıyor.",
          "<strong>Kapanış.</strong> Saç durulanıp kurutuluyor; evde sürdürebileceğiniz sade bir bakım önerisi paylaşılıyor.",
        ],
      },
      {
        t: "p",
        text: 'Kesim, boya ya da fön de düşünüyorsanız seansı <a href="/hizmetler/kuafor">kuaför</a> randevusuyla aynı güne alabiliriz; hangisinin önce yapılacağını birlikte kararlaştırıyoruz.',
      },
      { t: "h2", text: "Kimler için uygun?" },
      {
        t: "ul",
        items: [
          "Saçlı derisi hızlı yağlanan ya da gergin hissedenler",
          "Düzenli bakım alışkanlığı kurmak isteyenler",
          "Saç bakımıyla birlikte rahatlatıcı bir seans arayanlar",
          "Kendine ayıracak sakin bir zaman isteyenler",
        ],
      },
    ],
    faqs: [
      {
        q: "Saçımı yıkamış olarak mı gelmeliyim?",
        a: "Gerekmiyor. Seans zaten saçlı deri temizliğiyle başlıyor, bu yüzden saçınızı yıkamadan gelebilirsiniz. Saçınızda ürün birikimi varsa bunu söylemeniz yeterli, temizlik adımını ona göre planlıyoruz. Kuaför işlemi düşünüyorsanız, hangisinin önce yapılacağını birlikte kararlaştıralım. Saçınızın son durumunu görmemiz, doğru adımları seçmemiz için yeterli oluyor.",
      },
      {
        q: "Boyalı saça uygulanabilir mi?",
        a: "Saçınızın boyalı olduğunu ve en son ne zaman işlem gördüğünü randevu başında bize söyleyin. Bakım adımlarını buna göre seçiyoruz. Uygun görmediğimiz bir adımı uygulamıyor, sebebini de anlatıyoruz. Emin değilseniz WhatsApp'tan saçınızın fotoğrafını gönderebilirsiniz. Saç boyası sonrası bekleme süresi gerekiyorsa bunu da birlikte planlıyoruz.",
      },
      {
        q: "Ne sıklıkla gelmek gerekir?",
        a: "Bu, saç yapınıza ve evde sürdürdüğünüz rutine göre değişiyor; sabit bir program dayatmıyoruz. İlk seanstan sonra size gerçekçi bir aralık öneriyoruz. Aradaki değişimi WhatsApp'tan konuşup randevuyu öne ya da geriye alabiliyoruz. Seans aralığını kaçırmanız bir sorun yaratmıyor; kaldığınız yerden rahatlıkla devam ediyoruz.",
      },
    ],
  },
  {
    slug: "epilasyon",
    navLabel: "Epilasyon",
    name: "Epilasyon",
    enabled: true,
    description:
      "Sarıyer'de epilasyon randevusu. Bölge seçimi, hijyen ve işlem sonrası bakım için WhatsApp'tan bilgi alabilirsiniz.",
    summary: "Bölge seçiminden işlem sonrası bakıma kadar baştan konuşulan bir randevu.",
    image: {
      base: "/images/hizmetler/epilasyon-sariyer",
      alt: "Epilasyon uygulaması – örnek görsel",
      widths: [800, 1600],
      width: 1600,
      height: 900,
    },
    blocks: [
      {
        t: "p",
        text: "Epilasyonda randevuyu baştan netleştirmeyi tercih ediyoruz: hangi bölgeler, nasıl bir sıra ve işlem sonrası nelere dikkat edileceği. Cildinizde hassasiyet varsa bunu baştan konuşuyor, uygulamayı ona göre planlıyoruz.",
      },
      { t: "h2", text: "Randevu nasıl ilerliyor?" },
      {
        t: "ul",
        items: [
          "<strong>Bölge seçimi.</strong> Hangi bölgelerin yapılacağını ve sırayı birlikte belirliyoruz.",
          "<strong>Hazırlık.</strong> Hijyene özen gösterilen, her randevu için hazırlanmış bir alanda çalışıyoruz.",
          "<strong>Uygulama.</strong> Belirlenen sıra izleniyor; rahatsızlık hissederseniz ara veriliyor.",
          "<strong>Sonrası.</strong> Cilt sakinleştiriliyor ve işlem sonrası bakım önerileri anlatılıyor.",
        ],
      },
      { t: "h2", text: "Kimler için uygun?" },
      {
        t: "ul",
        items: [
          "Düzenli bir bakım programı oturtmak isteyenler",
          "Evde yapmaktan memnun kalmayanlar",
          "Belirli bir bölge için düzenli randevu arayanlar",
          "İşlem sonrası bakım konusunda yönlendirme isteyenler",
        ],
      },
    ],
    note: "Cildinizde açık yara, güneş yanığı ya da yeni yapılmış bir cilt uygulaması varsa randevuyu ertelememiz gerekebilir. Bilinen bir cilt rahatsızlığınız varsa önce hekiminize danışın.",
    faqs: [
      {
        q: "İşlem sonrası nelere dikkat etmeliyim?",
        a: "İlk saatlerde sıcak su, sauna ve güneş temasından kaçınmanızı öneriyoruz; cilt bu aşamada hassas oluyor. Sıkı kıyafet yerine rahat olanı tercih etmek de iyi geliyor. Randevu sonunda bakım önerilerini tek tek anlatıyor, istediğinizde WhatsApp'tan yazılı olarak da gönderiyoruz. Notları yazılı göndermemizi isterseniz söylemeniz yeterli.",
      },
      {
        q: "Hijyen konusunda nasıl çalışıyorsunuz?",
        a: "Hijyene özen gösteriyor, her randevuya hazırlanmış bir alanla başlıyoruz. Uygulama öncesinde ve sonrasında neler yaptığımızı sormaktan çekinmeyin; anlatmaktan memnun oluruz. Salona geldiğinizde çalışma alanını kendiniz de görebilirsiniz. Merak ettiğiniz bir ayrıntı olursa randevu sırasında sorun; açık açık konuşmayı her zaman tercih ediyoruz.",
      },
      {
        q: "Hangi bölgeleri yaptırabilirim?",
        a: "Hangi bölgeleri istediğinizi randevu almadan önce WhatsApp'tan yazmanız en pratiği. Böylece size ayıracağımız süreyi doğru planlıyor ve geldiğinizde beklemeden başlıyoruz. Bölge sayısı değiştiğinde süre de değiştiği için bunu baştan konuşmayı tercih ediyoruz. Bölge listesini randevudan sonra değiştirmek isterseniz haber vermeniz yeterli, planı güncelliyoruz.",
      },
    ],
  },
];

/* ---------------- Türetilmiş değerler ve yardımcılar ---------------- */

/** Sitenin kanonik kök adresi (sonunda eğik çizgi yok). */
export const SITE_URL = siteConfig.domain.replace(/\/+$/, "");

/** Verilen yol için mutlak adres. */
export function siteUrl(path: string): string {
  return `${SITE_URL}${path === "/" ? "/" : path}`;
}

/** Hazır mesajlı WhatsApp sohbet bağlantısı. */
export function whatsappLink(message: string = siteConfig.whatsapp.defaultMessage): string {
  return `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

/** Menüde, sitemap'te ve hizmet listelerinde kullanılan açık hizmetler. */
export const enabledServices = services.filter((s) => s.enabled);

/** Ana sayfada ayrı bölümde öne çıkan imza uygulamaları. */
export const signatureServices = enabledServices.filter((s) => s.signature);

export function serviceBySlug(slug: string): Service | undefined {
  return enabledServices.find((s) => s.slug === slug);
}

/** Hizmet sayfasının yolu. */
export function servicePath(slug: string): string {
  return `/hizmetler/${slug}`;
}

/**
 * Hizmet sayfasının <title> değeri: "<Hizmet> Sarıyer | <Marka>".
 * 60 karakteri aşarsa marka adı kısa biçimine düşer — sınır elle değil,
 * burada garanti edilir.
 */
export function serviceTitle(service: Service): string {
  const base = `${service.name} ${siteConfig.address.addressLocality} | `;
  const full = base + siteConfig.name;
  return full.length <= 60 ? full : base + siteConfig.shortName;
}

/**
 * Görünen tek satırlık adres. Sitedeki her yerde BU biçim kullanılır:
 * "Maden Mah. Kilyos Cd. No:151/A, 34450 Sarıyer/İstanbul"
 */
export function addressLine(): string {
  const a = siteConfig.address;
  const postal = isFilled(a.postalCode) ? `${a.postalCode} ` : "";
  return `${a.streetAddress}, ${postal}${a.addressLocality}/${a.addressRegion}`;
}

/** Adresi Google Haritalar'da arayan bağlantı. */
export function mapsSearchLink(): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressLine())}`;
}

/** Instagram profil adresi — girilmemişse null. */
export function instagramUrl(): string | null {
  return isFilled(siteConfig.instagram) ? siteConfig.instagram : null;
}

/** Instagram kullanıcı adı (@ olmadan) — adresten türetilir. */
export function instagramHandle(): string | null {
  const url = instagramUrl();
  if (!url) return null;
  const match = url.replace(/\/+$/, "").match(/instagram\.com\/([^/?#]+)/i);
  return match ? match[1] : null;
}

/** Google yorum bırakma adresi — girilmemişse null. */
export function reviewUrl(): string | null {
  return isFilled(siteConfig.reviewUrl) ? siteConfig.reviewUrl : null;
}

/** Bir alanın gerçekten doldurulup doldurulmadığı. */
export function isFilled(value: string): boolean {
  return Boolean(value) && !value.startsWith("TODO");
}
