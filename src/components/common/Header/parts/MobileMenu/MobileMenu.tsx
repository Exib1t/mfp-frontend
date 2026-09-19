"use client";

import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import IconButton from "@/components/controls/IconButton/IconButton";
import NavLink from "@/components/controls/NavLink/NavLink";
import Typography from "@/components/controls/Typography/Typography";
import { MOBILE_NAV_ITEMS } from "@/config/navigation.config";
import { cn } from "@/lib/utils/cn";

import "./MobileMenu.styles.scss";

const BASE_CLASS = "mobile-menu";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  // The panel is portalled, and document only exists after hydration.
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => setIsMounted(true), []);

  // Close after navigating away. pathname is the trigger, not a value read
  // inside — which is exactly what the rule objects to.
  // biome-ignore lint/correctness/useExhaustiveDependencies: route change is the signal
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Every way out of the menu lands the focus back on the button that opened
  // it — otherwise it falls to <body> and the next Tab starts from the top.
  const close = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  }, []);

  // Escape to close, lock body scroll, and keep focus inside the panel — the
  // links sit above the scrim, so tabbing on into the page behind it would
  // strand the focus ring somewhere invisible.
  useEffect(() => {
    if (!isOpen) return;

    panelRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, close]);

  return (
    <>
      <IconButton
        ref={triggerRef}
        className={`${BASE_CLASS}_trigger`}
        aria-label="Меню"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Menu size={20} strokeWidth={1.75} />
      </IconButton>

      {/*
       * Portalled to the body on purpose: the header carries a
       * `backdrop-filter`, which makes it the containing block for any fixed
       * descendant — the panel rendered inside it was 63px tall, the height of
       * the header itself.
       */}
      {isMounted &&
        createPortal(
          <div
            className={cn(BASE_CLASS, { "-open": isOpen })}
            aria-hidden={!isOpen}
          >
            <button
              type="button"
              className={`${BASE_CLASS}_overlay`}
              aria-label="Закрити меню"
              tabIndex={isOpen ? 0 : -1}
              onClick={close}
            />

            <div
              ref={panelRef}
              className={`${BASE_CLASS}_panel`}
              role="dialog"
              aria-modal="true"
              aria-label="Меню"
              tabIndex={-1}
            >
              <header className={`${BASE_CLASS}_head`}>
                <Typography variant="h4" as="h2">
                  Меню
                </Typography>
                <IconButton aria-label="Закрити меню" onClick={close}>
                  <X size={20} strokeWidth={1.75} />
                </IconButton>
              </header>

              <nav className={`${BASE_CLASS}_nav`}>
                {MOBILE_NAV_ITEMS.map((item) => (
                  <NavLink key={item.href} item={item} />
                ))}
              </nav>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default MobileMenu;
