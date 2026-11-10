"use client";

import { motion } from "motion/react";
import { Apple, Banana, Carrot, Cherry, CookingPot, Grape, Milk, MoonStar, Salad, Sunrise, UtensilsCrossed, Wheat } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useI18n } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Wave } from "@/components/ui/Decor";

const meals = [
  { Icon: Sunrise, bg: "bg-sun", soft: "bg-sun-soft", text: "text-[#a97a10]" },
  { Icon: CookingPot, bg: "bg-coral", soft: "bg-coral-soft", text: "text-coral-dark" },
  { Icon: Apple, bg: "bg-teal", soft: "bg-teal-soft", text: "text-teal-dark" },
  { Icon: MoonStar, bg: "bg-lilac", soft: "bg-lilac-soft", text: "text-[#6b5bd0]" },
];

/** Продукты, расположенные по кругу вокруг «тарелки» */
const orbit = [
  { Icon: Apple, color: "bg-coral text-white" },
  { Icon: Carrot, color: "bg-sun text-ink" },
  { Icon: Milk, color: "bg-white text-teal-dark" },
  { Icon: Banana, color: "bg-sun-soft text-[#a97a10]" },
  { Icon: Grape, color: "bg-lilac text-white" },
  { Icon: Wheat, color: "bg-white text-[#a97a10]" },
  { Icon: Cherry, color: "bg-coral-soft text-coral-dark" },
  { Icon: Salad, color: "bg-teal text-white" },
];

function FoodPlate() {
  const { t } = useI18n();
  const n = t.nutrition;
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[300px] sm:max-w-[360px]">
      <div aria-hidden className="blob-4 absolute inset-[6%] bg-sun/30" />
      <div className="absolute inset-[22%] grid place-items-center rounded-full bg-white shadow-lift ring-[10px] ring-teal-soft">
        <div className="text-center">
          <UtensilsCrossed className="mx-auto size-8 text-teal" aria-hidden />
          <p className="mt-1 text-5xl leading-none font-black text-ink">{siteConfig.mealsPerDay}</p>
          <p className="mt-1 text-xs font-extrabold tracking-wider text-ink-soft uppercase">{n.plateLabel}</p>
        </div>
      </div>
      <motion.ul
        aria-hidden
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        {orbit.map(({ Icon, color }, i) => {
          const angle = (i / orbit.length) * Math.PI * 2 - Math.PI / 2;
          const r = 42; // % от центра
          return (
            <li
              key={i}
              className={cn("absolute grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full shadow-soft sm:size-12", color)}
              style={{ left: `${50 + Math.cos(angle) * r}%`, top: `${50 + Math.sin(angle) * r}%` }}
            >
              <motion.span
                className="grid place-items-center"
                animate={{ rotate: -360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              >
                <Icon className="size-5 sm:size-6" />
              </motion.span>
            </li>
          );
        })}
      </motion.ul>
    </div>
  );
}

export function Nutrition() {
  const { t } = useI18n();
  const n = t.nutrition;

  return (
    <section id="nutrition" aria-labelledby="nutrition-title" className="relative bg-teal-soft pt-4 pb-16 md:pb-24">
      <Wave className="absolute inset-x-0 -top-px h-8 w-full text-cream md:h-14" flip />
      <div className="relative mx-auto max-w-[1200px] px-4 pt-14 sm:px-6 md:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="text-center lg:text-left">
            <SectionHeading id="nutrition-title" eyebrow={n.eyebrow} title={n.title} align="left" accent="sun" />
            <Reveal delay={0.05} className="-mt-4">
              <p className="inline-flex items-center gap-3 rounded-full bg-white py-2 pr-5 pl-2 text-base font-extrabold text-ink shadow-soft sm:text-lg">
                <span className="grid size-10 place-items-center rounded-full bg-coral text-lg font-black text-white">
                  {siteConfig.mealsPerDay}
                </span>
                {n.fact}
              </p>
              <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-ink-soft md:text-lg lg:mx-0">{n.text}</p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <FoodPlate />
          </Reveal>
        </div>

        <ol className="mt-12 grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {n.meals.map((meal, i) => {
            const m = meals[i];
            return (
              <Reveal
                as="li"
                key={i}
                delay={i * 0.07}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative flex flex-col items-center rounded-[48px] bg-white px-5 pt-6 pb-6 text-center shadow-soft transition-shadow hover:shadow-lift"
              >
                <span className={cn("absolute top-4 left-5 text-xs font-black", m.text)}>0{i + 1}</span>
                <span className={cn("grid size-20 place-items-center rounded-full transition-transform duration-500 group-hover:rotate-[20deg]", m.soft)}>
                  <span className={cn("grid size-14 place-items-center rounded-full text-white shadow-soft", m.bg)}>
                    <m.Icon className="size-7" aria-hidden />
                  </span>
                </span>
                <h3 className="mt-4 text-lg font-extrabold text-ink">{meal.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{meal.text}</p>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
