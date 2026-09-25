import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

const cols = [
  {
    eyebrow: "Professionnels",
    title: "Architectes, constructeurs, collectivités, industriels.",
    text: "Des ouvrages techniques, en volume, livrés dans les délais contractuels.",
    items: [
      "Ouvrages de grande ampleur et petites séries",
      "Plans d'exécution et respect des normes",
      "Délais tenus, planning partagé",
      "Un interlocuteur unique du devis à la réception",
    ],
    cta: "Devis professionnel",
  },
  {
    eyebrow: "Particuliers",
    title: "Maisons, appartements, jardins.",
    text: "Un ouvrage unique, dessiné pour chez vous, posé par ceux qui l'ont fabriqué.",
    items: [
      "Portail, escalier, garde-corps, clôture sur mesure",
      "Conseil et prise de cotes à domicile",
      "Fabrication et pose par la même équipe",
      "Finitions au choix : thermolaquage, brut, inox",
    ],
    cta: "Devis particulier",
  },
];

export default function ProsParticuliers() {
  return (
    <section id="pros-particuliers" className="relative py-24 md:py-32">
      <div className="container-x">
        <Reveal className="mb-14 max-w-2xl">
          <p className="mb-4 flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-ember">
            <span className="h-px w-8 bg-ember" />
            Pros & particuliers
          </p>
          <h2 className="font-display text-[clamp(2.6rem,6vw,4.8rem)] leading-[0.95] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.6)]">
            Le même atelier,
            <br />
            <span className="metal-text">la même exigence.</span>
          </h2>
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-2">
          {cols.map((c, i) => (
            <Reveal key={c.eyebrow} x={i === 0 ? -50 : 50} y={0}>
              <div className="glass group relative h-full overflow-hidden rounded-2xl p-8 md:p-10">
                <span className="absolute -right-10 -top-10 font-display text-[11rem] leading-none text-white/[0.03] transition-colors duration-500 group-hover:text-ember/[0.06]">
                  {i === 0 ? "PRO" : "PART"}
                </span>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-ember">
                  {c.eyebrow}
                </p>
                <h3 className="mt-3 font-display text-3xl leading-tight text-white md:text-4xl">
                  {c.title}
                </h3>
                <p className="mt-3 text-sm text-chrome/75 md:text-base">{c.text}</p>
                <ul className="mt-7 space-y-3">
                  {c.items.map((it) => (
                    <li key={it} className="flex gap-3 text-sm text-chrome/85 md:text-base">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
                      {it}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button href="#contact" variant={i === 0 ? "primary" : "ghost"}>
                    {c.cta}
                  </Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
