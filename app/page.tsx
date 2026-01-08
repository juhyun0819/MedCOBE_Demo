"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Zap,
  Star,
  GitFork,
  Eye,
  Bot,
  Shield,
  Rocket,
  Code,
  BookOpen,
  GitPullRequest,
  Sun,
  Moon,
  Terminal,
  GitBranch,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function HomePage() {
  const [isDark, setIsDark] = useState(true)
  const [typedText, setTypedText] = useState("")
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  const codeWords = ["git clone", "npm install", "git commit", "git push", "npm run dev", "git merge"]

  useEffect(() => {
    // 항상 dark 모드로 시작
    setIsDark(true)
    document.documentElement.classList.add("dark")
  }, [])

  useEffect(() => {
    const currentWord = codeWords[currentWordIndex]
    let currentIndex = 0

    const typingInterval = setInterval(() => {
      if (currentIndex <= currentWord.length) {
        setTypedText(currentWord.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typingInterval)
        setTimeout(() => {
          setCurrentWordIndex((prev) => (prev + 1) % codeWords.length)
        }, 2000)
      }
    }, 100)

    return () => clearInterval(typingInterval)
  }, [currentWordIndex])

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

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <header className="border-b border-border/30 bg-card/90 backdrop-blur-xl sticky top-0 z-50 neumorphic header-glow">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 relative neumorphic pulse-glow rotating-logo rounded-xl overflow-hidden">
                  <Image
                    src="/logo_ver3.png"
                    alt="MedCOBE Logo"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <span className="text-2xl font-heading font-bold text-foreground">MedCOBE</span>
              </Link>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground transition-all duration-500 font-medium nav-link"
              >
                Home
              </Link>
              <a
                href="/dashboard"
                className="text-muted-foreground hover:text-foreground transition-all duration-500 font-medium nav-link"
              >
                Demo
              </a>
              <a
                href="#paper" /* TODO: Add paper page */
                className="text-muted-foreground hover:text-foreground transition-all duration-500 font-medium nav-link"
              >
                Paper
              </a>
            </nav>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={toggleTheme} className="neumorphic-hover theme-toggle">
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <Link href="/dashboard">
                <Button size="sm" className="bg-accent hover:bg-accent/90 neumorphic-hover pulse-glow cta-button">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="py-24 px-6 aurora-bg enhanced-aurora">
        <div className="container mx-auto text-center max-w-5xl relative z-10">
          <Badge
            variant="secondary"
            className="mb-8 bg-accent/20 text-accent-foreground border-accent/30 neumorphic px-4 py-2 glow-effect text-sm"
          >
            <Bot className="w-4 h-4 mr-2" />
            Behavior-Level Evaluation of Clinical LLMs
          </Badge>

          <div className="mb-6 flex justify-center">
            <div className="fade-in-up">
              <Image
                src="/logo_ver3.png"
                alt="MedCOBE Logo"
                width={200}
                height={200}
                className="object-contain"
              />
            </div>
          </div>

          <h1 className="text-6xl md:text-5xl font-heading font-bold text-balance mb-8 text-foreground leading-tight hero-title">
            MedCOBE: Evaluating LLMs as Clinical Decision-Making Partners
          </h1>
          <p className="text-xl text-muted-foreground text-balance mb-12 leading-relaxed max-w-3xl mx-auto fade-in-up">
          This is an interactive demo of the MedCOBE framework, designed to showcase how collaborative behaviors between clinicians and LLMs are evaluated under controlled settings.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground neumorphic-hover px-8 py-4 text-lg enhanced-cta"
              >
                <Rocket className="w-5 h-5 mr-3" />
                Start Evaluation
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="neumorphic-hover px-8 py-4 text-lg bg-transparent demo-button"
            >
              <Eye className="w-5 h-5 mr-3" />
              Full Paper
            </Button>
          </div>
        </div>

        <div className="container mx-auto text-center max-w-6xl">

          {/* <Card className="border-0 neumorphic bg-card overflow-hidden repo-preview">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-heading font-semibold mb-4 text-lg text-foreground">Domains</h4>
                  <div className="space-y-4">
                    {[
                      { colorClass: "bg-green-500", message: "ophthalmology"},
                      { colorClass: "bg-blue-500", message: "dermatology"},
                      { colorClass: "bg-purple-500", message: "otolaryngology"},
                      { colorClass: "bg-red-500", message: "general internal medicine"},
                      { colorClass: "bg-orange-500", message: "cardiology"},
                      { colorClass: "bg-yellow-500", message: "oncology"},
                      { colorClass: "bg-pink-500", message: "neurology"}
                    ].map((commit, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-3 rounded-xl neumorphic-inset bg-muted/20 commit-item"
                        style={{ animationDelay: `${index * 0.2}s` }}
                      >
                        <div className={`w-3 h-3 ${commit.colorClass} rounded-full pulse-dot`}></div>
                        <div className="flex-1">
                          <span className="text-foreground font-medium">{commit.message}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-heading font-semibold mb-4 text-lg text-foreground">Models</h4>
                  <div className="space-y-4">
                    {[
                      { name: "GPT-5", colorClass: "bg-blue-500" },
                      { name: "GPT-4o", colorClass: "bg-green-500" },
                      { name: "GPT-4o-mini", colorClass: "bg-yellow-500" },
                      { name: "GPT-3.5-Turbo", colorClass: "bg-amber-500" },
                      { name: "Claude-Sonnet-4.5", colorClass: "bg-purple-500" },
                      { name: "Claude-Opus-4.5", colorClass: "bg-indigo-500" },
                      { name: "Claude-Haiku-4.5", colorClass: "bg-violet-500" },
                      { name: "Llama-3.3-70B", colorClass: "bg-teal-500" },
                      { name: "Llama-3.1-8B", colorClass: "bg-cyan-500" },
                      { name: "Qwen2.5-72B-Instruct", colorClass: "bg-emerald-500" },
                      { name: "Mistral-Large", colorClass: "bg-rose-500" },
                      { name: "Phi-4", colorClass: "bg-fuchsia-500" }
                    ].map((lang, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-3 rounded-xl neumorphic-inset bg-muted/20 language-item"
                        style={{ animationDelay: `${index * 0.2}s` }}
                      >
                        <div className={`w-3 h-3 ${lang.colorClass} rounded-full pulse-dot`}></div>
                        <div className="flex-1">
                          <span className="text-foreground font-medium">{lang.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card> */}
        </div>
      </section>

      <footer className="border-t border-border/30 bg-card py-5 px-6 neumorphic footer-glow">
        <div className="container mx-auto max-w-6xl">
          <div className="mt-2 pt-2 text-center text-muted-foreground">
            <p>&copy; 2025 MedCOBE: Evaluating LLMs as Clinical Decision-Making Partners</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
