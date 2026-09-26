"use client";

import { useEffect, useRef } from "react";
import Button from "@/components/ui/Button";
import { PhoneIcon } from "@/components/ui/Nav";
import { brand } from "@/config/brand";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { world } from "@/lib/world";

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const items = el.querySelectorAll("[data-hero]");
    gsap.set(items, { autoAlpha: 0 });

    let ctx: gsap.Context | null = null;
    const play = () => {
      ctx = gsap.context(() => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .to("[data-hero='eyebrow']", { y: 0, autoAlpha: 1, duration: 0.7 })
          .fromTo("[data-hero='line']", { y: 60 }, { y: 0, autoAlpha: 1, duration: 1, stagger: 0.12 }, "-=0.4")
          .fromTo("[data-hero='copy']", { y: 24 }, { y: 0, autoAlpha: 1, duration: 0.8 }, "-=0.5")
          .fromTo("[data-hero='cta']", { y: 20 }, { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.08 }, "-=0.5")
          .to("[data-hero='trust']", { autoAlpha: 1, duration: 0.8 }, "-=0.3")
          .to("[data-hero='hint']", { autoAlpha: 1, duration: 0.8 }, "-=0.2");
      }, el);
    };

    if (world.introDone) play();
    else window.addEventListener("world:intro", play, { once: true });

    // content drifts up and fades as we walk through the gate
    const content = el.querySelector("[data-hero-content]");
    const st = content
      ? gsap.to(content, {
          y: -90,
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "70% top", scrub: true },
        })
      : null;

    return () => {
      window.removeEventListener("world:intro", play);
      ctx?.revert();
      st?.scrollTrigger?.kill();
      st?.kill();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section
      id="top"
      ref={root}
      className="relative flex min-h-[100svh] items-center"
    >
      {/* readability veil on the text side */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,11,0.78)_0%,rgba(10,10,11,0.55)_38%,rgba(10,10,11,0.05)_70%,rgba(10,10,11,0)_100%)] md:bg-[linear-gradient(90deg,rgba(10,10,11,0.72)_0%,rgba(10,10,11,0.5)_32%,rgba(10,10,11,0)_58%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-iron/70 to-transparent" />

      <div className="container-x relative z-10 pb-24 pt-32 md:pb-28 md:pt-36">
        <div data-hero-content className="max-w-2xl">
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
            className="mt-7 max-w-xl text-base leading-relaxed text-chrome/90 md:text-lg"
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
                className="w-full backdrop-blur-sm sm:w-auto"
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

      <div
        data-hero="hint"
        className="scroll-hint absolute bottom-6 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap text-[0.65rem] uppercase tracking-[0.3em] text-mist"
      >
        Entrez dans l&apos;atelier
      </div>
    </section>
  );
}

function Dot() {
  return <span className="h-1.5 w-1.5 rounded-full bg-ember" />;
}
