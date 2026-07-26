import { ImageResponse } from "next/og";

export const alt =
  "Dr. Nikhil Face Surgical & Aesthetic Centre — Expert Facial Surgery in Mumbai";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
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
          padding: "60px",
        }}
      >
        {/* Gold accent line */}
        <div
          style={{
            width: 80,
            height: 3,
            background: "#C9A04F",
            marginBottom: 32,
          }}
        />

        {/* Title */}
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: "#FFFFFF",
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: 16,
          }}
        >
          Dr. Nikhil Face Surgical
        </div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: "#FFFFFF",
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: 24,
          }}
        >
          & Aesthetic Centre
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 24,
            color: "#C9A04F",
            fontStyle: "italic",
            textAlign: "center",
            marginBottom: 40,
          }}
        >
          Where surgical precision meets aesthetic artistry
        </div>

        {/* Services pills */}
        <div
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {["Facial Surgery", "Hair Transplant", "Aesthetics", "Dermatology"].map(
            (s) => (
              <div
                key={s}
                style={{
                  border: "1px solid rgba(201, 160, 79, 0.5)",
                  borderRadius: 24,
                  padding: "8px 20px",
                  color: "rgba(255,255,255,0.8)",
                  fontSize: 16,
                  letterSpacing: "0.05em",
                }}
              >
                {s}
              </div>
            )
          )}
        </div>

        {/* Location */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 16,
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.1em",
          }}
        >
          KANDIVALI WEST, MUMBAI
        </div>
      </div>
    ),
    { ...size }
  );
}
