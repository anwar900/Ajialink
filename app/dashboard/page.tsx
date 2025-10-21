"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Gift, HandHelping, Search, MessageCircle, Video, Trophy, Sparkles, Award, Users } from "lucide-react"
import { ServiceCard } from "@/components/service-card"
import { UpcomingEvent } from "@/components/upcoming-event"
import { DailyChallenge } from "@/components/daily-challenge"
import { ProfilePoints } from "@/components/profile-points"
import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/components/language-context"
import { LanguageSelector } from "@/components/language-selector"
import Image from "next/image";

export default function Dashboard() {
  const { t, dir } = useLanguage()

  return (
    <div className="container px-4 py-6 space-y-6" dir={dir}>
      <header className="flex items-center justify-between">
        <div>
          <div className="flex items-center mb-2">
            <Image src="/logo.png" alt={t("common.appName")} width={800} height={200} className="h-12 w-auto"/>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost">
            <Search className="h-5 w-5"/>
            <span className="sr-only">Search</span>
          </Button>
          <ProfilePoints points={250} initials="SJ"/>
        </div>
      </header>

      <Tabs defaultValue="give" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="give" className="text-base py-3">
            <Gift className={`h-4 w-4 ${dir === "rtl" ? "ml-2" : "mr-2"}`} />
            {t("dashboard.give")}
          </TabsTrigger>
          <TabsTrigger value="receive" className="text-base py-3">
            <HandHelping className={`h-4 w-4 ${dir === "rtl" ? "ml-2" : "mr-2"}`} />
            {t("dashboard.receive")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="give" className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <ServiceCard
              icon={<BookOpen className="h-6 w-6" />}
              title={t("dashboard.shareKnowledge")}
              description={t("dashboard.shareKnowledgeDesc")}
              href="/dashboard/share"
            />
            <ServiceCard
              icon={<MessageCircle className="h-6 w-6" />}
              title={t("dashboard.conversation")}
              description={t("dashboard.conversationDesc")}
              href="/dashboard/chat"
            />
            <ServiceCard
              icon={<Video className="h-6 w-6" />}
              title={t("dashboard.hostWorkshop")}
              description={t("dashboard.hostWorkshopDesc")}
              href="/dashboard/host"
            />
            <ServiceCard
              icon={<HandHelping className="h-6 w-6" />}
              title={t("dashboard.offerHelp")}
              description={t("dashboard.offerHelpDesc")}
              href="/dashboard/help"
            />
          </div>
        </TabsContent>
        <TabsContent value="receive" className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <ServiceCard
              icon={<BookOpen className="h-6 w-6" />}
              title={t("dashboard.learnSomething")}
              description={t("dashboard.learnSomethingDesc")}
              href="/dashboard/learn"
            />
            <ServiceCard
              icon={<MessageCircle className="h-6 w-6" />}
              title={t("dashboard.findCompany")}
              description={t("dashboard.findCompanyDesc")}
              href="/dashboard/connect"
            />
            <ServiceCard
              icon={<Video className="h-6 w-6" />}
              title={t("dashboard.joinWorkshop")}
              description={t("dashboard.joinWorkshopDesc")}
              href="/dashboard/workshops"
            />
            <ServiceCard
              icon={<HandHelping className="h-6 w-6" />}
              title={t("dashboard.requestHelp")}
              description={t("dashboard.requestHelpDesc")}
              href="/dashboard/request"
            />
          </div>
        </TabsContent>
      </Tabs>

      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Trophy className={`h-5 w-5 text-accent ${dir === "rtl" ? "ml-2" : "mr-2"}`} />
            <h2 className="text-xl font-bold">{t("dashboard.dailyChallenge")}</h2>
          </div>
          <Button variant="ghost" size="sm" className="gap-1">
            <Sparkles className={`h-4 w-4 ${dir === "rtl" ? "ml-1" : "mr-1"}`} />
            <span>{t("dashboard.viewAll")}</span>
          </Button>
        </div>
        <DailyChallenge
          title={t("challenge.shareSkill")}
          description={t("challenge.shareSkillDesc")}
          reward={`50 ${t("challenge.points")}`}
          timeLeft={`8 ${t("challenge.timeLeft")}`}
          progress={30}
          participants={12}
        />
      </section>

      <SponsorCarousel />

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">{t("dashboard.upcomingEvents")}</h2>
          <Button variant="ghost" size="sm" asChild>
            <a href="/dashboard/events">{t("dashboard.viewAll")}</a>
          </Button>
        </div>
        <div className="space-y-3">
          <UpcomingEvent
            title={t("events.bakingWorkshop")}
            host="Fati Morhodi"
            time={t("events.todayTime")}
            attendees={12}
            type="virtual"
          />
          <UpcomingEvent
            title={t("events.photographyWalk")}
            host="Hiba Fouazi"
            time={t("events.tomorrowTime")}
            attendees={8}
            type="in-person"
          />
          <UpcomingEvent
            title={t("events.historyDiscussion")}
            host="Zakaria Tahiri"
            time={t("events.fridayTime")}
            attendees={15}
            type="virtual"
          />
        </div>
      </section>

      <MemberOfMonthCarousel />
    </div>
  )
}

// Update the SponsorCarousel function to handle client-side rendering properly
function SponsorCarousel() {
  const bannerAds = [
    {
      id: 1,
      image: "/banner1.png?height=50&width=600",
      alt: "Senior Care Services - Special Discount",
      link: "#senior-care",
    },
    {
      id: 2,
      image: "/banner1.png?height=50&width=600",
      alt: "Community Foundation - Supporting Generations",
      link: "#community-foundation",
    },
    {
      id: 3,
      image: "/banner1.png?height=50&width=600",
      alt: "Tech for All - Digital Skills Workshop",
      link: "#tech-for-all",
    },
    {
      id: 4,
      image: "/banner1.png?height=50&width=600",
      alt: "Local Library - Intergenerational Reading Program",
      link: "#local-library",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const { dir } = useLanguage()
  const [mounted, setMounted] = useState(false)

  // Handle client-side rendering
  useEffect(() => {
    setMounted(true)

    // Auto-advance the carousel only after mounting
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerAds.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [bannerAds.length])

  // Show a simple placeholder during server rendering or before hydration
  if (!mounted) {
    return (
      <section className="mb-6">
        <div className="relative overflow-hidden rounded-lg h-[50px] bg-muted/30"></div>
      </section>
    )
  }

  return (
    <section className="mb-6">
      <div className="relative overflow-hidden rounded-lg h-[70px]">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            width: `${bannerAds.length * 100}%`,
            transform: `translateX(${dir === "rtl" ? "" : "-"}${currentIndex * (100 / bannerAds.length)}%)`,
          }}
        >
          {bannerAds.map((ad) => (
            <div key={ad.id} style={{ width: `${100 / bannerAds.length}%` }} className="h-full">
              <a href={ad.link} className="block h-full">
                <img
                  src={ad.image || "/placeholder.svg"}
                  alt={ad.alt}
                  className="w-full h-full object-cover rounded-lg shadow-sm"
                />
              </a>
            </div>
          ))}
        </div>

        {/* Indicator dots */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
          {bannerAds.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                i === currentIndex ? "w-4 bg-primary" : "w-1.5 bg-background/70"
              }`}
              onClick={() => setCurrentIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// Update the MemberOfMonthCarousel function to handle client-side rendering properly
function MemberOfMonthCarousel() {
  const { t, dir } = useLanguage()
  const [mounted, setMounted] = useState(false)

  // Handle client-side rendering
  useEffect(() => {
    setMounted(true)
  }, [])

  const featuredMembers = [
    {
      id: 1,
      type: t("dashboard.youngOfMonth"),
      name: "Yazid Abdelmoula",
      age: 19,
      achievement: t("members.youngAchievement"),
      image: "/youngi.jpg?height=300&width=300",
      color: "bg-primary/10",
      textColor: "text-primary",
      borderColor: "border-primary/40",
      icon: <Gift className="h-5 w-5" />,
    },
    {
      id: 2,
      type: t("dashboard.seniorOfMonth"),
      name: "Mohamaed ait parka",
      age: 72,
      achievement: t("members.seniorAchievement"),
      image: "/spold.jpg?height=300&width=300",
      color: "bg-secondary/10",
      textColor: "text-secondary",
      borderColor: "border-secondary/40",
      icon: <Award className="h-5 w-5" />,
    },
    {
      id: 3,
      type: t("dashboard.organizationOfMonth"),
      name: "Association Al Wiam",
      achievement: t("members.organizationAchievement"),
      image: "/imageassocias.jpeg?height=300&width=300",
      color: "bg-accent/10",
      textColor: "text-accent",
      borderColor: "border-accent/40",
      icon: <Users className="h-5 w-5" />,
    },
  ]

  const [activeIndex, setActiveIndex] = useState(0)
  const [startX, setStartX] = useState(0)
  const [isSwiping, setIsSwiping] = useState(false)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto-play functionality - only start after mounting
  useEffect(() => {
    if (!mounted) return

    const startAutoPlay = () => {
      autoPlayRef.current = setInterval(() => {
        if (!isSwiping) {
          setActiveIndex((prev) => (prev === featuredMembers.length - 1 ? 0 : prev + 1))
        }
      }, 6000)
    }

    startAutoPlay()

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [featuredMembers.length, isSwiping, mounted])

  // Touch handlers for manual swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX)
    setIsSwiping(true)

    // Clear auto-play during swipe
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0].clientX
    const diffX = startX - endX

    // Determine swipe direction based on threshold
    if (Math.abs(diffX) > 50) {
      if (diffX > 0 && activeIndex < featuredMembers.length - 1) {
        // Swiped left - go to next
        setActiveIndex((prev) => prev + 1)
      } else if (diffX < 0 && activeIndex > 0) {
        // Swiped right - go to previous
        setActiveIndex((prev) => prev - 1)
      }
    }

    setIsSwiping(false)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    // Prevent default to avoid page scrolling during swipe
    if (isSwiping) {
      e.preventDefault()
    }
  }

  // Show a simple placeholder during server rendering or before hydration
  if (!mounted) {
    return (
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Members of the Month</h2>
        </div>
        <div className="relative overflow-hidden rounded-lg">
          <div className="h-64 bg-muted/30 rounded-lg"></div>
        </div>
      </section>
    )
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{t("dashboard.membersOfMonth")}</h2>
        <div className="flex gap-1">
          {featuredMembers.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                i === activeIndex ? "w-4 bg-primary" : "w-1.5 bg-muted-foreground/30"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      </div>

      <div
        className="relative overflow-hidden rounded-lg"
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(${dir === "rtl" ? "" : "-"}${activeIndex * 100}%)` }}
        >
          {featuredMembers.map((member) => (
            <div key={member.id} className="w-full flex-shrink-0 px-1">
              <Card className={`border-2 ${member.borderColor} overflow-hidden`}>
                <div className="relative h-60">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                  <div
                    className={`absolute top-2 ${dir === "rtl" ? "right-2" : "left-2"} ${member.color} ${member.textColor} px-2 py-1 rounded-full text-xs font-medium flex items-center`}
                  >
                    {member.icon}
                    <span className={dir === "rtl" ? "mr-1" : "ml-1"}>{member.type}</span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  {member.age && (
                    <p className="text-sm text-muted-foreground mb-2">
                      {member.age} {t("members.yearsOld")}
                    </p>
                  )}
                  <p className="text-sm">{member.achievement}</p>

                  <Button variant="outline" className="w-full mt-4 gap-1">
                    <Trophy className={`h-4 w-4 ${dir === "rtl" ? "ml-1" : "mr-1"}`} />
                    <span>{t("dashboard.viewProfile")}</span>
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs text-center text-muted-foreground mt-2">{t("dashboard.swipeToSee")}</p>
    </section>
  )
}

