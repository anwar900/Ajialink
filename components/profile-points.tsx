"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { motion } from "framer-motion"

interface ProfilePointsProps {
  points: number
  image?: string
  initials: string
}

export function ProfilePoints({ points, image, initials }: ProfilePointsProps) {
  return (
    <div className="flex items-center gap-3">
      {/* Points counter with diamond currency symbol */}
      <motion.div
        className="flex items-center bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded-full"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <div className="flex items-center justify-center bg-emerald-200 dark:bg-emerald-700 rounded-full w-5 h-5 mr-1.5">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-emerald-600 dark:text-emerald-300">
            {/* Diamond shape */}
            <path d="M12 2L22 12L12 22L2 12L12 2Z" />
          </svg>
        </div>
        <span className="font-semibold">{points}</span>
      </motion.div>

      {/* Avatar - increased size */}
      <Link href="/dashboard/profile">
        <Avatar className="h-10 w-10 border-2 border-primary/20 hover:border-primary/50 transition-colors">
          <AvatarImage src={image} alt="Profile" />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </Link>
    </div>
  )
}

