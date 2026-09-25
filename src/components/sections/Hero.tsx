"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import Button from "@/components/ui/Button";
import { PhoneIcon } from "@/components/ui/Nav";
import { brand } from "@/config/brand";
import { useIsMobile, useWebGL } from "@/lib/hooks";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  const mobile = useIsMobile();
  const webgl = useWebGL();
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from("[data-hero='eyebrow']", { y: 20, autoAlpha: 0, duration: 0.7, delay: 0.15 })
        .from("[data-hero='line']", { y: 60, autoAlpha: 0, duration: 1, stagger: 0.12 }, "-=0.4")
        .from("[data-hero='copy']", { y: 24, autoAlpha: 0, duration: 0.8 }, "-=0.5")
        .from("[data-hero='cta']", { y: 20, autoAlpha: 0, duration: 0.7, stagger: 0.08 }, "-=0.5")
        .from("[data-hero='trust']", { autoAlpha: 0, duration: 0.8 }, "-=0.3")
        .from("[data-hero='canvas']", { autoAlpha: 0, scale: 0.96, duration: 1.4 }, 0.2);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={root}
      className="grain relative flex min-h-[100svh] items-center overflow-hidden bg-iron"
    >
      {/* background: radial ember + vignette */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-1/2 h-[80vh] w-[80vh] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,106,26,0.16)_0%,rgba(255,106,26,0)_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,11,1)_0%,rgba(10,10,11,0.85)_35%,rgba(10,10,11,0.2)_65%,rgba(10,10,11,0)_100%)] md:bg-[linear-gradient(90deg,rgba(10,10,11,1)_0%,rgba(10,10,11,0.92)_30%,rgba(10,10,11,0.35)_55%,rgba(10,10,11,0)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-iron to-transparent" />
      </div>

      {/* 3D gate */}
      <div
        data-hero="canvas"
        className="absolute inset-y-0 right-0 w-full md:w-[62%]"
        aria-hidden="true"
      >
        {webgl && <HeroScene mobile={mobile} />}
        {webgl === false && (
          <div className="metal-plate h-full w-full opacity-40" />
        )}
        {/* mobile: keep the headline readable over the gate */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,11,0.55)_0%,rgba(10,10,11,0.35)_45%,rgba(10,10,11,0.75)_100%)] md:hidden" />
      </div>

      {/* content */}
      <div className="container-x relative z-10 pb-24 pt-32 md:pb-28 md:pt-36">
        <div className="max-w-2xl">
          <p
            data-hero="eyebrow"
            className="mb-6 flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-ember"
          >
            <span className="h-px w-8 bg-ember" />
            Métallerie · Serrurerie · Carpiquet, près de Caen
          </p>

          <h1 className="font-display text-[clamp(3.4rem,10vw,7.6rem)] leading-[0.9] text-white">
            <span data-hero="line" className="block">
              Le métal,
            </span>
            <span data-hero="line" className="metal-text block">
              façonné
            </span>
            <span data-hero="line" className="block">
              sur mesure.
            </span>
          </h1>

          <p
            data-hero="copy"
            className="mt-7 max-w-xl text-base leading-relaxed text-chrome/85 md:text-lg"
          >
            Escaliers, portails, portes, garde-corps et clôtures fabriqués dans
            notre atelier depuis plus de {brand.yearsOfExperience} ans. Du plan à
            la pose, une seule équipe, des délais tenus.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <span data-hero="cta">
              <Button href="#contact" size="lg" className="w-full sm:w-auto">
                Demander un devis
              </Button>
            </span>
            <span data-hero="cta">
              <Button
                href={brand.phones[0].href}
                variant="ghost"
                size="lg"
                className="w-full sm:w-auto"
              >
                <PhoneIcon /> {brand.phones[0].label}
              </Button>
            </span>
          </div>

          <ul
            data-hero="trust"
            className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-[0.8rem] uppercase tracking-[0.16em] text-mist"
          >
            <li className="flex items-center gap-2">
              <Dot /> + de {brand.yearsOfExperience} ans d&apos;atelier
            </li>
            <li className="flex items-center gap-2">
              <Dot /> Réponse sous 48 h
            </li>
            <li className="flex items-center gap-2">
              <Dot /> 100 % métal, 100 % sur mesure
            </li>
          </ul>
        </div>
      </div>

      <div className="scroll-hint absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 text-[0.65rem] uppercase tracking-[0.3em] text-mist md:block">
        Découvrir
      </div>
    </section>
  );
}

function Dot() {
  return <span className="h-1.5 w-1.5 rounded-full bg-ember" />;
}
