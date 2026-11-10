"use client";

import { motion } from "motion/react";
import { Brain, Medal, Speech } from "lucide-react";
import { useI18n } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SaltCrystalIcon } from "@/components/ui/Icons";
import { FlowerShape, StarShape, Wave } from "@/components/ui/Decor";

const clubs = [
  {
    Icon: SaltCrystalIcon,
    card: "bg-[#EEF7FB]",
    iconBg: "bg-white text-[#4a8fb0]",
    blob: "bg-[#cfe8f3]",
    shape: "rounded-[40px] rounded-tl-[100px]",
    hover: { rotate: -1.5, y: -6 },
  },
  {
    Icon: Medal,
    card: "bg-coral-soft",
    iconBg: "bg-coral text-white",
    blob: "bg-coral/25",
    shape: "rounded-[40px] rounded-br-[100px]",
    hover: { rotate: 1.5, y: -6 },
  },
  {
    Icon: Speech,
    card: "bg-sun-soft",
    iconBg: "bg-sun text-ink",
    blob: "bg-sun/40",
    shape: "rounded-[100px_40px_100px_40px]",
    hover: { rotate: -1, y: -6 },
  },
  {
    Icon: Brain,
    card: "bg-lilac-soft",
    iconBg: "bg-lilac text-white",
    blob: "bg-lilac/30",
    shape: "rounded-[40px_100px_40px_100px]",
    hover: { rotate: 1, y: -6 },
  },
];

export function Clubs() {
  const { t } = useI18n();
  const c = t.clubs;

  return (
    <section id="clubs" aria-labelledby="clubs-title" className="relative overflow-hidden bg-white pt-4 pb-16 md:pb-24">
      <Wave className="absolute inset-x-0 -top-px h-8 w-full text-teal-soft md:h-14" flip />
      <FlowerShape aria-hidden className="absolute top-24 right-[6%] hidden size-12 animate-wiggle text-sun md:block" />
      <StarShape aria-hidden className="absolute bottom-20 left-[4%] size-7 animate-float text-teal/60" />

      <div className="relative mx-auto max-w-[1200px] px-4 pt-14 sm:px-6 md:pt-20">
        <SectionHeading id="clubs-title" eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} accent="lilac" />

        <ul className="grid gap-5 md:grid-cols-2">
          {c.items.map((item, i) => {
            const s = clubs[i];
            return (
              <Reveal
                as="li"
                key={i}
                delay={i * 0.08}
                whileHover={s.hover}
                className={cn(
                  "group relative flex flex-col items-start gap-4 overflow-hidden p-6 min-[400px]:flex-row min-[400px]:gap-5 transition-shadow duration-300 hover:shadow-lift sm:p-8",
                  s.card,
                  s.shape,
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "blob-3 absolute -right-10 -bottom-12 size-40 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12",
                    s.blob,
                  )}
                />
                <motion.span
                  className={cn("blob-1 relative grid size-16 shrink-0 place-items-center shadow-soft", s.iconBg)}
                  whileHover={{ rotate: [0, -12, 12, 0] }}
                  transition={{ duration: 0.6 }}
                >
                  <s.Icon className="size-8" aria-hidden />
                </motion.span>
                <div className="relative">
                  <h3 className="text-xl font-extrabold text-ink">{item.name}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{item.text}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
