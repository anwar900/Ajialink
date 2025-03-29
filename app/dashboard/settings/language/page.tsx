"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Check, Info } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-context"
import { type Language, languages } from "@/lib/i18n"
import { motion } from "framer-motion"
import { toast } from "@/hooks/use-toast"
import Image from "next/image"

export default function LanguageSettingsPage() {
  const { language: currentLanguage, setLanguage, t } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
    toast({
      title: t("common.languageChanged"),
      description: languages[lang].name,
    })
  }

  // Show a simple loading state during server rendering or before hydration
  if (!mounted) {
    return (
      <div className="container px-4 py-6 space-y-6">
        <header className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-full bg-muted"></div>
          <div className="h-8 w-40 bg-muted rounded"></div>
        </header>
        <Card>
          <CardHeader>
            <div className="h-6 w-48 bg-muted rounded mb-2"></div>
            <div className="h-4 w-64 bg-muted rounded"></div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 bg-muted rounded"></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container px-4 py-6 space-y-6">
      <header className="flex items-center gap-2">
        <Link href="/dashboard/settings" className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold">{t("settings.language")}</h1>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>{t("settings.languagePreference")}</CardTitle>
          <CardDescription>{t("settings.selectLanguage")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            {Object.entries(languages).map(([code, { name, nativeName, flagImage, description }]) => (
              <motion.div
                key={code}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                  currentLanguage === code
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/30 hover:bg-muted/50"
                }`}
                onClick={() => handleLanguageChange(code as Language)}
              >
                <div className="flex-1 flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <Image
                      src={flagImage || "/placeholder.svg"}
                      alt={name}
                      width={32}
                      height={24}
                      className="rounded-sm"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{nativeName}</div>
                    <div className="text-sm text-muted-foreground">{description}</div>
                  </div>
                </div>
                {currentLanguage === code && (
                  <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="bg-muted/50 rounded-lg p-4 flex items-start gap-3">
            <Info className="h-5 w-5 text-primary mt-0.5" />
            <div className="text-sm">
              <p className="font-medium mb-1">{t("settings.interfaceLanguage")}</p>
              <p className="text-muted-foreground">{t("common.languageDescription")}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

