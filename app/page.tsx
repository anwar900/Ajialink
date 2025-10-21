"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLanguage } from "@/components/language-context"
import { LanguageSelector } from "@/components/language-selector"
import { type Language, languages } from "@/lib/i18n"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Globe } from "lucide-react"
import Image from "next/image"

export default function Home() {
  const { t, dir, setLanguage } = useLanguage()
  const [showLanguageSelect, setShowLanguageSelect] = useState(true)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Handle client-side rendering
  useEffect(() => {
    setMounted(true)

    // Check if user has already selected a language before
    const hasSelectedLanguage = localStorage.getItem("hasSelectedLanguage")
    if (hasSelectedLanguage === "true") {
      setShowLanguageSelect(false)
    }
  }, [])

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang)
    if (typeof window !== "undefined") {
      localStorage.setItem("hasSelectedLanguage", "true")
    }
    setShowLanguageSelect(false)
    setHasInteracted(true)
  }

  const handleContinue = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("hasSelectedLanguage", "true")
    }
    setShowLanguageSelect(false)
    setHasInteracted(true)
  }

  // Show a simple loading state during server rendering or before hydration
  if (!mounted) {
    return (
        <div className="flex flex-col min-h-screen items-center justify-center p-6 text-center">
          <div className="h-16 w-64 bg-muted rounded mb-8"></div>
          <div className="h-6 w-80 bg-muted rounded mb-8"></div>
          <div className="h-12 w-48 bg-muted rounded"></div>
        </div>
    )
  }

  return (
      <div className="relative flex flex-col min-h-screen" dir={dir}>
        {/* Background gradient added for an attractive effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 -z-10"></div>

        <div className="absolute top-4 right-4">
          <LanguageSelector />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <motion.div
              className="mb-1"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
          >
            <Image
                src="/ajialink-logo.png"
                alt="Ajyal Link"
                width={1400}
                height={1120}
                priority
                className="mx-auto w-full max-w-md drop-shadow-xl"
            />
          </motion.div>

          <AnimatePresence>
            {showLanguageSelect && (
                <motion.div
                    className="mb-8 w-full max-w-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="p-6 rounded-xl border bg-card shadow-lg">
                    <div className="flex items-center gap-2 mb-4">
                      <Globe className="h-5 w-5 text-primary" />
                      <h2 className="text-xl font-medium">{t("common.chooseLanguage")}</h2>
                    </div>

                    <div className="grid gap-3 mb-6">
                      {Object.entries(languages).map(([code, { nativeName, flagImage, description }], index) => (
                          <motion.button
                              key={code}
                              className="flex items-center p-3 rounded-lg border-2 text-left transition-colors hover:border-primary/30 hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                              onClick={() => handleLanguageSelect(code as Language)}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                          >
                            <div className="mr-3 flex-shrink-0">
                              <Image
                                  src={flagImage || "/placeholder.svg"}
                                  alt={nativeName}
                                  width={32}
                                  height={24}
                                  className="rounded-sm"
                              />
                            </div>
                            <div>
                              <div className="font-medium">{nativeName}</div>
                              <div className="text-sm text-muted-foreground">{description}</div>
                            </div>
                          </motion.button>
                      ))}
                    </div>

                    <Button onClick={handleContinue} className="w-full">
                      {t("common.continue")}
                    </Button>
                  </div>
                </motion.div>
            )}
          </AnimatePresence>

          <motion.div
              className="space-y-4 w-full max-w-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: showLanguageSelect ? 0.8 : 0.4 }}
          >
            <Button asChild className="w-full py-6 text-lg">
              <Link href="/login">{t("common.getStarted")}</Link>
            </Button>
            <Button variant="outline" asChild className="w-full py-6 text-lg">
              <Link href="/about">{t("common.learnMore")}</Link>
            </Button>
          </motion.div>
        </div>

        <motion.footer
            className="py-4 text-center text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
        >
          {t("common.copyright")}
        </motion.footer>
      </div>
  )
}
