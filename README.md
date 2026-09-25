# Jourdain — maquette de site 3D immersif

Maquette réalisée pour **JOURDAIN EURL** (métallerie / serrurerie, Carpiquet, près de Caen).

- **Stack** : Next.js 16 · React Three Fiber · GSAP ScrollTrigger · Lenis · Tailwind CSS 4
- **Hébergement** : Vercel (déploiement automatique à chaque push sur `main`)

## Changer le nom, le logo ou les coordonnées

Tout est centralisé dans **`src/config/brand.ts`** :

- `name` — le nom affiché partout (nav, footer, titres SEO, image de partage)
- `logo` — laisser `null` pour le logo provisoire dessiné en code, ou mettre le
  chemin d'un fichier déposé dans `public/brand/` (ex. `"/brand/logo.svg"`)
- `phones`, `email`, `address`, `hours` — coordonnées et horaires
- `siteUrl` — l'URL finale du site (utilisée pour les balises Open Graph)

Aucune autre modification n'est nécessaire : le site lit ce fichier partout.

## Ajouter les vraies photos

Dans `src/components/sections/Realisations.tsx`, remplacer les plaques métal par
des images déposées dans `public/realisations/`.

## Formulaire de devis

`src/app/api/contact/route.ts` reçoit la demande (validation + honeypot anti-spam).
Pour la version finale, brancher un envoi d'e-mail (Resend, SMTP…) vers `brand.email`.

## Développement

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:3000.
