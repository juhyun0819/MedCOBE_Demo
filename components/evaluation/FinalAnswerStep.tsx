"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import type { Question, UserAnswer, AgreementType } from "@/lib/types/evaluation"

interface FinalAnswerStepProps {
  question: Question
  previousAnswer: UserAnswer
  agreement: AgreementType
  finalAnswer: UserAnswer | null
  onFinalAnswerSelect: (answer: UserAnswer) => void
  onNext: () => void
}

/**
 * 사용자 최종 답변 선택 컴포넌트
 * SOLID 원칙: 단일 책임 - 최종 답변 선택만 담당
 */
export function FinalAnswerStep({
  question,
  previousAnswer,
  agreement,
  finalAnswer,
  onFinalAnswerSelect,
  onNext,
}: FinalAnswerStepProps) {
  // 동의한 경우 이전 답변을 자동으로 선택
  const shouldShowSelection = agreement !== "agree"

  return (
    <Card className="w-full border-0 neumorphic bg-card interactive-card glow-effect">
      <CardHeader>
        <CardTitle className="text-2xl font-heading">최종 답변 선택</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {agreement === "agree" ? (
          <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-lg neumorphic-inset">
            <p className="text-green-800 dark:text-green-200">
              AI의 답변에 동의하셨으므로, 이전에 선택하신 답변({question.options[previousAnswer]})이 최종 답변입니다.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              AI의 답변에 동의하지 않으셨으므로, 최종 답변을 다시 선택해주세요.
            </p>
            <RadioGroup
              value={finalAnswer?.toString() || ""}
              onValueChange={(value) => onFinalAnswerSelect(parseInt(value))}
              className="space-y-4"
            >
              {question.options.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:bg-accent cursor-pointer neumorphic-inset transition-all"
                >
                  <RadioGroupItem value={index.toString()} id={`final-option-${index}`} />
                  <Label
                    htmlFor={`final-option-${index}`}
                    className="flex-1 cursor-pointer text-base"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        <div className="flex justify-end">
          <Button
            onClick={onNext}
            disabled={shouldShowSelection && finalAnswer === null}
            className="neumorphic-hover bg-accent hover:bg-accent/90"
          >
            다음 단계
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

