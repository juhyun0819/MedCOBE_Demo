import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

// 이 route는 동적이므로 정적 렌더링을 비활성화
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    // URL에서 domain 파라미터 추출
    const { searchParams } = new URL(request.url)
    const domain = searchParams.get("domain") || "all"
    
    // "all" 도메인인 경우 질문 데이터를 반환하지 않음
    if (domain === "all") {
      return NextResponse.json({ 
        question: null,
        message: "Please select a specific domain to view questions."
      })
    }
    
    // 도메인 이름을 파일명 형식으로 변환
    // 예: "ophthalmology" -> "ophthalmology_question.json"
    // 예: "general-internal-medicine" -> "general_internal_medicine_question.json"
    const domainFileName = domain.replace(/-/g, "_") + "_question.json"
    const filePath = path.join(process.cwd(), "lib/data", domainFileName)
    
    // 파일이 존재하는지 확인
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: `Question file not found for domain: ${domain}` },
        { status: 404 }
      )
    }
    
    // JSON 파일 읽기
    const fileContent = fs.readFileSync(filePath, "utf-8").trim()
    
    // 빈 파일 체크
    if (!fileContent || fileContent.length === 0) {
      return NextResponse.json(
        { error: `Question file is empty for domain: ${domain}` },
        { status: 404 }
      )
    }
    
    let questions
    try {
      questions = JSON.parse(fileContent)
    } catch (parseError) {
      console.error("JSON parse error:", parseError)
      return NextResponse.json(
        { error: `Invalid JSON format in question file for domain: ${domain}` },
        { status: 500 }
      )
    }
    
    // 첫 번째 질문 반환 (배열이므로 첫 번째 요소)
    const question = Array.isArray(questions) && questions.length > 0 ? questions[0] : null
    
    if (!question) {
      return NextResponse.json(
        { error: "No questions found in file" },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ question, domain })
  } catch (error) {
    console.error("Error reading question file:", error)
    return NextResponse.json(
      { error: "Failed to read question file" },
      { status: 500 }
    )
  }
}

