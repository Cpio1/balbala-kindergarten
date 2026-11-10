import Image from "next/image";
import { cn } from "@/lib/cn";

type Props = {
  src: string | null;
  alt: string;
  /** Подпись рядом с логотипом */
  caption?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  tone?: "dark" | "light";
};

const heights = { sm: "h-10", md: "h-11 lg:h-12", lg: "h-16" } as const;

/** Временный знак, пока не добавлен public/images/logo.png */
function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <path d="M32 2c17 0 30 11 30 28S50 62 32 62 2 50 2 32 15 2 32 2z" fill="#51BDB0" />
      <g fill="#FFCA55">
        <circle cx="32" cy="13" r="5" />
        <circle cx="47" cy="20" r="4.5" />
        <circle cx="17" cy="20" r="4.5" />
      </g>
      <path d="M22 26h13a8.5 8.5 0 0 1 3.4 16.3A9.5 9.5 0 0 1 35 53H22z" fill="#FFF9EE" />
      <path d="M28 31.5h6.5a3.4 3.4 0 0 1 0 6.8H28zM28 43h7.5a3.6 3.6 0 0 1 0 7.2H28z" fill="#FF8B78" />
    </svg>
  );
}

export function Logo({ src, alt, caption, className, size = "md", tone = "dark" }: Props) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={200}
          height={200}
          priority
          unoptimized={src.endsWith(".svg")}
          className={cn(heights[size], "w-auto object-contain")}
        />
      ) : (
        <LogoMark className={cn(heights[size], "w-auto shrink-0")} />
      )}
      {!src && (
        <span className="flex flex-col leading-none">
          <span className={cn("text-xl font-black tracking-tight", tone === "dark" ? "text-ink" : "text-white")}>
            Балбала
          </span>
          {caption && (
            <span
              className={cn(
                "mt-1 text-[0.68rem] font-bold uppercase tracking-[0.14em]",
                tone === "dark" ? "text-teal-dark" : "text-white/80",
              )}
            >
              {caption}
            </span>
          )}
        </span>
      )}
    </span>
  );
}
