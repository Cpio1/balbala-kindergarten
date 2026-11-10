import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  accent?: "teal" | "coral" | "sun" | "lilac";
  id?: string;
};

const accentMap = {
  teal: "bg-teal-soft text-teal-dark",
  coral: "bg-coral-soft text-coral-dark",
  sun: "bg-sun-soft text-[#a97a10]",
  lilac: "bg-lilac-soft text-[#6b5bd0]",
};

export function SectionHeading({ eyebrow, title, subtitle, align = "center", accent = "teal", id }: Props) {
  return (
    <Reveal className={cn("mb-10 md:mb-12", align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-xl")}>
      <span
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider",
          accentMap[accent],
        )}
      >
        <span className="size-1.5 rounded-full bg-current" aria-hidden />
        {eyebrow}
      </span>
      <h2 id={id} className="mt-3 text-[1.75rem] leading-tight font-black text-ink sm:text-4xl md:text-[2.6rem]">
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-base text-ink-soft md:text-lg">{subtitle}</p>}
    </Reveal>
  );
}
