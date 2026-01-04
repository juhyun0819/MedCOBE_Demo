import { NextResponse } from "next/server"
import * as XLSX from "xlsx"
import fs from "fs"
import path from "path"

// 이 route는 동적이므로 정적 렌더링을 비활성화
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    // URL에서 domain 파라미터 추출
    const { searchParams } = new URL(request.url)
    const domain = searchParams.get("domain") || "all"
    
    // 도메인에 따라 Excel 파일 경로 결정
    let fileName: string
    if (domain === "all") {
      fileName = "total_medcobe_score.xlsx"
    } else {
      // 도메인 이름을 파일명 형식으로 변환
      // 예: "ophthalmology" -> "ophthalmology_medcobe_score.xlsx"
      // 예: "general-internal-medicine" -> "general_internal_medicine_medcobe_score.xlsx"
      const domainFileName = domain.replace(/-/g, "_") + "_medcobe_score.xlsx"
      fileName = domainFileName
    }
    
    // Vercel 환경에서는 process.cwd()가 다를 수 있으므로 여러 경로 시도
    // public 폴더는 빌드에 자동으로 포함되므로 우선 시도
    const possiblePaths = [
      path.join(process.cwd(), "public/data", fileName), // public 폴더 우선
      path.join(process.cwd(), "lib/data", fileName),
      path.join(process.cwd(), ".next/server/lib/data", fileName),
      path.join(process.cwd(), ".next/server/public/data", fileName),
    ]
    
    let filePath: string | null = null
    
    // 가능한 경로 중에서 파일 찾기
    for (const possiblePath of possiblePaths) {
      if (fs.existsSync(possiblePath)) {
        filePath = possiblePath
        console.log("File found at:", filePath)
        break
      }
    }
    
    if (!filePath) {
      console.error("File not found in any of these paths:", possiblePaths)
      console.error("Current working directory:", process.cwd())
      console.error("__dirname equivalent:", process.cwd())
      
      return NextResponse.json(
        { 
          error: `Excel file not found for domain: ${domain}`,
          triedPaths: possiblePaths,
          cwd: process.cwd()
        },
        { status: 404 }
      )
    }
    
    // 파일 읽기
    const fileBuffer = fs.readFileSync(filePath)
    const workbook = XLSX.read(fileBuffer, { type: "buffer" })
    
    // 첫 번째 시트 가져오기
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    
    // JSON으로 변환
    const data = XLSX.utils.sheet_to_json(worksheet)
    
    // 모델 이름과 MedCOBE Score 매핑
    const scores = data.map((row: any) => {
      const modelName = row["Model"]?.toString().trim() || ""
      const score = parseFloat(row["MedCOBE Score"]) || 0
      
      return {
        modelName,
        score: score * 100, // 소수점을 퍼센트로 변환 (0.2195 -> 21.95)
      }
    }).filter((item: any) => item.modelName && !isNaN(item.score))
    
    return NextResponse.json({ scores, domain })
  } catch (error) {
    console.error("Error reading Excel file:", error)
    return NextResponse.json(
      { error: "Failed to read Excel file" },
      { status: 500 }
    )
  }
}

