"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Code2,
  Users,
  Star,
  GitFork,
  Search,
  Plus,
  Clock,
  Activity,
  BookOpen,
  Settings,
  Bell,
  Filter,
  Calendar,
  TrendingUp,
  GitCommit,
  GitPullRequest as PullRequest,
  AlertCircle,
  User,
  Github,
  ChevronDown,
  Sun,
  Moon,
  Home,
  Crown,
  MessageSquare,
  Image as ImageIcon,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useState, useEffect, useRef } from "react"



/**
 * Dashboard 페이지 (/dashboard/[domain])
 * 
 * MedCOBE 프로젝트의 메인 대시보드 페이지입니다.
 * 도메인별로 다른 데이터를 표시합니다.
 * /dashboard/all은 전체 도메인 데이터를 표시합니다.
 */
export default function DashboardPage({ params }: { params: { domain: string } }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isDark, setIsDark] = useState(false)
  
  // URL에서 domain 추출 (params에서 가져오기)
  const currentDomain = params.domain || "all"
  const [selectedDomain, setSelectedDomain] = useState(currentDomain)
  
  // pathname이 변경되면 selectedDomain 업데이트
  useEffect(() => {
    const domain = params.domain || "all"
    setSelectedDomain(domain)
  }, [params.domain])

  // 테마 초기 설정
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  // 테마 전환 함수
  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)

    if (newTheme) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  // 모델 기본 설정 (이미지, 색상 등)
  // Excel 파일의 모델 이름과 매핑 (Excel 이름 -> 표시 이름)
  // result.json 파일의 모델 키와 매핑 (표시 이름 -> API 키)
  const modelKeyMap: Record<string, string> = {
    "GPT-5": "gpt-5",
    "Claude-Opus-4.5": "claude-opus-4-5-20251101",
    "GPT-4o": "gpt-4o",
    "Claude-Sonnet-4.5": "claude-sonnet-4-5-20250929",
    "Mistral-Large": "mistralai/mistral-large-2407",
    "GPT-3.5-turbo": "gpt-3.5-turbo",
    "Llama-3.3-70B": "meta-llama/llama-3.3-70b-instruct",
    "Qwen-2.5-72B": "qwen/qwen-2.5-72b-instruct",
    "GPT-4o-mini": "gpt-4o-mini",
    "Phi-4": "microsoft/phi-4",
    "Claude-Haiku-4.5": "claude-haiku-4-5-20251001",
    "Llama-3.1-8B": "meta-llama/llama-3.1-8b-instruct",
  }

  const modelConfig: Record<string, { 
    displayName: string
    colorClass: string
    imageDark: string
    imageLight: string
    alt: string
  }> = {
    "GPT-5": { displayName: "GPT-5", colorClass: "bg-blue-500", imageDark: "/openai_dark.png", imageLight: "/openai_light.png", alt: "GPT-5" },
    "Claude-Opus-4.5": { displayName: "Claude-Opus-4.5", colorClass: "bg-indigo-500", imageDark: "/anthropic_dark.png", imageLight: "/anthropic_light.png", alt: "Claude-Opus-4.5" },
    "GPT-4o": { displayName: "GPT-4o", colorClass: "bg-green-500", imageDark: "/openai_dark.png", imageLight: "/openai_light.png", alt: "GPT-4o" },
    "Claude-Sonnet-4.5": { displayName: "Claude-Sonnet-4.5", colorClass: "bg-purple-500", imageDark: "/anthropic_dark.png", imageLight: "/anthropic_light.png", alt: "Claude-Sonnet-4.5" },
    "Mistral-Large": { displayName: "Mistral-Large", colorClass: "bg-rose-500", imageDark: "/mistral_dark.png", imageLight: "/mistral_light.png", alt: "Mistral-Large" },
    "GPT-3.5-turbo": { displayName: "GPT-3.5-Turbo", colorClass: "bg-amber-500", imageDark: "/openai_dark.png", imageLight: "/openai_light.png", alt: "GPT-3.5-Turbo" },
    "Llama-3.3-70B": { displayName: "Llama-3.3-70B", colorClass: "bg-teal-500", imageDark: "/ollama_dark.png", imageLight: "/ollama_light.png", alt: "Llama-3.3-70B" },
    "Qwen-2.5-72B": { displayName: "Qwen-2.5-72B", colorClass: "bg-emerald-500", imageDark: "/qwen_dark.png", imageLight: "/qwen_light.png", alt: "Qwen-2.5-72B" },
    "GPT-4o-mini": { displayName: "GPT-4o-mini", colorClass: "bg-yellow-500", imageDark: "/openai_dark.png", imageLight: "/openai_light.png", alt: "GPT-4o-mini" },
    "Phi-4": { displayName: "Phi-4", colorClass: "bg-fuchsia-500", imageDark: "/microsoft_dark.png", imageLight: "/microsoft_light.png", alt: "Phi-4" },
    "Claude-Haiku-4.5": { displayName: "Claude-Haiku-4.5", colorClass: "bg-violet-500", imageDark: "/anthropic_dark.png", imageLight: "/anthropic_light.png", alt: "Claude-Haiku-4.5" },
    "Llama-3.1-8B": { displayName: "Llama-3.1-8B", colorClass: "bg-cyan-500", imageDark: "/ollama_dark.png", imageLight: "/ollama_light.png", alt: "Llama-3.1-8B" },
  }

  // Excel에서 가져온 점수 데이터
  const [models, setModels] = useState<Array<{
    name: string
    percentage: number
    colorClass: string
    imageDark: string
    imageLight: string
    alt: string
  }>>([])

  // 질문 데이터
  const [question, setQuestion] = useState<{
    case_id?: string
    caption: string
    scenario: string
    options: Record<string, string>
    correct_option?: string
  } | null>(null)
  const [selectedOption, setSelectedOption] = useState<string>("")
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [selectedModel, setSelectedModel] = useState<string>("") // 선택한 모델
  
  // 채팅 로그 데이터
  const [chatDialogue, setChatDialogue] = useState<Array<{
    role: string
    content: string
  }>>([])
  const [displayedMessages, setDisplayedMessages] = useState<number>(0) // 현재까지 표시된 메시지 수
  const [typingProgress, setTypingProgress] = useState<Record<number, number>>({}) // 각 메시지의 타이핑 진행도 (인덱스 -> 표시된 단어 수)
  const [isTyping, setIsTyping] = useState<Record<number, boolean>>({}) // 각 메시지의 타이핑 완료 여부
  const [isUserScrolling, setIsUserScrolling] = useState<boolean>(false) // 사용자가 수동으로 스크롤 중인지
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null) // 스크롤 타이머
  
  // 스크롤을 위한 ref
  const chatLogCardRef = useRef<HTMLDivElement>(null)
  const chatMessagesRef = useRef<HTMLDivElement>(null)
  const lastMessageRef = useRef<HTMLDivElement>(null)

  // Excel 파일에서 데이터 가져오기 (도메인별로 다른 데이터)
  useEffect(() => {
    const fetchScores = async () => {
      try {
        // 도메인에 따라 다른 API 엔드포인트 호출
        // "all"이면 전체 데이터, 아니면 도메인별 데이터
        const apiUrl = selectedDomain === "all" 
          ? "/api/medcobe-scores" 
          : `/api/medcobe-scores?domain=${selectedDomain}`
        
        const response = await fetch(apiUrl)
        
        if (!response.ok) {
          console.error("API response error:", response.status, response.statusText)
          const errorData = await response.json().catch(() => ({}))
          console.error("Error details:", errorData)
          throw new Error(`Failed to fetch scores: ${response.status}`)
        }
        
        const data = await response.json()
        console.log("Fetched scores data:", data)
        
        if (data.error) {
          console.error("API returned error:", data.error)
          setModels([])
          return
        }
        
        if (data.scores && Array.isArray(data.scores)) {
          // Excel 데이터를 모델 설정과 매핑
          const mappedModels = data.scores
            .map((item: { modelName: string; score: number }) => {
              // 모델 이름 정규화
              const normalizedName = item.modelName.trim()
              
              // 정확한 매칭 시도
              let config = modelConfig[normalizedName]
              
              // 정확한 매칭이 없으면 유사도 기반 매칭 (대소문자 무시, 공백/하이픈 무시)
              if (!config) {
                const configKey = Object.keys(modelConfig).find(
                  key => key.toLowerCase().replace(/[\s-]/g, "") === normalizedName.toLowerCase().replace(/[\s-]/g, "")
                )
                if (configKey) {
                  config = modelConfig[configKey]
                }
              }
              
              // 매칭된 설정이 없으면 기본값 사용
              if (!config) {
                config = {
                  displayName: normalizedName,
                  colorClass: "bg-gray-500",
                  imageDark: "/placeholder.svg",
                  imageLight: "/placeholder.svg",
                  alt: normalizedName,
                }
              }
              
              return {
                name: config.displayName,
                percentage: item.score,
                colorClass: config.colorClass,
                imageDark: config.imageDark,
                imageLight: config.imageLight,
                alt: config.alt,
              }
            })
            .filter((model: any) => model.name) // 유효한 모델만 필터링
            .sort((a: any, b: any) => b.percentage - a.percentage) // 퍼센트 기준 내림차순 정렬
          
          setModels(mappedModels)
        }
      } catch (error) {
        console.error("Error fetching MedCOBE scores:", error)
        // 에러 발생 시 빈 배열로 설정 (기본 데이터 대신)
        setModels([])
      }
    }

    fetchScores()
  }, [selectedDomain]) // selectedDomain이 변경될 때마다 데이터 다시 가져오기

  // 질문 데이터 가져오기 (도메인별로 다른 질문)
  useEffect(() => {
    const fetchQuestion = async () => {
      // "all" 도메인인 경우 질문을 표시하지 않음
      if (selectedDomain === "all") {
        setQuestion(null)
        setSelectedOption("")
        setIsSubmitted(false)
        setSelectedModel("")
        return
      }

      try {
        const response = await fetch(`/api/questions?domain=${selectedDomain}`)
        const data = await response.json()
        
        if (data.question) {
          setQuestion(data.question)
          setSelectedOption("") // 도메인 변경 시 선택 초기화
          setIsSubmitted(false) // 도메인 변경 시 제출 상태 초기화
          setSelectedModel("") // 도메인 변경 시 모델 선택 초기화
          setChatDialogue([]) // 채팅 로그 초기화
          setDisplayedMessages(0) // 표시된 메시지 수 초기화
          setTypingProgress({}) // 타이핑 진행도 초기화
          setIsTyping({}) // 타이핑 상태 초기화
        } else {
          setQuestion(null)
          setSelectedOption("")
          setIsSubmitted(false)
          setSelectedModel("")
          setChatDialogue([])
          setDisplayedMessages(0)
          setTypingProgress({})
          setIsTyping({})
        }
      } catch (error) {
        console.error("Error fetching question:", error)
        setQuestion(null)
        setSelectedOption("")
        setIsSubmitted(false)
        setChatDialogue([])
        setDisplayedMessages(0)
      }
    }

    fetchQuestion()
  }, [selectedDomain]) // selectedDomain이 변경될 때마다 질문 다시 가져오기

  // 채팅 로그 카드가 나타날 때 스크롤
  useEffect(() => {
    if (isSubmitted && chatDialogue.length > 0 && chatLogCardRef.current) {
      // 약간의 지연을 두고 스크롤 (카드가 렌더링된 후)
      setTimeout(() => {
        chatLogCardRef.current?.scrollIntoView({ 
          behavior: "smooth", 
          block: "start" 
        })
      }, 100)
    }
  }, [isSubmitted, chatDialogue.length])

  // 사용자 스크롤 감지 (페이지 전체 및 채팅 메시지 컨테이너)
  useEffect(() => {
    let lastScrollTop = 0
    
    const handleScroll = () => {
      setIsUserScrolling(true)
      
      // 스크롤이 멈춘 후 1초 뒤에 자동 스크롤 재개
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        setIsUserScrolling(false)
      }, 1000) // 1초 동안 스크롤이 없으면 자동 스크롤 재개
    }

    const handleWheel = (e: WheelEvent) => {
      // 사용자가 위로 스크롤하려고 하면 자동 스크롤 중단
      if (e.deltaY < 0) {
        setIsUserScrolling(true)
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current)
        }
        scrollTimeoutRef.current = setTimeout(() => {
          setIsUserScrolling(false)
        }, 2000) // 위로 스크롤 시 2초 동안 자동 스크롤 중단
      } else {
        handleScroll()
      }
    }

    // 페이지 전체 스크롤 감지
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('wheel', handleWheel, { passive: true })
    window.addEventListener('touchmove', handleScroll, { passive: true })

    // 채팅 메시지 컨테이너 스크롤 감지
    const chatContainer = chatMessagesRef.current
    if (chatContainer) {
      chatContainer.addEventListener('scroll', handleScroll)
      chatContainer.addEventListener('wheel', handleWheel, { passive: true })
      chatContainer.addEventListener('touchmove', handleScroll, { passive: true })
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchmove', handleScroll)
      if (chatContainer) {
        chatContainer.removeEventListener('scroll', handleScroll)
        chatContainer.removeEventListener('wheel', handleWheel)
        chatContainer.removeEventListener('touchmove', handleScroll)
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  // 새로운 메시지가 나타날 때마다 스크롤 (사용자가 스크롤 중이 아닐 때만)
  useEffect(() => {
    if (displayedMessages > 0 && lastMessageRef.current && !isUserScrolling) {
      // 약간의 지연을 두고 스크롤 (메시지가 렌더링된 후)
      setTimeout(() => {
        if (!isUserScrolling && lastMessageRef.current) {
          lastMessageRef.current.scrollIntoView({ 
            behavior: "smooth", 
            block: "end" 
          })
        }
      }, 100)
    }
  }, [displayedMessages, isUserScrolling])

  // 타이핑 진행 중에도 스크롤 업데이트 (사용자가 스크롤 중이 아닐 때만)
  useEffect(() => {
    if (lastMessageRef.current && Object.keys(typingProgress).length > 0 && !isUserScrolling) {
      // 타이핑이 진행 중일 때 스크롤 업데이트
      setTimeout(() => {
        if (!isUserScrolling && lastMessageRef.current) {
          lastMessageRef.current.scrollIntoView({ 
            behavior: "smooth", 
            block: "end" 
          })
        }
      }, 50)
    }
  }, [typingProgress, isUserScrolling])

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <header className="border-b border-border/30 bg-card/80 backdrop-blur-md sticky top-0 z-50 neumorphic">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 relative neumorphic pulse-glow rounded-lg overflow-hidden">
                  <Image
                    src="/logo_web.png"
                    alt="MedCOBE Logo"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <span className="text-xl font-heading font-bold text-foreground">MedCOBE</span>
              </Link>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={toggleTheme} className="neumorphic-hover theme-toggle">
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <Link href="/">
                <Button size="sm" className="bg-accent hover:bg-accent/90 neumorphic-hover pulse-glow">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>

              <Avatar className="w-8 h-8 neumorphic">
                <AvatarImage src="/developer-avatar.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Card className="border-0 neumorphic bg-card">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 flex items-center justify-center neumorphic-inset rounded-lg">
                    <Image 
                      src="/trophy.png" 
                      alt="Trophy" 
                      width={32} 
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-lg">MedCOBE Leaderboard</CardTitle>
                    <CardDescription>
                      @{selectedDomain === "all" 
                        ? "All Domains" 
                        : selectedDomain === "ophthalmology" ? "Ophthalmology" :
                        selectedDomain === "dermatology" ? "Dermatology" :
                        selectedDomain === "otolaryngology" ? "Otolaryngology" :
                        selectedDomain === "general-internal-medicine" ? "General Internal Medicine" :
                        selectedDomain === "cardiology" ? "Cardiology" :
                        selectedDomain === "oncology" ? "Oncology" :
                        selectedDomain === "neurology" ? "Neurology" :
                        selectedDomain}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {models.map((model, index) => (
                    <div key={model.name} className="flex items-center gap-2">
                      <div className="w-10 h-10 flex items-center justify-center">
                        {isDark ? (
                          <Image 
                            src={model.imageDark} 
                            alt={model.alt} 
                            width={32} 
                            height={32} 
                            className="object-contain"
                          />
                        ) : (
                          <Image 
                            src={model.imageLight} 
                            alt={model.alt} 
                            width={32} 
                            height={32} 
                            className="object-contain"
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium">{model.name}</p>
                          <p className="text-xs text-muted-foreground font-semibold">{model.percentage.toFixed(2)}%</p>
                        </div>
                        <div className="w-full bg-border rounded-full h-2 neumorphic-inset relative overflow-hidden">
                          <div
                            className={`${model.colorClass} h-full rounded-full`}
                            style={{
                              width: "0%",
                              animation: `progress-fill-width 1.5s ease-out ${0.1 + index * 0.1}s forwards`,
                              "--progress-width": `${model.percentage}%`,
                            } as React.CSSProperties & { "--progress-width": string }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>


          <div className="lg:col-span-3">
            <Tabs defaultValue="overview" className="space-y-6">
              <div className="flex items-center justify-between">
                <Select 
                  value={selectedDomain} 
                  onValueChange={(value) => {
                    setSelectedDomain(value)
                    // URL 변경: /dashboard/all 또는 /dashboard/[domain]
                    router.push(`/dashboard/${value}`)
                  }}
                >
                  <SelectTrigger className="w-[250px] neumorphic bg-muted/50">
                    <SelectValue>
                      {selectedDomain === "all" ? "All Domains" : 
                        selectedDomain === "ophthalmology" ? "Ophthalmology" :
                        selectedDomain === "dermatology" ? "Dermatology" :
                        selectedDomain === "otolaryngology" ? "Otolaryngology" :
                        selectedDomain === "general-internal-medicine" ? "General Internal Medicine" :
                        selectedDomain === "cardiology" ? "Cardiology" :
                        selectedDomain === "oncology" ? "Oncology" :
                        selectedDomain === "neurology" ? "Neurology" :
                        "Select Domain"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="neumorphic bg-card">
                    <SelectItem value="all">All Domains</SelectItem>
                    <SelectItem value="ophthalmology">Ophthalmology</SelectItem>
                    <SelectItem value="dermatology">Dermatology</SelectItem>
                    <SelectItem value="otolaryngology">Otolaryngology</SelectItem>
                    <SelectItem value="general-internal-medicine">General Internal Medicine</SelectItem>
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                    <SelectItem value="oncology">Oncology</SelectItem>
                    <SelectItem value="neurology">Neurology</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="neumorphic-hover bg-transparent">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm" className="neumorphic-hover bg-transparent">
                    <Calendar className="w-4 h-4 mr-2" />
                    This Week
                  </Button>
                </div>
              </div>

              <TabsContent value="overview" className="space-y-6">
                {/* 모델 선택 카드 - 도메인이 "all"이 아닐 때만 표시 */}
                {selectedDomain !== "all" && question && (
                  <Card className="border-0 neumorphic bg-card interactive-card glow-effect">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Code2 className="w-5 h-5" />
                        Select AI Model
                      </CardTitle>
                      <CardDescription>
                        Choose an AI model to have a conversation with
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Select
                        value={selectedModel}
                        onValueChange={setSelectedModel}
                      >
                        <SelectTrigger className="w-full neumorphic bg-muted/50">
                          <SelectValue placeholder="Select a model to chat with">
                            {selectedModel ? (
                              <div className="flex items-center gap-2">
                                {isDark ? (
                                  <Image
                                    src={modelConfig[selectedModel]?.imageDark || "/placeholder.svg"}
                                    alt={modelConfig[selectedModel]?.alt || selectedModel}
                                    width={20}
                                    height={20}
                                    className="object-contain"
                                  />
                                ) : (
                                  <Image
                                    src={modelConfig[selectedModel]?.imageLight || "/placeholder.svg"}
                                    alt={modelConfig[selectedModel]?.alt || selectedModel}
                                    width={20}
                                    height={20}
                                    className="object-contain"
                                  />
                                )}
                                <span>{modelConfig[selectedModel]?.displayName || selectedModel}</span>
                              </div>
                            ) : (
                              "Select a model"
                            )}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent className="neumorphic bg-card">
                          {/* 모델 순서를 명시적으로 지정 */}
                          {[
                            "GPT-5",
                            "GPT-4o",
                            "GPT-4o-mini",
                            "GPT-3.5-turbo",
                            "Claude-Opus-4.5",
                            "Claude-Sonnet-4.5",
                            "Claude-Haiku-4.5",
                            "Llama-3.3-70B",
                            "Llama-3.1-8B",
                            "Qwen-2.5-72B",
                            "Mistral-Large",
                            "Phi-4",
                          ].map((key) => {
                            const config = modelConfig[key]
                            if (!config) return null
                            return (
                              <SelectItem key={key} value={key}>
                                <div className="flex items-center gap-2">
                                  {isDark ? (
                                    <Image
                                      src={config.imageDark}
                                      alt={config.alt}
                                      width={20}
                                      height={20}
                                      className="object-contain"
                                    />
                                  ) : (
                                    <Image
                                      src={config.imageLight}
                                      alt={config.alt}
                                      width={20}
                                      height={20}
                                      className="object-contain"
                                    />
                                  )}
                                  <span>{config.displayName}</span>
                                </div>
                              </SelectItem>
                            )
                          }).filter(Boolean)}
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>
                )}

                {/* 질문 카드 - 도메인이 "all"이 아닐 때만 표시 */}
                {selectedDomain !== "all" && question ? (
                  <Card className="border-0 neumorphic bg-card interactive-card glow-effect">
                    <CardContent className="space-y-6">
                      {/* 문제 시나리오 (Scenario) */}
                      {question.scenario && (
                        <div className="space-y-2 pd-2">
                          <h4 className="font-semibold text-foreground flex items-center gap-2">
                            <BookOpen className="w-5 h-5" />
                            Scenario
                          </h4>
                          <div className="p-4 rounded-lg neumorphic-inset bg-muted/20">
                            <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                              {question.scenario}
                            </p>
                          </div>
                        </div>
                      )}
                      {/* 이미지 설명 (Caption) */}
                      {question.caption && (
                        <div className="space-y-2">
                          <h4 className="font-semibold text-foreground flex items-center gap-2">
                            <ImageIcon className="w-5 h-5" />
                            Image Description
                          </h4>
                          <div className="p-4 rounded-lg neumorphic-inset bg-muted/20">
                            <p className="text-sm text-muted-foreground italic">
                              {question.caption}
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {/* 옵션 선택 (Options) */}
                      {question.options && Object.keys(question.options).length > 0 && (
                        <div className="space-y-3">
                          <h4 className="font-semibold text-foreground">Select an option:</h4>
                          <RadioGroup
                            value={selectedOption}
                            onValueChange={(value) => {
                              if (!isSubmitted) {
                                setSelectedOption(value)
                              }
                            }}
                            className="space-y-3"
                            disabled={isSubmitted}
                          >
                            {Object.entries(question.options).map(([key, value]) => {
                              const isCorrect = question.correct_option === key
                              const isSelected = selectedOption === key
                              const isWrong = isSubmitted && isSelected && !isCorrect
                              
                              // 색상 결정: 정답은 항상 초록색, 선택한 오답은 빨간색
                              let borderColor = ""
                              let bgColor = ""
                              
                              if (isSubmitted) {
                                if (isCorrect) {
                                  borderColor = "ring-2 ring-green-500"
                                  bgColor = "bg-green-500/10"
                                } else if (isWrong) {
                                  borderColor = "ring-2 ring-red-500"
                                  bgColor = "bg-red-500/10"
                                }
                              } else if (isSelected) {
                                borderColor = "ring-2 ring-accent"
                                bgColor = "bg-accent/10"
                              }
                              
                              return (
                                <div
                                  key={key}
                                  className={`flex items-start gap-3 p-4 rounded-lg neumorphic-inset bg-muted/20 transition-all ${
                                    isSubmitted ? "" : "cursor-pointer hover:bg-muted/30"
                                  } ${borderColor} ${bgColor}`}
                                  onClick={() => {
                                    if (!isSubmitted) {
                                      setSelectedOption(key)
                                    }
                                  }}
                                >
                                  <RadioGroupItem
                                    value={key}
                                    id={`option-${key}`}
                                    className="mt-0.5"
                                    disabled={isSubmitted}
                                  />
                                  <Label
                                    htmlFor={`option-${key}`}
                                    className={`flex-1 ${isSubmitted ? "" : "cursor-pointer"}`}
                                  >
                                    <div className="flex items-start gap-2">
                                      <span className={`font-semibold min-w-[24px] ${
                                        isSubmitted && isCorrect
                                          ? "text-green-500"
                                          : isSubmitted && isWrong
                                          ? "text-red-500"
                                          : "text-accent"
                                      }`}>
                                        {key}.
                                      </span>
                                      <span className={`text-sm leading-relaxed ${
                                        isSubmitted && isCorrect
                                          ? "text-green-600 dark:text-green-400"
                                          : isSubmitted && isWrong
                                          ? "text-red-600 dark:text-red-400"
                                          : "text-foreground"
                                      }`}>
                                        {value}
                                      </span>
                                    </div>
                                  </Label>
                                </div>
                              )
                            })}
                          </RadioGroup>
                          
                          {/* 제출 버튼 */}
                          <div className="flex justify-end pt-2">
                            <Button
                              onClick={async () => {
                                if (selectedOption && question?.case_id && selectedModel) {
                                  setIsSubmitted(true)
                                  
                                  // 채팅 로그 가져오기
                                  try {
                                    // 모델 이름을 API에서 사용하는 키로 변환
                                    const modelKey = modelKeyMap[selectedModel] || selectedModel.toLowerCase().replace(/\s+/g, "-")
                                    
                                    const response = await fetch(
                                      `/api/chat-log?domain=${selectedDomain}&selectedOption=${selectedOption}&caseId=${question.case_id}&model=${modelKey}`
                                    )
                                    const data = await response.json()
                                    
                                    console.log("Chat log API response:", data)
                                    
                                    if (data.error) {
                                      console.error("API error:", data.error)
                                      // 에러가 있어도 빈 배열로 설정하여 로딩 상태 해제
                                      setChatDialogue([])
                                      setDisplayedMessages(0)
                                    } else if (data.dialogue && Array.isArray(data.dialogue)) {
                                      console.log("Setting dialogue:", data.dialogue.length, "messages")
                                      setChatDialogue(data.dialogue)
                                      setDisplayedMessages(0) // 처음부터 시작
                                      setTypingProgress({}) // 타이핑 진행도 초기화
                                      setIsTyping({}) // 타이핑 상태 초기화
                                      
                                      // 첫 번째 메시지 표시
                                      let currentMessageIndex = 0
                                      
                                      const showNextMessage = (index: number) => {
                                        if (index >= data.dialogue.length) return
                                        
                                        setDisplayedMessages(index + 1)
                                        
                                        const message = data.dialogue[index]
                                        
                                        // AI 메시지인 경우 타이핑 애니메이션 시작
                                        if (message.role === "AI") {
                                          const messageContent = message.content || ""
                                          const words = messageContent.split(/(\s+)/) // 공백 포함하여 단어 분리
                                          const wordsPerChunk = 3 // 한 번에 표시할 단어 수
                                          const typingSpeed = 50 // 밀리초 (더 빠르게)
                                          
                                          setIsTyping((prev) => ({ ...prev, [index]: true }))
                                          
                                          // 여러 단어씩 묶어서 표시
                                          const totalChunks = Math.ceil(words.length / wordsPerChunk)
                                          
                                          for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
                                            setTimeout(() => {
                                              const wordsToShow = Math.min((chunkIndex + 1) * wordsPerChunk, words.length)
                                              setTypingProgress((prev) => ({
                                                ...prev,
                                                [index]: wordsToShow
                                              }))
                                              
                                              // 마지막 청크인 경우 타이핑 완료 처리
                                              if (chunkIndex === totalChunks - 1) {
                                                setIsTyping((prev) => ({ ...prev, [index]: false }))
                                                
                                                // 타이핑 완료 후 다음 메시지 표시
                                                setTimeout(() => {
                                                  showNextMessage(index + 1)
                                                }, 1000) // 타이핑 완료 후 1초 대기
                                              }
                                            }, chunkIndex * typingSpeed)
                                          }
                                        } else {
                                          // Doctor 메시지는 즉시 표시
                                          const messageContent = message.content || ""
                                          const words = messageContent.split(/(\s+)/)
                                          
                                          setTypingProgress((prev) => ({
                                            ...prev,
                                            [index]: words.length
                                          }))
                                          setIsTyping((prev) => ({ ...prev, [index]: false }))
                                          
                                          // Doctor 메시지 표시 후 다음 메시지 표시
                                          setTimeout(() => {
                                            showNextMessage(index + 1)
                                          }, 300) // 짧은 대기 후 다음 메시지
                                        }
                                      }
                                      
                                      // 첫 번째 메시지부터 시작
                                      showNextMessage(0)
                                    } else {
                                      console.error("Invalid dialogue data:", data)
                                      setChatDialogue([])
                                      setDisplayedMessages(0)
                                    }
                                  } catch (error) {
                                    console.error("Error fetching chat log:", error)
                                    setChatDialogue([])
                                    setDisplayedMessages(0)
                                  }
                                }
                              }}
                              disabled={!selectedOption || !selectedModel || isSubmitted}
                              className={`${
                                isSubmitted && selectedOption === question.correct_option
                                  ? "bg-green-500 hover:bg-green-600"
                                  : isSubmitted && selectedOption !== question.correct_option
                                  ? "bg-red-500 hover:bg-red-600"
                                  : "bg-accent hover:bg-accent/90"
                              } neumorphic-hover pulse-glow`}
                            >
                              {isSubmitted
                                ? selectedOption === question.correct_option
                                  ? "✓ Correct"
                                  : "✗ Incorrect"
                                : "Submit Answer"}
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ) : null}

                {/* AI 채팅 로그 카드 - 제출 후에만 표시 */}
                {selectedDomain !== "all" && question && isSubmitted && (
                  <Card 
                    ref={chatLogCardRef}
                    className="border-0 neumorphic bg-card interactive-card glow-effect"
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5" />
                        AI Chat Log
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* 채팅 로그 표시 */}
                      <div ref={chatMessagesRef} className="space-y-4">
                        {chatDialogue.length === 0 && displayedMessages === 0 ? (
                          <div className="p-4 rounded-lg neumorphic-inset bg-muted/20">
                            <p className="text-sm text-muted-foreground text-center">
                              Loading chat log...
                            </p>
                          </div>
                        ) : chatDialogue.length === 0 ? (
                          <div className="p-4 rounded-lg neumorphic-inset bg-muted/20">
                            <p className="text-sm text-muted-foreground text-center">
                              No chat log available for this selection.
                            </p>
                          </div>
                        ) : (
                          chatDialogue.slice(0, displayedMessages).map((message, index) => {
                            const isDoctor = message.role === "Doctor"
                            const isLastMessage = index === displayedMessages - 1
                            
                            // 단어 단위로 분리 (공백 포함)
                            const words = message.content.split(/(\s+)/)
                            const displayedWordCount = typingProgress[index] || 0
                            const displayedText = isDoctor 
                              ? message.content 
                              : words.slice(0, displayedWordCount).join("")
                            const isCurrentlyTyping = isTyping[index] === true
                            
                            return (
                              <div
                                key={index}
                                ref={isLastMessage ? lastMessageRef : null}
                                className={`flex ${isDoctor ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-4 duration-500`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                              >
                                <div
                                  className={`max-w-[80%] rounded-lg p-4 ${
                                    isDoctor
                                      ? "bg-accent text-accent-foreground neumorphic"
                                      : "bg-muted/20 text-foreground neumorphic-inset"
                                  }`}
                                >
                                  <div className="flex items-start gap-2 mb-1">
                                    <span className="text-xs font-semibold opacity-70">
                                      {isDoctor ? "Doctor" : "AI"}
                                    </span>
                                  </div>
                                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                    {displayedText}
                                    {!isDoctor && isCurrentlyTyping && (
                                      <span className="inline-block w-2 h-4 bg-foreground ml-1 animate-pulse">|</span>
                                    )}
                                  </p>
                                </div>
                              </div>
                            )
                          })
                        )}
                        {displayedMessages < chatDialogue.length && (
                          <div className="flex justify-center py-2">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* All Domains 메시지 */}
                {selectedDomain === "all" && (
                  <Card className="border-0 neumorphic bg-card interactive-card glow-effect">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="w-5 h-5" />
                        All Domains Results
                      </CardTitle>
                      <CardDescription>
                        Showing results for All Domains
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Please select a specific domain to view case questions.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              {/* <TabsContent value="overview" className="space-y-6">
                <Card className="border-0 neumorphic bg-card interactive-card glow-effect">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3 p-3 rounded-lg neumorphic-inset bg-muted/20 hover:bg-muted/30 transition-colors">
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center neumorphic-inset">
                        <GitCommit className="w-4 h-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">Pushed 3 commits</span> to{" "}
                          <span className="text-accent">awesome-project</span>
                        </p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg neumorphic-inset bg-muted/20 hover:bg-muted/30 transition-colors">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center neumorphic-inset">
                        <PullRequest className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">Opened pull request</span> in{" "}
                          <span className="text-accent">web-components</span>
                        </p>
                        <p className="text-xs text-muted-foreground">5 hours ago</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg neumorphic-inset bg-muted/20 hover:bg-muted/30 transition-colors">
                      <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center neumorphic-inset">
                        <Star className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">Starred</span>{" "}
                          <span className="text-accent">react-hooks-library</span>
                        </p>
                        <p className="text-xs text-muted-foreground">1 day ago</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg neumorphic-inset bg-muted/20 hover:bg-muted/30 transition-colors">
                      <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center neumorphic-inset">
                        <AlertCircle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">Closed issue</span> in{" "}
                          <span className="text-accent">mobile-app</span>
                        </p>
                        <p className="text-xs text-muted-foreground">2 days ago</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 neumorphic bg-card interactive-card glow-effect">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Top Repositories
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 neumorphic bg-muted/20 rounded-lg hover:shadow-lg transition-all duration-300 interactive-card">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center neumorphic-inset">
                          <Code2 className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">awesome-project</h4>
                          <p className="text-sm text-muted-foreground">Modern web application</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          <span>234</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GitFork className="w-4 h-4" />
                          <span>45</span>
                        </div>
                        <Badge variant="secondary" className="neumorphic">
                          TypeScript
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 neumorphic bg-muted/20 rounded-lg hover:shadow-lg transition-all duration-300 interactive-card">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center neumorphic-inset">
                          <Code2 className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">web-components</h4>
                          <p className="text-sm text-muted-foreground">Reusable UI components</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          <span>189</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GitFork className="w-4 h-4" />
                          <span>32</span>
                        </div>
                        <Badge variant="secondary" className="neumorphic">
                          React
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 neumorphic bg-muted/20 rounded-lg hover:shadow-lg transition-all duration-300 interactive-card">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center neumorphic-inset">
                          <Code2 className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">mobile-app</h4>
                          <p className="text-sm text-muted-foreground">Cross-platform mobile app</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          <span>156</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GitFork className="w-4 h-4" />
                          <span>28</span>
                        </div>
                        <Badge variant="secondary" className="neumorphic">
                          React Native
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="repositories" className="space-y-6">
                <Card className="border-0 neumorphic bg-card interactive-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Your Repositories</CardTitle>
                      <Button size="sm" className="bg-accent hover:bg-accent/90 neumorphic-hover pulse-glow">
                        <Plus className="w-4 h-4 mr-2" />
                        New Repository
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="border-b border-border/50 pb-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-accent hover:underline cursor-pointer">
                              awesome-project
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              A modern web application built with Next.js and TypeScript
                            </p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                <span>TypeScript</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4" />
                                <span>234</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <GitFork className="w-4 h-4" />
                                <span>45</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>Updated 2 hours ago</span>
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="neumorphic-hover bg-transparent">
                            <Star className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="border-b border-border/50 pb-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-accent hover:underline cursor-pointer">
                              web-components
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              A collection of reusable React components with TypeScript support
                            </p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                                <span>React</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4" />
                                <span>189</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <GitFork className="w-4 h-4" />
                                <span>32</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>Updated 5 hours ago</span>
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="neumorphic-hover bg-transparent">
                            <Star className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="border-b border-border/50 pb-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-accent hover:underline cursor-pointer">
                              mobile-app
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Cross-platform mobile application built with React Native
                            </p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                <span>React Native</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4" />
                                <span>156</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <GitFork className="w-4 h-4" />
                                <span>28</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>Updated 1 day ago</span>
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="neumorphic-hover bg-transparent">
                            <Star className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="space-y-6">
                <Card className="border-0 neumorphic bg-card interactive-card glow-effect">
                  <CardHeader>
                    <CardTitle>Activity Feed</CardTitle>
                    <CardDescription>Your recent development activity across all repositories</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-4 p-4 border border-border/50 rounded-lg neumorphic-inset bg-muted/20 hover:bg-muted/30 transition-colors">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center neumorphic-inset">
                          <GitCommit className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-medium">Pushed 3 commits</span> to{" "}
                            <span className="text-accent">awesome-project</span>
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            feat: add user authentication, fix: resolve mobile layout issues, docs: update README
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">2 hours ago</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 border border-border/50 rounded-lg neumorphic-inset bg-muted/20 hover:bg-muted/30 transition-colors">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center neumorphic-inset">
                          <PullRequest className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-medium">Opened pull request #42</span> in{" "}
                            <span className="text-accent">web-components</span>
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Add new Button component with accessibility improvements
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">5 hours ago</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 border border-border/50 rounded-lg neumorphic-inset bg-muted/20 hover:bg-muted/30 transition-colors">
                        <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center neumorphic-inset">
                          <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-medium">Closed issue #28</span> in{" "}
                            <span className="text-accent">mobile-app</span>
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">Fixed navigation bug on Android devices</p>
                          <p className="text-xs text-muted-foreground mt-2">1 day ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent> */}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
