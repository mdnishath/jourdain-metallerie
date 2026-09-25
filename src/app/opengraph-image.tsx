import { ImageResponse } from "next/og";
import { brand } from "@/config/brand";

export const runtime = "edge";
export const alt = `${brand.name} · ${brand.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(circle at 85% 50%, rgba(255,106,26,0.28) 0%, rgba(10,10,11,0) 45%), linear-gradient(180deg, #0a0a0b 0%, #131417 100%)",
          color: "#f4f5f7",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 10,
              border: "2px solid #cfd3d9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: 800,
              color: "#f4f5f7",
            }}
          >
            J
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: 2 }}>
              {brand.name.toUpperCase()}
            </div>
            <div style={{ fontSize: 16, letterSpacing: 5, color: "#8b9099" }}>
              MÉTALLERIE · SERRURERIE
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              color: "#ff6a1a",
              marginBottom: 18,
            }}
          >
            CARPIQUET · CAEN · CALVADOS
          </div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: -2,
            }}
          >
            Le métal, façonné
          </div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: -2,
              color: "#cfd3d9",
            }}
          >
            sur mesure.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            color: "#8b9099",
          }}
        >
          <div>Escaliers · Portails · Portes · Garde-corps · Clôtures</div>
          <div style={{ color: "#f4f5f7", fontWeight: 700 }}>
            {brand.phones[0].label}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
