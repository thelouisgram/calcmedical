import { ImageResponse } from "next/og";
import { brand } from "@/lib/brand";

/** 48×48 PNG — Google Search prefers raster favicons ≥48px. */
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
          background: brand.teal,
          borderRadius: brand.radii.sm,
        }}
      >
        <svg width="30" height="30" viewBox={brand.viewBox}>
          <path fill={brand.mark} d={brand.path} />
        </svg>
      </div>
    ),
    size,
  );
}
