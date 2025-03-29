"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus, Filter, Users, Archive, Clock, CheckCheck } from "lucide-react"
import Link from "next/link"
import { ProfilePoints } from "@/components/profile-points"
import { useLanguage } from "@/components/language-context"
import Image from "next/image";

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const { t, dir } = useLanguage()

  const allMessages = [
    {
      id: "1",
      name: "Anas EL Yaakoubi",
      avatar: "/anas.jpeg?height=40&width=40",
      message: t("messages.sourdoughMessage"),
      time: t("messages.time.today"),
      unread: true,
      online: true,
      category: "recent",
      isTyping: false,
    },
    {
      id: "2",
      name: "Khawla bagbagi",
      avatar: "/khawla.jpeg?height=40&width=40",
      message: t("messages.photographyMessage"),
      time: t("messages.time.yesterday"),
      unread: false,
      online: false,
      category: "recent",
      isTyping: false,
    },
    {
      id: "3",
      name: "Douae Imloul",
      avatar: "/douae.jpeg?height=40&width=40",
      message: t("messages.historyMessage"),
      time: t("messages.time.yesterday"),
      unread: false,
      online: true,
      category: "recent",
      isTyping: true,
    },
    {
      id: "4",
      name: t("messages.gardeningGroup"),
      avatar: "/placeholder.svg?height=40&width=40",
      message: `Meya: ${t("messages.gardeningMessage")}`,
      time: t("messages.time.monday"),
      unread: false,
      online: false,
      category: "groups",
      isTyping: false,
      members: 8,
    },
    {
      id: "5",
      name: "Hiba Qazbar",
      avatar: "/placeholder.svg?height=40&width=40",
      message: t("messages.computerMessage"),
      time: t("messages.time.sunday"),
      unread: false,
      online: false,
      category: "archived",
      isTyping: false,
    },
    {
      id: "6",
      name: t("messages.photographyClub"),
      avatar: "/placeholder.svg?height=40&width=40",
      message: `Widad: ${t("messages.photoWalkMessage")}`,
      time: t("messages.time.lastWeek"),
      unread: false,
      online: false,
      category: "groups",
      isTyping: false,
      members: 12,
    },
  ]

  const filteredMessages = allMessages.filter(
    (message) =>
      message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.message.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="container px-4 py-6 space-y-6" dir={dir}>
      <header className="flex items-center justify-between">
        <div>
          <div className="flex items-center mb-2">
            <Image src="/Logo.png" alt={t("common.appName")} width={800} height={200} className="h-12 w-auto"/>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button size="icon">
            <Plus className="h-5 w-5"/>
            <span className="sr-only">{t("messages.newMessage")}</span>
          </Button>
          <ProfilePoints points={250} initials="SJ"/>
        </div>
      </header>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search
              className={`absolute ${dir === "rtl" ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground`}
          />
          <Input
            placeholder={t("messages.searchMessages")}
            className={dir === "rtl" ? "pr-9" : "pl-9"}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button size="icon" variant="outline">
          <Filter className="h-4 w-4" />
          <span className="sr-only">{t("messages.filter")}</span>
        </Button>
      </div>

      <Tabs defaultValue="recent" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="recent">
            <Clock className={`h-4 w-4 ${dir === "rtl" ? "ml-2" : "mr-2"}`} />
            {t("messages.tabs.recent")}
          </TabsTrigger>
          <TabsTrigger value="groups">
            <Users className={`h-4 w-4 ${dir === "rtl" ? "ml-2" : "mr-2"}`} />
            {t("messages.tabs.groups")}
          </TabsTrigger>
          <TabsTrigger value="archived">
            <Archive className={`h-4 w-4 ${dir === "rtl" ? "ml-2" : "mr-2"}`} />
            {t("messages.tabs.archived")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-2">
          {filteredMessages
            .filter((message) => message.category === "recent")
            .map((message) => (
              <Link href={`/dashboard/messages/${message.id}`} key={message.id}>
                <MessageCard message={message} />
              </Link>
            ))}
        </TabsContent>

        <TabsContent value="groups" className="space-y-2">
          {filteredMessages
            .filter((message) => message.category === "groups")
            .map((message) => (
              <Link href={`/dashboard/messages/${message.id}`} key={message.id}>
                <MessageCard message={message} />
              </Link>
            ))}
        </TabsContent>

        <TabsContent value="archived" className="space-y-2">
          {filteredMessages
            .filter((message) => message.category === "archived")
            .map((message) => (
              <Link href={`/dashboard/messages/${message.id}`} key={message.id}>
                <MessageCard message={message} />
              </Link>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface MessageCardProps {
  message: {
    id: string
    name: string
    avatar: string
    message: string
    time: string
    unread: boolean
    online: boolean
    category: string
    isTyping: boolean
    members?: number
  }
}

function MessageCard({ message }: MessageCardProps) {
  const initials = message.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  const { t, dir } = useLanguage()

  return (
    <div className="flex items-start gap-3 p-4 rounded-lg hover:bg-muted/50 cursor-pointer border border-transparent hover:border-border transition-colors">
      <div className="relative">
        <Avatar className="h-12 w-12 border border-border">
          <AvatarImage src={message.avatar} alt={message.name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        {message.online && (
          <span
            className={`absolute bottom-0 ${dir === "rtl" ? "left-0" : "right-0"} w-3 h-3 bg-emerald-500 rounded-full border-2 border-background`}
          ></span>
        )}
        {message.category === "groups" && (
          <div
            className={`absolute -bottom-1 ${dir === "rtl" ? "-left-1" : "-right-1"} bg-primary text-primary-foreground text-xs font-bold rounded-full px-1 min-w-[20px] text-center border border-background`}
          >
            {message.members}
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h3 className={`font-medium ${message.unread ? "text-foreground" : "text-muted-foreground"}`}>
            {message.name}
          </h3>
          <div className="flex items-center">
            <span className={`text-xs ${message.unread ? "text-primary font-medium" : "text-muted-foreground"}`}>
              {message.time}
            </span>
            {message.unread && <Badge variant="default" className="ml-2 h-2 w-2 rounded-full p-0" />}
          </div>
        </div>
        <p className={`text-sm truncate ${message.unread ? "font-medium" : "text-muted-foreground"}`}>
          {message.isTyping ? (
            <span className="flex items-center text-primary">
              <span className={dir === "rtl" ? "ml-2" : "mr-2"}>{t("messages.typing")}</span>
              <span className="flex space-x-1">
                <span className="animate-bounce delay-0 h-1.5 w-1.5 bg-primary rounded-full"></span>
                <span className="animate-bounce delay-150 h-1.5 w-1.5 bg-primary rounded-full"></span>
                <span className="animate-bounce delay-300 h-1.5 w-1.5 bg-primary rounded-full"></span>
              </span>
            </span>
          ) : (
            message.message
          )}
        </p>
        {!message.isTyping && message.category === "recent" && !message.unread && (
          <div className="flex items-center mt-1 text-muted-foreground">
            <CheckCheck className={`h-3 w-3 ${dir === "rtl" ? "ml-1" : "mr-1"}`} />
            <span className="text-xs">{t("messages.read")}</span>
          </div>
        )}
      </div>
    </div>
  )
}

