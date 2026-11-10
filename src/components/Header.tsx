"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { navSections, type SectionId } from "@/config/site";
import { useI18n } from "@/i18n/LanguageProvider";
import { locales } from "@/i18n/translations";
import { onAnchorClick } from "@/lib/scroll";
import { cn } from "@/lib/cn";
import { Logo } from "./Logo";

function useActiveSection() {
  const [active, setActive] = useState<SectionId>("home");

  useEffect(() => {
    const els = navSections.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) {
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActive(visible[0].target.id as SectionId);
        }
      },
      // Раздел считается активным, когда пересекает полосу чуть ниже шапки
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return active;
}

function LanguageSwitch({ className }: { className?: string }) {
  const { locale, setLocale, t } = useI18n();
  return (
    <div role="group" aria-label={t.header.language} className={cn("relative flex rounded-full bg-white p-1 ring-1 ring-ink/10", className)}>
      {locales.map((l) => {
        const isActive = l === locale;
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLocale(l)}
            aria-pressed={isActive}
            lang={l === "kz" ? "kk" : "ru"}
            className={cn(
              "relative z-10 rounded-full px-3 py-1 text-xs font-extrabold transition-colors",
              isActive ? "text-white" : "text-ink-soft hover:text-ink",
            )}
          >
            {isActive && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 -z-10 rounded-full bg-teal"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            {l.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}

export function Header({ logo }: { logo: string | null }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Блокировка прокрутки и закрытие по Esc для мобильного меню
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const close = () => {
    document.body.style.overflow = "";
    setOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-[var(--header-h)] transition-[background-color,box-shadow] duration-300",
        scrolled || open ? "bg-cream/90 shadow-[0_6px_24px_-14px_rgb(40_67_74/0.35)] backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between gap-3 px-4 sm:px-6">
        <a href="#home" onClick={onAnchorClick("home", close)} aria-label={t.header.toHome} className="shrink-0 rounded-2xl">
          <Logo src={logo} alt="«Балбала»" caption={t.header.logoCaption} size="sm" />
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {navSections.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={onAnchorClick(id)}
                  aria-current={active === id ? "true" : undefined}
                  className={cn(
                    "relative rounded-full px-2.5 py-1.5 text-[0.86rem] font-bold whitespace-nowrap transition-colors xl:px-3 xl:text-[0.92rem]",
                    active === id ? "text-teal-dark" : "text-ink/80 hover:text-ink",
                  )}
                >
                  {active === id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-teal-soft"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitch />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.header.closeMenu : t.header.openMenu}
            className="grid size-10 place-items-center rounded-full bg-white text-ink ring-1 ring-ink/10 transition hover:bg-teal-soft lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-x-0 bottom-0 top-[var(--header-h)] bg-ink/25 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              aria-hidden
            />
            <motion.nav
              key="panel"
              id="mobile-menu"
              aria-label="Mobile"
              className="absolute inset-x-3 top-[calc(var(--header-h)+4px)] max-h-[calc(100dvh-var(--header-h)-16px)] overflow-y-auto rounded-[28px] bg-white p-3 shadow-lift lg:hidden"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <ul className="grid gap-1">
                {navSections.map((id, i) => (
                  <motion.li
                    key={id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 * i }}
                  >
                    <a
                      href={`#${id}`}
                      onClick={onAnchorClick(id, close)}
                      aria-current={active === id ? "true" : undefined}
                      className={cn(
                        "flex items-center justify-between rounded-2xl px-4 py-3 text-base font-bold transition-colors",
                        active === id ? "bg-teal-soft text-teal-dark" : "text-ink hover:bg-cream",
                      )}
                    >
                      {t.nav[id]}
                      <span
                        className={cn("size-2 rounded-full", ["bg-teal", "bg-sun", "bg-coral", "bg-lilac"][i % 4])}
                        aria-hidden
                      />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
