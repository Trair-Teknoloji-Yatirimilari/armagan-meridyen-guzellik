import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { enabledServices, siteConfig, whatsappLink } from "@/config/site.config";

/**
 * İletişim formu.
 *
 * Sitenin arka ucu ve e-posta gönderimi yok; form hiçbir sunucuya veri
 * göndermez. Doldurduğunuz alanlar yalnızca tarayıcıda bir WhatsApp mesajına
 * dönüştürülür ve sohbet penceresi açılır. Bu sayede form üzerinden salonun
 * eline geçmeyen hiçbir kişisel veri bir yerde birikmiyor.
 *
 * İleride e-posta ile teslimat istenirse alıcı adresi koda yazılmaz;
 * .env dosyasındaki CONTACT_FORM_TO değişkeninden okunur (bkz. .env.example).
 */
export function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");

  const lines = [
    "Merhaba, bilgi ve randevu almak istiyorum.",
    name && `Adım: ${name}`,
    phone && `Telefon: ${phone}`,
    service && `İlgilendiğim uygulama: ${service}`,
    message && `Not: ${message}`,
  ].filter(Boolean) as string[];

  const href = whatsappLink(lines.join("\n"));

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        window.open(href, "_blank", "noopener,noreferrer");
      }}
    >
      <div className="space-y-2">
        <Label htmlFor="ad">Adınız</Label>
        <Input
          id="ad"
          name="ad"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Size nasıl hitap edelim?"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="telefon">Telefon</Label>
        <Input
          id="telefon"
          name="telefon"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Size dönebileceğimiz numara"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="hizmet">İlgilendiğiniz uygulama</Label>
        <select
          id="hizmet"
          name="hizmet"
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
        >
          <option value="">Henüz emin değilim</option>
          {enabledServices.map((s) => (
            <option key={s.slug} value={s.navLabel}>
              {s.navLabel}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="mesaj">Eklemek istedikleriniz</Label>
        <Textarea
          id="mesaj"
          name="mesaj"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Hangi günler uygunsunuz, aklınızdaki uygulama nedir?"
        />
      </div>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-full bg-primary px-8 py-3.5 text-sm uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary-hover sm:w-auto"
      >
        WhatsApp'ta devam et
      </button>

      <p className="text-sm leading-relaxed text-foreground/70">
        Yazmak yerine konuşmayı tercih ederseniz{" "}
        <a href={siteConfig.phone.href} className="text-primary underline underline-offset-4">
          {siteConfig.phone.display}
        </a>{" "}
        numarasını arayabilir, e-posta için{" "}
        <a
          href={`mailto:${siteConfig.email}`}
          className="break-all text-primary underline underline-offset-4"
        >
          {siteConfig.email}
        </a>{" "}
        adresine yazabilirsiniz.
      </p>

      <p className="text-xs leading-relaxed text-muted-foreground">
        Bu form bilgilerinizi hiçbir sunucuya göndermez; yazdıklarınızı{" "}
        {siteConfig.whatsapp.display} numaralı WhatsApp hattımıza mesaj taslağı olarak taşır.
        Göndermeden önce mesajı kendiniz görüp değiştirebilirsiniz.
      </p>
    </form>
  );
}
