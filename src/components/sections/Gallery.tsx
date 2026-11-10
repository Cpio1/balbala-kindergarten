"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  BookOpen,
  Castle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Heart,
  ImageIcon,
  Palette,
  PartyPopper,
  Shapes,
  TreePine,
  Trophy,
  X,
  ZoomIn,
} from "lucide-react";
import { useI18n } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonClass } from "@/components/ui/Button";

const INITIAL_COUNT = 6;

const shapes = [
  "rounded-[36px] rounded-tl-[90px]",
  "blob-1",
  "rounded-[36px] rounded-br-[90px]",
  "rounded-[90px_36px_90px_36px]",
  "blob-3",
  "rounded-[36px] rounded-tr-[90px]",
];

const placeholderStyles = [
  { Icon: Shapes, bg: "bg-teal-soft", fg: "text-teal-dark", dot: "bg-teal" },
  { Icon: Palette, bg: "bg-coral-soft", fg: "text-coral-dark", dot: "bg-coral" },
  { Icon: Trophy, bg: "bg-sun-soft", fg: "text-[#a97a10]", dot: "bg-sun" },
  { Icon: TreePine, bg: "bg-[#e3f4e6]", fg: "text-[#3f8f5a]", dot: "bg-[#7cc79a]" },
  { Icon: PartyPopper, bg: "bg-lilac-soft", fg: "text-[#6b5bd0]", dot: "bg-lilac" },
  { Icon: BookOpen, bg: "bg-teal-soft", fg: "text-teal-dark", dot: "bg-sun" },
  { Icon: Heart, bg: "bg-coral-soft", fg: "text-coral-dark", dot: "bg-teal" },
  { Icon: Castle, bg: "bg-sun-soft", fg: "text-[#a97a10]", dot: "bg-lilac" },
];

type Item = { kind: "photo"; src: string } | { kind: "placeholder"; index: number };

function Placeholder({ index, label, badge, large = false }: { index: number; label: string; badge: string; large?: boolean }) {
  const p = placeholderStyles[index % placeholderStyles.length];
  return (
    <div className={cn("relative grid size-full place-items-center overflow-hidden", p.bg)}>
      <span aria-hidden className={cn("blob-2 absolute -top-6 -left-6 size-24 opacity-40", p.dot)} />
      <span aria-hidden className={cn("blob-4 absolute -right-8 -bottom-8 size-28 opacity-30", p.dot)} />
      <div className={cn("relative flex flex-col items-center gap-2 text-center", p.fg)}>
        <p.Icon className={large ? "size-20" : "size-10 sm:size-12"} strokeWidth={1.6} aria-hidden />
        <span className={cn("font-extrabold", large ? "text-2xl" : "text-sm sm:text-base")}>{label}</span>
      </div>
      <span className="absolute bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-white/80 px-2 py-0.5 text-[0.65rem] font-bold whitespace-nowrap text-ink-soft">
        <ImageIcon className="size-3" aria-hidden />
        {badge}
      </span>
    </div>
  );
}

export function Gallery({ photos }: { photos: string[] }) {
  const { t } = useI18n();
  const g = t.gallery;
  const hasPhotos = photos.length > 0;

  const items: Item[] = hasPhotos
    ? photos.map((src) => ({ kind: "photo", src }))
    : g.placeholders.map((_, index) => ({ kind: "placeholder", index }));

  const [expanded, setExpanded] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const visible = expanded ? items : items.slice(0, INITIAL_COUNT);
  const canExpand = items.length > INITIAL_COUNT;

  const close = useCallback(() => {
    setOpenIndex(null);
    triggerRef.current?.focus();
  }, []);

  const go = useCallback(
    (step: number) => {
      setDirection(step);
      setOpenIndex((i) => (i === null ? i : (i + step + items.length) % items.length));
    },
    [items.length],
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex, close, go]);

  const current = openIndex !== null ? items[openIndex] : null;

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="relative bg-cream py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <SectionHeading id="gallery-title" eyebrow={g.eyebrow} title={g.title} subtitle={g.subtitle} accent="teal" />

        {!hasPhotos && (
          <p className="-mt-6 mb-8 text-center text-sm font-semibold text-ink-soft md:-mt-8">{g.placeholderNote}</p>
        )}

        <ul className="mx-auto grid max-w-[960px] grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">
          <AnimatePresence initial={false}>
            {visible.map((item, i) => (
              <motion.li
                key={item.kind === "photo" ? item.src : `ph-${item.index}`}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (i % INITIAL_COUNT) * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className={cn(i % 3 === 1 && "md:translate-y-6")}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    triggerRef.current = e.currentTarget;
                    setDirection(0);
                    setOpenIndex(i);
                  }}
                  aria-label={`${g.open}: ${item.kind === "photo" ? `${g.photoAlt} ${i + 1}` : g.placeholders[item.index]}`}
                  className={cn(
                    "group relative block aspect-square w-full overflow-hidden shadow-soft transition duration-300 hover:shadow-lift",
                    shapes[i % shapes.length],
                  )}
                >
                  {item.kind === "photo" ? (
                    <Image
                      src={item.src}
                      alt={`${g.photoAlt} ${i + 1}`}
                      fill
                      sizes="(min-width: 768px) 33vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="size-full transition-transform duration-500 group-hover:scale-105">
                      <Placeholder index={item.index} label={g.placeholders[item.index]} badge={g.placeholderBadge} />
                    </div>
                  )}
                  <span className="absolute top-3 right-3 grid size-9 scale-75 place-items-center rounded-full bg-white/90 text-ink opacity-0 shadow-soft transition duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <ZoomIn className="size-4" aria-hidden />
                  </span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        {canExpand && (
          <Reveal className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className={buttonClass("coral")}
            >
              {expanded ? g.showLess : g.showMore}
              {expanded ? <ChevronUp className="size-4" aria-hidden /> : <ChevronDown className="size-4" aria-hidden />}
            </button>
          </Reveal>
        )}
      </div>

      {/* Лайтбокс */}
      <AnimatePresence>
        {current && openIndex !== null && (
          <motion.div
            key="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={g.title}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/85 p-3 backdrop-blur-sm sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label={g.close}
              className="absolute top-3 right-3 z-10 grid size-11 place-items-center rounded-full bg-white text-ink shadow-lift transition hover:bg-coral hover:text-white sm:top-5 sm:right-5"
            >
              <X className="size-5" />
            </button>

            {items.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(-1);
                  }}
                  aria-label={g.prev}
                  className="absolute left-2 z-10 hidden size-11 place-items-center rounded-full bg-white/90 text-ink shadow-lift transition hover:bg-white sm:left-5 sm:grid"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(1);
                  }}
                  aria-label={g.next}
                  className="absolute right-2 z-10 hidden size-11 place-items-center rounded-full bg-white/90 text-ink shadow-lift transition hover:bg-white sm:right-5 sm:grid"
                >
                  <ChevronRight className="size-5" />
                </button>
              </>
            )}

            <AnimatePresence mode="popLayout" initial={false} custom={direction}>
              <motion.div
                key={openIndex}
                custom={direction}
                className="relative flex h-[min(78dvh,900px)] w-full max-w-5xl touch-pan-y items-center justify-center"
                initial={{ opacity: 0, x: direction * 60, scale: direction === 0 ? 0.94 : 1 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: direction * -60 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                drag={items.length > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) go(1);
                  else if (info.offset.x > 60) go(-1);
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {current.kind === "photo" ? (
                  <Image
                    src={current.src}
                    alt={`${g.photoAlt} ${openIndex + 1}`}
                    fill
                    sizes="100vw"
                    className="pointer-events-none rounded-3xl object-contain select-none"
                    draggable={false}
                  />
                ) : (
                  <div className="mx-auto aspect-square h-auto max-h-full w-full max-w-[min(78dvh,640px)] overflow-hidden rounded-[48px]">
                    <Placeholder
                      index={current.index}
                      label={g.placeholders[current.index]}
                      badge={g.placeholderBadge}
                      large
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {items.length > 1 && (
              <p className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-3 py-1 text-sm font-bold text-ink" aria-live="polite">
                {openIndex + 1} / {items.length}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
