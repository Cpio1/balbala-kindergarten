"use client";

import { motion } from "motion/react";
import { BookOpen, Puzzle, ShieldCheck, Sparkles } from "lucide-react";
import { useI18n } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FlowerShape, StarShape, SunShape } from "@/components/ui/Decor";
import { VideoPlayer } from "@/components/ui/VideoPlayer";

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

export function About({ videos }: { videos: string[] }) {
  const { t } = useI18n();
  const a = t.about;

  return (
    <section id="about" aria-labelledby="about-title" className="relative bg-white py-16 max-sm:py-12 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="grid items-center gap-10 max-sm:gap-8 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionHeading id="about-title" eyebrow={a.eyebrow} title={a.title} align="left" />
            <Reveal delay={0.05}>
              <p className="-mt-4 text-base leading-relaxed text-ink-soft max-sm:-mt-2 max-sm:text-[0.95rem] md:text-lg">{a.text}</p>
            </Reveal>
          </div>

          {/* Показатели */}
          <div className="relative">
          <StarShape aria-hidden className="absolute -top-7 right-6 z-10 size-8 animate-float text-sun" />
          <ul className="grid grid-cols-2 gap-4 max-sm:gap-3 sm:gap-5">
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
                    "flex aspect-[5/4] flex-col items-center justify-center p-4 text-center shadow-soft max-sm:aspect-auto max-sm:min-h-[112px] max-sm:px-3 max-sm:py-5",
                    st.bg,
                    st.text,
                    st.shape,
                    st.rotate,
                    i === 3 && "ring-2 ring-teal/30",
                  )}
                >
                  <span className={cn("leading-none font-black", s.value.length > 4 ? "text-2xl max-sm:text-[1.4rem] sm:text-3xl" : "text-4xl max-sm:text-[2.1rem] sm:text-5xl")}>
                    {s.value}
                  </span>
                  <span className="mt-2 text-sm font-bold opacity-90 max-sm:mt-1.5 max-sm:text-[0.8rem] max-sm:leading-tight sm:text-base">{s.label}</span>
                </motion.li>
              );
            })}
          </ul>
          </div>
        </div>

        {videos.length > 0 && (
          <div className="relative mx-auto mt-14 max-w-[680px] max-sm:mt-10">
            <span aria-hidden className="blob-2 pointer-events-none absolute inset-x-6 inset-y-8 -z-0 bg-teal-soft sm:inset-x-0" />
            <FlowerShape aria-hidden className="absolute -top-5 left-0 z-10 size-12 animate-wiggle text-coral sm:-left-4" />
            <SunShape aria-hidden className="absolute -right-1 -bottom-4 z-10 size-12 animate-spin-slow text-sun sm:-right-4 sm:size-14" />
            <ul
              className={cn(
                "relative grid gap-4 px-2 py-2 sm:gap-8 sm:px-6 sm:pb-12",
                videos.length === 1 ? "mx-auto max-w-[300px] grid-cols-1" : "grid-cols-2",
              )}
            >
              {videos.map((src, i) => (
                <Reveal as="li" key={src} delay={i * 0.08} className={cn("min-w-0", i % 2 === 1 && "sm:translate-y-10")}>
                  <VideoPlayer
                    src={src}
                    label={videos.length > 1 ? `${a.videoLabel} ${i + 1}` : a.videoLabel}
                    playLabel={a.videoPlay}
                    className={cn(
                      "aspect-[9/16] w-full shadow-lift ring-[5px] ring-cream sm:ring-[6px]",
                      i % 2 === 0
                        ? "rounded-[32px] rounded-tl-[72px] sm:rounded-[44px] sm:rounded-tl-[110px]"
                        : "rounded-[32px] rounded-br-[72px] sm:rounded-[44px] sm:rounded-br-[110px]",
                    )}
                    buttonClassName={i % 2 === 1 ? "text-teal" : undefined}
                  />
                </Reveal>
              ))}
            </ul>
          </div>
        )}

        {/* Преимущества */}
        <ul className="mt-14 grid gap-4 max-sm:mt-10 max-sm:gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {a.features.map((f, i) => {
            const Icon = featureIcons[i];
            return (
              <Reveal
                as="li"
                key={i}
                delay={i * 0.06}
                className="group h-full rounded-[28px] rounded-tr-[64px] bg-cream p-5 transition-shadow duration-300 hover:shadow-lift max-sm:grid max-sm:grid-cols-[auto_1fr] max-sm:gap-x-4 max-sm:rounded-[24px] max-sm:rounded-tr-[48px] max-sm:p-4"
                whileHover={{ y: -4 }}
              >
                  <span
                    className={cn(
                      "blob-2 grid size-12 place-items-center transition-transform duration-300 group-hover:rotate-12 max-sm:row-span-2 max-sm:size-11",
                      featureAccents[i],
                    )}
                  >
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-lg leading-snug font-extrabold text-ink max-sm:mt-0 max-sm:self-center max-sm:text-base">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft max-sm:col-start-2 max-sm:mt-1 max-sm:text-[0.85rem]">{f.text}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
