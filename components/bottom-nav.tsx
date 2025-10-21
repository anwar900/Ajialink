"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Calendar, MessageSquare, Users, Settings } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useLanguage } from "@/components/language-context"

export function BottomNav() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const { t, dir } = useLanguage()

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const links = [
    {
      href: "/dashboard",
      label: t("navigation.home"),
      icon: Home,
    },
    {
      href: "/dashboard/events",
      label: t("navigation.events"),
      icon: Calendar,
    },
    {
      href: "/dashboard/messages",
      label: t("navigation.messages"),
      icon: MessageSquare,
      hasNotification: true,
    },
    {
      href: "/dashboard/community",
      label: t("navigation.community"),
      icon: Users,
    },
    {
      href: "/dashboard/settings",
      label: t("navigation.settings"),
      icon: Settings,
    },
  ]

  if (!mounted) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-10 bg-background border-t h-16">
        <div className="flex justify-around h-full">
          {links.map((link) => (
            <div key={link.href} className="flex flex-col items-center justify-center py-2 px-3">
              <div className="w-6 h-6" />
              <span className="text-xs mt-1 opacity-0">{link.label}</span>
            </div>
          ))}
        </div>
      </nav>
    )
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-md border-t transform-gpu" dir={dir}>
      <div className="flex items-start">
        {links.map((link) => {
          const isActive =
            link.href === "/dashboard"
              ? pathname === link.href
              : pathname.startsWith(link.href)
          const Icon = link.icon

          return (
            <Link key={link.href} href={link.href} className="flex-1 flex flex-col items-center py-2 px-1 relative text-center">
              <div className="relative">
                {isActive && (
                  <motion.div
                    layoutId="bottomNavIndicator"
                    className="absolute inset-0 bg-primary/10 rounded-full -m-2 w-12 h-12"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }} className="relative z-10">
                  <Icon size={24} className={isActive ? "text-primary" : "text-muted-foreground"} />
                  {link.hasNotification && !isActive && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
                  )}
                </motion.div>
              </div>
              <motion.span
                className={`text-xs mt-1 ${isActive ? "font-medium text-primary" : "text-muted-foreground"}`}
                animate={{ y: isActive ? 0 : 0 }}
                initial={false}
              >
                {link.label}
              </motion.span>
              {isActive && (
                <motion.div
                  layoutId="bottomNavLine"
                  className="absolute bottom-0 w-6 h-0.5 bg-primary rounded-full"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

