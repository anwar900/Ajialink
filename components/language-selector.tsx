"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { useLanguage } from "@/components/language-context"
import { type Language, languages } from "@/lib/i18n"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Handle client-side rendering
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang)
    setIsOpen(false)
  }

  // Show a simple button during server rendering or before hydration
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="rounded-full w-9 h-9">
        <Globe className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Select Language</span>
      </Button>
    )
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full w-9 h-9">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">{t("common.selectLanguage")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center justify-between px-2 py-1.5">
          <span className="text-sm font-medium">{t("common.currentLanguage")}</span>
          <span className="flex items-center gap-1 text-sm">
            <Image
              src={languages[language].flagImage || "/placeholder.svg"}
              alt={languages[language].name}
              width={20}
              height={15}
              className="rounded-sm"
            />
            <span>{languages[language].nativeName}</span>
          </span>
        </div>
        <DropdownMenuSeparator />
        {Object.entries(languages).map(([code, { name, nativeName, flagImage }]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => handleLanguageSelect(code as Language)}
            className={`cursor-pointer ${language === code ? "bg-muted font-medium" : ""}`}
          >
            <div className="flex items-center gap-2 w-full">
              <Image src={flagImage || "/placeholder.svg"} alt={name} width={20} height={15} className="rounded-sm" />
              <span>{nativeName}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

