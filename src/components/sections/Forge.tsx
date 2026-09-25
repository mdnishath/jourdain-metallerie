"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useIsMobile, useReducedMotion, useWebGL } from "@/lib/hooks";
import Button from "@/components/ui/Button";

const ForgeScene = dynamic(() => import("@/components/three/ForgeScene"), {
  ssr: false,
  loading: () => null,
});

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
  const mobile = useIsMobile();
  const reduced = useReducedMotion();
  const webgl = useWebGL();
  const wrap = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [active, setActive] = useState(0);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      progressRef.current = 1;
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
        progressRef.current = self.progress;
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

  // animate step text swaps
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
      className={`relative bg-iron ${reduced ? "min-h-screen" : "h-[320vh]"}`}
    >
      <div className="sticky top-0 flex h-[100svh] items-end overflow-hidden pb-20 md:items-center md:pb-0">
        {/* backdrop */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[90vh] w-[90vh] -translate-x-1/3 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,106,26,0.10)_0%,rgba(255,106,26,0)_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_40%,rgba(10,10,11,0.9)_100%)]" />
        </div>
        {/* mobile: fade the bottom so the copy stays readable over the 3D */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[62%] bg-[linear-gradient(180deg,rgba(10,10,11,0)_0%,rgba(10,10,11,0.85)_35%,rgba(10,10,11,0.95)_100%)] md:hidden" />

        {/* 3D */}
        <div className="absolute inset-0" aria-hidden="true">
          {webgl && <ForgeScene progressRef={progressRef} mobile={mobile} />}
          {webgl === false && (
            <div className="flex h-full items-center justify-center">
              <span className="font-display text-[18vw] leading-none text-white/5">
                ESCALIER
              </span>
            </div>
          )}
        </div>

        {/* overlay copy */}
        <div className="container-x relative z-10 pointer-events-none">
          <div className="max-w-md pointer-events-auto md:max-w-lg">
            <p className="mb-4 flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-ember">
              <span className="h-px w-8 bg-ember" />
              Notre savoir-faire
            </p>
            <h2 className="font-display text-[clamp(2.2rem,6vw,4.8rem)] leading-[0.95] text-white">
              Un escalier
              <br />
              <span className="metal-text">qui se construit</span>
              <br />
              sous vos yeux.
            </h2>

            <div ref={textRef} className="mt-5 min-h-[7.5rem] md:mt-8 md:min-h-[9rem]">
              <p className="font-display text-4xl text-ember/90 md:text-5xl">{step.n}</p>
              <h3 className="mt-1 text-xl font-semibold text-white md:text-2xl">
                {step.title}
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-chrome/80 md:mt-3 md:text-base">
                {step.text}
              </p>
            </div>

            {/* progress */}
            <div className="mt-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/10">
                <div
                  className="h-px bg-ember transition-[width] duration-150"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="w-10 text-right text-xs tabular-nums text-mist">
                {pct}%
              </span>
            </div>

            <div className="mt-6 hidden md:block">
              <Button href="#contact" variant="ghost">
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
