"use client"

import { useState, useRef, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Phone,
  Video,
  MoreVertical,
  ImageIcon,
  Paperclip,
  Mic,
  Send,
  Smile,
  Calendar,
  MapPin,
  CheckCheck,
  Clock,
} from "lucide-react"
import Link from "next/link"

// Mock data for the conversation
const conversations = {
  "1": {
    id: "1",
    name: "Anas EL Yaakoubi",
    avatar: "/anas.jpeg?height=40&width=40",
    online: true,
    lastSeen: "Active now",
    messages: [
      {
        id: "m1",
        sender: "them",
        text: "Hello Imad! I saw that you're interested in learning how to bake sourdough bread.",
        time: "Yesterday, 4:30 PM",
        status: "read",
      },
      {
        id: "m2",
        sender: "me",
        text: "Hi Anas! Yes, I've been wanting to learn for a while now. I've heard it's quite the process but so rewarding.",
        time: "Yesterday, 4:35 PM",
        status: "read",
      },
      {
        id: "m3",
        sender: "them",
        text: "It definitely is! The key is patience and consistency with your starter. I've been baking sourdough for over 30 years now.",
        time: "Yesterday, 4:38 PM",
        status: "read",
      },
      {
        id: "m4",
        sender: "me",
        text: "That's amazing! I'd love to learn from your experience. Do you think we could arrange a session where you could teach me the basics?",
        time: "Yesterday, 4:42 PM",
        status: "read",
      },
      {
        id: "m5",
        sender: "them",
        text: "I'd be delighted to! I could show you how to create and maintain a starter, and then we could move on to actual baking.",
        time: "Yesterday, 4:45 PM",
        status: "read",
      },
      {
        id: "m6",
        sender: "them",
        text: "Here's a photo of my latest loaf. This is what you'll be able to make after a few practice sessions!",
        time: "Yesterday, 4:46 PM",
        status: "read",
        image: "/bread.jpeg?height=300&width=400",      },
      {
        id: "m7",
        sender: "me",
        text: "Wow, that looks incredible! 😍 I can't wait to learn how to make that.",
        time: "Yesterday, 4:50 PM",
        status: "read",
      },
      {
        id: "m8",
        sender: "them",
        text: "I'd love to teach you how to make sourdough bread! When are you free?",
        time: "Today, 10:30 AM",
        status: "read",
      },
    ],
  },
}

// Quick reply suggestions
const quickReplies = [
  "I'm free this weekend!",
  "How about next Tuesday?",
  "Could we do a video call first?",
  "What ingredients will I need?",
]

export default function ChatPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const conversation = conversations[id]

  const [message, setMessage] = useState("")
  const [showQuickReplies, setShowQuickReplies] = useState(true)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [conversation?.messages])

  // If conversation doesn't exist, redirect to messages
  if (!conversation) {
    router.push("/dashboard/messages")
    return null
  }

  const handleSendMessage = () => {
    if (message.trim() === "") return
    // In a real app, this would send the message to the server
    // For now, we'll just clear the input
    setMessage("")
    setShowQuickReplies(false)
  }

  const handleQuickReply = (reply: string) => {
    setMessage(reply)
    setShowQuickReplies(false)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Chat header */}
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/messages" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarImage src={conversation.avatar} alt={conversation.name} />
                <AvatarFallback>
                  {conversation.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {conversation.online && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-background"></span>
              )}
            </div>
            <div>
              <h2 className="font-medium">{conversation.name}</h2>
              <p className="text-xs text-muted-foreground">{conversation.lastSeen}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost">
            <Phone className="h-5 w-5" />
          </Button>
          <Button size="icon" variant="ghost">
            <Video className="h-5 w-5" />
          </Button>
          <Button size="icon" variant="ghost">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation.messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
            {msg.sender === "them" && (
              <Avatar className="h-8 w-8 mr-2 mt-1">
                <AvatarImage src={conversation.avatar} alt={conversation.name} />
                <AvatarFallback>
                  {conversation.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            )}
            <div className={`max-w-[75%] space-y-1 ${msg.sender === "me" ? "items-end" : "items-start"}`}>
              <div
                className={`p-3 rounded-lg ${
                  msg.sender === "me"
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-muted rounded-bl-none"
                }`}
              >
                {msg.text}
                {msg.image && (
                  <div className="mt-2">
                    <img
                      src={msg.image || "/placeholder.svg"}
                      alt="Shared image"
                      className="rounded-md max-h-60 w-auto object-cover"
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <span>{msg.time}</span>
                {msg.sender === "me" && (
                  <div className="ml-1">
                    {msg.status === "read" ? (
                      <CheckCheck className="h-3 w-3 text-primary" />
                    ) : (
                      <Clock className="h-3 w-3" />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick replies */}
      {showQuickReplies && (
        <div className="px-4 py-2 border-t">
          <p className="text-xs text-muted-foreground mb-2">Quick replies:</p>
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((reply, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleQuickReply(reply)}
                className="text-xs"
              >
                {reply}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Message input */}
      <div className="p-4 border-t">
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Button size="icon" variant="ghost">
            <ImageIcon className="h-5 w-5" />
          </Button>
          <div className="relative flex-1">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="pr-10"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-0 top-0 h-full"
              onClick={handleSendMessage}
              disabled={message.trim() === ""}
            >
              <Send className={`h-5 w-5 ${message.trim() !== "" ? "text-primary" : "text-muted-foreground"}`} />
            </Button>
          </div>
          <Button size="icon" variant="ghost">
            <Smile className="h-5 w-5" />
          </Button>
          <Button size="icon" variant="ghost">
            <Mic className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex justify-between mt-2">
          <Button variant="ghost" size="sm" className="text-xs gap-1">
            <Calendar className="h-3 w-3" />
            <span>Schedule</span>
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <Button variant="ghost" size="sm" className="text-xs gap-1">
            <MapPin className="h-3 w-3" />
            <span>Share location</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

