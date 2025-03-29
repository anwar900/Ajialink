import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface MessagePreviewProps {
  name: string
  avatar: string
  message: string
  time: string
  unread: boolean
}

export function MessagePreview({ name, avatar, message, time, unread }: MessagePreviewProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
      <Avatar>
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h3 className={`font-medium ${unread ? "text-foreground" : "text-muted-foreground"}`}>{name}</h3>
          <div className="flex items-center">
            <span className="text-xs text-muted-foreground">{time}</span>
            {unread && <Badge variant="default" className="ml-2 h-2 w-2 rounded-full p-0" />}
          </div>
        </div>
        <p className={`text-sm truncate ${unread ? "font-medium" : "text-muted-foreground"}`}>{message}</p>
      </div>
    </div>
  )
}

