import { ImageResponse } from "next/og";

/** 48×48 PNG — Google Search requires ≥48px raster favicons (SVG often ignored). */
export const size = { width: 48, height: 48 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B3D38",
          borderRadius: 10,
        }}
      >
        <svg width="30" height="30" viewBox="0 0 64 64">
          <path
            fill="#F7F7F5"
            d="M18 34 36 18l14 10v20L36 58V40L18 50Z"
          />
        </svg>
      </div>
    ),
    size,
  );
}
