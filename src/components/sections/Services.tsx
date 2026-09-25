"use client";

import { useRef } from "react";
import Reveal from "@/components/ui/Reveal";

const services = [
  {
    title: "Escaliers sur mesure",
    text: "Droits, quart tournant, hélicoïdaux. Structure acier, marches bois, verre ou métal.",
    icon: StairsIcon,
  },
  {
    title: "Portails",
    text: "Battants ou coulissants, motorisés ou manuels. Barreaudés, pleins, contemporains.",
    icon: GateIcon,
  },
  {
    title: "Portes métalliques",
    text: "Portes d'entrée, portes de service, portes coupe-feu et portes d'atelier.",
    icon: DoorIcon,
  },
  {
    title: "Garde-corps",
    text: "Intérieur, extérieur, balcons, mezzanines. Conformes aux normes en vigueur.",
    icon: RailIcon,
  },
  {
    title: "Clôtures",
    text: "Panneaux, barreaudage, claustras. Pour délimiter et sécuriser vos extérieurs.",
    icon: FenceIcon,
  },
  {
    title: "Serrurerie & réparation",
    text: "Dépannage, remplacement, renforcement. Intervention rapide sur Caen et le Calvados.",
    icon: KeyIcon,
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="mb-14 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-ember">
              <span className="h-px w-8 bg-ember" />
              Nos services
            </p>
            <h2 className="font-display text-[clamp(2.6rem,6vw,4.8rem)] leading-[0.95] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.6)]">
              Tout ce qui se fabrique
              <br />
              <span className="metal-text">en métal.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="glass max-w-sm rounded-lg px-5 py-4 text-sm leading-relaxed text-chrome/85 md:text-base">
              Acier, inox, aluminium. Chaque ouvrage est dessiné, fabriqué et posé
              par notre équipe, pour les particuliers comme pour les
              professionnels.
            </p>
          </Reveal>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} as="li" delay={(i % 3) * 0.08}>
              <TiltCard>
                <div className="flex h-full flex-col p-7">
                  <span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-flame">
                    <s.icon />
                  </span>
                  <h3 className="font-display text-3xl tracking-wide text-white">
                    {s.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-chrome/75">
                    {s.text}
                  </p>
                  <a
                    href="#contact"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ember transition-colors hover:text-flame"
                  >
                    En savoir plus
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-y * 6}deg) rotateY(${x * 8}deg) translateY(-4px)`;
    el.style.setProperty("--mx", `${(x + 0.5) * 100}%`);
    el.style.setProperty("--my", `${(y + 0.5) * 100}%`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="glass group relative h-full rounded-xl transition-[transform,border-color,box-shadow] duration-300 ease-out will-change-transform hover:border-ember/40 hover:shadow-glow"
      style={
        {
          "--mx": "50%",
          "--my": "50%",
        } as React.CSSProperties
      }
    >
      {/* metal sheen following the cursor */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(500px circle at var(--mx) var(--my), rgba(255,154,60,0.14), transparent 45%)",
        }}
      />
      {children}
    </div>
  );
}

/* ── icons (stroke, 24px) ─────────────────────────────────── */
const ic = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-6 w-6",
  "aria-hidden": true,
};
function StairsIcon() {
  return (
    <svg {...ic}>
      <path d="M3 20h4v-4h4v-4h4V8h4V4" />
      <path d="M3 20V4" />
    </svg>
  );
}
function GateIcon() {
  return (
    <svg {...ic}>
      <path d="M3 21V6M21 21V6M7 21V9M11 21V8M15 21V9M19 21V8" />
      <path d="M3 10c3-3 6-3 9-3s6 0 9 3" />
      <path d="M2 21h20" />
    </svg>
  );
}
function DoorIcon() {
  return (
    <svg {...ic}>
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <path d="M15 12h.01M5 21h14" />
    </svg>
  );
}
function RailIcon() {
  return (
    <svg {...ic}>
      <path d="M3 8h18M4 8v13M20 8v13M8 8v13M12 8v13M16 8v13" />
      <path d="M3 14h18" />
    </svg>
  );
}
function FenceIcon() {
  return (
    <svg {...ic}>
      <path d="M5 21V7l-1-2 1-2 1 2-1 2M12 21V7l-1-2 1-2 1 2-1 2M19 21V7l-1-2 1-2 1 2-1 2" />
      <path d="M2 11h20M2 17h20" />
    </svg>
  );
}
function KeyIcon() {
  return (
    <svg {...ic}>
      <circle cx="8" cy="15" r="4" />
      <path d="M10.85 12.15 19 4M18 5l2 2M15 8l2 2" />
    </svg>
  );
}
