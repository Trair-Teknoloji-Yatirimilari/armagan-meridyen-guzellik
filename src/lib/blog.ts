/**
 * BLOG — dosya tabanlı, veritabanı YOK.
 *
 * İçerik `content/blog/<slug>.md` dosyalarından gelir. Markdown dosyaları
 * derleme sırasında Vite tarafından pakete gömülür (import.meta.glob + ?raw),
 * böylece çalışma anında dosya sistemi erişimi gerekmez — statik çıktı için
 * şart olan şey bu.
 *
 * Görünürlük kuralı: yayındaki (draft:false) yazı sayısı 0 ise blog hiç yokmuş
 * gibi davranır — menüde, footer'da ve sitemap'te görünmez, /blog 404 döner.
 */

import { load as parseYaml } from "js-yaml";
import { marked } from "marked";

export type BlogFaq = { q: string; a: string };

export type BlogPost = {
  slug: string;
  title: string;
  /** ≤155 karakter */
  description: string;
  /** ISO tarih (YYYY-MM-DD) */
  date: string;
  /** Güncellenme tarihi; yoksa date kullanılır */
  updated?: string;
  category?: string;
  /** İlgili hizmet slug'ları — iki yönlü iç bağlantı için */
  relatedServices: string[];
  faq: BlogFaq[];
  /**
   * Kapak görseli. `widths`, dosya adındaki en büyük genişlikten türetilir —
   * frontmatter'da ayrı bir alan tutulmuyor (bkz. kapakGorseli).
   */
  image?: {
    /** En büyük sürümün yolu — srcset'in `src` yedeği */
    src: string;
    alt: string;
    /** "Armağan Meridyen Güzellik" ya da "Unsplash / <fotoğrafçı>" */
    credit?: string;
    widths: number[];
    /** En büyük sürümün gerçek ölçüsü — CLS 0 için */
    width: number;
    height: number;
    /** Paylaşım görseli: 1200x630 JPEG (og:image / twitter:image) */
    og: string;
  };
  draft: boolean;
  /** Markdown'dan üretilmiş gövde HTML'i */
  html: string;
  /** H2 başlıklarından çıkarılan içindekiler */
  toc: { id: string; text: string }[];
  readingMinutes: number;
};

type Frontmatter = Record<string, unknown>;

/** Türkçe karakterleri de çözen başlık kimliği üretici. */
function slugifyHeading(text: string): string {
  const map: Record<string, string> = {
    ç: "c",
    ğ: "g",
    ı: "i",
    i̇: "i",
    ö: "o",
    ş: "s",
    ü: "u",
    â: "a",
    î: "i",
    û: "u",
  };
  return text
    .toLocaleLowerCase("tr-TR")
    .replace(/[çğıiöşüâîû]/g, (c) => map[c] ?? c)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function splitFrontmatter(raw: string): { data: Frontmatter; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };
  const data = (parseYaml(match[1]) ?? {}) as Frontmatter;
  return { data, body: match[2] };
}

function asString(value: unknown, fallback = ""): string {
  if (typeof value === "string") return value;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "number") return String(value);
  return fallback;
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.map((v) => asString(v)).filter(Boolean) : [];
}

function asFaq(value: unknown): BlogFaq[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      const row = item as Record<string, unknown>;
      return { q: asString(row?.q), a: asString(row?.a) };
    })
    .filter((f) => f.q && f.a);
}

/**
 * HTML varlıklarını çözer.
 *
 * marked'in `parseInline` çıktısı kaçırılmış HTML'dir ("Sarıyer&#x27;de").
 * Bu metin başlığın kendisinde HTML olarak basıldığı için doğru görünür, ama
 * içindekiler listesinde React metin düğümü olarak render ediliyor ve ikinci
 * kez kaçırılıp ekranda "Sarıyer&#39;de" olarak çıkıyordu.
 */
function decodeEntities(s: string): string {
  const named: Record<string, string> = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"',
    apos: "'",
    nbsp: " ",
  };
  return s.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (tam, kod: string) => {
    if (kod[0] === "#") {
      const n =
        kod[1] === "x" || kod[1] === "X"
          ? Number.parseInt(kod.slice(2), 16)
          : Number.parseInt(kod.slice(1), 10);
      return Number.isFinite(n) ? String.fromCodePoint(n) : tam;
    }
    return named[kod.toLowerCase()] ?? tam;
  });
}

/** Markdown → HTML; H2'lere id ekler ve içindekiler listesini toplar. */
function renderMarkdown(body: string): { html: string; toc: { id: string; text: string }[] } {
  const toc: { id: string; text: string }[] = [];
  const renderer = new marked.Renderer();

  renderer.heading = function heading({ tokens, depth }) {
    const text = this.parser.parseInline(tokens);
    // Etiketler atılır, varlıklar çözülür: hem id hem de içindekiler metni
    // gerçek karakterlerden üretilsin.
    const plain = decodeEntities(text.replace(/<[^>]+>/g, ""));
    if (depth === 2) {
      const id = slugifyHeading(plain);
      toc.push({ id, text: plain });
      return `<h2 id="${id}">${text}</h2>\n`;
    }
    return `<h${depth}>${text}</h${depth}>\n`;
  };

  const html = marked.parse(body, { renderer, async: false }) as string;
  return { html, toc };
}

function readingMinutes(body: string): number {
  const words = body
    .replace(/[#*_>`\-[\]()]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/**
 * content/blog altındaki tüm markdown dosyaları. `?raw` ile ham metin olarak
 * pakete gömülür; eager olduğu için tarayıcı tarafında ek istek doğurmaz
 * (yazı sayfaları zaten derleme sırasında HTML'e dönüşür).
 */
const files = import.meta.glob("/content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

/** Kapak görsellerinin sabit en-boy oranı (16:10). */
export const KAPAK_ORANI = 1.6;

/** Üretilen WebP basamakları. Kaynaktan BÜYÜTME yapılmaz. */
const BASAMAKLAR = [800, 1200, 1600];

/**
 * Frontmatter'daki tek `image` yolundan srcset verisini türetir.
 *
 * Dosya adı "-<genişlik>.webp" ile bitiyor; bu en büyük sürümdür. Basamaklar
 * ondan küçük olanlarla sınırlanır — salonun kendi kareleri 1080 piksel
 * kaynaktan geldiği ve BÜYÜTÜLMEDİĞİ için bazı kapaklar 843/971 pikselde
 * kalıyor. En büyük sürüm, en yakın basamaktan belirgin biçimde (>%12)
 * genişse listeye ayrıca eklenir; değilse ikinci bir dosya üretmek
 * anlamsız olurdu. Üretim betiği de aynı kuralı uyguluyor.
 */
function kapakGorseli(
  src: string,
  alt: string,
  credit: string,
): NonNullable<BlogPost["image"]> | undefined {
  const m = /-(\d+)\.webp$/.exec(src);
  if (!m) return undefined;
  const enBuyuk = Number(m[1]);
  // En büyük sürüm HER ZAMAN listede: dosya adındaki genişlik diskteki tek
  // kesin dosyadır. Ara basamaklar ona %12'den fazla uzaksa eklenir; daha
  // yakın olanlar hem gereksiz hem de üretilmiyor (srcset'te var olmayan
  // dosyayı göstermek 404 demek olurdu).
  const widths = [...BASAMAKLAR.filter((w) => w < enBuyuk / 1.12), enBuyuk];
  return {
    src,
    alt,
    credit: credit || undefined,
    widths,
    width: enBuyuk,
    height: Math.round(enBuyuk / KAPAK_ORANI),
    // Paylaşım görseli ayrı bir dosya: WhatsApp ve birçok önizleme WebP'yi
    // açmıyor, bu yüzden 1200x630 JPEG üretiliyor.
    og: src.replace(/-\d+\.webp$/, "-og.jpg"),
  };
}

function parseFile(path: string, raw: string): BlogPost {
  const slug = path.split("/").pop()!.replace(/\.md$/, "");
  const { data, body } = splitFrontmatter(raw);
  const { html, toc } = renderMarkdown(body);
  const imageSrc = asString(data.image);

  return {
    slug,
    title: asString(data.title, slug),
    description: asString(data.description),
    date: asString(data.date),
    updated: asString(data.updated) || undefined,
    category: asString(data.category) || undefined,
    relatedServices: asStringArray(data.relatedServices),
    faq: asFaq(data.faq),
    image: imageSrc
      ? kapakGorseli(
          imageSrc,
          asString(data.imageAlt, asString(data.title)),
          asString(data.imageCredit),
        )
      : undefined,
    draft: data.draft === true,
    html,
    toc,
    readingMinutes: readingMinutes(body),
  };
}

const allPosts: BlogPost[] = Object.entries(files)
  .map(([path, raw]) => parseFile(path, raw))
  .sort((a, b) => (a.date < b.date ? 1 : -1));

/** Yayındaki yazılar (taslaklar hariç), yeniden eskiye. */
export const publishedPosts: BlogPost[] = allPosts.filter((p) => !p.draft);

/** Blog bölümü açık mı? Tek kural: en az bir yayındaki yazı. */
export const blogEnabled = publishedPosts.length > 0;

export function postBySlug(slug: string): BlogPost | undefined {
  return publishedPosts.find((p) => p.slug === slug);
}

/** Bir hizmetle ilişkilendirilmiş yazılar — hizmet sayfasındaki "İlgili yazılar". */
export function postsForService(serviceSlug: string): BlogPost[] {
  return publishedPosts.filter((p) => p.relatedServices.includes(serviceSlug));
}

/** Sitemap için: yazının son güncellenme tarihi. */
export function postLastmod(post: BlogPost): string {
  return post.updated || post.date;
}

export function blogPath(slug?: string): string {
  return slug ? `/blog/${slug}` : "/blog";
}

/** "28 Ekim 2026" biçiminde görünür tarih. */
export function formatDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  const months = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];
  return `${d} ${months[m - 1]} ${y}`;
}
