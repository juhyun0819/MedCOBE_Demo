"use client"

import { useState, useEffect } from "react"
import { QuestionStep } from "@/components/evaluation/QuestionStep"
import { AnswerStep } from "@/components/evaluation/AnswerStep"
import { ChatInterface, type ChatMessage } from "@/components/evaluation/ChatInterface"
import { AIResponseStep } from "@/components/evaluation/AIResponseStep"
import { FinalAnswerStep } from "@/components/evaluation/FinalAnswerStep"
import { EvaluationStep } from "@/components/evaluation/EvaluationStep"
import { ScoreStep } from "@/components/evaluation/ScoreStep"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ClipboardList, 
  RotateCcw, 
  ChevronRight,
  CheckCircle2,
  Github,
  Search,
  Bell,
  User,
  Settings,
  ChevronDown,
  Home,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import type {
  EvaluationStep as StepType,
  Question,
  Model,
  UserAnswer,
  AgreementType,
  AIAction,
  ValidityEvaluation,
  MedCOBEScore,
} from "@/lib/types/evaluation"
import {
  SAMPLE_QUESTIONS,
  SAMPLE_MODELS,
  CLINICIAN_PROMPTS,
  AI_PARTNER_RESPONSES,
  VALIDITY_EVALUATIONS,
} from "@/lib/data/sampleData"
import { calculateMedCOBEScore } from "@/lib/utils/medcobeScore"

/**
 * MedCOBE 평가 메인 페이지
 * SOLID 원칙: 
 * - 단일 책임: 평가 플로우 관리
 * - 개방/폐쇄: 각 단계 컴포넌트는 독립적으로 확장 가능
 */
export default function EvaluationPage() {
  const [currentStep, setCurrentStep] = useState<StepType>("question")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<StepType[]>([])

  // 다크 모드 강제 적용
  useEffect(() => {
    document.documentElement.classList.add("dark")
    return () => {
      // 페이지를 벗어날 때는 원래 설정으로 복원하지 않음 (선택사항)
    }
  }, [])
  
  // 상태 관리
  const [selectedModel, setSelectedModel] = useState<string | null>(null)
  const [userAnswer, setUserAnswer] = useState<UserAnswer | null>(null)
  const [showAnswerResult, setShowAnswerResult] = useState(false)
  const [clinicianMessage, setClinicianMessage] = useState<string>("")
  const [aiResponse, setAiResponse] = useState<string>("")
  const [agreement, setAgreement] = useState<AgreementType | null>(null)
  const [finalAnswer, setFinalAnswer] = useState<UserAnswer | null>(null)
  const [aiAction, setAiAction] = useState<AIAction | null>(null)
  const [validityEvaluation, setValidityEvaluation] = useState<ValidityEvaluation | null>(null)
  const [medcobeScore, setMedcobeScore] = useState<MedCOBEScore | null>(null)

  const currentQuestion = SAMPLE_QUESTIONS[currentQuestionIndex]
  const totalSteps = 8

  // 단계별 진행률 계산
  const getStepProgress = (): number => {
    const stepOrder: StepType[] = [
      "question",
      "answer",
      "chat",
      "aiResponse",
      "agreement",
      "finalAnswer",
      "evaluation",
      "score",
    ]
    const currentIndex = stepOrder.indexOf(currentStep)
    return ((currentIndex + 1) / totalSteps) * 100
  }

  // 문제 단계 완료 - 자동으로 다음 단계 표시
  const handleQuestionNext = () => {
    setCompletedSteps(prev => [...prev, "question"])
    setCurrentStep("answer")
  }

  // 답변 단계 완료 - 자동으로 다음 단계 표시
  const handleAnswerSubmit = () => {
    if (userAnswer === null) return
    
    setShowAnswerResult(true)
    
    // Clinician Simulator 메시지 생성
    const prompt = CLINICIAN_PROMPTS[currentQuestion.id]?.[userAnswer] || ""
    setClinicianMessage(prompt)
    
    // AI Partner 응답 생성
    const response = AI_PARTNER_RESPONSES[currentQuestion.id]?.[userAnswer] || ""
    setAiResponse(response)
    
    // AI Action 및 Validity 평가 가져오기
    const evaluation = VALIDITY_EVALUATIONS[currentQuestion.id]?.[userAnswer]
    if (evaluation) {
      setAiAction(evaluation.action)
      setValidityEvaluation(evaluation)
    }
    
    // 자동으로 다음 단계로 이동
    setTimeout(() => {
      setCompletedSteps(prev => [...prev, "answer"])
      setCurrentStep("chat")
    }, 500)
  }

  // 채팅 단계 자동 진행
  useEffect(() => {
    if (currentStep === "chat" && clinicianMessage) {
      // 채팅 메시지가 표시되면 자동으로 다음 단계로 이동
      const timer = setTimeout(() => {
        setCompletedSteps(prev => [...prev, "chat"])
        setCurrentStep("aiResponse")
      }, 2000) // 2초 후 자동 진행
      return () => clearTimeout(timer)
    }
  }, [currentStep, clinicianMessage])

  // 채팅 단계는 사용자가 버튼을 클릭하여 다음 단계로 이동

  // AI 응답 단계 완료 - 자동으로 다음 단계 표시
  const handleAgreementSelect = (agreement: AgreementType) => {
    setAgreement(agreement)
    // 자동으로 다음 단계로 이동
    setTimeout(() => {
      setCompletedSteps(prev => [...prev, "aiResponse"])
      setCurrentStep("finalAnswer")
    }, 300)
  }

  // 최종 답변 단계 완료 - 자동으로 다음 단계 표시
  const handleFinalAnswerNext = () => {
    // 동의한 경우 이전 답변을 최종 답변으로 사용
    if (agreement === "agree") {
      setFinalAnswer(userAnswer)
    } else {
      // 동의하지 않은 경우 finalAnswer가 설정되어 있어야 함
      if (finalAnswer === null) return
    }
    // 자동으로 다음 단계로 이동
    setTimeout(() => {
      setCompletedSteps(prev => [...prev, "finalAnswer"])
      setCurrentStep("evaluation")
      // 평가 단계에서 자동으로 점수 계산 및 표시
      if (userAnswer !== null && aiAction !== null) {
        const score = calculateMedCOBEScore(
          userAnswer,
          currentQuestion,
          aiAction
        )
        setMedcobeScore(score)
        // 점수 단계로 자동 이동
        setTimeout(() => {
          setCompletedSteps(prev => [...prev, "evaluation"])
          setCurrentStep("score")
        }, 500)
      }
    }, 300)
  }

  // 다음 문제로 이동 또는 처음부터 다시 시작
  const handleRestart = () => {
    // 모든 상태 초기화
    setCurrentStep("question")
    setCompletedSteps([])
    setSelectedModel(null)
    setUserAnswer(null)
    setShowAnswerResult(false)
    setClinicianMessage("")
    setAiResponse("")
    setAgreement(null)
    setFinalAnswer(null)
    setAiAction(null)
    setValidityEvaluation(null)
    setMedcobeScore(null)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < SAMPLE_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      handleRestart()
    }
  }

  // 채팅 메시지 생성
  const chatMessages: ChatMessage[] = clinicianMessage
    ? [
        {
          id: "1",
          role: "user",
          content: currentQuestion.options[userAnswer || 0],
        },
        {
          id: "2",
          role: "assistant",
          content: clinicianMessage,
        },
      ]
    : []

  const stepOrder: StepType[] = [
    "question",
    "answer",
    "chat",
    "aiResponse",
    "agreement",
    "finalAnswer",
    "evaluation",
    "score",
  ]

  const getStepLabel = (step: StepType): string => {
    const labels: Record<StepType, string> = {
      question: "문제 선택",
      answer: "답변 선택",
      chat: "Clinician Simulator",
      aiResponse: "AI 응답",
      agreement: "동의 선택",
      finalAnswer: "최종 답변",
      evaluation: "평가",
      score: "점수",
    }
    return labels[step] || step
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Header */}
      <header className="border-b border-border/30 bg-card/80 backdrop-blur-md sticky top-0 z-50 neumorphic">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* 로고 이미지 - public 폴더의 이미지 파일을 사용 */}
              {/* 이미지를 바꾸려면: 1) public 폴더에 이미지 파일 추가 (예: logo.png) 2) 아래 src 경로 변경 */}
              <Link href="/" className="flex items-center gap-2 hover:scale-105 transition-transform duration-300">
                <div className="w-8 h-8 relative neumorphic pulse-glow rounded-lg overflow-hidden">
                  <Image
                    src="/icon.svg"
                    alt="MedCOBE Logo"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <span className="text-xl font-heading font-bold text-foreground">MedCOBE</span>
              </Link>
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="평가 검색..." className="pl-10 w-80 bg-muted/50 neumorphic-inset" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="neumorphic-hover">
                  <Home className="w-4 h-4 mr-2" />
                  대시보드
                </Button>
              </Link>
              <Button variant="ghost" size="sm" className="neumorphic-hover">
                <Bell className="w-4 h-4" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 neumorphic-hover">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="/developer-avatar.png" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 neumorphic bg-card">
                  <DropdownMenuLabel className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src="/developer-avatar.png" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">사용자</div>
                      <div className="text-xs text-muted-foreground">user@example.com</div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="w-4 h-4 mr-2" />
                    프로필
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="w-4 h-4 mr-2" />
                    설정
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-0 neumorphic bg-card interactive-card sticky top-20">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center neumorphic-inset">
                    <ClipboardList className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">MedCOBE 평가</CardTitle>
                    <CardDescription>문제 {currentQuestionIndex + 1} / {SAMPLE_QUESTIONS.length}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* 진행률 */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">진행률</span>
                    <span className="font-medium text-foreground">{Math.round(getStepProgress())}%</span>
                  </div>
                  <Progress value={getStepProgress()} className="h-2" />
                </div>

                {/* 단계 목록 */}
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-foreground mb-2">단계</div>
                  {stepOrder.map((step, index) => {
                    const currentIndex = stepOrder.indexOf(currentStep)
                    const isCompleted = index < currentIndex
                    const isCurrent = step === currentStep
                    
                    return (
                      <div
                        key={step}
                        className={cn(
                          "flex items-center gap-2 p-2 rounded-lg text-sm transition-colors",
                          isCurrent 
                            ? "bg-accent/10 text-accent font-medium" 
                            : isCompleted
                            ? "text-muted-foreground"
                            : "text-muted-foreground opacity-50"
                        )}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                        ) : isCurrent ? (
                          <ChevronRight className="w-4 h-4" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-muted-foreground" />
                        )}
                        <span>{getStepLabel(step)}</span>
                      </div>
                    )
                  })}
                </div>

                <div className="pt-4 border-t border-border/50">
                  <Button 
                    variant="outline" 
                    className="w-full neumorphic-hover bg-transparent"
                    onClick={handleRestart}
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    처음부터
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* 완료된 단계와 현재 단계를 모두 표시 */}
              
              {/* 문제 단계 */}
              {(completedSteps.includes("question") || currentStep === "question") && (
                <QuestionStep
                  question={currentQuestion}
                  models={SAMPLE_MODELS}
                  selectedModel={selectedModel}
                  onModelSelect={setSelectedModel}
                  onNext={handleQuestionNext}
                />
              )}

              {/* 답변 단계 */}
              {(completedSteps.includes("answer") || currentStep === "answer") && (
                <AnswerStep
                  question={currentQuestion}
                  selectedAnswer={userAnswer}
                  onAnswerSelect={setUserAnswer}
                  onNext={handleAnswerSubmit}
                  showResult={showAnswerResult}
                />
              )}

              {/* 채팅 단계 */}
              {(completedSteps.includes("chat") || currentStep === "chat") && (
                <ChatInterface messages={chatMessages} />
              )}

              {/* AI 응답 단계 */}
              {(completedSteps.includes("aiResponse") || currentStep === "aiResponse") && (
                <AIResponseStep
                  aiResponse={aiResponse}
                  userMessage={currentQuestion.options[userAnswer || 0]}
                  onAgreementSelect={handleAgreementSelect}
                  selectedAgreement={agreement}
                  onNext={undefined}
                />
              )}

              {/* 최종 답변 단계 */}
              {(completedSteps.includes("finalAnswer") || currentStep === "finalAnswer") && (
                <FinalAnswerStep
                  question={currentQuestion}
                  previousAnswer={userAnswer || 0}
                  agreement={agreement || "neutral"}
                  finalAnswer={finalAnswer}
                  onFinalAnswerSelect={setFinalAnswer}
                  onNext={handleFinalAnswerNext}
                />
              )}

              {/* 평가 단계 */}
              {(completedSteps.includes("evaluation") || currentStep === "evaluation") && aiAction && validityEvaluation && (
                <EvaluationStep
                  aiAction={aiAction}
                  validityEvaluation={validityEvaluation}
                />
              )}

              {/* 점수 단계 */}
              {currentStep === "score" && medcobeScore && (
                <div className="space-y-4">
                  <ScoreStep score={medcobeScore} />
                  <div className="flex justify-end gap-4">
                    {currentQuestionIndex < SAMPLE_QUESTIONS.length - 1 ? (
                      <Button 
                        onClick={handleNextQuestion}
                        className="neumorphic-hover bg-accent hover:bg-accent/90"
                      >
                        다음 문제
                      </Button>
                    ) : (
                      <Button 
                        onClick={handleRestart}
                        className="neumorphic-hover bg-accent hover:bg-accent/90"
                      >
                        처음부터 다시
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

