/**
 * ─────────────────────────────────────────────────────────────
 *  IDENTITÉ DE L'ENTREPRISE — un seul endroit à modifier.
 *  Le client va changer de nom et de logo : tout le site lit ce fichier.
 *  Pour changer le logo : déposez un fichier dans /public/brand/ et
 *  renseignez `logo` (ex: "/brand/logo.svg"). Laissez `null` pour le
 *  logo provisoire dessiné en code.
 * ─────────────────────────────────────────────────────────────
 */
export const brand = {
  name: "Jourdain",
  legalName: "JOURDAIN EURL",
  tagline: "Métallerie & serrurerie sur mesure",
  descriptor: "Atelier de métallerie à Carpiquet, près de Caen",
  logo: null as string | null,
  manager: "M. Belin",
  yearsOfExperience: 20,

  phones: [
    { label: "02 31 91 69 11", href: "tel:+33231916911" },
    { label: "06 23 94 01 66", href: "tel:+33623940166" },
  ],
  email: "lbelin@serrureriejourdain.fr",

  address: {
    street: "Z.I. Ouest, 180 chemin des Bissonnets",
    extra: "3 RN13",
    zip: "14650",
    city: "Carpiquet",
    region: "Calvados",
  },

  hours: [
    { days: "Lundi – Jeudi", time: "8h – 12h / 13h30 – 17h15" },
    { days: "Vendredi", time: "8h – 12h" },
    { days: "Samedi – Dimanche", time: "Fermé" },
  ],

  zone: "Caen, Calvados et toute la Normandie",
  mapsQuery: "180 chemin des Bissonnets, 14650 Carpiquet",
  siteUrl: "https://jourdain-metallerie.vercel.app",
};

export type Brand = typeof brand;
