import type { SectionId } from "@/config/site";

/** Плавная прокрутка к разделу с учётом scroll-margin-top и prefers-reduced-motion */
export function scrollToSection(id: SectionId) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Считаем позицию вручную: scrollIntoView в части браузеров (iOS Safari)
  // игнорирует scroll-margin-top, и раздел уезжает под фиксированную шапку.
  const offset = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  const top = id === "home" ? 0 : el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
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
