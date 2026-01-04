import { NextResponse } from "next/server"
import { medcobeScores } from "@/lib/data/medcobe-scores"

// 이 route는 동적이므로 정적 렌더링을 비활성화
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    // URL에서 domain 파라미터 추출
    const { searchParams } = new URL(request.url)
    const domain = searchParams.get("domain") || "all"
    
    // 도메인에 해당하는 데이터 가져오기
    const domainKey = domain === "all" ? "all" : domain
    const data = medcobeScores[domainKey]
    
    if (!data) {
      return NextResponse.json(
        { 
          error: `No data found for domain: ${domain}`,
          availableDomains: Object.keys(medcobeScores)
        },
        { status: 404 }
      )
    }
    
    // 점수를 퍼센트로 변환 (0.2195 -> 21.95)
    const scores = (data.scores || []).map((item: { modelName: string; score: number }) => ({
      modelName: item.modelName,
      score: item.score * 100
    }))
    
    return NextResponse.json({ scores, domain })
  } catch (error) {
    console.error("Error getting MedCOBE scores:", error)
    return NextResponse.json(
      { error: "Failed to get MedCOBE scores" },
      { status: 500 }
    )
  }
}

