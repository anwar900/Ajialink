import { en } from "./translations/en"
import { fr } from "./translations/fr"
import { ar } from "./translations/ar"

export type Language = "en" | "fr" | "ar"

export const languages = {
  en: {
    name: "English",
    nativeName: "English",
    direction: "ltr",
    flagImage: "/flags/usa.svg",
    description: "English (United States)",
  },
  fr: {
    name: "French",
    nativeName: "Français",
    direction: "ltr",
    flagImage: "/flags/france.svg",
    description: "French (France)",
  },
  ar: {
    name: "Arabic",
    nativeName: "العربية",
    direction: "rtl",
    flagImage: "/flags/morocco.svg",
    description: "Arabic",
  },
}

export const translations = {
  en,
  fr,
  ar,
}

export type TranslationKey = keyof typeof en

