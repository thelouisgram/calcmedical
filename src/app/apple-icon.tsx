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
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 22,
          background: "#0B3D38",
          borderRadius: 40,
        }}
      >
        <div
          style={{
            width: 112,
            height: 50,
            borderRadius: 14,
            background: "#F7F7F5",
          }}
        />
        <div style={{ display: "flex", gap: 14 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: "#F7F7F5",
            }}
          />
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: "#F7F7F5",
            }}
          />
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: "#F7F7F5",
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}
