"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import Button from "./Button";
import { brand } from "@/config/brand";

const links = [
  { href: "#services", label: "Services" },
  { href: "#savoir-faire", label: "Savoir-faire" },
  { href: "#pourquoi-nous", label: "Pourquoi nous" },
  { href: "#pros-particuliers", label: "Pros & particuliers" },
  { href: "#realisations", label: "Réalisations" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-iron/85 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-[72px] items-center justify-between">
        <a href="#top" aria-label="Accueil" className="relative z-10">
          <Logo />
        </a>

        <nav className="hidden items-center gap-6 xl:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="whitespace-nowrap text-[0.76rem] font-medium uppercase tracking-[0.12em] text-chrome/80 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={brand.phones[0].href}
            className="hidden items-center gap-2 whitespace-nowrap text-sm font-semibold text-white hover:text-flame 2xl:flex"
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
          onClick={() => setOpen((v) => !v)}
          className="relative z-10 flex h-11 w-11 items-center justify-center rounded-md border border-white/10 xl:hidden"
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-5 bg-white transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`}
            />
            <span
              className={`absolute left-0 top-1.5 h-0.5 w-5 bg-white transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`absolute left-0 top-3 h-0.5 w-5 bg-white transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-0 bg-iron/97 backdrop-blur-lg transition-opacity duration-300 xl:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="container-x flex h-full flex-col justify-center gap-2 pt-16">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
              className={`font-display text-4xl text-white transition-all duration-300 ${
                open ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
              }`}
            >
              {l.label}
            </a>
          ))}
          <div className="mt-8 flex flex-col gap-3">
            <Button href="#contact" size="lg" className="w-full">
              Demander un devis
            </Button>
            <Button
              href={brand.phones[0].href}
              variant="ghost"
              size="lg"
              className="w-full"
            >
              <PhoneIcon /> {brand.phones[0].label}
            </Button>
          </div>
        </div>
      </div>
    </header>
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
