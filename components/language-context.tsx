"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type Language, languages, translations } from "@/lib/i18n"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  dir: "ltr" | "rtl"
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Set mounted to true after hydration
    setMounted(true)

    // Load language preference from localStorage on client side
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && Object.keys(languages).includes(savedLanguage)) {
      setLanguageState(savedLanguage)
      setDir(languages[savedLanguage].direction as "ltr" | "rtl")
      document.documentElement.dir = languages[savedLanguage].direction
      document.documentElement.lang = savedLanguage
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    setDir(languages[lang].direction as "ltr" | "rtl")

    // Only attempt to use localStorage on the client side
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang)
    }

    document.documentElement.dir = languages[lang].direction
    document.documentElement.lang = lang
  }

  // Translation function
  const t = (key: string) => {
    // If not mounted yet, return the key to avoid hydration mismatch
    if (!mounted) return key

    const keys = key.split(".")
    let result = translations[language]

    for (const k of keys) {
      if (result && typeof result === "object" && k in result) {
        result = result[k as keyof typeof result]
      } else {
        console.warn(`Translation key not found: ${key}`)
        return key
      }
    }

    return result as string
  }

  // Provide a safe context value that won't cause hydration mismatches
  const contextValue = {
    language,
    setLanguage,
    t,
    dir,
  }

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

