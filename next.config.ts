import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Шрифты для OG-картинки читаются из node_modules во время сборки
  outputFileTracingIncludes: {
    "/opengraph-image": ["./node_modules/@fontsource/nunito/files/*-800-normal.woff"],
  },
};

export default nextConfig;
