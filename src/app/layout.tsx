import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import { siteConfig } from "@/config/site";
import { dictionaries, defaultLocale } from "@/i18n/translations";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { getSiteAssets } from "@/lib/assets";
import "./globals.css";

// cyrillic-ext содержит казахские буквы: ә ғ қ ң ө ұ ү һ
const nunito = Nunito({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-nunito",
});

const t = dictionaries[defaultLocale];

export function generateMetadata(): Metadata {
  const { logo } = getSiteAssets();
  const icon = logo ?? "/favicon.svg";

  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title: t.meta.title,
    description: t.meta.description,
    applicationName: siteConfig.name.kz,
    keywords: [
      "Балбала",
      "балабақша",
      "детский сад",
      "Қарғалы",
      "Каргалы",
      "Жамбыл ауданы",
      "Жамбылский район",
      "Алматы облысы",
      "ясли-сад",
    ],
    alternates: { canonical: "/" },
    icons: { icon, apple: logo ?? undefined },
    openGraph: {
      type: "website",
      locale: "kk_KZ",
      alternateLocale: ["ru_RU"],
      url: "/",
      siteName: siteConfig.name.kz,
      title: t.meta.title,
      description: t.meta.description,
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
    },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFF9EE",
  colorScheme: "only light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Preschool",
  name: siteConfig.name.kz,
  alternateName: siteConfig.name.ru,
  url: siteConfig.siteUrl,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Наурыз көшесі, 1041",
    addressLocality: "Қарғалы ауылы",
    addressRegion: "Алматы облысы, Жамбыл ауданы",
    addressCountry: "KZ",
  },
  openingHours: "07:30-18:00",
  sameAs: [siteConfig.instagram.url],
  ...(siteConfig.phone ? { telephone: siteConfig.phone } : {}),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="kk" className={nunito.variable} style={{ colorScheme: "light" }}>
      <body className="min-h-dvh font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
