"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Video, Users } from "lucide-react"
import { useLanguage } from "@/components/language-context"

interface UpcomingEventProps {
  title: string
  host: string
  time: string
  attendees: number
  type: "virtual" | "in-person"
}

export function UpcomingEvent({ title, host, time, attendees, type }: UpcomingEventProps) {
  const { t, dir } = useLanguage()

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-muted-foreground">
              {t("events.hostedBy")} {host}
            </p>
            <div className="flex items-center mt-2 text-sm text-muted-foreground">
              <Calendar className={`h-4 w-4 ${dir === "rtl" ? "ml-1" : "mr-1"}`} />
              <span>{time}</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center text-sm text-muted-foreground mb-1">
              <Users className={`h-4 w-4 ${dir === "rtl" ? "ml-1" : "mr-1"}`} />
              <span>
                {attendees} {t("events.attending")}
              </span>
            </div>
            <div className="flex items-center text-xs bg-primary/10 text-primary rounded-full px-2 py-1">
              {type === "virtual" ? (
                <>
                  <Video className={`h-3 w-3 ${dir === "rtl" ? "ml-1" : "mr-1"}`} />
                  <span>{t("events.virtual")}</span>
                </>
              ) : (
                <>
                  <MapPin className={`h-3 w-3 ${dir === "rtl" ? "ml-1" : "mr-1"}`} />
                  <span>{t("events.inPerson")}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

