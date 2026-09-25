import { NextResponse } from "next/server";

/**
 * Réception du formulaire de devis.
 * Maquette : la demande est validée et journalisée.
 * Pour la version finale : brancher Resend / SMTP ici pour envoyer un e-mail
 * à brand.email (voir src/config/brand.ts).
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // honeypot: bots fill the hidden "site" field
  if (typeof body.site === "string" && body.site.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const nom = String(body.nom ?? "").trim();
  const telephone = String(body.telephone ?? "").trim();
  const projet = String(body.projet ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!nom || !telephone || !projet || !message) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 422 });
  }

  console.log("[devis]", {
    nom,
    telephone,
    email: String(body.email ?? ""),
    projet,
    message: message.slice(0, 2000),
    at: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
