"use client"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Plus, Filter } from "lucide-react"
import { EventCard } from "@/components/event-card"
import { useLanguage } from "@/components/language-context"
import Image from "next/image";
import type React from "react";

export default function EventsPage() {
  const { t, dir } = useLanguage()

  return (
    <div className="container px-4 py-6 space-y-6" dir={dir}>
      <header className="flex items-center justify-between">
        <div>
          <div className="flex items-center mb-2">
            <Image src="/Logo.png" alt={t("common.appName")} width={800} height={200} className="h-12 w-auto"/>
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="icon" variant="outline">
            <Filter className="h-5 w-5"/>
            <span className="sr-only">{t("events.filter")}</span>
          </Button>
          <Button size="icon">
            <Plus className="h-5 w-5"/>
            <span className="sr-only">{t("events.createEvent")}</span>
          </Button>
        </div>
      </header>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">{t("events.upcoming")}</TabsTrigger>
          <TabsTrigger value="my-events">{t("events.myEvents")}</TabsTrigger>
          <TabsTrigger value="past">{t("events.past")}</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="mt-4 space-y-4">
          <EventCard
            title={t("events.bakingWorkshop")}
            host="Fati Morhodi"
            date={t("events.todayTime")}
            location={t("events.virtual")}
            attendees={12}
            image="/baking.jpeg?height=200&width=400"
            categories={[t("events.categories.baking"), t("events.categories.cooking")]}
          />
          <EventCard
            title={t("events.photographyWalk")}
            host="Hiba Faouzi"
            date={t("events.tomorrowTime")}
            location="Koutoubia Marrakech"
            attendees={8}
            image="/pdjdp.jpeg?height=200&width=400"
            categories={[t("events.categories.photography"), t("events.categories.outdoors")]}
          />
          <EventCard
            title={t("events.historyDiscussion")}
            host="Zakaria Tahiri"
            date={t("events.fridayTime")}
            location={t("events.virtual")}
            attendees={15}
            image="/imagsandes.jpeg?height=200&width=400"
            categories={[t("events.categories.history"), t("events.categories.discussion")]}
          />
          <EventCard
            title={t("events.gardeningTips")}
            host="Yassin saaidi"
            date={t("events.saturdayTime")}
            location={t("events.communityGarden")}
            attendees={20}
            image="/gardh.jpg?height=200&width=400"
            categories={[t("events.categories.gardening"), t("events.categories.outdoors")]}
          />
        </TabsContent>
        <TabsContent value="my-events" className="mt-4">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">{t("events.noEventsYet")}</h3>
            <p className="text-muted-foreground mb-6">{t("events.noEventsYetDesc")}</p>
            <Button>
              <Plus className={`h-4 w-4 ${dir === "rtl" ? "ml-2" : "mr-2"}`} />
              {t("events.createEvent")}
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="past" className="mt-4">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">{t("events.noPastEvents")}</h3>
            <p className="text-muted-foreground mb-6">{t("events.noPastEventsDesc")}</p>
            <Button variant="outline">{t("events.browseEvents")}</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

