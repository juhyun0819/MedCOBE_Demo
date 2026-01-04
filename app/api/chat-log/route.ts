import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

// 이 route는 동적이므로 정적 렌더링을 비활성화
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    // URL에서 domain과 selectedOption 파라미터 추출
    const { searchParams } = new URL(request.url)
    const domain = searchParams.get("domain")
    const selectedOption = searchParams.get("selectedOption")
    const caseId = searchParams.get("caseId")
    
    if (!domain || !selectedOption || !caseId) {
      return NextResponse.json(
        { error: "Missing required parameters: domain, selectedOption, or caseId" },
        { status: 400 }
      )
    }
    
    // 도메인 이름을 파일명 형식으로 변환
    const domainFileName = domain.replace(/-/g, "_") + "_result.json"
    const filePath = path.join(process.cwd(), "lib/data", domainFileName)
    
    // 파일이 존재하는지 확인
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: `Result file not found for domain: ${domain}` },
        { status: 404 }
      )
    }
    
    // JSON 파일 읽기
    const fileContent = fs.readFileSync(filePath, "utf-8").trim()
    
    if (!fileContent || fileContent.length === 0) {
      return NextResponse.json(
        { error: `Result file is empty for domain: ${domain}` },
        { status: 404 }
      )
    }
    
    let resultData
    try {
      resultData = JSON.parse(fileContent)
    } catch (parseError) {
      console.error("JSON parse error:", parseError)
      return NextResponse.json(
        { error: `Invalid JSON format in result file for domain: ${domain}` },
        { status: 500 }
      )
    }
    
    // 첫 번째 모델의 로그를 사용 (또는 특정 모델 선택 가능)
    const firstModelKey = Object.keys(resultData)[0]
    const logs = resultData[firstModelKey]?.logs || []
    
    // case_id와 selected_option이 일치하는 로그 찾기
    // case_id와 selected_option을 문자열로 변환하여 비교
    const matchingLog = logs.find((log: any) => 
      String(log.case_id) === String(caseId) && String(log.selected_option) === String(selectedOption)
    )
    
    if (!matchingLog) {
      // 디버깅을 위한 정보 반환
      const availableLogs = logs.map((log: any) => ({
        case_id: log.case_id,
        selected_option: log.selected_option,
        mode: log.mode
      }))
      
      console.error("No matching log found. Requested:", { caseId, selectedOption })
      console.error("Available logs:", availableLogs)
      
      return NextResponse.json(
        { 
          error: `No matching dialogue found for case_id: ${caseId}, selected_option: ${selectedOption}`,
          availableLogs: availableLogs.slice(0, 5) // 처음 5개만 반환
        },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ 
      dialogue: matchingLog.dialogue || [],
      mode: matchingLog.mode,
      ground_truth: matchingLog.ground_truth,
      selected_option: matchingLog.selected_option
    })
  } catch (error) {
    console.error("Error reading chat log file:", error)
    return NextResponse.json(
      { error: "Failed to read chat log file" },
      { status: 500 }
    )
  }
}

