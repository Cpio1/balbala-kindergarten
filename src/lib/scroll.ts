import type { SectionId } from "@/config/site";

/** Плавная прокрутка к разделу с учётом scroll-margin-top и prefers-reduced-motion */
export function scrollToSection(id: SectionId) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  if (window.location.hash !== `#${id}`) {
    window.history.replaceState(null, "", id === "home" ? window.location.pathname : `#${id}`);
  }
}

export function onAnchorClick(id: SectionId, after?: () => void) {
  return (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    after?.();
    // ждём кадр, чтобы закрылось мобильное меню и снялась блокировка скролла
    requestAnimationFrame(() => scrollToSection(id));
  };
}
