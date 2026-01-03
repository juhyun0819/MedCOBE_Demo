"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Code2,
  Bot,
  Send,
  Copy,
  Download,
  RefreshCw,
  Sparkles,
  FileText,
  Bug,
  BookOpen,
  Zap,
  CheckCircle,
  AlertTriangle,
  Info,
  ArrowLeft,
  Settings,
  History,
  Lightbulb,
  Search,
  Play,
} from "lucide-react"

export default function AIAssistantPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-accent-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">AI Code Assistant</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm">
                <History className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  AI Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <Code2 className="w-4 h-4 mr-2" />
                  Code Generation
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <Bug className="w-4 h-4 mr-2" />
                  Bug Detection
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Documentation
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Code Refactoring
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <Search className="w-4 h-4 mr-2" />
                  Code Explanation
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Optimization Tips
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                  <Play className="w-4 h-4 mr-2" />
                  Run Code Analysis
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Tests
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Create README
                </Button>
              </CardContent>
            </Card>

            {/* Usage Stats */}
            <Card className="border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-base">Today's Usage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Queries</span>
                  <span className="font-medium text-foreground">23/100</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full" style={{ width: "23%" }}></div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Code Generated</span>
                  <span className="font-medium text-foreground">1.2k lines</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Bugs Fixed</span>
                  <span className="font-medium text-foreground">8</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="chat" className="space-y-6">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="chat">AI Chat</TabsTrigger>
                <TabsTrigger value="code-review">Code Review</TabsTrigger>
                <TabsTrigger value="analysis">Analysis</TabsTrigger>
              </TabsList>

              <TabsContent value="chat" className="space-y-6">
                <Card className="border-border/50 h-[600px] flex flex-col">
                  <CardHeader className="border-b border-border/50">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Bot className="w-5 h-5 text-accent" />
                        AI Assistant Chat
                      </CardTitle>
                      <Badge
                        variant="secondary"
                        className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                      >
                        Online
                      </Badge>
                    </div>
                    <CardDescription>
                      Ask questions about your code, get suggestions, or request help with development tasks
                    </CardDescription>
                  </CardHeader>

                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {/* AI Welcome Message */}
                      <div className="flex items-start gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-accent text-accent-foreground">AI</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 bg-muted/50 rounded-lg p-3">
                          <p className="text-sm">
                            Hello! I'm your AI coding assistant. I can help you with code generation, bug fixes,
                            documentation, refactoring, and more. What would you like to work on today?
                          </p>
                        </div>
                      </div>

                      {/* User Message */}
                      <div className="flex items-start gap-3 justify-end">
                        <div className="flex-1 bg-accent text-accent-foreground rounded-lg p-3 max-w-md ml-auto">
                          <p className="text-sm">
                            Can you help me optimize this React component for better performance?
                          </p>
                        </div>
                        <Avatar className="w-8 h-8">
                          <AvatarImage src="/developer-avatar.png" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                      </div>

                      {/* AI Response */}
                      <div className="flex items-start gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-accent text-accent-foreground">AI</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 bg-muted/50 rounded-lg p-3">
                          <p className="text-sm mb-3">
                            I'd be happy to help optimize your React component! Here are some common performance
                            optimizations:
                          </p>
                          <div className="bg-card border border-border/50 rounded p-3 font-mono text-xs">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-muted-foreground">Optimized Component</span>
                              <Button variant="ghost" size="sm">
                                <Copy className="w-3 h-3" />
                              </Button>
                            </div>
                            <pre className="text-foreground">
                              {`import React, { memo, useMemo, useCallback } from 'react';

const OptimizedComponent = memo(({ items, onItemClick }) => {
  const sortedItems = useMemo(() => 
    items.sort((a, b) => a.name.localeCompare(b.name)), 
    [items]
  );

  const handleClick = useCallback((id) => {
    onItemClick(id);
  }, [onItemClick]);

  return (
    <div>
      {sortedItems.map(item => (
        <Item 
          key={item.id} 
          item={item} 
          onClick={handleClick}
        />
      ))}
    </div>
  );
});`}
                            </pre>
                          </div>
                          <div className="mt-3 flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Download className="w-3 h-3 mr-1" />
                              Save Code
                            </Button>
                            <Button variant="outline" size="sm">
                              <Play className="w-3 h-3 mr-1" />
                              Run Analysis
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Suggestions */}
                      <div className="flex items-start gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-accent text-accent-foreground">AI</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-2">
                              <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                              <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                                Performance Tips
                              </span>
                            </div>
                            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                              <li>• Use React.memo() to prevent unnecessary re-renders</li>
                              <li>• Implement useMemo() for expensive calculations</li>
                              <li>• Use useCallback() for event handlers</li>
                              <li>• Consider virtualization for large lists</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>

                  <div className="border-t border-border/50 p-4">
                    <div className="flex items-center gap-2">
                      <Input placeholder="Ask me anything about your code..." className="flex-1" />
                      <Button size="sm" className="bg-accent hover:bg-accent/90">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="code-review" className="space-y-6">
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Search className="w-5 h-5 text-accent" />
                      AI Code Review
                    </CardTitle>
                    <CardDescription>
                      Upload or paste your code for comprehensive AI-powered analysis and suggestions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Your Code</label>
                        <Textarea placeholder="Paste your code here for review..." className="h-64 font-mono text-sm" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">AI Analysis</label>
                        <div className="h-64 bg-muted/30 rounded-lg p-4 border border-border/50">
                          <div className="text-center text-muted-foreground mt-20">
                            <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p className="text-sm">Paste code to get AI analysis</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button className="bg-accent hover:bg-accent/90">
                        <Zap className="w-4 h-4 mr-2" />
                        Analyze Code
                      </Button>
                      <Button variant="outline">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Clear
                      </Button>
                    </div>

                    <Separator />

                    {/* Sample Analysis Results */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-foreground">Analysis Results</h4>

                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-green-800 dark:text-green-200">Good Practices</p>
                            <p className="text-sm text-green-700 dark:text-green-300">
                              Proper error handling and input validation implemented
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                          <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Suggestions</p>
                            <p className="text-sm text-yellow-700 dark:text-yellow-300">
                              Consider using TypeScript for better type safety
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                          <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-blue-800 dark:text-blue-200">Optimization</p>
                            <p className="text-sm text-blue-700 dark:text-blue-300">
                              Use memoization to improve performance for expensive calculations
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analysis" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-border/50">
                    <CardHeader>
                      <CardTitle className="text-base">Code Quality Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-accent mb-2">8.7</div>
                        <div className="text-sm text-muted-foreground mb-4">out of 10</div>
                        <div className="w-full bg-muted rounded-full h-3">
                          <div className="bg-accent h-3 rounded-full" style={{ width: "87%" }}></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border/50">
                    <CardHeader>
                      <CardTitle className="text-base">Security Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Vulnerabilities</span>
                          <Badge
                            variant="secondary"
                            className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                          >
                            0 Critical
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Dependencies</span>
                          <Badge variant="secondary">24 Secure</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Code Patterns</span>
                          <Badge
                            variant="secondary"
                            className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                          >
                            2 Warnings
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle>Detailed Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="performance" className="space-y-4">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="performance">Performance</TabsTrigger>
                        <TabsTrigger value="security">Security</TabsTrigger>
                        <TabsTrigger value="maintainability">Maintainability</TabsTrigger>
                        <TabsTrigger value="best-practices">Best Practices</TabsTrigger>
                      </TabsList>

                      <TabsContent value="performance" className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                            <div>
                              <p className="text-sm font-medium">Bundle Size</p>
                              <p className="text-xs text-muted-foreground">Optimized for production</p>
                            </div>
                            <Badge
                              variant="secondary"
                              className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                            >
                              Good
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                            <div>
                              <p className="text-sm font-medium">Memory Usage</p>
                              <p className="text-xs text-muted-foreground">No memory leaks detected</p>
                            </div>
                            <Badge
                              variant="secondary"
                              className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                            >
                              Excellent
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                            <div>
                              <p className="text-sm font-medium">Render Performance</p>
                              <p className="text-xs text-muted-foreground">Consider memoization</p>
                            </div>
                            <Badge
                              variant="secondary"
                              className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                            >
                              Needs Improvement
                            </Badge>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="security" className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                            <div>
                              <p className="text-sm font-medium">Input Validation</p>
                              <p className="text-xs text-muted-foreground">All inputs properly validated</p>
                            </div>
                            <Badge
                              variant="secondary"
                              className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                            >
                              Secure
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                            <div>
                              <p className="text-sm font-medium">Authentication</p>
                              <p className="text-xs text-muted-foreground">JWT tokens properly handled</p>
                            </div>
                            <Badge
                              variant="secondary"
                              className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                            >
                              Secure
                            </Badge>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="maintainability" className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                            <div>
                              <p className="text-sm font-medium">Code Complexity</p>
                              <p className="text-xs text-muted-foreground">Low cyclomatic complexity</p>
                            </div>
                            <Badge
                              variant="secondary"
                              className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                            >
                              Good
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                            <div>
                              <p className="text-sm font-medium">Documentation</p>
                              <p className="text-xs text-muted-foreground">Functions well documented</p>
                            </div>
                            <Badge
                              variant="secondary"
                              className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                            >
                              Excellent
                            </Badge>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="best-practices" className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                            <div>
                              <p className="text-sm font-medium">Code Style</p>
                              <p className="text-xs text-muted-foreground">Follows ESLint rules</p>
                            </div>
                            <Badge
                              variant="secondary"
                              className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                            >
                              Consistent
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                            <div>
                              <p className="text-sm font-medium">Error Handling</p>
                              <p className="text-xs text-muted-foreground">Comprehensive error boundaries</p>
                            </div>
                            <Badge
                              variant="secondary"
                              className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                            >
                              Robust
                            </Badge>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
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
