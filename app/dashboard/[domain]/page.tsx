"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
 * Dashboard Domain 페이지 (/dashboard/[domain])
 * 
 * 특정 domain에 대한 대시보드 페이지입니다.
 */
export default function DashboardDomainPage({ params }: { params: { domain: string } }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isDark, setIsDark] = useState(false)
  
  // URL에서 domain 추출
  const currentDomain = params.domain || "all"
  const [selectedDomain, setSelectedDomain] = useState(currentDomain)
  
  // pathname이 변경되면 selectedDomain 업데이트
  useEffect(() => {
    const domain = pathname.split('/').pop() || "all"
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

  // Domain 이름 매핑
  const domainNames: Record<string, string> = {
    all: "All Domains",
    ophthalmology: "Ophthalmology",
    dermatology: "Dermatology",
    otolaryngology: "Otolaryngology",
    "general-internal-medicine": "General Internal Medicine",
    cardiology: "Cardiology",
    oncology: "Oncology",
    neurology: "Neurology",
  }

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
                    <CardDescription>@{domainNames[currentDomain]}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* 모델 리스트는 기존과 동일하게 유지 */}
                <div className="space-y-2">
                  {/* 모델 항목들... */}
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
                    if (value === "all") {
                      router.push("/dashboard")
                    } else {
                      router.push(`/dashboard/${value}`)
                    }
                  }}
                >
                  <SelectTrigger className="w-[250px] neumorphic bg-muted/50">
                    <SelectValue placeholder="Select Domain" />
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
                      {domainNames[currentDomain]} Domain Results
                    </CardTitle>
                    <CardDescription>
                      Showing results for {domainNames[currentDomain] || currentDomain}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Domain별 콘텐츠를 여기에 표시 */}
                    <p className="text-muted-foreground">
                      Domain-specific content for {domainNames[currentDomain] || currentDomain} will be displayed here.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

