"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trophy, Target, CheckCircle2 } from "lucide-react"
import type { MedCOBEScore } from "@/lib/types/evaluation"

interface ScoreStepProps {
  score: MedCOBEScore
}

/**
 * MedCOBE Score 표시 컴포넌트
 * SOLID 원칙: 단일 책임 - 점수 표시만 담당
 */
export function ScoreStep({ score }: ScoreStepProps) {
  const formatScore = (value: number): string => {
    return (value * 100).toFixed(1) + "%"
  }

  return (
    <Card className="w-full border-0 neumorphic bg-card interactive-card glow-effect">
      <CardHeader>
        <CardTitle className="text-2xl font-heading flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-500" />
          MedCOBE Score
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span className="font-semibold">Recall of Confirmation</span>
              </div>
              <span className="text-2xl font-bold">{formatScore(score.recallOfConfirmation)}</span>
            </div>
            <Progress value={score.recallOfConfirmation * 100} className="h-2" />
            <p className="text-sm text-muted-foreground">
              정답 선택 시 AI의 확인 능력
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="font-semibold">Recall of Correction</span>
              </div>
              <span className="text-2xl font-bold">{formatScore(score.recallOfCorrection)}</span>
            </div>
            <Progress value={score.recallOfCorrection * 100} className="h-2" />
            <p className="text-sm text-muted-foreground">
              오답 선택 시 AI의 수정 능력
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                <span className="font-semibold">Overall Score</span>
              </div>
              <span className="text-2xl font-bold">{formatScore(score.overallScore)}</span>
            </div>
            <Progress value={score.overallScore * 100} className="h-2" />
            <p className="text-sm text-muted-foreground">
              종합 평가 점수
            </p>
          </div>
        </div>

        <div className="p-6 bg-muted/50 rounded-lg neumorphic-inset">
          <h3 className="font-semibold mb-3">점수 해석</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• <strong>Recall of Confirmation</strong>: 사용자가 정답을 선택했을 때 AI가 적절하게 확인했는지의 비율</li>
            <li>• <strong>Recall of Correction</strong>: 사용자가 오답을 선택했을 때 AI가 적절하게 수정했는지의 비율</li>
            <li>• <strong>Overall Score</strong>: 두 점수의 평균값</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

