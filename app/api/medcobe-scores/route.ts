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
    
    // 도메인에 따라 JSON 파일 경로 결정
    let fileName: string
    if (domain === "all") {
      fileName = "total_medcobe_score.json"
    } else {
      // 도메인 이름을 파일명 형식으로 변환
      // 예: "ophthalmology" -> "ophthalmology_medcobe_score.json"
      // 예: "general-internal-medicine" -> "general_internal_medicine_medcobe_score.json"
      const domainFileName = domain.replace(/-/g, "_") + "_medcobe_score.json"
      fileName = domainFileName
    }
    
    // 여러 경로 시도 (Vercel 빌드 환경 고려)
    const possiblePaths = [
      path.join(process.cwd(), "lib/data", fileName),
      path.join(process.cwd(), ".next/server/lib/data", fileName),
      path.join(process.cwd(), "public/data", fileName),
    ]
    
    let filePath: string | null = null
    
    // 가능한 경로 중에서 파일 찾기
    for (const possiblePath of possiblePaths) {
      if (fs.existsSync(possiblePath)) {
        filePath = possiblePath
        break
      }
    }
    
    if (!filePath) {
      console.error("JSON file not found for domain:", domain)
      console.error("Tried paths:", possiblePaths)
      return NextResponse.json(
        { 
          error: `JSON file not found for domain: ${domain}`,
          triedPaths: possiblePaths
        },
        { status: 404 }
      )
    }
    
    // JSON 파일 읽기
    const fileContent = fs.readFileSync(filePath, "utf-8")
    const data = JSON.parse(fileContent)
    
    // 점수를 퍼센트로 변환 (0.2195 -> 21.95)
    const scores = (data.scores || []).map((item: { modelName: string; score: number }) => ({
      modelName: item.modelName,
      score: item.score * 100
    }))
    
    return NextResponse.json({ scores, domain })
  } catch (error) {
    console.error("Error reading JSON file:", error)
    return NextResponse.json(
      { error: "Failed to read JSON file" },
      { status: 500 }
    )
  }
}

