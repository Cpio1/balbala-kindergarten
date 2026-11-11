"use client";

import { motion } from "motion/react";
import { Clock, ExternalLink, FileText } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useI18n } from "@/i18n/LanguageProvider";
import { buttonClass } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { StarShape } from "@/components/ui/Decor";

export function Documents() {
  const { t } = useI18n();
  const d = t.documents;
  const url = siteConfig.documentsUrl;

  return (
    <section id="documents" aria-labelledby="documents-title" className="relative bg-cream pt-6 pb-16 max-sm:pt-4 max-sm:pb-12 md:pb-24">
      <div className="mx-auto max-w-[1000px] px-4 pt-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[40px] bg-white p-6 shadow-soft max-sm:rounded-[32px] max-sm:rounded-tl-[72px] max-sm:px-5 sm:p-10 md:rounded-[64px] md:rounded-tl-[140px]">
            <span aria-hidden className="blob-4 absolute -top-16 -right-16 size-56 bg-sun-soft" />
            <span aria-hidden className="blob-2 absolute -bottom-20 -left-10 size-44 bg-teal-soft" />
            <StarShape aria-hidden className="absolute top-8 right-10 size-7 animate-float text-coral" />

            <div className="relative flex flex-col items-center gap-6 text-center max-sm:gap-4 md:flex-row md:text-left">
              <motion.div
                className="relative shrink-0"
                whileHover={{ rotate: -6, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <span aria-hidden className="absolute inset-0 translate-x-2 translate-y-2 rotate-6 rounded-[28px] bg-coral/30" />
                <span className="relative grid size-24 place-items-center rounded-[28px] bg-teal text-white shadow-lift max-sm:size-20 max-sm:rounded-[24px]">
                  <FileText className="size-11 max-sm:size-9" strokeWidth={1.8} aria-hidden />
                </span>
              </motion.div>

              <div className="flex-1">
                <span className="text-xs font-extrabold tracking-wider text-teal-dark uppercase">{d.eyebrow}</span>
                <h2 id="documents-title" className="mt-1 text-[1.75rem] leading-tight font-black text-ink max-sm:text-[1.625rem] max-[359px]:text-[1.45rem] sm:text-4xl">
                  {d.title}
                </h2>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-soft max-sm:mt-2.5 max-sm:text-[0.95rem]">{d.text}</p>
              </div>

              <div className="flex shrink-0 flex-col items-center gap-2">
                {url ? (
                  <a href={url} target="_blank" rel="noopener noreferrer" className={buttonClass("primary")}>
                    {d.button}
                    <ExternalLink className="size-4" aria-hidden />
                    <span className="sr-only">{t.common.externalHint}</span>
                  </a>
                ) : (
                  <>
                    <button
                      type="button"
                      disabled
                      aria-describedby="documents-soon"
                      className={buttonClass("primary", "opacity-55 shadow-none hover:translate-y-0 hover:bg-teal")}
                    >
                      <FileText className="size-4" aria-hidden />
                      {d.button}
                    </button>
                    <span id="documents-soon" className="inline-flex items-center gap-1.5 text-xs font-bold text-ink-soft">
                      <Clock className="size-3.5" aria-hidden />
                      {d.soon}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
