"use client"

import type React from "react"

import { useLanguage } from "@/components/language-context"
import { useEffect } from "react"

export function RTLProvider({ children }: { children: React.ReactNode }) {
  const { dir } = useLanguage()

  useEffect(() => {
    // Apply RTL styles to the document
    document.documentElement.dir = dir

    // Add RTL-specific class to body for additional styling if needed
    if (dir === "rtl") {
      document.body.classList.add("rtl")
    } else {
      document.body.classList.remove("rtl")
    }
  }, [dir])

  return <>{children}</>
}

