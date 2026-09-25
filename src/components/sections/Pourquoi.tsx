import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import Button from "@/components/ui/Button";
import { brand } from "@/config/brand";

const stats = [
  { value: brand.yearsOfExperience, prefix: "+", suffix: "", label: "ans de savoir-faire à Carpiquet" },
  { value: 48, prefix: "", suffix: " h", label: "pour recevoir votre devis" },
  { value: 100, prefix: "", suffix: " %", label: "métal, 100 % sur mesure" },
  { value: 1, prefix: "", suffix: "", label: "interlocuteur, du plan à la pose" },
];

const points = [
  {
    title: "Réactivité",
    text: "Un appel, une réponse. Un devis en 48 h. Un chantier livré à la date promise. C'est notre différence.",
  },
  {
    title: "Atelier intégré",
    text: "Nous fabriquons tout nous-mêmes, à Carpiquet. Pas d'intermédiaire, pas de sous-traitance : maîtrise totale de la qualité et des délais.",
  },
  {
    title: "Fabrication & pose",
    text: "La même équipe qui fabrique votre ouvrage vient l'installer. Ajustement parfait, finitions soignées.",
  },
];

export default function Pourquoi() {
  return (
    <section id="pourquoi-nous" className="relative overflow-hidden bg-iron py-24 md:py-32">
      <div className="pointer-events-none absolute -left-40 top-0 h-[60vh] w-[60vh] rounded-full bg-[radial-gradient(circle,rgba(255,106,26,0.10)_0%,rgba(255,106,26,0)_60%)]" />
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="mb-4 flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-ember">
                <span className="h-px w-8 bg-ember" />
                Pourquoi nous
              </p>
              <h2 className="font-display text-[clamp(2.6rem,6vw,4.8rem)] leading-[0.95] text-white">
                Solide comme l&apos;acier,
                <br />
                <span className="metal-text">rapide comme l&apos;étincelle.</span>
              </h2>
            </Reveal>

            <ul className="mt-10 space-y-6">
              {points.map((p, i) => (
                <Reveal key={p.title} as="li" delay={i * 0.08}>
                  <div className="flex gap-5">
                    <span className="mt-1 font-display text-3xl text-ember/80">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{p.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-chrome/75 md:text-base">
                        {p.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.2} className="mt-10">
              <Button href="#contact" size="lg">
                Demander un devis
              </Button>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-4 self-center">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1}>
                <div className="metal-plate relative h-full rounded-xl border border-white/8 p-6 md:p-8">
                  <span className="absolute right-4 top-4 h-1.5 w-1.5 rounded-full bg-ember" />
                  <Counter
                    to={s.value}
                    prefix={s.prefix}
                    suffix={s.suffix}
                    className="font-display block text-[3.4rem] leading-none text-white md:text-[4.4rem]"
                  />
                  <p className="mt-3 text-sm leading-snug text-chrome/75">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
