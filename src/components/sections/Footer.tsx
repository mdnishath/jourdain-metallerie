import Logo from "@/components/ui/Logo";
import { brand } from "@/config/brand";

export default function Footer() {
  return (
    <footer className="border-t border-white/8 bg-iron pb-28 pt-14 md:pb-14">
      <div className="container-x grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-chrome/70">
            {brand.tagline}. Atelier à {brand.address.city}, interventions sur{" "}
            {brand.zone}.
          </p>
        </div>

        <div>
          <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-mist">
            Navigation
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-chrome/80">
            {[
              ["#services", "Services"],
              ["#savoir-faire", "Savoir-faire"],
              ["#pourquoi-nous", "Pourquoi nous"],
              ["#pros-particuliers", "Pros & particuliers"],
              ["#realisations", "Réalisations"],
              ["#contact", "Contact & devis"],
            ].map(([href, label]) => (
              <li key={href}>
                <a href={href} className="transition-colors hover:text-white">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-mist">
            Contact
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-chrome/80">
            {brand.phones.map((p) => (
              <li key={p.href}>
                <a href={p.href} className="transition-colors hover:text-white">
                  {p.label}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${brand.email}`} className="transition-colors hover:text-white">
                {brand.email}
              </a>
            </li>
            <li className="pt-2 text-chrome/60">
              {brand.address.street}
              <br />
              {brand.address.zip} {brand.address.city}
            </li>
          </ul>
        </div>
      </div>

      <div className="container-x mt-12 flex flex-col gap-2 border-t border-white/8 pt-6 text-xs text-mist/70 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {brand.legalName} · Gérant : {brand.manager}
        </p>
        <p className="flex gap-4">
          <a href="#" className="hover:text-white">
            Mentions légales
          </a>
          <a href="#" className="hover:text-white">
            Confidentialité
          </a>
        </p>
      </div>
    </footer>
  );
}
