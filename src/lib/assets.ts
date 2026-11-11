import fs from "node:fs";
import path from "node:path";

/**
 * Проверяет наличие медиафайлов в public/images во время сборки.
 * Если файла нет — компоненты показывают аккуратные заглушки,
 * и сайт продолжает работать без ошибок.
 */
const PUBLIC_DIR = path.join(process.cwd(), "public");
const IMAGES_DIR = path.join(PUBLIC_DIR, "images");
const GALLERY_DIR = path.join(IMAGES_DIR, "gallery");
const IMAGE_EXT = /\.(png|jpe?g|webp|avif)$/i;
const VIDEO_EXT = /\.(mp4|webm)$/i;

/** Фото главного экрана — не попадает в галерею. */
const HERO_BASENAME = "main-page";

export type Photo = { src: string; width: number; height: number };

/** Читает размеры JPEG / PNG / WebP из заголовка файла (без сторонних библиотек). */
function readImageSize(file: string): { width: number; height: number } | null {
  let buf: Buffer;
  try {
    buf = fs.readFileSync(file);
  } catch {
    return null;
  }

  // PNG
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }

  // JPEG: ищем маркер SOFn
  if (buf.length > 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i + 9 < buf.length) {
      if (buf[i] !== 0xff) {
        i++;
        continue;
      }
      const marker = buf[i + 1];
      if (marker === 0xff) {
        i++;
        continue;
      }
      const len = buf.readUInt16BE(i + 2);
      const isSOF = marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
      if (isSOF) return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
      i += 2 + len;
    }
    return null;
  }

  // WebP
  if (buf.length > 30 && buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const chunk = buf.toString("ascii", 12, 16);
    if (chunk === "VP8 ") return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
    if (chunk === "VP8L") {
      const b = buf.readUInt32LE(21);
      return { width: (b & 0x3fff) + 1, height: ((b >> 14) & 0x3fff) + 1 };
    }
    if (chunk === "VP8X") return { width: buf.readUIntLE(24, 3) + 1, height: buf.readUIntLE(27, 3) + 1 };
  }

  return null;
}

function toPhoto(absPath: string, publicPath: string): Photo {
  const size = readImageSize(absPath) ?? { width: 4, height: 3 };
  return { src: publicPath, ...size };
}

function listDir(dir: string, ext: RegExp): string[] {
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => ext.test(f) && !f.startsWith("."))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  } catch {
    return [];
  }
}

/** Ищет файл по имени сначала в public/images, затем в public/images/gallery. */
function findImage(baseName: string): Photo | null {
  const isMatch = (f: string) => path.parse(f).name === baseName;

  const inImages = listDir(IMAGES_DIR, IMAGE_EXT).find(isMatch);
  if (inImages) return toPhoto(path.join(IMAGES_DIR, inImages), `/images/${encodeURIComponent(inImages)}`);

  const inGallery = listDir(GALLERY_DIR, IMAGE_EXT).find(isMatch);
  if (inGallery) return toPhoto(path.join(GALLERY_DIR, inGallery), `/images/gallery/${encodeURIComponent(inGallery)}`);

  return null;
}

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

function listGallery(): Photo[] {
  return listDir(GALLERY_DIR, IMAGE_EXT)
    .filter((f) => path.parse(f).name !== HERO_BASENAME)
    .map((f) => toPhoto(path.join(GALLERY_DIR, f), `/images/gallery/${encodeURIComponent(f)}`));
}

function listVideos(): string[] {
  return listDir(GALLERY_DIR, VIDEO_EXT).map((f) => `/images/gallery/${encodeURIComponent(f)}`);
}

export type SiteAssets = {
  logo: string | null;
  heroImage: Photo | null;
  videos: string[];
  gallery: Photo[];
};

export function getSiteAssets(): SiteAssets {
  return {
    logo: findFirst("logo", ["png", "svg", "webp"]),
    heroImage: findImage(HERO_BASENAME),
    videos: listVideos(),
    gallery: listGallery(),
  };
}
