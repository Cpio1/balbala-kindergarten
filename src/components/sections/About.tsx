"use client";

import { motion } from "motion/react";
import { BookOpen, Puzzle, ShieldCheck, Sparkles } from "lucide-react";
import { useI18n } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FlowerShape, StarShape } from "@/components/ui/Decor";

const statStyles = [
  { bg: "bg-teal", text: "text-white", shape: "blob-1", rotate: "-rotate-3" },
  { bg: "bg-sun", text: "text-ink", shape: "blob-2", rotate: "rotate-2" },
  { bg: "bg-coral", text: "text-white", shape: "blob-3", rotate: "rotate-3" },
  { bg: "bg-white", text: "text-ink", shape: "blob-4", rotate: "-rotate-2" },
];

const featureIcons = [ShieldCheck, Puzzle, BookOpen, Sparkles];
const featureAccents = [
  "bg-teal-soft text-teal-dark",
  "bg-sun-soft text-[#a97a10]",
  "bg-coral-soft text-coral-dark",
  "bg-lilac-soft text-[#6b5bd0]",
];

export function About({ video }: { video: string | null }) {
  const { t } = useI18n();
  const a = t.about;

  return (
    <section id="about" aria-labelledby="about-title" className="relative bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionHeading id="about-title" eyebrow={a.eyebrow} title={a.title} align="left" />
            <Reveal delay={0.05}>
              <p className="-mt-4 text-base leading-relaxed text-ink-soft md:text-lg">{a.text}</p>
            </Reveal>
          </div>

          {/* Показатели */}
          <div className="relative">
          <StarShape aria-hidden className="absolute -top-7 right-6 z-10 size-8 animate-float text-sun" />
          <ul className="grid grid-cols-2 gap-4 sm:gap-5">
            {a.stats.map((s, i) => {
              const st = statStyles[i];
              return (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: 1.04, rotate: 0 }}
                  className={cn(
                    "flex aspect-[5/4] flex-col items-center justify-center p-4 text-center shadow-soft",
                    st.bg,
                    st.text,
                    st.shape,
                    st.rotate,
                    i === 3 && "ring-2 ring-teal/30",
                  )}
                >
                  <span className={cn("leading-none font-black", s.value.length > 4 ? "text-2xl sm:text-3xl" : "text-4xl sm:text-5xl")}>
                    {s.value}
                  </span>
                  <span className="mt-2 text-sm font-bold opacity-90 sm:text-base">{s.label}</span>
                </motion.li>
              );
            })}
          </ul>
          </div>
        </div>

        {video && (
          <Reveal className="relative mt-14">
            <FlowerShape aria-hidden className="absolute -top-5 -left-3 z-10 size-12 animate-wiggle text-coral" />
            <div className="overflow-hidden rounded-[36px] bg-ink/5 shadow-lift ring-[6px] ring-cream md:rounded-[56px]">
              <video
                className="aspect-video w-full bg-ink/10 object-cover"
                src={video}
                controls
                playsInline
                preload="metadata"
                aria-label={a.videoLabel}
              />
            </div>
          </Reveal>
        )}

        {/* Преимущества */}
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {a.features.map((f, i) => {
            const Icon = featureIcons[i];
            return (
              <Reveal
                as="li"
                key={i}
                delay={i * 0.06}
                className="group h-full rounded-[28px] rounded-tr-[64px] bg-cream p-5 transition-shadow duration-300 hover:shadow-lift"
                whileHover={{ y: -4 }}
              >
                  <span
                    className={cn(
                      "blob-2 grid size-12 place-items-center transition-transform duration-300 group-hover:rotate-12",
                      featureAccents[i],
                    )}
                  >
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-lg leading-snug font-extrabold text-ink">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{f.text}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
