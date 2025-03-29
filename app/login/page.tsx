"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, MessageSquare } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/components/language-context"
import { LanguageSelector } from "@/components/language-selector"

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [verificationSent, setVerificationSent] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const router = useRouter()
  const { t, dir } = useLanguage()

  const handleSendVerification = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send a verification code via WhatsApp
    setVerificationSent(true)
  }

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would verify the code
    router.push("/onboarding")
  }

  return (
    <div className="flex flex-col min-h-screen" dir={dir}>
      <header className="p-4 border-b flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-muted-foreground">
          <ArrowLeft size={20} className={dir === "rtl" ? "rtl-mirror" : ""} />
          <span>{t("common.back")}</span>
        </Link>
        <LanguageSelector />
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold mb-6 text-center">{t("login.welcome")}</h1>

          {!verificationSent ? (
            <form onSubmit={handleSendVerification} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="phone">{t("login.enterPhone")}</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  className="h-12"
                />
              </div>
              <Button type="submit" className="w-full h-12">
                <MessageSquare className="mr-2 h-5 w-5" />
                {t("login.sendCode")}
              </Button>
              <p className="text-sm text-center text-muted-foreground">{t("login.verificationInfo")}</p>
            </form>
          ) : (
            <form onSubmit={handleVerify} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="code">{t("login.enterCode")}</Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="123456"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                  className="h-12 text-center text-xl tracking-widest"
                  maxLength={6}
                />
              </div>
              <Button type="submit" className="w-full h-12">
                {t("login.verifyAndContinue")}
              </Button>
              <Button type="button" variant="link" className="w-full" onClick={() => setVerificationSent(false)}>
                {t("login.changePhone")}
              </Button>
            </form>
          )}
        </div>
      </main>
    </div>
  )
}

