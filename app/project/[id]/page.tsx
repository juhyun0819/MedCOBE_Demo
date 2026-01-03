"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Code2,
  Folder,
  File,
  Search,
  Download,
  Star,
  GitFork,
  Eye,
  GitBranch,
  Users,
  ArrowLeft,
  Copy,
  Edit,
  FileText,
  GitCommit,
  ChevronRight,
  Home,
} from "lucide-react"
import Link from "next/link"

export default function ProjectExplorerPage({ params }: { params: { id: string } }) {
  const projectId = params.id

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Dashboard
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-accent-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">awesome-project</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Star className="w-4 h-4 mr-2" />
                Star
              </Button>
              <Button variant="outline" size="sm">
                <GitFork className="w-4 h-4 mr-2" />
                Fork
              </Button>
              <Button size="sm" className="bg-accent hover:bg-accent/90">
                <Download className="w-4 h-4 mr-2" />
                Clone
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Project Info */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">awesome-project</h1>
              <p className="text-muted-foreground mb-4">
                A modern web application built with Next.js, TypeScript, and Tailwind CSS
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>TypeScript</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  <span>234 stars</span>
                </div>
                <div className="flex items-center gap-1">
                  <GitFork className="w-4 h-4" />
                  <span>45 forks</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>12 watching</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/developer-avatar.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">johndev</span>
            </div>
          </div>

          {/* Branch and Commit Info */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-muted-foreground" />
              <Badge variant="outline">main</Badge>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <GitCommit className="w-4 h-4" />
              <span>Latest commit: feat: add user authentication</span>
              <span>2 hours ago</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* File Explorer */}
          <div className="lg:col-span-3">
            <Card className="border-border/50">
              <CardHeader className="border-b border-border/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Folder className="w-5 h-5 text-accent" />
                    <CardTitle>Files</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input placeholder="Search files..." className="pl-10 w-64 bg-muted/50" />
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Home className="w-4 h-4" />
                  <ChevronRight className="w-4 h-4" />
                  <span className="text-foreground">awesome-project</span>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <div className="divide-y divide-border/50">
                  {/* Folders */}
                  <div className="flex items-center gap-3 p-4 hover:bg-muted/30 transition-colors cursor-pointer">
                    <Folder className="w-5 h-5 text-blue-500" />
                    <div className="flex-1">
                      <span className="text-foreground font-medium">src</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span>Latest commit 2 hours ago</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 hover:bg-muted/30 transition-colors cursor-pointer">
                    <Folder className="w-5 h-5 text-blue-500" />
                    <div className="flex-1">
                      <span className="text-foreground font-medium">public</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span>Latest commit 1 day ago</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 hover:bg-muted/30 transition-colors cursor-pointer">
                    <Folder className="w-5 h-5 text-blue-500" />
                    <div className="flex-1">
                      <span className="text-foreground font-medium">components</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span>Latest commit 5 hours ago</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 hover:bg-muted/30 transition-colors cursor-pointer">
                    <Folder className="w-5 h-5 text-blue-500" />
                    <div className="flex-1">
                      <span className="text-foreground font-medium">lib</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span>Latest commit 1 day ago</span>
                    </div>
                  </div>

                  {/* Files */}
                  <div className="flex items-center gap-3 p-4 hover:bg-muted/30 transition-colors cursor-pointer">
                    <FileText className="w-5 h-5 text-gray-500" />
                    <div className="flex-1">
                      <span className="text-foreground font-medium">README.md</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span>docs: update README</span>
                      <span className="ml-4">1 day ago</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 hover:bg-muted/30 transition-colors cursor-pointer">
                    <File className="w-5 h-5 text-green-500" />
                    <div className="flex-1">
                      <span className="text-foreground font-medium">package.json</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span>feat: add new dependencies</span>
                      <span className="ml-4">2 hours ago</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 hover:bg-muted/30 transition-colors cursor-pointer">
                    <File className="w-5 h-5 text-blue-500" />
                    <div className="flex-1">
                      <span className="text-foreground font-medium">tsconfig.json</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span>config: update TypeScript settings</span>
                      <span className="ml-4">3 days ago</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 hover:bg-muted/30 transition-colors cursor-pointer">
                    <File className="w-5 h-5 text-orange-500" />
                    <div className="flex-1">
                      <span className="text-foreground font-medium">tailwind.config.js</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span>style: update Tailwind configuration</span>
                      <span className="ml-4">1 week ago</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 hover:bg-muted/30 transition-colors cursor-pointer">
                    <File className="w-5 h-5 text-gray-500" />
                    <div className="flex-1">
                      <span className="text-foreground font-medium">.gitignore</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span>Initial commit</span>
                      <span className="ml-4">2 weeks ago</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* File Content Viewer */}
            <Card className="border-border/50 mt-6">
              <CardHeader className="border-b border-border/50">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    README.md
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-96">
                  <div className="p-6 font-mono text-sm">
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      <h1 className="text-2xl font-bold text-foreground mb-4">Awesome Project</h1>
                      <p className="text-muted-foreground mb-4">
                        A modern web application built with Next.js, TypeScript, and Tailwind CSS.
                      </p>

                      <h2 className="text-xl font-semibold text-foreground mb-3">Features</h2>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                        <li>Modern React with Next.js 14</li>
                        <li>TypeScript for type safety</li>
                        <li>Tailwind CSS for styling</li>
                        <li>AI-powered code assistance</li>
                        <li>Real-time collaboration</li>
                      </ul>

                      <h2 className="text-xl font-semibold text-foreground mb-3">Getting Started</h2>
                      <div className="bg-muted rounded-lg p-4 mb-4">
                        <pre className="text-sm">
                          {`npm install
npm run dev`}
                        </pre>
                      </div>

                      <h2 className="text-xl font-semibold text-foreground mb-3">Contributing</h2>
                      <p className="text-muted-foreground mb-4">
                        We welcome contributions! Please read our contributing guidelines before submitting a pull
                        request.
                      </p>

                      <h2 className="text-xl font-semibold text-foreground mb-3">License</h2>
                      <p className="text-muted-foreground">This project is licensed under the MIT License.</p>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* About */}
            <Card className="border-border/50 mb-6">
              <CardHeader>
                <CardTitle className="text-base">About</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  A modern web application showcasing best practices in React development.
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Website:</span>
                    <Link href="#" className="text-accent hover:underline">
                      awesome-project.dev
                    </Link>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Topics:</span>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="secondary" className="text-xs">
                        react
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        nextjs
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        typescript
                      </Badge>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Stars</span>
                    <span className="font-medium">234</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Forks</span>
                    <span className="font-medium">45</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Watchers</span>
                    <span className="font-medium">12</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Languages */}
            <Card className="border-border/50 mb-6">
              <CardHeader>
                <CardTitle className="text-base">Languages</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-muted-foreground">TypeScript</span>
                    <span className="font-medium">68.2%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "68.2%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-muted-foreground">CSS</span>
                    <span className="font-medium">21.8%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "21.8%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-muted-foreground">JavaScript</span>
                    <span className="font-medium">10.0%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "10%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contributors */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Contributors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex -space-x-2">
                  <Avatar className="w-8 h-8 border-2 border-background">
                    <AvatarImage src="/developer-avatar.png" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Avatar className="w-8 h-8 border-2 border-background">
                    <AvatarFallback>AS</AvatarFallback>
                  </Avatar>
                  <Avatar className="w-8 h-8 border-2 border-background">
                    <AvatarFallback>MK</AvatarFallback>
                  </Avatar>
                  <div className="w-8 h-8 border-2 border-background rounded-full bg-muted flex items-center justify-center text-xs text-muted-foreground">
                    +5
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
