"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Адаптивный видеоплеер: крупная кнопка воспроизведения поверх кадра,
 * после старта — стандартные элементы управления браузера.
 * Видео не запускается само и не включает звук автоматически.
 */
export function VideoPlayer({
  src,
  label,
  playLabel,
  className,
  buttonClassName,
}: {
  src: string;
  label: string;
  playLabel: string;
  className?: string;
  buttonClassName?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);

  // Если запустили другое видео на странице — ставим это на паузу
  useEffect(() => {
    const onOtherPlay = (e: Event) => {
      if (e.target !== ref.current && e.target instanceof HTMLVideoElement) ref.current?.pause();
    };
    document.addEventListener("play", onOtherPlay, true);
    return () => document.removeEventListener("play", onOtherPlay, true);
  }, []);

  const play = () => {
    const v = ref.current;
    if (!v) return;
    setStarted(true);
    v.play().catch(() => setStarted(false));
  };

  return (
    <div className={cn("relative overflow-hidden bg-ink/10", className)}>
      <video
        ref={ref}
        // #t=0.1 — чтобы на iOS/Safari показывался первый кадр вместо чёрного экрана
        src={`${src}#t=0.1`}
        className="block size-full object-cover"
        controls={started}
        playsInline
        preload="metadata"
        aria-label={label}
        onPlay={() => {
          setStarted(true);
          setPlaying(true);
        }}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false);
          setStarted(false);
        }}
      />

      {!playing && !started && (
        <button
          type="button"
          onClick={play}
          aria-label={`${playLabel}: ${label}`}
          className="group absolute inset-0 grid place-items-center bg-gradient-to-t from-ink/45 via-ink/5 to-transparent"
        >
          <span
            className={cn(
              "relative grid size-16 place-items-center rounded-full bg-white text-coral shadow-lift transition duration-300 group-hover:scale-110 max-[359px]:size-12 sm:size-20",
              buttonClassName,
            )}
          >
            <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-white/60 [animation-duration:2.2s]" />
            <Play className="relative ml-1 size-7 fill-current max-[359px]:size-5 sm:size-8" aria-hidden />
          </span>
        </button>
      )}
    </div>
  );
}
