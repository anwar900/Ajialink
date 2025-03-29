"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Video, Users } from "lucide-react"
import { useLanguage } from "@/components/language-context"

interface EventCardProps {
  title: string
  host: string
  date: string
  location: string
  attendees: number
  image: string
  categories: string[]
}

export function EventCard({ title, host, date, location, attendees, image, categories }: EventCardProps) {
  const isVirtual = location === "Virtual" || location === "Virtuel" || location === "افتراضي"
  const { t, dir } = useLanguage()

  return (
    <Card className="overflow-hidden">
      <div className="relative h-40">
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
      </div>
      <CardContent className="p-4">
        <div className="flex flex-wrap gap-1 mb-2">
          {categories.map((category) => (
            <Badge key={category} variant="secondary" className="text-xs">
              {category}
            </Badge>
          ))}
        </div>
        <h3 className="font-bold text-lg mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-3">
          {t("events.hostedBy")} {host}
        </p>

        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <Calendar className={`h-4 w-4 ${dir === "rtl" ? "ml-2" : "mr-2"}`} />
          <span>{date}</span>
        </div>

        <div className="flex items-center text-sm text-muted-foreground mb-2">
          {isVirtual ? (
            <Video className={`h-4 w-4 ${dir === "rtl" ? "ml-2" : "mr-2"}`} />
          ) : (
            <MapPin className={`h-4 w-4 ${dir === "rtl" ? "ml-2" : "mr-2"}`} />
          )}
          <span>{location}</span>
        </div>

        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <Users className={`h-4 w-4 ${dir === "rtl" ? "ml-2" : "mr-2"}`} />
          <span>
            {attendees} {t("events.attending")}
          </span>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1">{t("events.join")}</Button>
          <Button variant="outline" className="flex-1">
            {t("events.details")}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

