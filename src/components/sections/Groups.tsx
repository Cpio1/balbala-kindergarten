"use client";

import { motion } from "motion/react";
import { Baby, Blocks, GraduationCap, Palette, Users } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useI18n } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CloudShape, StarShape } from "@/components/ui/Decor";

const cards = [
  {
    Icon: Baby,
    accent: "bg-teal",
    soft: "bg-teal-soft",
    text: "text-teal-dark",
    shape: "rounded-[32px] rounded-tl-[80px] max-sm:rounded-[26px] max-sm:rounded-tr-[56px]",
    iconAnim: { rotate: [0, -10, 10, 0] },
  },
  {
    Icon: Blocks,
    accent: "bg-sun",
    soft: "bg-sun-soft",
    text: "text-[#a97a10]",
    shape: "rounded-[32px] rounded-tr-[80px] max-sm:rounded-[26px] max-sm:rounded-br-[56px]",
    iconAnim: { y: [0, -6, 0] },
  },
  {
    Icon: Palette,
    accent: "bg-coral",
    soft: "bg-coral-soft",
    text: "text-coral-dark",
    shape: "rounded-[32px] rounded-bl-[80px] max-sm:rounded-[26px] max-sm:rounded-tr-[56px]",
    iconAnim: { rotate: [0, 15, 0] },
  },
  {
    Icon: GraduationCap,
    accent: "bg-lilac",
    soft: "bg-lilac-soft",
    text: "text-[#6b5bd0]",
    shape: "rounded-[32px] rounded-br-[80px] max-sm:rounded-[26px] max-sm:rounded-br-[56px]",
    iconAnim: { scale: [1, 1.15, 1] },
  },
];

export function Groups() {
  const { t } = useI18n();
  const g = t.groups;

  return (
    <section id="groups" aria-labelledby="groups-title" className="relative overflow-hidden bg-cream py-16 max-sm:py-12 md:py-24">
      <CloudShape aria-hidden className="absolute top-10 -left-6 hidden w-28 animate-float-slow text-white md:block" />
      <StarShape aria-hidden className="absolute top-24 right-[8%] size-8 animate-float text-coral/70 max-sm:top-8 max-sm:size-6" />

      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6">
        <SectionHeading id="groups-title" eyebrow={g.eyebrow} title={g.title} subtitle={g.subtitle} accent="coral" />

        <ul className="grid gap-5 max-sm:gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {g.items.map((item, i) => {
            const c = cards[i];
            return (
              <Reveal
                as="li"
                key={i}
                delay={i * 0.08}
                whileHover={{ y: -6 }}
                className={cn(
                  "group relative flex flex-col overflow-hidden bg-white p-6 shadow-soft transition-shadow duration-300 hover:shadow-lift max-sm:grid max-sm:grid-cols-[auto_1fr] max-sm:content-start max-sm:gap-x-4 max-sm:p-5",
                  c.shape,
                )}
              >
                <span aria-hidden className={cn("absolute -top-10 -right-10 size-28 rounded-full opacity-60 max-sm:size-24 transition-transform duration-500 group-hover:scale-125", c.soft)} />
                <motion.span
                  className={cn("blob-1 relative grid size-14 place-items-center text-white shadow-soft max-sm:row-span-3 max-sm:size-12", c.accent)}
                  whileHover={c.iconAnim}
                  transition={{ duration: 0.6 }}
                >
                  <c.Icon className="size-7 max-sm:size-6" aria-hidden />
                </motion.span>

                <span className={cn("relative mt-5 inline-flex w-fit rounded-full px-3 py-1 text-sm font-black max-sm:mt-0 max-sm:px-2.5 max-sm:py-0.5 max-sm:text-xs", c.soft, c.text)}>
                  {item.age}
                </span>
                <h3 className="relative mt-2 text-xl leading-snug font-extrabold text-ink max-sm:mt-1.5 max-sm:text-lg">{item.name}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-ink-soft max-sm:mt-1 max-sm:text-[0.85rem]">{item.text}</p>
                <span aria-hidden className="mt-auto block pt-5 max-sm:hidden">
                  <span className={cn("block h-1.5 w-12 rounded-full transition-all duration-300 group-hover:w-20", c.accent)} />
                </span>
              </Reveal>
            );
          })}
        </ul>

        <Reveal className="mt-8 max-sm:mt-4">
          <div className="relative flex flex-col items-center gap-4 overflow-hidden rounded-[40px] bg-teal px-6 py-6 text-center text-white max-sm:flex-row max-sm:rounded-[28px] max-sm:px-5 max-sm:py-5 max-sm:text-left sm:flex-row sm:rounded-full sm:px-8 sm:text-left">
            <span aria-hidden className="absolute -right-8 -bottom-12 size-36 rounded-full bg-white/10" />
            <span className="relative grid size-16 shrink-0 place-items-center rounded-full bg-white text-3xl font-black text-teal-dark max-sm:size-14 max-sm:text-2xl">
              {siteConfig.groupsCount}
            </span>
            <div className="relative">
              <p className="flex items-center justify-center gap-2 text-lg font-extrabold max-sm:justify-start max-sm:text-base sm:justify-start">
                <Users className="size-5 shrink-0" aria-hidden />
                {g.totalTitle}
              </p>
              <p className="mt-1 text-sm text-white/90 max-sm:text-[0.85rem]">{g.totalText}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
