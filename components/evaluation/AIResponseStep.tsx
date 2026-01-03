"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChatInterface, type ChatMessage } from "./ChatInterface"
import { ThumbsUp, ThumbsDown, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { AgreementType } from "@/lib/types/evaluation"

interface AIResponseStepProps {
  aiResponse: string
  userMessage: string
  onAgreementSelect: (agreement: AgreementType) => void
  selectedAgreement?: AgreementType | null
  onNext?: () => void
}

/**
 * AI Partner 응답 및 사용자 동의/비동의 선택 컴포넌트
 * SOLID 원칙: 단일 책임 - AI 응답 표시와 동의 선택만 담당
 */
export function AIResponseStep({
  aiResponse,
  userMessage,
  onAgreementSelect,
  selectedAgreement,
  onNext,
}: AIResponseStepProps) {
  const messages: ChatMessage[] = [
    {
      id: "1",
      role: "user",
      content: userMessage,
    },
    {
      id: "2",
      role: "assistant",
      content: aiResponse,
    },
  ]

  return (
    <div className="w-full space-y-6">
      <ChatInterface messages={messages} />

      <Card className="border-0 neumorphic bg-card interactive-card">
        <CardHeader>
          <CardTitle className="text-xl font-heading">AI의 답변에 동의하시나요?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              variant={selectedAgreement === "agree" ? "default" : "outline"}
              size="lg"
              onClick={() => onAgreementSelect("agree")}
              className={cn(
                "flex items-center gap-2 min-w-[120px]",
                selectedAgreement === "agree" && "bg-green-600 hover:bg-green-700"
              )}
            >
              <ThumbsUp className="w-4 h-4" />
              동의합니다
            </Button>
            <Button
              variant={selectedAgreement === "disagree" ? "default" : "outline"}
              size="lg"
              onClick={() => onAgreementSelect("disagree")}
              className={cn(
                "flex items-center gap-2 min-w-[120px]",
                selectedAgreement === "disagree" && "bg-red-600 hover:bg-red-700"
              )}
            >
              <ThumbsDown className="w-4 h-4" />
              동의하지 않습니다
            </Button>
            <Button
              variant={selectedAgreement === "neutral" ? "default" : "outline"}
              size="lg"
              onClick={() => onAgreementSelect("neutral")}
              className={cn(
                "flex items-center gap-2 min-w-[120px]",
                selectedAgreement === "neutral" && "bg-yellow-600 hover:bg-yellow-700"
              )}
            >
              <HelpCircle className="w-4 h-4" />
              보통입니다
            </Button>
          </div>

          {onNext && selectedAgreement && (
            <div className="flex justify-end mt-6">
              <Button onClick={onNext} className="px-6">
                다음 단계
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

