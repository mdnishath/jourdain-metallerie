import Reveal from "@/components/ui/Reveal";
import { WORKS } from "@/config/works";

/**
 * La galerie est en 3D derrière (plaques d'acier flottantes) : ici on laisse
 * la place à la scène, avec un simple sommaire. Les vraies photos viendront
 * remplacer les plaques.
 */
export default function Realisations() {
  return (
    <section id="realisations" className="relative min-h-[170vh] py-24 md:py-32">
      <div className="container-x">
        <div className="max-w-xl">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-ember">
              <span className="h-px w-8 bg-ember" />
              Réalisations
            </p>
            <h2 className="font-display text-[clamp(2.6rem,6vw,4.8rem)] leading-[0.95] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.6)]">
              Fabriqué ici,
              <br />
              <span className="metal-text">posé chez vous.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="glass mt-6 inline-block rounded-lg px-5 py-4 text-sm leading-relaxed text-chrome/85 md:text-base">
              Une sélection de chantiers récents à Caen et dans le Calvados.
              Traversez la galerie en faisant défiler.
            </p>
          </Reveal>
        </div>

        <ul className="mt-10 flex max-w-xl flex-wrap gap-2">
          {WORKS.map((w, i) => (
            <Reveal key={w.title} as="li" delay={i * 0.05} y={14}>
              <a
                href="#contact"
                className="glass flex items-center gap-3 rounded-md px-4 py-2.5 text-sm text-chrome/90 transition-colors hover:border-ember/50 hover:text-white"
              >
                <span className="font-display text-lg text-ember">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  {w.title}
                  <span className="text-mist"> · {w.place}</span>
                </span>
              </a>
            </Reveal>
          ))}
        </ul>

        <p className="mt-6 text-xs text-mist/80">Photos de l&apos;atelier et des chantiers à venir.</p>
      </div>
    </section>
  );
}
