import Reveal from "@/components/ui/Reveal";

/**
 * Placeholders stylisés en attendant les vraies photos de l'atelier.
 * Pour les remplacer : ajouter `image: "/realisations/xxx.jpg"` à chaque entrée
 * et afficher un <Image> à la place de la plaque métal.
 */
const works = [
  { title: "Escalier hélicoïdal", place: "Caen", tall: true },
  { title: "Portail coulissant", place: "Carpiquet", tall: false },
  { title: "Garde-corps mezzanine", place: "Bayeux", tall: false },
  { title: "Porte d'atelier", place: "Hérouville-Saint-Clair", tall: false },
  { title: "Clôture barreaudée", place: "Ifs", tall: true },
  { title: "Escalier extérieur", place: "Bretteville-sur-Odon", tall: false },
];

export default function Realisations() {
  return (
    <section id="realisations" className="relative bg-iron py-24 md:py-32">
      <div className="container-x">
        <div className="mb-14 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-ember">
              <span className="h-px w-8 bg-ember" />
              Réalisations
            </p>
            <h2 className="font-display text-[clamp(2.6rem,6vw,4.8rem)] leading-[0.95] text-white">
              Fabriqué ici,
              <br />
              <span className="metal-text">posé chez vous.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-sm leading-relaxed text-chrome/75 md:text-base">
              Une sélection de chantiers récents à Caen et dans le Calvados.
            </p>
          </Reveal>
        </div>

        <ul className="grid auto-rows-[200px] grid-flow-dense grid-cols-2 gap-3 md:auto-rows-[240px] md:grid-cols-3 md:gap-4">
          {works.map((w, i) => (
            <Reveal
              key={w.title}
              as="li"
              delay={(i % 3) * 0.08}
              className={w.tall ? "row-span-2" : ""}
            >
              <a
                href="#contact"
                className="metal-plate group relative block h-full overflow-hidden rounded-xl border border-white/8"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,154,60,0.18),transparent_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[5rem] leading-none text-white/[0.04] md:text-[7rem]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-iron/95 to-transparent p-5">
                  <span className="block font-display text-2xl tracking-wide text-white">
                    {w.title}
                  </span>
                  <span className="block text-xs uppercase tracking-[0.18em] text-mist">
                    {w.place}
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </ul>

        <p className="mt-6 text-center text-xs text-mist/70">
          Photos de l&apos;atelier et des chantiers à venir.
        </p>
      </div>
    </section>
  );
}
