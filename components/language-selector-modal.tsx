"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Check, Globe } from "lucide-react"
import { useLanguage } from "@/components/language-context"
import { type Language, languages } from "@/lib/i18n"
import { motion } from "framer-motion"

interface LanguageSelectorModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  showDescription?: boolean
}

export function LanguageSelectorModal({ open, onOpenChange, showDescription = true }: LanguageSelectorModalProps) {
  const { language: currentLanguage, setLanguage, t } = useLanguage()
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(currentLanguage)

  // Reset selected language when modal opens
  useEffect(() => {
    if (open) {
      setSelectedLanguage(currentLanguage)
    }
  }, [open, currentLanguage])

  const handleLanguageSelect = (lang: Language) => {
    setSelectedLanguage(lang)
  }

  const handleConfirm = () => {
    setLanguage(selectedLanguage)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            {t("common.selectLanguage")}
          </DialogTitle>
          {showDescription && <DialogDescription>{t("common.languageDescription")}</DialogDescription>}
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {Object.entries(languages).map(([code, { name, nativeName, flag, description }]) => (
            <motion.div
              key={code}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                selectedLanguage === code
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/30 hover:bg-muted/50"
              }`}
              onClick={() => handleLanguageSelect(code as Language)}
            >
              <div className="flex-1 flex items-center gap-3">
                <div className="text-2xl">{flag}</div>
                <div>
                  <div className="font-medium">{nativeName}</div>
                  <div className="text-sm text-muted-foreground">{description}</div>
                </div>
              </div>
              {selectedLanguage === code && (
                <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground">
                  <Check className="h-4 w-4" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("settings.cancel")}
          </Button>
          <Button onClick={handleConfirm}>{t("common.continue")}</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

