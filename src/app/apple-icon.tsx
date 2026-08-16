import { ImageResponse } from "next/og";
import { brand } from "@/lib/brand";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          borderRadius: brand.radii.lg,
        }}
      >
        <svg width="108" height="108" viewBox={brand.viewBox}>
          <path fill={brand.mark} d={brand.path} />
        </svg>
      </div>
    ),
    size,
  );
}
