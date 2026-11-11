"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Clock, Heart, Languages } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useI18n } from "@/i18n/LanguageProvider";
import { onAnchorClick } from "@/lib/scroll";
import { buttonClass } from "@/components/ui/Button";
import { CloudShape, FlowerShape, SquiggleShape, StarShape, SunShape } from "@/components/ui/Decor";
import { KindergartenScene } from "@/components/illustrations/KindergartenScene";
import type { Photo } from "@/lib/assets";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero({ image }: { image: Photo | null }) {
  const { t } = useI18n();
  const h = t.hero;

  return (
    <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden pt-[var(--header-h)]">
      {/* фоновые пятна */}
      <div aria-hidden className="pointer-events-none absolute -top-24 -left-24 size-72 rounded-full bg-sun/25 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute top-1/3 -right-32 size-96 rounded-full bg-teal/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-[1200px] items-center gap-10 px-4 pt-8 pb-16 sm:px-6 md:pt-12 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pb-24">
        {/* Текст */}
        <div className="relative z-10 text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-extrabold text-coral-dark shadow-soft sm:text-sm"
          >
            <Heart className="size-4 fill-coral text-coral" aria-hidden />
            {h.subtitle}
          </motion.p>

          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="mt-5 text-[2rem] leading-[1.1] font-black text-ink min-[400px]:text-[2.25rem] sm:text-5xl lg:text-[3.4rem]"
          >
            {h.titleStart}
            <span className="relative inline-block whitespace-nowrap text-teal">
              {h.titleAccent}
              <SquiggleShape className="absolute -bottom-1.5 left-1/2 h-2.5 w-[85%] -translate-x-1/2 text-sun" />
            </span>
            {h.titleEnd}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease }}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg lg:mx-0"
          >
            {h.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease }}
            className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start"
          >
            <a href="#about" onClick={onAnchorClick("about")} className={buttonClass("primary")}>
              {h.about}
            </a>
            <a href="#contacts" onClick={onAnchorClick("contacts")} className={buttonClass("secondary")}>
              {h.contact}
            </a>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex flex-wrap justify-center gap-2.5 text-sm font-bold text-ink lg:justify-start"
          >
            <li className="inline-flex items-center gap-2 rounded-2xl bg-white/80 px-3 py-2 ring-1 ring-ink/5">
              <span className="grid size-7 place-items-center rounded-full bg-sun-soft text-[#a97a10]">
                <Clock className="size-4" aria-hidden />
              </span>
              <span>
                <span className="sr-only">{h.hoursLabel}: </span>
                {siteConfig.workingHours}
              </span>
            </li>
            <li className="inline-flex items-center gap-2 rounded-2xl bg-white/80 px-3 py-2 ring-1 ring-ink/5">
              <span className="grid size-7 place-items-center rounded-full bg-teal-soft text-teal-dark">
                <Languages className="size-4" aria-hidden />
              </span>
              {h.languageBadge}
            </li>
          </motion.ul>
        </div>

        {/* Изображение */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className="relative mx-auto w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[500px]"
        >
          <div aria-hidden className="blob-2 absolute inset-0 translate-x-3 translate-y-4 rotate-6 bg-sun sm:translate-x-5 sm:translate-y-5" />
          <div aria-hidden className="blob-3 absolute inset-0 -translate-x-3 -rotate-3 bg-coral/70" />
          <div
            className="blob-1 relative aspect-square overflow-hidden bg-teal-soft shadow-lift ring-[6px] ring-white"
            style={image ? { aspectRatio: `${image.width} / ${image.height}` } : undefined}
          >
            {image ? (
              <Image
                src={image.src}
                alt={h.imageAlt}
                fill
                priority
                quality={90}
                sizes="(min-width: 1024px) 500px, (min-width: 640px) 420px, 340px"
                className="object-cover"
              />
            ) : (
              <KindergartenScene className="size-full" label={h.illustrationLabel} />
            )}
          </div>

          {/* декоративные элементы */}
          <SunShape className="absolute -top-6 -right-2 size-14 animate-spin-slow text-sun sm:-top-8 sm:size-20" />
          <StarShape className="absolute top-8 -left-4 size-9 animate-float text-coral sm:-left-8 sm:size-11" />
          <FlowerShape className="absolute -bottom-4 left-6 hidden size-12 animate-wiggle text-lilac sm:block" />
          <CloudShape className="absolute -right-6 bottom-12 hidden w-24 animate-float-slow text-white drop-shadow-md sm:block" />
          <StarShape className="absolute right-1/4 -bottom-6 size-7 animate-float-slow text-teal" />
        </motion.div>
      </div>

      {/* плавающие фигуры по краям — скрыты на маленьких экранах */}
      <CloudShape aria-hidden className="absolute top-28 left-[42%] hidden w-20 animate-float-slow text-white lg:block" />
      <StarShape aria-hidden className="absolute bottom-16 left-6 hidden size-6 animate-float text-sun md:block" />
    </section>
  );
}
