import fs from "node:fs";
import path from "node:path";

/**
 * Проверяет наличие медиафайлов в public/images во время сборки.
 * Если файла нет — компоненты показывают аккуратные заглушки,
 * и сайт продолжает работать без ошибок.
 */
const PUBLIC_DIR = path.join(process.cwd(), "public");
const IMAGES_DIR = path.join(PUBLIC_DIR, "images");
const IMAGE_EXT = /\.(png|jpe?g|webp|avif)$/i;

function findFirst(baseName: string, extensions: string[]): string | null {
  for (const ext of extensions) {
    const file = path.join(IMAGES_DIR, `${baseName}.${ext}`);
    try {
      if (fs.statSync(file).isFile()) return `/images/${baseName}.${ext}`;
    } catch {
      /* файла нет */
    }
  }
  return null;
}

function listGallery(): string[] {
  try {
    return fs
      .readdirSync(path.join(IMAGES_DIR, "gallery"))
      .filter((f) => IMAGE_EXT.test(f) && !f.startsWith("."))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((f) => `/images/gallery/${encodeURIComponent(f)}`);
  } catch {
    return [];
  }
}

export type SiteAssets = {
  logo: string | null;
  heroImage: string | null;
  aboutVideo: string | null;
  gallery: string[];
};

export function getSiteAssets(): SiteAssets {
  return {
    logo: findFirst("logo", ["png", "svg", "webp"]),
    heroImage: findFirst("main-page", ["png", "jpg", "jpeg", "webp"]),
    aboutVideo: findFirst("main-page2", ["mp4"]),
    gallery: listGallery(),
  };
}
