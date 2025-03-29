"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, ArrowRight, UserCircle, UserCog, Building2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { InterestSelector } from "@/components/interest-selector"
import { ExpertiseSelector } from "@/components/expertise-selector"
import { Progress } from "@/components/ui/progress"
import { useLanguage } from "@/components/language-context"

export default function Onboarding() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    role: "young", // young, senior, organization
    interests: [] as string[],
    teachingExpertise: [] as string[],
    learningGoals: [] as string[],
  })
  const { t, dir } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const totalSteps = 4
  const progress = (step / totalSteps) * 100

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save the user data
    router.push("/dashboard")
  }

  const updateFormData = (field: string, value: string | string[]) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  // Show a simple loading state during server rendering or before hydration
  if (!mounted) {
    return (
      <div className="flex flex-col min-h-screen">
        <header className="p-4 border-b">
          <div className="flex justify-between items-center">
            <div className="h-8 w-24 bg-muted rounded"></div>
            <div className="h-5 w-20 bg-muted rounded"></div>
          </div>
          <div className="mt-2 h-2 w-full bg-muted rounded"></div>
        </header>
        <main className="flex-1 flex flex-col p-6">
          <div className="w-full max-w-md mx-auto">
            <div className="h-8 w-64 bg-muted rounded mb-6"></div>
            <div className="space-y-6">
              <div className="h-12 w-full bg-muted rounded"></div>
              <div className="h-12 w-full bg-muted rounded"></div>
              <div className="h-12 w-full bg-muted rounded"></div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen" dir={dir}>
      <header className="p-4 border-b">
        <div className="flex justify-between items-center">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className="flex items-center gap-2 text-muted-foreground disabled:opacity-50"
          >
            <ArrowLeft size={20} className={dir === "rtl" ? "rtl-mirror" : ""} />
            <span>{t("onboarding.back")}</span>
          </button>
          <span className="text-sm font-medium">
            {t("onboarding.step")} {step} {t("onboarding.of")} {totalSteps}
          </span>
        </div>
        <Progress value={progress} className="mt-2" />
      </header>

      <main className="flex-1 flex flex-col p-6">
        <div className="w-full max-w-md mx-auto">
          {step === 1 && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">{t("onboarding.aboutYou")}</h1>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">{t("onboarding.firstName")}</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => updateFormData("firstName", e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">{t("onboarding.lastName")}</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => updateFormData("lastName", e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">{t("onboarding.age")}</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => updateFormData("age", e.target.value)}
                    required
                    className="h-12"
                    min="13"
                    max="120"
                  />
                </div>
              </div>
              <Button onClick={handleNext} className="w-full h-12">
                {t("onboarding.continue")}
                <ArrowRight className={`ml-2 h-5 w-5 ${dir === "rtl" ? "rtl-mirror" : ""}`} />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">{t("onboarding.howParticipate")}</h1>
              <div className="space-y-4">
                <RadioGroup
                  value={formData.role}
                  onValueChange={(value) => updateFormData("role", value)}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-2 border rounded-lg p-4">
                    <RadioGroupItem value="young" id="young" />
                    <Label htmlFor="young" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-full bg-primary/10 text-primary">
                          <UserCircle className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium">{t("onboarding.youngPerson")}</div>
                          <div className="text-sm text-muted-foreground">{t("onboarding.youngPersonDesc")}</div>
                        </div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-4">
                    <RadioGroupItem value="senior" id="senior" />
                    <Label htmlFor="senior" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-full bg-secondary/10 text-secondary">
                          <UserCog className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium">{t("onboarding.senior")}</div>
                          <div className="text-sm text-muted-foreground">{t("onboarding.seniorDesc")}</div>
                        </div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-4">
                    <RadioGroupItem value="organization" id="organization" />
                    <Label htmlFor="organization" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-full bg-accent/10 text-accent">
                          <Building2 className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium">{t("onboarding.organization")}</div>
                          <div className="text-sm text-muted-foreground">{t("onboarding.organizationDesc")}</div>
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <Button onClick={handleNext} className="w-full h-12">
                {t("onboarding.continue")}
                <ArrowRight className={`ml-2 h-5 w-5 ${dir === "rtl" ? "rtl-mirror" : ""}`} />
              </Button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">{t("onboarding.interests")}</h1>
              <p className="text-muted-foreground">{t("onboarding.selectAll")}</p>

              <InterestSelector
                selectedInterests={formData.interests}
                onChange={(interests) => updateFormData("interests", interests)}
              />

              <Button onClick={handleNext} className="w-full h-12" disabled={formData.interests.length === 0}>
                {t("onboarding.continue")}
                <ArrowRight className={`ml-2 h-5 w-5 ${dir === "rtl" ? "rtl-mirror" : ""}`} />
              </Button>
            </div>
          )}

          {step === 4 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h1 className="text-2xl font-bold">{t("onboarding.almostThere")}</h1>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>{t("onboarding.canTeach")}</Label>
                  <ExpertiseSelector
                    selectedItems={formData.teachingExpertise}
                    onChange={(items) => updateFormData("teachingExpertise", items)}
                    type="teach"
                  />
                </div>

                <div className="space-y-2">
                  <Label>{t("onboarding.wantToLearn")}</Label>
                  <ExpertiseSelector
                    selectedItems={formData.learningGoals}
                    onChange={(items) => updateFormData("learningGoals", items)}
                    type="learn"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12"
                disabled={formData.teachingExpertise.length === 0 || formData.learningGoals.length === 0}
              >
                {t("onboarding.completeProfile")}
              </Button>
            </form>
          )}
        </div>
      </main>
    </div>
  )
}

