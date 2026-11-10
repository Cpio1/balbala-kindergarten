import { ImageResponse } from "next/og";
import fs from "node:fs/promises";
import path from "node:path";
import { siteConfig } from "@/config/site";

export const alt = "«Балбала» балабақшасы";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadFont(subset: string) {
  const file = path.join(
    process.cwd(),
    "node_modules/@fontsource/nunito/files",
    `nunito-${subset}-800-normal.woff`,
  );
  return fs.readFile(file);
}

export default async function OpengraphImage() {
  const [latin, cyrillic, cyrillicExt] = await Promise.all([
    loadFont("latin"),
    loadFont("cyrillic"),
    loadFont("cyrillic-ext"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 88px",
          background: "#FFF9EE",
          color: "#28434A",
          fontFamily: "NunitoCE, NunitoC, NunitoL",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", right: -120, top: -140, width: 520, height: 520, borderRadius: 999, background: "#51BDB0" }} />
        <div style={{ position: "absolute", right: 60, bottom: -170, width: 330, height: 330, borderRadius: 999, background: "#FFCA55" }} />
        <div style={{ position: "absolute", right: 400, bottom: -40, width: 110, height: 110, borderRadius: 999, background: "#FF8B78" }} />
        <div style={{ fontSize: 34, color: "#2F9D90", marginBottom: 18 }}>{siteConfig.name.kz}</div>
        <div style={{ fontSize: 76, lineHeight: 1.05, maxWidth: 760 }}>«Балбала» балабақшасына қош келдіңіз!</div>
        <div style={{ fontSize: 36, marginTop: 28, color: "#E8664F" }}>Бақытты балалық шақтың мекені!</div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "NunitoCE", data: cyrillicExt, weight: 800, style: "normal" },
        { name: "NunitoC", data: cyrillic, weight: 800, style: "normal" },
        { name: "NunitoL", data: latin, weight: 800, style: "normal" },
      ],
    },
  );
}
