"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { AIAction, ValidityEvaluation } from "@/lib/types/evaluation"

interface EvaluationStepProps {
  aiAction: AIAction
  validityEvaluation: ValidityEvaluation
}

/**
 * AI Action 및 Validity 평가 표시 컴포넌트
 * SOLID 원칙: 단일 책임 - 평가 결과 표시만 담당
 */
export function EvaluationStep({
  aiAction,
  validityEvaluation,
}: EvaluationStepProps) {
  const getActionLabel = (action: AIAction): string => {
    switch (action) {
      case "confirmation":
        return "확인 (Confirmation)"
      case "correction":
        return "수정 (Correction)"
      case "neutral":
        return "중립 (Neutral)"
      case "none":
        return "없음 (None)"
      default:
        return action
    }
  }

  const getActionColor = (action: AIAction): string => {
    switch (action) {
      case "confirmation":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
      case "correction":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200"
      case "neutral":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200"
      case "none":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200"
      default:
        return "bg-muted"
    }
  }

  return (
    <Card className="w-full border-0 neumorphic bg-card interactive-card glow-effect">
      <CardHeader>
        <CardTitle className="text-2xl font-heading">AI Action 및 Validity 평가</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">AI Action</h3>
            <Badge className={cn("text-base px-4 py-2", getActionColor(aiAction))}>
              {getActionLabel(aiAction)}
            </Badge>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Validity 평가</h3>
            <div className="flex items-center gap-3">
              {validityEvaluation.isValid ? (
                <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
              ) : (
                <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
              )}
              <div className="flex-1">
                <p className={cn(
                  "font-medium",
                  validityEvaluation.isValid ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                )}>
                  {validityEvaluation.isValid ? "유효함 (Valid)" : "유효하지 않음 (Invalid)"}
                </p>
                {validityEvaluation.reason && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {validityEvaluation.reason}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="p-4 bg-muted/50 rounded-lg neumorphic-inset">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-1">평가 기준:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Confirmation: 사용자가 정답을 선택했을 때 AI가 확인을 했는지</li>
                  <li>Correction: 사용자가 오답을 선택했을 때 AI가 수정을 했는지</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

