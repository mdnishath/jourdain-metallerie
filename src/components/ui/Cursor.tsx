"use client";

import { useEffect, useRef } from "react";

/**
 * Anneau qui suit la souris avec un léger retard et s'agrandit sur les liens.
 * Le curseur natif reste visible. Desktop (pointer: fine) uniquement.
 */
export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = ring.current;
    const d = dot.current;
    if (!r || !d) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let hover = false;
    let visible = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!visible) {
        visible = true;
        r.style.opacity = "1";
        d.style.opacity = "1";
      }
      const t = e.target as HTMLElement | null;
      hover = !!t?.closest("a, button, [role='button'], input, textarea, select, label");
    };
    const onLeave = () => {
      visible = false;
      r.style.opacity = "0";
      d.style.opacity = "0";
    };
    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      const s = hover ? 1.8 : 1;
      r.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0) scale(${s})`;
      d.style.transform = `translate3d(${x - 3}px, ${y - 3}px, 0) scale(${hover ? 0 : 1})`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={ring}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-9 w-9 rounded-full border border-ember/70 opacity-0 transition-opacity duration-300 will-change-transform xl:block"
      />
      <div
        ref={dot}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-1.5 w-1.5 rounded-full bg-ember opacity-0 transition-opacity duration-300 will-change-transform xl:block"
      />
    </>
  );
}
