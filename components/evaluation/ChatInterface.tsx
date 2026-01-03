"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp?: Date
}

interface ChatInterfaceProps {
  messages: ChatMessage[]
  className?: string
}

/**
 * 채팅 인터페이스 컴포넌트
 * SOLID 원칙: 단일 책임 - 채팅 메시지 표시만 담당
 */
export function ChatInterface({ messages, className }: ChatInterfaceProps) {
  return (
    <Card className={cn("w-full border-0 neumorphic bg-card interactive-card glow-effect", className)}>
      <CardHeader>
        <CardTitle className="text-2xl font-heading">Clinician Simulator</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex items-start gap-3",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "assistant" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "rounded-lg px-4 py-2 max-w-[80%]",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
                {message.role === "user" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-secondary text-secondary-foreground">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

