import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "coral" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[0.95rem] font-extrabold transition-all duration-300 select-none focus-visible:outline-offset-4 disabled:cursor-not-allowed";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-teal text-white shadow-[0_8px_20px_-8px_rgb(81_189_176/0.8)] hover:-translate-y-0.5 hover:bg-teal-dark hover:shadow-[0_12px_24px_-8px_rgb(47_157_144/0.8)]",
  coral:
    "bg-coral text-white shadow-[0_8px_20px_-8px_rgb(255_139_120/0.9)] hover:-translate-y-0.5 hover:bg-coral-dark",
  secondary:
    "bg-white text-ink ring-2 ring-ink/10 hover:-translate-y-0.5 hover:ring-teal hover:text-teal-dark",
  ghost: "text-ink hover:bg-ink/5",
};

export function buttonClass(variant: ButtonVariant = "primary", className?: string) {
  return cn(base, variants[variant], className);
}
