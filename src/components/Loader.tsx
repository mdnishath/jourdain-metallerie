"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "@/components/ui/Logo";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { world } from "@/lib/world";

/**
 * Écran d'accueil : chauffe → 100 % → la caméra franchit le portail (intro), puis le scroll est rendu.
 */
export default function Loader() {
  const [pct, setPct] = useState(0);
  const [gone, setGone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const lock = () => {
      html.style.overflow = "hidden";
      world.lenis?.stop();
    };
    const unlock = () => {
      html.style.overflow = "";
      world.lenis?.start();
    };
    lock();
    window.scrollTo(0, 0);

    const finish = () => {
      world.intro = 1;
      world.introDone = true;
      unlock();
      window.dispatchEvent(new Event("world:intro"));
    };

    if (prefersReducedMotion()) {
      setGone(true);
      finish();
      return;
    }

    const started = performance.now();
    let raf = 0;
    let done = false;
    const tick = () => {
      const elapsed = performance.now() - started;
      // fake progress to 92 % over ~1.4 s, then wait for the first frame
      const fake = Math.min(92, (elapsed / 1400) * 92);
      setPct(Math.round(fake));
      const timeout = elapsed > 7000;
      if ((world.ready && elapsed > 1100) || timeout) {
        done = true;
        setPct(100);
        gsap.to(ref.current, {
          autoAlpha: 0,
          duration: 0.7,
          delay: 0.25,
          ease: "power2.inOut",
          onComplete: () => setGone(true),
        });
        gsap.to(world, {
          intro: 1,
          duration: 2.8,
          delay: 0.35,
          ease: "power2.inOut",
          onComplete: finish,
        });
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      if (!done) unlock();
    };
  }, []);

  if (gone) return null;

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-iron"
      role="status"
      aria-live="polite"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(255,106,26,0.14),transparent_55%)]" />
      <Logo className="relative scale-125" />
      <div className="relative mt-10 w-56">
        <div className="h-px w-full bg-white/10">
          <div className="h-px bg-ember transition-[width] duration-150" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-3 flex justify-between text-[0.62rem] uppercase tracking-[0.28em] text-mist">
          <span>Chauffe de l&apos;acier</span>
          <span className="tabular-nums text-chrome">{pct}%</span>
        </div>
      </div>
    </div>
  );
}
