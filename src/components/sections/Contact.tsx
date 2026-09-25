"use client";

import { useState, type FormEvent } from "react";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { PhoneIcon } from "@/components/ui/Nav";
import { brand } from "@/config/brand";

type Status = "idle" | "sending" | "ok" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("bad status");
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(brand.mapsQuery)}&z=14&output=embed`;

  return (
    <section id="contact" className="relative overflow-hidden bg-coal py-24 md:py-32">
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[70vh] w-[70vh] rounded-full bg-[radial-gradient(circle,rgba(255,106,26,0.12)_0%,rgba(255,106,26,0)_60%)]" />
      <div className="container-x">
        <Reveal className="mb-14 max-w-2xl">
          <p className="mb-4 flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-ember">
            <span className="h-px w-8 bg-ember" />
            Contact & devis
          </p>
          <h2 className="font-display text-[clamp(2.6rem,6vw,4.8rem)] leading-[0.95] text-white">
            Parlons de
            <br />
            <span className="metal-text">votre projet.</span>
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-chrome/75 md:text-base">
            Décrivez-nous votre besoin en quelques lignes. Nous vous rappelons
            et vous envoyons un devis sous 48 h.
          </p>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* infos */}
          <Reveal x={-40} y={0} className="space-y-8">
            <div className="space-y-4">
              {brand.phones.map((p) => (
                <a
                  key={p.href}
                  href={p.href}
                  className="flex items-center gap-4 text-xl font-semibold text-white transition-colors hover:text-flame md:text-2xl"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-ember">
                    <PhoneIcon className="h-5 w-5" />
                  </span>
                  {p.label}
                </a>
              ))}
              <a
                href={`mailto:${brand.email}`}
                className="flex items-center gap-4 text-base text-chrome transition-colors hover:text-flame md:text-lg"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-ember">
                  <MailIcon />
                </span>
                {brand.email}
              </a>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-mist">
                  Atelier
                </h3>
                <address className="mt-3 not-italic leading-relaxed text-chrome/85">
                  {brand.address.street}
                  <br />
                  {brand.address.extra}
                  <br />
                  {brand.address.zip} {brand.address.city}
                </address>
              </div>
              <div>
                <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-mist">
                  Horaires
                </h3>
                <ul className="mt-3 space-y-1 text-chrome/85">
                  {brand.hours.map((h) => (
                    <li key={h.days} className="flex justify-between gap-4">
                      <span>{h.days}</span>
                      <span className="text-right text-chrome/60">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-white/8 grayscale-[0.8] contrast-[1.1] invert-[0.92] hue-rotate-180">
              <iframe
                title="Plan d'accès à l'atelier"
                src={mapSrc}
                width="100%"
                height="240"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block"
              />
            </div>
          </Reveal>

          {/* form */}
          <Reveal x={40} y={0}>
            <form
              onSubmit={onSubmit}
              className="rounded-2xl border border-white/8 bg-steel/60 p-6 md:p-9"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-mist">
                    Nom *
                  </span>
                  <input name="nom" required className="field" placeholder="Votre nom" autoComplete="name" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-mist">
                    Téléphone *
                  </span>
                  <input name="telephone" required type="tel" className="field" placeholder="06 00 00 00 00" autoComplete="tel" />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-medium text-mist">
                    Email
                  </span>
                  <input name="email" type="email" className="field" placeholder="vous@exemple.fr" autoComplete="email" />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-medium text-mist">
                    Type de projet *
                  </span>
                  <select name="projet" required className="field" defaultValue="">
                    <option value="" disabled>
                      Choisir…
                    </option>
                    <option>Escalier</option>
                    <option>Portail</option>
                    <option>Porte métallique</option>
                    <option>Garde-corps</option>
                    <option>Clôture</option>
                    <option>Serrurerie / réparation</option>
                    <option>Autre</option>
                  </select>
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-medium text-mist">
                    Votre projet *
                  </span>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    className="field resize-y"
                    placeholder="Dimensions, lieu, délais souhaités…"
                  />
                </label>
                {/* honeypot */}
                <input name="site" tabIndex={-1} autoComplete="off" className="hidden" />
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-mist/80">
                  Réponse sous 48 h. Vos données ne sont jamais transmises.
                </p>
                <Button type="submit" size="lg" disabled={status === "sending"}>
                  {status === "sending" ? "Envoi…" : "Envoyer ma demande"}
                </Button>
              </div>

              {status === "ok" && (
                <p className="mt-4 rounded-md border border-ember/40 bg-ember/10 px-4 py-3 text-sm text-flame">
                  Merci ! Votre demande est bien reçue. Nous vous rappelons sous 48 h.
                </p>
              )}
              {status === "error" && (
                <p className="mt-4 rounded-md border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  Une erreur est survenue. Appelez-nous directement au{" "}
                  <a href={brand.phones[0].href} className="underline">
                    {brand.phones[0].label}
                  </a>
                  .
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}
