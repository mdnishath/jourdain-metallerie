"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import Button from "./Button";
import { brand } from "@/config/brand";
import { world } from "@/lib/world";

export const NAV_LINKS = [
  { href: "#services", id: "services", label: "Services" },
  { href: "#savoir-faire", id: "savoir-faire", label: "Savoir-faire" },
  { href: "#pourquoi-nous", id: "pourquoi-nous", label: "Pourquoi nous" },
  { href: "#pros-particuliers", id: "pros-particuliers", label: "Pros & particuliers" },
  { href: "#realisations", id: "realisations", label: "Réalisations" },
  { href: "#contact", id: "contact", label: "Contact" },
];

/** id de la section actuellement visible (pour surligner le lien) */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>("");
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        // pick the entry closest to the top that is intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive((visible[0].target as HTMLElement).id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

const IDS = NAV_LINKS.map((l) => l.id);

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const progress = useRef<HTMLDivElement>(null);
  const active = useActiveSection(IDS);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (progress.current) progress.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // lock scrolling while the mobile menu is open
  useEffect(() => {
    if (open) {
      world.lenis?.stop();
      document.body.style.overflow = "hidden";
    } else if (world.introDone) {
      world.lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // close on escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
          scrolled && !open ? "border-b border-white/5 bg-iron/80 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="flex h-[84px] w-full items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
          <a href="#top" aria-label="Accueil" className="relative z-10 shrink-0" onClick={() => setOpen(false)}>
            <Logo />
          </a>

          <nav className="hidden items-center gap-5 xl:flex 2xl:gap-7" aria-label="Navigation principale">
            {NAV_LINKS.map((l) => {
              const isActive = active === l.id;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  className={`group relative whitespace-nowrap py-2 text-[0.76rem] font-medium uppercase tracking-[0.12em] transition-colors ${
                    isActive ? "text-white" : "text-chrome/75 hover:text-white"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-ember transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          <div className="hidden shrink-0 items-center gap-4 md:flex">
            <a
              href={brand.phones[0].href}
              className="hidden items-center gap-2 whitespace-nowrap text-sm font-semibold text-white transition-colors hover:text-flame 2xl:flex"
            >
              <PhoneIcon />
              {brand.phones[0].label}
            </a>
            <Button href="#contact">Demander un devis</Button>
          </div>

          <button
            type="button"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="relative z-10 flex h-11 w-11 items-center justify-center rounded-md border border-white/12 bg-iron/40 backdrop-blur-sm xl:hidden"
          >
            <span className="relative block h-3.5 w-5">
              <span className={`absolute left-0 top-0 h-0.5 w-5 bg-white transition-transform duration-300 ${open ? "translate-y-1.5 rotate-45" : ""}`} />
              <span className={`absolute left-0 top-1.5 h-0.5 w-5 bg-white transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 top-3 h-0.5 w-5 bg-white transition-transform duration-300 ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
            </span>
          </button>
        </div>

        {/* scroll progress */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-white/5">
          <div ref={progress} className="h-px origin-left scale-x-0 bg-gradient-to-r from-ember to-flame" />
        </div>
      </header>

      {/* Mobile menu — sibling of the header so the header's backdrop-filter can't clip it */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-[45] flex flex-col bg-iron/96 backdrop-blur-xl transition-opacity duration-300 xl:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,106,26,0.18),transparent_50%)]" />
        <div className="relative flex flex-1 flex-col overflow-y-auto px-6 pb-8 pt-[100px] sm:px-10">
          <ul className="flex flex-col">
            {NAV_LINKS.map((l, i) => (
              <li key={l.href} className="border-b border-white/8">
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}
                  className={`flex items-center justify-between py-4 transition-all duration-400 ${
                    open ? "translate-x-0 opacity-100" : "-translate-x-5 opacity-0"
                  }`}
                >
                  <span className="flex items-baseline gap-4">
                    <span className="font-display text-sm text-ember">0{i + 1}</span>
                    <span className="font-display text-[2.1rem] leading-none text-white">{l.label}</span>
                  </span>
                  <span className="text-mist" aria-hidden="true">→</span>
                </a>
              </li>
            ))}
          </ul>

          <div
            style={{ transitionDelay: open ? "380ms" : "0ms" }}
            className={`mt-8 flex flex-col gap-3 transition-all duration-400 ${open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
          >
            <Button href="#contact" size="lg" className="w-full" onClick={() => setOpen(false)}>
              Demander un devis
            </Button>
            <div className="grid grid-cols-2 gap-3">
              {brand.phones.map((p) => (
                <a
                  key={p.href}
                  href={p.href}
                  className="flex h-12 items-center justify-center gap-2 rounded-md border border-chrome/25 text-sm font-semibold text-white"
                >
                  <PhoneIcon /> {p.label}
                </a>
              ))}
            </div>
          </div>

          <div
            style={{ transitionDelay: open ? "460ms" : "0ms" }}
            className={`mt-auto grid grid-cols-2 gap-6 pt-10 text-xs text-chrome/70 transition-all duration-400 ${open ? "opacity-100" : "opacity-0"}`}
          >
            <div>
              <p className="mb-2 text-[0.62rem] uppercase tracking-[0.22em] text-mist">Atelier</p>
              {brand.address.street}
              <br />
              {brand.address.zip} {brand.address.city}
            </div>
            <div>
              <p className="mb-2 text-[0.62rem] uppercase tracking-[0.22em] text-mist">Horaires</p>
              {brand.hours.slice(0, 2).map((h) => (
                <span key={h.days} className="block">
                  {h.days} · {h.time}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function PhoneIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
