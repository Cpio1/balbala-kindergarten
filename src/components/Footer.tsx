"use client";

import { Clock, MapPin } from "lucide-react";
import { navSections, siteConfig } from "@/config/site";
import { useI18n } from "@/i18n/LanguageProvider";
import { onAnchorClick } from "@/lib/scroll";
import { InstagramIcon } from "@/components/ui/Icons";
import { Wave } from "@/components/ui/Decor";
import { Logo } from "./Logo";

export function Footer({ logo }: { logo: string | null }) {
  const { t, locale } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-ink pt-6 text-white">
      <Wave className="absolute inset-x-0 -top-px h-8 w-full text-teal-soft md:h-12" flip />
      <div className="mx-auto grid max-w-[1200px] gap-10 px-4 pt-14 pb-10 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <span className="inline-flex rounded-[24px] bg-white/5 p-2 pr-4">
            <Logo src={logo} alt="«Балбала»" caption={t.header.logoCaption} size="lg" tone="light" />
          </span>
          <p className="mt-4 max-w-xs text-sm text-white/75">{t.footer.tagline}</p>
          <a
            href={siteConfig.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold transition hover:bg-coral"
          >
            <InstagramIcon className="size-4" />
            {siteConfig.instagram.handle}
            <span className="sr-only">{t.common.externalHint}</span>
          </a>
        </div>

        <nav aria-label={t.footer.navTitle}>
          <h2 className="text-sm font-extrabold tracking-wider text-sun uppercase">{t.footer.navTitle}</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {navSections.map((id) => (
              <li key={id}>
                <a href={`#${id}`} onClick={onAnchorClick(id)} className="text-white/80 transition hover:text-white">
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-extrabold tracking-wider text-sun uppercase">{t.footer.contactsTitle}</h2>
          <ul className="mt-4 grid gap-3 text-sm text-white/80">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-teal" aria-hidden />
              <address className="not-italic">{siteConfig.address[locale]}</address>
            </li>
            <li className="flex gap-2">
              <Clock className="mt-0.5 size-4 shrink-0 text-teal" aria-hidden />
              {siteConfig.workingHours}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-[1200px] px-4 py-5 text-xs text-white/60 sm:px-6">
          © {year} {siteConfig.name[locale]}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
