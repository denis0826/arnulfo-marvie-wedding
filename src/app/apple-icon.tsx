import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

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
          background: "#7a2230",
        }}
      >
        <div
          style={{
            width: 152,
            height: 152,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "3px solid #f4ebe4",
            borderRadius: 999,
          }}
        >
          <div
            style={{
              width: 136,
              height: 136,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(244, 235, 228, 0.45)",
              borderRadius: 999,
              color: "#f4ebe4",
              fontSize: 58,
              fontWeight: 700,
              letterSpacing: 3,
            }}
          >
            AM
          </div>
        </div>
      </div>
    ),
    size,
  );
}
