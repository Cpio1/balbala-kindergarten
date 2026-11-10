import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

export function StarShape(props: P) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden {...props}>
      <path
        d="M24 3.5c1.6 0 2.6 6.3 4.6 9.3 2.6 3.8 11.5 4.2 12 6.2.5 1.9-6.9 5.3-8.6 9-1.5 3.3 2.5 12.4.9 13.6-1.6 1.2-7.4-4.6-8.9-4.6s-7.3 5.8-8.9 4.6c-1.6-1.2 2.4-10.3.9-13.6-1.7-3.7-9.1-7.1-8.6-9 .5-2 9.4-2.4 12-6.2 2-3 3-9.3 4.6-9.3z"
        fill="currentColor"
      />
    </svg>
  );
}

export function FlowerShape(props: P) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden {...props}>
      <g fill="currentColor">
        <circle cx="24" cy="11" r="9" />
        <circle cx="36.4" cy="20" r="9" />
        <circle cx="31.6" cy="34.6" r="9" />
        <circle cx="16.4" cy="34.6" r="9" />
        <circle cx="11.6" cy="20" r="9" />
      </g>
      <circle cx="24" cy="24" r="7" fill="#FFCA55" />
    </svg>
  );
}

export function CloudShape(props: P) {
  return (
    <svg viewBox="0 0 96 56" aria-hidden {...props}>
      <path
        d="M24 54C11 54 3 47 3 38c0-9 7-15 16-15 1-11 10-20 22-20 10 0 18 6 21 15 2-1 4-1 6-1 13 0 25 9 25 20 0 10-8 17-20 17z"
        fill="currentColor"
      />
    </svg>
  );
}

export function SunShape(props: P) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden {...props}>
      <g stroke="currentColor" strokeWidth="4.5" strokeLinecap="round">
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * Math.PI) / 4;
          return (
            <line
              key={i}
              x1={32 + Math.cos(a) * 21}
              y1={32 + Math.sin(a) * 21}
              x2={32 + Math.cos(a) * 29}
              y2={32 + Math.sin(a) * 29}
            />
          );
        })}
      </g>
      <circle cx="32" cy="32" r="14" fill="currentColor" />
    </svg>
  );
}

export function SquiggleShape(props: P) {
  return (
    <svg viewBox="0 0 120 24" fill="none" aria-hidden {...props}>
      <path
        d="M3 12c9-12 18-12 27 0s18 12 27 0 18-12 27 0 18 12 27 0"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Волнистый разделитель между секциями */
export function Wave({ className, flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className={className}
      style={flip ? { transform: "scaleY(-1)" } : undefined}
      aria-hidden
    >
      <path
        d="M0 40c120-30 240-30 360 0s240 30 360 0 240-30 360 0 240 30 360 0v40H0z"
        fill="currentColor"
      />
    </svg>
  );
}
