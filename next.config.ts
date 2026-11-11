import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85, 90],
  },
  // Шрифты для OG-картинки читаются из node_modules во время сборки
  outputFileTracingIncludes: {
    "/opengraph-image": ["./node_modules/@fontsource/nunito/files/*-800-normal.woff"],
  },
};

export default nextConfig;
