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
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useState, useEffect } from "react"



/**
 * Dashboard 페이지 (/dashboard)
 * 
 * MedCOBE 프로젝트의 메인 대시보드 페이지입니다.
 * 사용자 프로필, 통계, 최근 활동, 레포지토리 정보를 표시합니다.
 */
export default function DashboardPage() {
  const router = useRouter()
  const pathname = usePathname()
  const [isDark, setIsDark] = useState(false)
  
  // URL에서 domain 추출 (예: /dashboard/ophthalmology -> ophthalmology)
  // /dashboard인 경우 "all"로 설정
  const currentDomain = pathname === "/dashboard" ? "all" : (pathname.split('/').pop() || "all")
  const [selectedDomain, setSelectedDomain] = useState(currentDomain)
  
  // pathname이 변경되면 selectedDomain 업데이트
  useEffect(() => {
    const domain = pathname === "/dashboard" ? "all" : (pathname.split('/').pop() || "all")
    setSelectedDomain(domain)
  }, [pathname])

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

  // Excel 파일에서 데이터 가져오기
  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await fetch("/api/medcobe-scores")
        const data = await response.json()
        
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
        // 에러 발생 시 기본 데이터 사용
        const defaultModels = Object.entries(modelConfig).map(([name, config]) => ({
          name,
          percentage: 0,
          ...config,
        }))
        setModels(defaultModels)
      }
    }

    fetchScores()
  }, [])

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <header className="border-b border-border/30 bg-card/80 backdrop-blur-md sticky top-0 z-50 neumorphic">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 relative neumorphic rounded-lg overflow-hidden">
                  <Image
                    src="/logo_ver3.png"
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
              <Button variant="ghost" size="sm" onClick={toggleTheme}>
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <Link href="/">
                <Button size="sm" className="bg-accent hover:bg-accent/90">
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
                    <CardDescription>@All Domains</CardDescription>
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
                    // URL 변경: /dashboard 또는 /dashboard/[domain]
                    if (value === "all") {
                      router.push("/dashboard")
                    } else {
                      router.push(`/dashboard/${value}`)
                    }
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
                      All Domains results will be displayed here.
                    </p>
                  </CardContent>
                </Card>
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
