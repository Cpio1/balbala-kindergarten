/**
 * Балабақша туралы барлық негізгі ақпарат — бір жерде.
 * Вся основная информация о детском саде — в одном месте.
 *
 * Чтобы добавить телефон, WhatsApp или ссылку на документы,
 * просто замените `null` на нужное значение.
 */
export const siteConfig = {
  shortName: "Балбала",

  name: {
    kz: "ЖШС «Балбала» балабақшасы",
    ru: "Детский сад ТОО «Балбала»",
  },

  address: {
    kz: "Алматы облысы, Жамбыл ауданы, Қарғалы ауылы, Наурыз көшесі, 1041",
    ru: "Алматинская область, Жамбылский район, село Каргалы, улица Наурыз, 1041",
  },

  /** Запрос для карт (на русском — так адрес лучше распознаётся геосервисами). */
  mapQuery: "Алматинская область, Жамбылский район, Каргалы, улица Наурыз, 1041",

  workingHours: "07:30–18:00",

  groupsCount: 6,
  ageRange: "2–5",
  mealsPerDay: 4,

  instagram: {
    url: "https://www.instagram.com/balbala_yasli_sad/",
    handle: "@balbala_yasli_sad",
  },

  /** Телефон в формате "+7 700 000 00 00". Пока не предоставлен. */
  phone: null as string | null,

  /** Номер WhatsApp только цифрами, например "77000000000". Пока не предоставлен. */
  whatsapp: null as string | null,

  /** Ссылка на папку Google Drive с документами. Пока не предоставлена. */
  documentsUrl: null as string | null,

  /** Публичный адрес сайта (для SEO). Можно задать через NEXT_PUBLIC_SITE_URL. */
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
} as const;

export const mapsLinks = {
  google: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.mapQuery)}`,
  embed: `https://maps.google.com/maps?q=${encodeURIComponent(siteConfig.mapQuery)}&z=15&output=embed`,
};

export const navSections = [
  "home",
  "about",
  "groups",
  "nutrition",
  "clubs",
  "gallery",
  "documents",
  "contacts",
] as const;

export type SectionId = (typeof navSections)[number];
