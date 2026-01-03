"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import type { Question, Model } from "@/lib/types/evaluation"

interface QuestionStepProps {
  question: Question
  models: Model[]
  selectedModel: string | null
  onModelSelect: (modelId: string) => void
  onNext: () => void
}

/**
 * 문제 표시 및 모델 선택 컴포넌트
 * SOLID 원칙: 단일 책임 - 문제 표시와 모델 선택만 담당
 */
export function QuestionStep({
  question,
  models,
  selectedModel,
  onModelSelect,
  onNext,
}: QuestionStepProps) {
  return (
    <Card className="w-full border-0 neumorphic bg-card interactive-card glow-effect">
      <CardHeader>
        <CardTitle className="text-2xl font-heading">문제</CardTitle>
        <CardDescription>아래 문제를 읽고 모델을 선택하세요</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="question" className="text-base font-semibold">
            문제 내용
          </Label>
          <div className="p-4 bg-muted/50 rounded-lg text-lg neumorphic-inset">
            {question.question}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="model" className="text-base font-semibold">
            모델 선택
          </Label>
          <Select value={selectedModel || ""} onValueChange={onModelSelect}>
            <SelectTrigger id="model" className="w-full">
              <SelectValue placeholder="모델을 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              {models.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  <div className="flex flex-col">
                    <span className="font-medium">{model.name}</span>
                    {model.description && (
                      <span className="text-xs text-muted-foreground">
                        {model.description}
                      </span>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={onNext}
            disabled={!selectedModel}
            className="neumorphic-hover bg-accent hover:bg-accent/90"
          >
            다음 단계
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

