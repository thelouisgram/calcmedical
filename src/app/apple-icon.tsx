import { ImageResponse } from "next/og";

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
          background: "#0B3D38",
          borderRadius: 40,
        }}
      >
        <svg width="108" height="108" viewBox="0 0 64 64">
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
