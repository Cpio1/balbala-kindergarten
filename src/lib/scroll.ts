import type { SectionId } from "@/config/site";

/**
 * Разделы, у которых прокрутка останавливается по заголовку, а не по краю секции:
 * пустой верхний отступ секции уходит под шапку, и на экран помещается больше содержимого.
 */
const HEADING_ANCHORED = new Set<SectionId>(["about", "groups", "nutrition", "clubs", "gallery", "contacts"]);

/** Зазор между нижним краем шапки и заголовком раздела, px */
const HEADING_GAP = 20;

/** Позиция элемента от начала документа без учёта transform (анимации появления не сбивают расчёт). */
function documentTop(el: HTMLElement): number {
  let top = 0;
  let node: HTMLElement | null = el;
  while (node) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return top;
}

function targetTop(id: SectionId, section: HTMLElement): number {
  if (id === "home") return 0;

  const headerH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 0;
  const heading = HEADING_ANCHORED.has(id) ? document.getElementById(`${id}-title`)?.parentElement : null;

  if (heading) return documentTop(heading) - headerH - HEADING_GAP;

  // Остальные разделы — по краю секции с учётом scroll-margin-top.
  // Считаем вручную: scrollIntoView в части браузеров (iOS Safari) игнорирует scroll-margin-top.
  const margin = parseFloat(getComputedStyle(section).scrollMarginTop) || 0;
  return documentTop(section) - margin;
}

/** Плавная прокрутка к разделу с учётом высоты шапки и prefers-reduced-motion */
export function scrollToSection(id: SectionId) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: Math.max(0, targetTop(id, el)), behavior: reduce ? "auto" : "smooth" });
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
