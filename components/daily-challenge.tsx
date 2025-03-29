"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Trophy, Clock, Users } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/components/language-context"
import { useState, useEffect } from "react"

interface DailyChallengeProps {
  title: string
  description: string
  reward: string
  timeLeft: string
  progress: number
  participants: number
}

export function DailyChallenge({ title, description, reward, timeLeft, progress, participants }: DailyChallengeProps) {
  const { dir } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Card className="overflow-hidden border-2 border-accent/20 dark:border-accent/30 bg-gradient-to-br from-background to-accent/5">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            <div className="relative p-5 flex-1">
              {/* Loading placeholder */}
              <div className="h-6 w-48 bg-muted rounded mb-4"></div>
              <div className="h-4 w-full bg-muted rounded mb-4"></div>
              <div className="h-4 w-3/4 bg-muted rounded mb-6"></div>
              <div className="h-10 w-40 bg-muted rounded"></div>
            </div>
            <div className="hidden md:block w-1/3 bg-accent/20 dark:bg-accent/10"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden border-2 border-accent/20 dark:border-accent/30 bg-gradient-to-br from-background to-accent/5">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="relative p-5 flex-1">
            <div className="absolute top-0 right-0 h-24 w-24 opacity-10">
              <Trophy className="h-full w-full text-accent" />
            </div>

            <h3 className="text-xl font-bold mb-2 flex items-center">
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  duration: 2,
                  repeatDelay: 5,
                }}
              >
                <Trophy className="h-6 w-6 text-accent mr-2" />
              </motion.div>
              {title}
            </h3>

            <p className="text-muted-foreground mb-4">{description}</p>

            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center gap-1 text-sm">
                <div className="flex items-center justify-center bg-emerald-100 dark:bg-emerald-800 rounded-full w-5 h-5 mr-1">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-3 h-3 text-emerald-600 dark:text-emerald-300"
                  >
                    <path d="M12 2L22 12L12 22L2 12L12 2Z" />
                  </svg>
                </div>
                <span>{reward}</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Clock className={`h-4 w-4 text-muted-foreground ${dir === "rtl" ? "ml-1" : "mr-1"}`} />
                <span>{timeLeft}</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Users className={`h-4 w-4 text-muted-foreground ${dir === "rtl" ? "ml-1" : "mr-1"}`} />
                <span>{participants}</span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Accept Challenge</Button>
          </div>

          <div className="hidden md:block w-1/3 bg-accent/20 dark:bg-accent/10 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <Trophy className="h-24 w-24 text-accent opacity-30" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

