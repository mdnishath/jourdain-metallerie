"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks";
import { world } from "@/lib/world";
import Button from "@/components/ui/Button";
import Lines from "@/components/ui/Lines";

const steps = [
  {
    n: "01",
    title: "Conception",
    text: "Nous prenons les cotes chez vous et dessinons chaque pièce au millimètre. Escalier droit, quart tournant, hélicoïdal : tout est possible.",
  },
  {
    n: "02",
    title: "Fabrication",
    text: "Découpe, cintrage, soudure : chaque élément est fabriqué dans notre atelier de Carpiquet. Acier, inox ou aluminium, selon le projet.",
  },
  {
    n: "03",
    title: "Pose",
    text: "Notre équipe installe l'ouvrage chez vous, proprement et à la date convenue. Finition thermolaquée ou brute, à votre goût.",
  },
];

export default function Forge() {
  const reduced = useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      world.forge = 1;
      setActive(2);
      setPct(100);
      return;
    }
    let last = -1;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        world.forge = self.progress;
        const idx = self.progress < 0.33 ? 0 : self.progress < 0.7 ? 1 : 2;
        if (idx !== last) {
          last = idx;
          setActive(idx);
        }
        setPct(Math.round(self.progress * 100));
      },
    });
    return () => st.kill();
  }, []);

  const textRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!textRef.current || prefersReducedMotion()) return;
    gsap.fromTo(
      textRef.current,
      { autoAlpha: 0, y: 16 },
      { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" },
    );
  }, [active]);

  const step = steps[active];

  return (
    <section
      id="savoir-faire"
      ref={wrap}
      className={`relative ${reduced ? "min-h-screen" : "h-[360vh]"}`}
    >
      <div className="sticky top-0 flex h-[100svh] items-end overflow-hidden pb-20 md:items-center md:pb-0">
        {/* readability: soft veil on the copy side / bottom on mobile */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,11,0)_0%,rgba(10,10,11,0)_38%,rgba(10,10,11,0.85)_70%,rgba(10,10,11,0.92)_100%)] md:bg-[linear-gradient(90deg,rgba(10,10,11,0.75)_0%,rgba(10,10,11,0.45)_36%,rgba(10,10,11,0)_58%)]" />

        <div className="container-x pointer-events-none relative z-10">
          <div className="pointer-events-auto max-w-md md:max-w-lg">
            <p className="mb-4 flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-ember">
              <span className="h-px w-8 bg-ember" />
              Notre savoir-faire
            </p>
            <Lines className="font-display text-[clamp(2.2rem,6vw,4.8rem)] leading-[0.95] text-white">
              <span>Un escalier</span>
              <span className="metal-text">qui se construit</span>
              <span>sous vos yeux.</span>
            </Lines>

            <div ref={textRef} className="mt-5 min-h-[7.5rem] md:mt-8 md:min-h-[9rem]">
              <p className="font-display text-4xl text-ember/90 md:text-5xl">{step.n}</p>
              <h3 className="mt-1 text-xl font-semibold text-white md:text-2xl">{step.title}</h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-chrome/85 md:mt-3 md:text-base">
                {step.text}
              </p>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/10">
                <div className="h-px bg-ember transition-[width] duration-150" style={{ width: `${pct}%` }} />
              </div>
              <span className="w-10 text-right text-xs tabular-nums text-mist">{pct}%</span>
            </div>

            <div className="mt-6 hidden md:block">
              <Button href="#contact" variant="ghost" className="backdrop-blur-sm">
                Parlons de votre escalier
              </Button>
            </div>
          </div>
        </div>

        {!reduced && (
          <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap text-[0.6rem] uppercase tracking-[0.25em] text-mist/70 md:text-[0.65rem] md:tracking-[0.3em]">
            Faites défiler pour assembler
          </div>
        )}
      </div>
    </section>
  );
}
