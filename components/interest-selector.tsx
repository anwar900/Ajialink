"use client"

import type React from "react"
import { Badge } from "@/components/ui/badge"
import {
  Camera,
  Palette,
  Scissors,
  PenTool,
  Utensils,
  Croissant,
  Code,
  ClubIcon as Football,
  BookOpen,
  Leaf,
  Theater,
  Axe,
  Shirt,
  Dog,
  Plus,
} from "lucide-react"

interface InterestSelectorProps {
  selectedInterests: string[]
  onChange: (interests: string[]) => void
}

interface Interest {
  id: string
  name: string
  icon: React.ReactNode
}

export function InterestSelector({ selectedInterests, onChange }: InterestSelectorProps) {
  const interests: Interest[] = [
    { id: "photography", name: "Photography", icon: <Camera size={20} /> },
    { id: "painting", name: "Painting", icon: <Palette size={20} /> },
    { id: "crafting", name: "Crafting", icon: <Scissors size={20} /> },
    { id: "writing", name: "Writing", icon: <PenTool size={20} /> },
    { id: "cooking", name: "Cooking", icon: <Utensils size={20} /> },
    { id: "baking", name: "Baking", icon: <Croissant size={20} /> },
    { id: "coding", name: "Coding", icon: <Code size={20} /> },
    { id: "sports", name: "Sports", icon: <Football size={20} /> },
    { id: "history", name: "History", icon: <BookOpen size={20} /> },
    { id: "landscaping", name: "Landscaping", icon: <Leaf size={20} /> },
    { id: "acting", name: "Acting", icon: <Theater size={20} /> },
    { id: "woodworking", name: "Woodworking", icon: <Axe size={20} /> },
    { id: "sewing", name: "Sewing", icon: <Shirt size={20} /> },
    { id: "pets", name: "Pets", icon: <Dog size={20} /> },
    { id: "others", name: "Others", icon: <Plus size={20} /> },
  ]

  const toggleInterest = (interestId: string) => {
    if (selectedInterests.includes(interestId)) {
      onChange(selectedInterests.filter((id) => id !== interestId))
    } else {
      onChange([...selectedInterests, interestId])
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {interests.map((interest) => (
          <button
            key={interest.id}
            type="button"
            onClick={() => toggleInterest(interest.id)}
            className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-colors ${
              selectedInterests.includes(interest.id) ? "bg-primary/10 border-primary" : "bg-background hover:bg-muted"
            }`}
          >
            <div
              className={`mb-2 ${selectedInterests.includes(interest.id) ? "text-primary" : "text-muted-foreground"}`}
            >
              {interest.icon}
            </div>
            <span className="text-sm font-medium">{interest.name}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {selectedInterests.map((interestId) => {
          const interest = interests.find((i) => i.id === interestId)
          if (!interest) return null

          return (
            <Badge key={interestId} variant="secondary" className="px-3 py-1">
              {interest.name}
            </Badge>
          )
        })}
      </div>
    </div>
  )
}

