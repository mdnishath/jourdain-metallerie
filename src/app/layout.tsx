import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import { brand } from "@/config/brand";
import SmoothScroll from "@/components/SmoothScroll";

const bebas = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const title = `${brand.name} · Métallerie & serrurerie sur mesure à Caen`;
const description = `Escaliers, portails, portes, garde-corps et clôtures en métal, fabriqués sur mesure dans notre atelier de Carpiquet (14). Plus de ${brand.yearsOfExperience} ans de savoir-faire, devis rapide sous 48 h. Particuliers et professionnels, Caen et Calvados.`;

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title,
  description,
  keywords: [
    "métallerie Caen",
    "serrurerie Carpiquet",
    "escalier sur mesure Calvados",
    "portail sur mesure Caen",
    "garde-corps métal Normandie",
    "ferronnerie Caen",
  ],
  openGraph: {
    title,
    description,
    locale: "fr_FR",
    type: "website",
    siteName: brand.legalName,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: brand.legalName,
  alternateName: brand.name,
  description,
  url: brand.siteUrl,
  telephone: brand.phones[0].href.replace("tel:", ""),
  email: brand.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${brand.address.street}, ${brand.address.extra}`,
    postalCode: brand.address.zip,
    addressLocality: brand.address.city,
    addressRegion: brand.address.region,
    addressCountry: "FR",
  },
  areaServed: ["Caen", "Calvados", "Normandie"],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "08:00",
      closes: "12:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "13:30",
      closes: "17:15",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday"],
      opens: "08:00",
      closes: "12:00",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${bebas.variable} ${inter.variable}`}>
      <body className="min-h-screen antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
