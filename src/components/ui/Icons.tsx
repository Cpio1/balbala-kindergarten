import type { SVGProps } from "react";

/** Иконка Instagram (брендовые иконки отсутствуют в lucide) */
export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.4z" />
      <path d="M9 8.6c.2-.5.5-.6.8-.6h.5c.2 0 .4.1.5.4l.7 1.6c.1.3 0 .5-.2.7l-.5.5c.6 1.2 1.5 2.1 2.7 2.7l.5-.5c.2-.2.4-.3.7-.2l1.6.7c.3.1.4.3.4.5v.5c0 .3-.1.6-.6.8-1.6.7-3.9-.3-5.5-1.9C9.3 12.5 8.3 10.2 9 8.6z" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Иконка соляных кристаллов */
export function SaltCrystalIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M7 21l-3-7 3-9 3 9z" />
      <path d="M14 21l-3.5-6L14 7l3.5 8z" />
      <path d="M18.5 21l-1.8-4 1.8-5 1.8 5z" />
      <path d="M3 21h18" />
    </svg>
  );
}
