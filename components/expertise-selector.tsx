"use client"

import type React from "react"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Lightbulb,
  Code,
  Palette,
  Music,
  Utensils,
  Heart,
  Leaf,
  MessageCircle,
  Briefcase,
  Landmark,
  Camera,
  Dumbbell,
  Plus,
} from "lucide-react"

interface ExpertiseSelectorProps {
  selectedItems: string[]
  onChange: (items: string[]) => void
  type: "teach" | "learn"
}

interface ExpertiseItem {
  id: string
  name: string
  icon: React.ReactNode
}

export function ExpertiseSelector({ selectedItems, onChange, type }: ExpertiseSelectorProps) {
  const expertiseItems: ExpertiseItem[] = [
    { id: "academics", name: "Academics", icon: <BookOpen size={20} /> },
    { id: "technology", name: "Technology", icon: <Code size={20} /> },
    { id: "arts", name: "Arts & Crafts", icon: <Palette size={20} /> },
    { id: "music", name: "Music", icon: <Music size={20} /> },
    { id: "cooking", name: "Cooking", icon: <Utensils size={20} /> },
    { id: "wellness", name: "Wellness", icon: <Heart size={20} /> },
    { id: "gardening", name: "Gardening", icon: <Leaf size={20} /> },
    { id: "languages", name: "Languages", icon: <MessageCircle size={20} /> },
    { id: "career", name: "Career Skills", icon: <Briefcase size={20} /> },
    { id: "history", name: "History", icon: <Landmark size={20} /> },
    { id: "photography", name: "Photography", icon: <Camera size={20} /> },
    { id: "fitness", name: "Fitness", icon: <Dumbbell size={20} /> },
    { id: "ideas", name: "New Ideas", icon: <Lightbulb size={20} /> },
    { id: "other", name: "Other", icon: <Plus size={20} /> },
  ]

  const toggleItem = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      onChange(selectedItems.filter((id) => id !== itemId))
    } else {
      onChange([...selectedItems, itemId])
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {expertiseItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => toggleItem(item.id)}
            className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-colors ${
              selectedItems.includes(item.id) ? "bg-primary/10 border-primary" : "bg-background hover:bg-muted"
            }`}
          >
            <div className={`mb-2 ${selectedItems.includes(item.id) ? "text-primary" : "text-muted-foreground"}`}>
              {item.icon}
            </div>
            <span className="text-sm font-medium">{item.name}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {selectedItems.map((itemId) => {
          const item = expertiseItems.find((i) => i.id === itemId)
          if (!item) return null

          return (
            <Badge key={itemId} variant="secondary" className="px-3 py-1">
              {item.name}
            </Badge>
          )
        })}
      </div>
    </div>
  )
}

