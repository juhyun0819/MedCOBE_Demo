"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Question, UserAnswer } from "@/lib/types/evaluation"

interface AnswerStepProps {
  question: Question
  selectedAnswer: UserAnswer | null
  onAnswerSelect: (answer: UserAnswer) => void
  onNext: () => void
  showResult?: boolean
}

/**
 * 선지 선택 및 결과 표시 컴포넌트
 * SOLID 원칙: 단일 책임 - 선지 선택과 결과 표시만 담당
 */
export function AnswerStep({
  question,
  selectedAnswer,
  onAnswerSelect,
  onNext,
  showResult = false,
}: AnswerStepProps) {
  const isCorrect = selectedAnswer !== null && selectedAnswer === question.correctAnswer

  const getOptionClassName = (index: number) => {
    if (!showResult) {
      return "hover:bg-accent cursor-pointer"
    }

    const isSelected = selectedAnswer === index
    const isCorrectOption = index === question.correctAnswer

    if (isCorrectOption) {
      // 정답 선지는 항상 초록색
      return "bg-green-100 dark:bg-green-900/30 border-green-500"
    }

    if (isSelected && !isCorrect) {
      // 사용자가 선택한 오답은 빨간색
      return "bg-red-100 dark:bg-red-900/30 border-red-500"
    }

    return "opacity-60"
  }

  return (
    <Card className="w-full border-0 neumorphic bg-card interactive-card glow-effect">
      <CardHeader>
        <CardTitle className="text-2xl font-heading">답변 선택</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 bg-muted/50 rounded-lg text-lg mb-6 neumorphic-inset">
          {question.question}
        </div>

        <RadioGroup
          value={selectedAnswer?.toString() || ""}
          onValueChange={(value) => onAnswerSelect(parseInt(value))}
          disabled={showResult}
          className="space-y-4"
        >
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index
            const isCorrectOption = index === question.correctAnswer
            const showIcon = showResult && (isSelected || isCorrectOption)

            return (
              <div
                key={index}
                className={cn(
                  "flex items-center space-x-3 p-4 rounded-lg border-2 transition-all neumorphic-inset",
                  getOptionClassName(index)
                )}
              >
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label
                  htmlFor={`option-${index}`}
                  className="flex-1 cursor-pointer flex items-center justify-between"
                >
                  <span className="text-base">{option}</span>
                  {showIcon && (
                    <div className="ml-4">
                      {isCorrectOption ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                      ) : isSelected ? (
                        <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                      ) : null}
                    </div>
                  )}
                </Label>
              </div>
            )
          })}
        </RadioGroup>

        {showResult && (
          <div className="mt-4 p-4 rounded-lg bg-muted/50 neumorphic-inset">
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="text-green-600 dark:text-green-400 font-semibold">
                    정답입니다!
                  </span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                  <span className="text-red-600 dark:text-red-400 font-semibold">
                    오답입니다. 정답은 {question.options[question.correctAnswer]}입니다.
                  </span>
                </>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <Button
            onClick={onNext}
            disabled={selectedAnswer === null}
            className="neumorphic-hover bg-accent hover:bg-accent/90"
          >
            {showResult ? "다음 단계" : "답변 제출"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

