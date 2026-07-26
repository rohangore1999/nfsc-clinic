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
          background: "linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)",
          borderRadius: 36,
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#C9A04F",
            letterSpacing: "-0.02em",
            marginBottom: -4,
          }}
        >
          N
        </div>
        <div
          style={{
            fontSize: 14,
            color: "rgba(201, 160, 79, 0.7)",
            letterSpacing: "0.2em",
            fontWeight: 600,
          }}
        >
          NFSC
        </div>
      </div>
    ),
    { ...size }
  );
}
