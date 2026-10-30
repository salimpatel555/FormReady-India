import { ImageResponse } from "next/og";

export const alt = "FormReady India – Free photo, signature and document tools";
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
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg,#4338ca,#6366f1)",
          color: "white",
        }}
      >
        <div style={{ fontSize: 76, fontWeight: 800 }}>FormReady India</div>
        <div style={{ fontSize: 36, marginTop: 24, opacity: 0.95 }}>
          Free photo and signature resizer, image compressor and PDF tools for Indian exam forms
        </div>
        <div style={{ fontSize: 28, marginTop: 36, opacity: 0.85 }}>Private. Browser-based. No signup.</div>
      </div>
    ),
    size,
  );
}
