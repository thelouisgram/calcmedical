import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — Medical & Surgical Calculators`;
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
          background: "linear-gradient(145deg, #0A4F47 0%, #0B3D38 45%, #061F1C 100%)",
          padding: 64,
          color: "#F4FBF9",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: 20,
              background: "#0B3D38",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 56,
                height: 24,
                borderRadius: 7,
                background: "#F7F7F5",
              }}
            />
            <div style={{ display: "flex", gap: 7 }}>
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 4,
                  background: "#F7F7F5",
                }}
              />
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 4,
                  background: "#F7F7F5",
                }}
              />
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 4,
                  background: "#F7F7F5",
                }}
              />
            </div>
          </div>
          <div
            style={{
              fontSize: 44,
              fontWeight: 700,
              letterSpacing: -1,
            }}
          >
            {siteConfig.name}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: -1.5,
              maxWidth: 920,
            }}
          >
            Medical & surgical calculators
          </div>
          <div
            style={{
              width: 120,
              height: 6,
              borderRadius: 3,
              background: "linear-gradient(90deg, #5EEAD4, #14B8A6)",
            }}
          />
          <div
            style={{
              fontSize: 28,
              color: "#B6D4CF",
              maxWidth: 860,
              lineHeight: 1.35,
            }}
          >
            eGFR, EDD, GCS, Apgar, Parkland, risk scores, and more — fast,
            self-contained, clinician-ready.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
