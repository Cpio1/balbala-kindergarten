"use client";

import { Building2, Clock, MapPin, Navigation, Phone } from "lucide-react";
import { mapsLinks, siteConfig } from "@/config/site";
import { useI18n } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/cn";
import { buttonClass } from "@/components/ui/Button";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CloudShape, SunShape, Wave } from "@/components/ui/Decor";

function InfoRow({
  icon,
  label,
  children,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  accent: string;
}) {
  return (
    <li className="flex items-start gap-4 rounded-[28px] bg-white p-4 shadow-soft transition duration-300 hover:-translate-y-0.5 hover:shadow-lift">
      <span className={cn("blob-1 grid size-11 shrink-0 place-items-center", accent)}>{icon}</span>
      <div className="min-w-0">
        <p className="text-xs font-extrabold tracking-wider text-ink-soft uppercase">{label}</p>
        <div className="mt-0.5 text-[0.95rem] leading-snug font-bold break-words text-ink">{children}</div>
      </div>
    </li>
  );
}

export function Contacts() {
  const { t, locale } = useI18n();
  const c = t.contacts;
  const { phone, whatsapp, instagram } = siteConfig;

  return (
    <section id="contacts" aria-labelledby="contacts-title" className="relative overflow-hidden bg-teal-soft pt-4 pb-16 md:pb-24">
      <Wave className="absolute inset-x-0 -top-px h-8 w-full text-cream md:h-14" flip />
      <SunShape aria-hidden className="absolute top-20 right-[5%] hidden size-16 animate-spin-slow text-sun md:block" />
      <CloudShape aria-hidden className="absolute bottom-10 left-[3%] hidden w-24 animate-float-slow text-white md:block" />

      <div className="relative mx-auto max-w-[1200px] px-4 pt-14 sm:px-6 md:pt-20">
        <SectionHeading id="contacts-title" eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} accent="coral" />

        <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-10">
          <Reveal>
            <ul className="grid gap-3">
              <InfoRow icon={<Building2 className="size-5" aria-hidden />} label={siteConfig.shortName} accent="bg-teal text-white">
                {siteConfig.name[locale]}
              </InfoRow>
              <InfoRow icon={<MapPin className="size-5" aria-hidden />} label={c.addressLabel} accent="bg-coral text-white">
                <address className="not-italic">{siteConfig.address[locale]}</address>
              </InfoRow>
              <InfoRow icon={<Clock className="size-5" aria-hidden />} label={c.hoursLabel} accent="bg-sun text-ink">
                {siteConfig.workingHours}
              </InfoRow>
              <InfoRow icon={<InstagramIcon className="size-5" />} label={c.instagramLabel} accent="bg-lilac text-white">
                <a href={instagram.url} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:text-teal-dark hover:underline">
                  {instagram.handle}
                  <span className="sr-only"> {t.common.externalHint}</span>
                </a>
              </InfoRow>
              <InfoRow
                icon={<Phone className="size-5" aria-hidden />}
                label={`${c.phoneLabel} / ${c.whatsappLabel}`}
                accent="bg-white text-teal-dark ring-2 ring-teal/30"
              >
                {phone ? (
                  <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="hover:text-teal-dark">
                    {phone}
                  </a>
                ) : (
                  <span className="font-semibold text-ink-soft">{c.phoneSoon}</span>
                )}
              </InfoRow>
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href={instagram.url} target="_blank" rel="noopener noreferrer" className={buttonClass("coral")}>
                <InstagramIcon className="size-4" />
                {c.instagramButton}
                <span className="sr-only">{t.common.externalHint}</span>
              </a>
              <a href={mapsLinks.google} target="_blank" rel="noopener noreferrer" className={buttonClass("secondary")}>
                <Navigation className="size-4" aria-hidden />
                {c.mapButton}
                <span className="sr-only">{t.common.externalHint}</span>
              </a>
              {whatsapp && (
                <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className={buttonClass("primary")}>
                  <WhatsAppIcon className="size-4" />
                  {c.whatsappButton}
                  <span className="sr-only">{t.common.externalHint}</span>
                </a>
              )}
              {phone && (
                <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className={buttonClass("secondary")}>
                  <Phone className="size-4" aria-hidden />
                  {c.callButton}
                </a>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col">
            <div className="relative min-h-[300px] flex-1 overflow-hidden rounded-[40px] rounded-tr-[100px] bg-white shadow-lift ring-[6px] ring-white sm:min-h-[380px]">
              <iframe
                title={c.mapTitle}
                src={mapsLinks.embed}
                className="absolute inset-0 size-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <p className="mt-3 flex items-center gap-1.5 px-2 text-xs font-semibold text-ink-soft">
              <MapPin className="size-3.5 shrink-0" aria-hidden />
              {c.mapNote}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
