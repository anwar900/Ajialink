"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/theme-toggle"
import { Bell, Lock, User, Globe, ArrowLeft, ChevronRight, Eye, Type, Sliders, Check, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-context"
import { languages } from "@/lib/i18n"
import Image from "next/image"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { toast } from "@/hooks/use-toast"

// Font size options
const fontSizeOptions = [
  { value: "small", label: "accessibility.size.small", scale: 0.85 },
  { value: "default", label: "accessibility.size.default", scale: 1 },
  { value: "large", label: "accessibility.size.large", scale: 1.15 },
  { value: "extraLarge", label: "accessibility.size.extraLarge", scale: 1.3 },
]

// Text spacing options
const textSpacingOptions = [
  { value: "tight", label: "accessibility.spacing.tight", scale: 0.9 },
  { value: "normal", label: "accessibility.spacing.normal", scale: 1 },
  { value: "wide", label: "accessibility.spacing.wide", scale: 1.1 },
  { value: "extraWide", label: "accessibility.spacing.extraWide", scale: 1.2 },
]

export default function SettingsPage() {
  const { language, t, dir } = useLanguage()
  const [mounted, setMounted] = useState(false)

  // Accessibility settings
  const [fontSize, setFontSize] = useState("default")
  const [textSpacing, setTextSpacing] = useState("normal")
  const [highContrast, setHighContrast] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [lineHeight, setLineHeight] = useState(1.5)

  // Preview state
  const [isPreviewActive, setIsPreviewActive] = useState(false)
  const [previewFontSize, setPreviewFontSize] = useState("default")
  const [previewTextSpacing, setPreviewTextSpacing] = useState("normal")
  const [previewHighContrast, setPreviewHighContrast] = useState(false)
  const [previewReduceMotion, setPreviewReduceMotion] = useState(false)
  const [previewLineHeight, setPreviewLineHeight] = useState(1.5)

  // Load saved accessibility settings
  useEffect(() => {
    setMounted(true)

    if (typeof window !== "undefined") {
      // Load saved settings from localStorage
      const savedFontSize = localStorage.getItem("accessibility-font-size")
      const savedTextSpacing = localStorage.getItem("accessibility-text-spacing")
      const savedHighContrast = localStorage.getItem("accessibility-high-contrast")
      const savedReduceMotion = localStorage.getItem("accessibility-reduce-motion")
      const savedLineHeight = localStorage.getItem("accessibility-line-height")

      if (savedFontSize) {
        setFontSize(savedFontSize)
        setPreviewFontSize(savedFontSize)
      }
      if (savedTextSpacing) {
        setTextSpacing(savedTextSpacing)
        setPreviewTextSpacing(savedTextSpacing)
      }
      if (savedHighContrast) {
        setHighContrast(savedHighContrast === "true")
        setPreviewHighContrast(savedHighContrast === "true")
      }
      if (savedReduceMotion) {
        setReduceMotion(savedReduceMotion === "true")
        setPreviewReduceMotion(savedReduceMotion === "true")
      }
      if (savedLineHeight) {
        const lineHeightValue = Number.parseFloat(savedLineHeight)
        setLineHeight(lineHeightValue)
        setPreviewLineHeight(lineHeightValue)
      }

      // Apply settings to document
      applyAccessibilitySettings(
        savedFontSize || "default",
        savedTextSpacing || "normal",
        savedHighContrast === "true",
        savedReduceMotion === "true",
        savedLineHeight ? Number.parseFloat(savedLineHeight) : 1.5,
      )
    }
  }, [])

  // Apply accessibility settings to the document
  const applyAccessibilitySettings = (
    size: string,
    spacing: string,
    contrast: boolean,
    motion: boolean,
    lineHeightValue: number,
  ) => {
    // Get scale values
    const fontSizeScale = fontSizeOptions.find((opt) => opt.value === size)?.scale || 1
    const spacingScale = textSpacingOptions.find((opt) => opt.value === spacing)?.scale || 1

    // Apply to document root
    document.documentElement.style.setProperty("--font-size-scale", fontSizeScale.toString())
    document.documentElement.style.setProperty("--text-spacing-scale", spacingScale.toString())
    document.documentElement.style.setProperty("--line-height", lineHeightValue.toString())

    // Apply high contrast if enabled
    if (contrast) {
      document.documentElement.classList.add("high-contrast")
    } else {
      document.documentElement.classList.remove("high-contrast")
    }

    // Apply reduced motion if enabled
    if (motion) {
      document.documentElement.classList.add("reduce-motion")
    } else {
      document.documentElement.classList.remove("reduce-motion")
    }
  }

  // Apply preview settings
  const applyPreview = () => {
    setIsPreviewActive(true)
    applyAccessibilitySettings(
      previewFontSize,
      previewTextSpacing,
      previewHighContrast,
      previewReduceMotion,
      previewLineHeight,
    )
  }

  // Cancel preview and restore current settings
  const cancelPreview = () => {
    setIsPreviewActive(false)
    // Reset preview values to current settings
    setPreviewFontSize(fontSize)
    setPreviewTextSpacing(textSpacing)
    setPreviewHighContrast(highContrast)
    setPreviewReduceMotion(reduceMotion)
    setPreviewLineHeight(lineHeight)
    // Restore current settings
    applyAccessibilitySettings(fontSize, textSpacing, highContrast, reduceMotion, lineHeight)
  }

  // Save and apply settings
  const saveAccessibilitySettings = () => {
    if (typeof window !== "undefined") {
      // Update current settings with preview values
      setFontSize(previewFontSize)
      setTextSpacing(previewTextSpacing)
      setHighContrast(previewHighContrast)
      setReduceMotion(previewReduceMotion)
      setLineHeight(previewLineHeight)

      // Save to localStorage
      localStorage.setItem("accessibility-font-size", previewFontSize)
      localStorage.setItem("accessibility-text-spacing", previewTextSpacing)
      localStorage.setItem("accessibility-high-contrast", previewHighContrast.toString())
      localStorage.setItem("accessibility-reduce-motion", previewReduceMotion.toString())
      localStorage.setItem("accessibility-line-height", previewLineHeight.toString())

      // Apply settings
      applyAccessibilitySettings(
        previewFontSize,
        previewTextSpacing,
        previewHighContrast,
        previewReduceMotion,
        previewLineHeight,
      )

      // Exit preview mode
      setIsPreviewActive(false)

      // Show success toast
      toast({
        title: t("settings.accessibility.settingsSaved"),
        description: t("settings.accessibility.settingsApplied"),
      })
    }
  }

  // Reset to default settings
  const resetAccessibilitySettings = () => {
    // Reset preview values to defaults
    setPreviewFontSize("default")
    setPreviewTextSpacing("normal")
    setPreviewHighContrast(false)
    setPreviewReduceMotion(false)
    setPreviewLineHeight(1.5)

    // Apply preview
    applyPreview()
  }

  // Show a simple loading state during server rendering or before hydration
  if (!mounted) {
    return (
      <div className="container px-4 py-6 space-y-6">
        <header className="flex items-center justify-between">
          <div className="h-8 w-40 bg-muted rounded"></div>
          <div className="h-9 w-9 bg-muted rounded-full"></div>
        </header>
        <div className="h-12 w-full bg-muted rounded"></div>
        <div className="h-64 w-full bg-muted rounded"></div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-6 space-y-6" dir={dir}>
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold">{t("settings.title")}</h1>
        </div>
        <ThemeToggle />
      </header>

      {isPreviewActive && (
        <div className="sticky top-0 z-50 bg-background border-b border-primary p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            <span className="font-medium">{t("settings.accessibility.previewMode")}</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={cancelPreview}>
              {t("settings.accessibility.cancelPreview")}
            </Button>
            <Button size="sm" onClick={saveAccessibilitySettings}>
              <Check className="h-4 w-4 mr-1" />
              {t("settings.accessibility.saveSettings")}
            </Button>
          </div>
        </div>
      )}

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="account">
            <User className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">{t("settings.account")}</span>
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">{t("settings.notifications")}</span>
          </TabsTrigger>
          <TabsTrigger value="privacy">
            <Lock className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">{t("settings.privacy")}</span>
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Globe className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">{t("settings.appearance")}</span>
          </TabsTrigger>
          <TabsTrigger value="accessibility">
            <Eye className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">{t("settings.accessibility.title")}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("settings.accountInfo")}</CardTitle>
              <CardDescription>{t("settings.accountDescription")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t("settings.name")}</Label>
                <div className="font-medium">Imad Agjoud</div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t("settings.email")}</Label>
                <div className="font-medium">imadagjoud@emikhayr.com</div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{t("settings.phone")}</Label>
                <div className="font-medium">+(212) 693-702-202</div>
              </div>
              <Button>{t("settings.editProfile")}</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("settings.notificationPreferences")}</CardTitle>
              <CardDescription>{t("settings.notificationDescription")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="messages">{t("settings.messagesNotification")}</Label>
                  <p className="text-sm text-muted-foreground">{t("settings.messagesNotificationDesc")}</p>
                </div>
                <Switch id="messages" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="events">{t("settings.eventsNotification")}</Label>
                  <p className="text-sm text-muted-foreground">{t("settings.eventsNotificationDesc")}</p>
                </div>
                <Switch id="events" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="challenges">{t("settings.challengesNotification")}</Label>
                  <p className="text-sm text-muted-foreground">{t("settings.challengesNotificationDesc")}</p>
                </div>
                <Switch id="challenges" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("settings.privacySettings")}</CardTitle>
              <CardDescription>{t("settings.privacyDescription")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="profile-visibility">{t("settings.profileVisibility")}</Label>
                  <p className="text-sm text-muted-foreground">{t("settings.profileVisibilityDesc")}</p>
                </div>
                <Switch id="profile-visibility" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="location-sharing">{t("settings.locationSharing")}</Label>
                  <p className="text-sm text-muted-foreground">{t("settings.locationSharingDesc")}</p>
                </div>
                <Switch id="location-sharing" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="activity-status">{t("settings.activityStatus")}</Label>
                  <p className="text-sm text-muted-foreground">{t("settings.activityStatusDesc")}</p>
                </div>
                <Switch id="activity-status" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("settings.appearanceSettings")}</CardTitle>
              <CardDescription>{t("settings.appearanceDescription")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{t("settings.theme")}</Label>
                    <p className="text-sm text-muted-foreground">{t("settings.themeDescription")}</p>
                  </div>
                  <ThemeToggle />
                </div>

                <Link href="/dashboard/settings/language" className="block">
                  <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary/10 text-primary">
                        <Globe className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">{t("settings.language")}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Image
                            src={languages[language].flagImage || "/placeholder.svg"}
                            alt={languages[language].name}
                            width={20}
                            height={15}
                            className="rounded-sm"
                          />
                          {languages[language].name}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </Link>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sound-effects">{t("settings.soundEffects")}</Label>
                    <p className="text-sm text-muted-foreground">{t("settings.soundEffectsDesc")}</p>
                  </div>
                  <Switch id="sound-effects" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="animations">{t("settings.animations")}</Label>
                    <p className="text-sm text-muted-foreground">{t("settings.animationsDesc")}</p>
                  </div>
                  <Switch id="animations" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accessibility" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("settings.accessibility.title")}</CardTitle>
              <CardDescription>{t("settings.accessibility.description")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Font Size */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Type className="h-5 w-5 text-primary" />
                  <Label className="text-base font-medium">{t("settings.accessibility.fontSize")}</Label>
                </div>
                <p className="text-sm text-muted-foreground">{t("settings.accessibility.fontSizeDescription")}</p>

                <RadioGroup
                  value={previewFontSize}
                  onValueChange={(value) => {
                    setPreviewFontSize(value)
                    if (!isPreviewActive) setIsPreviewActive(true)
                    applyAccessibilitySettings(
                      value,
                      previewTextSpacing,
                      previewHighContrast,
                      previewReduceMotion,
                      previewLineHeight,
                    )
                  }}
                  className="grid grid-cols-2 gap-2 pt-2"
                >
                  {fontSizeOptions.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={`font-size-${option.value}`} />
                      <Label htmlFor={`font-size-${option.value}`} style={{ fontSize: `${option.scale}rem` }}>
                        {t(`settings.accessibility.size.${option.value}`)}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Text Spacing */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Sliders className="h-5 w-5 text-primary" />
                  <Label className="text-base font-medium">{t("settings.accessibility.textSpacing")}</Label>
                </div>
                <p className="text-sm text-muted-foreground">{t("settings.accessibility.textSpacingDescription")}</p>

                <RadioGroup
                  value={previewTextSpacing}
                  onValueChange={(value) => {
                    setPreviewTextSpacing(value)
                    if (!isPreviewActive) setIsPreviewActive(true)
                    applyAccessibilitySettings(
                      previewFontSize,
                      value,
                      previewHighContrast,
                      previewReduceMotion,
                      previewLineHeight,
                    )
                  }}
                  className="grid grid-cols-2 gap-2 pt-2"
                >
                  {textSpacingOptions.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={`text-spacing-${option.value}`} />
                      <Label
                        htmlFor={`text-spacing-${option.value}`}
                        style={{ letterSpacing: `${option.scale * 0.01}em` }}
                      >
                        {t(`settings.accessibility.spacing.${option.value}`)}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Line Height */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">{t("settings.accessibility.lineHeight")}</Label>
                  <span className="text-sm">{previewLineHeight.toFixed(1)}</span>
                </div>
                <Slider
                  value={[previewLineHeight]}
                  min={1}
                  max={2}
                  step={0.1}
                  onValueChange={(value) => {
                    setPreviewLineHeight(value[0])
                    if (!isPreviewActive) setIsPreviewActive(true)
                    applyAccessibilitySettings(
                      previewFontSize,
                      previewTextSpacing,
                      previewHighContrast,
                      previewReduceMotion,
                      value[0],
                    )
                  }}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{t("settings.accessibility.compact")}</span>
                  <span>{t("settings.accessibility.spacious")}</span>
                </div>
              </div>

              {/* High Contrast */}
              <div className="flex items-center justify-between pt-2">
                <div className="space-y-0.5">
                  <Label htmlFor="high-contrast" className="text-base font-medium">
                    {t("settings.accessibility.highContrast")}
                  </Label>
                  <p className="text-sm text-muted-foreground">{t("settings.accessibility.highContrastDescription")}</p>
                </div>
                <Switch
                  id="high-contrast"
                  checked={previewHighContrast}
                  onCheckedChange={(checked) => {
                    setPreviewHighContrast(checked)
                    if (!isPreviewActive) setIsPreviewActive(true)
                    applyAccessibilitySettings(
                      previewFontSize,
                      previewTextSpacing,
                      checked,
                      previewReduceMotion,
                      previewLineHeight,
                    )
                  }}
                />
              </div>

              {/* Reduce Motion */}
              <div className="flex items-center justify-between pt-2">
                <div className="space-y-0.5">
                  <Label htmlFor="reduce-motion" className="text-base font-medium">
                    {t("settings.accessibility.reduceMotion")}
                  </Label>
                  <p className="text-sm text-muted-foreground">{t("settings.accessibility.reduceMotionDescription")}</p>
                </div>
                <Switch
                  id="reduce-motion"
                  checked={previewReduceMotion}
                  onCheckedChange={(checked) => {
                    setPreviewReduceMotion(checked)
                    if (!isPreviewActive) setIsPreviewActive(true)
                    applyAccessibilitySettings(
                      previewFontSize,
                      previewTextSpacing,
                      previewHighContrast,
                      checked,
                      previewLineHeight,
                    )
                  }}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-4 border-t">
              <Button variant="outline" onClick={resetAccessibilitySettings}>
                <RefreshCw className="h-4 w-4 mr-2" />
                {t("settings.accessibility.reset")}
              </Button>
              <Button onClick={saveAccessibilitySettings}>
                <Check className="h-4 w-4 mr-2" />
                {t("settings.accessibility.apply")}
              </Button>
            </CardFooter>
          </Card>

          {/* Preview Card */}
          <Card>
            <CardHeader>
              <CardTitle>{t("settings.accessibility.previewTitle")}</CardTitle>
              <CardDescription>{t("settings.accessibility.previewDescription")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="text-lg font-bold mb-2">{t("settings.accessibility.sampleHeading")}</h3>
                <p className="mb-3">{t("settings.accessibility.sampleParagraph1")}</p>
                <p>{t("settings.accessibility.sampleParagraph2")}</p>
                <div className="flex gap-2 mt-4">
                  <Button size="sm">{t("settings.accessibility.sampleButton")}</Button>
                  <Button size="sm" variant="outline">
                    {t("settings.cancel")}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

