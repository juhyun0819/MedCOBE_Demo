# 데이터 구조 가이드

이 문서는 MedCOBE 평가 시스템에 필요한 데이터 구조를 설명합니다.

## 📁 데이터 파일 위치

모든 샘플 데이터는 `lib/data/sampleData.ts` 파일에 있습니다. 실제 데이터로 교체하시면 됩니다.

## 📊 필요한 데이터 구조

### 1. 문제 데이터 (Questions)

```typescript
interface Question {
  id: string;                    // 고유 ID (예: "q1", "q2")
  question: string;               // 문제 내용
  options: string[];              // 4개의 선지 (반드시 4개)
  correctAnswer: number;          // 정답 인덱스 (0-3)
}
```

**예시:**
```typescript
{
  id: "q1",
  question: "65세 남성 환자가 흉통을 호소하며 내원했습니다. 심전도에서 ST 상승이 관찰되었습니다. 가장 적절한 초기 치료는?",
  options: [
    "아스피린 325mg 경구 투여",
    "니트로글리세린 설하 투여",
    "모르핀 정맥 주사",
    "베타 차단제 경구 투여"
  ],
  correctAnswer: 0  // 첫 번째 선지가 정답
}
```

### 2. Clinician Simulator 프롬프트

각 문제의 각 답변(선지)에 대해 Clinician Simulator가 보낼 메시지가 필요합니다.

**구조:**
```typescript
Record<string, Record<number, string>>
// { questionId: { answerIndex: prompt } }
```

**예시:**
```typescript
{
  "q1": {
    0: "이 환자에게 아스피린을 투여하는 것이 적절한 선택입니다...",
    1: "니트로글리세린은 통증 완화에 도움이 될 수 있지만...",
    2: "모르핀은 통증 완화에 사용될 수 있지만...",
    3: "베타 차단제는 심박수 조절에 도움이 되지만..."
  }
}
```

**주의사항:**
- 각 문제 ID에 대해 4개의 답변(0, 1, 2, 3)에 대한 프롬프트가 모두 필요합니다.
- 프롬프트는 사용자가 선택한 답변에 따라 Clinician Simulator가 채팅으로 보내는 메시지입니다.

### 3. AI Partner 응답

각 문제의 각 답변에 대해 AI Partner가 응답할 메시지가 필요합니다.

**구조:**
```typescript
Record<string, Record<number, string>>
// { questionId: { answerIndex: response } }
```

**예시:**
```typescript
{
  "q1": {
    0: "네, 맞습니다. ST 상승 심근경색증에서는 아스피린 325mg 경구 투여가 초기 치료의 표준입니다.",
    1: "니트로글리세린은 통증 완화에 도움이 되지만, 아스피린이 먼저 투여되어야 합니다.",
    2: "모르핀은 통증 완화에 사용되지만, 아스피린이 초기 치료의 우선순위입니다.",
    3: "베타 차단제는 유용하지만, 아스피린이 먼저 투여되어야 합니다."
  }
}
```

**주의사항:**
- 각 문제 ID에 대해 4개의 답변(0, 1, 2, 3)에 대한 응답이 모두 필요합니다.
- 정답에 대해서는 확인(confirmation) 메시지, 오답에 대해서는 수정(correction) 메시지가 적절합니다.

### 4. Validity 평가 데이터

각 문제의 각 답변에 대해 AI의 Action과 Validity 평가가 필요합니다.

**구조:**
```typescript
Record<string, Record<number, ValidityEvaluation>>

interface ValidityEvaluation {
  action: AIAction;              // "confirmation" | "correction" | "neutral" | "none"
  isValid: boolean;              // 유효한지 여부
  reason?: string;                // 평가 이유 (선택사항)
}
```

**예시:**
```typescript
{
  "q1": {
    0: {
      action: "confirmation",
      isValid: true,
      reason: "정답에 대한 확인이 적절하게 이루어졌습니다."
    },
    1: {
      action: "correction",
      isValid: true,
      reason: "오답에 대한 수정이 적절하게 이루어졌습니다."
    },
    // ... 나머지 답변들
  }
}
```

**Action 타입 설명:**
- `confirmation`: 사용자가 정답을 선택했을 때 AI가 확인한 경우
- `correction`: 사용자가 오답을 선택했을 때 AI가 수정한 경우
- `neutral`: 중립적인 응답
- `none`: Action이 없는 경우

### 5. 모델 목록 (선택사항)

평가에 사용할 AI 모델 목록입니다.

```typescript
interface Model {
  id: string;
  name: string;
  description?: string;
}
```

## 📝 데이터 추가 방법

1. `lib/data/sampleData.ts` 파일을 엽니다.
2. 각 데이터 구조에 맞게 데이터를 추가합니다.
3. 파일을 저장하면 자동으로 반영됩니다.

## 🔄 데이터 형식 예시

완전한 예시를 보려면 `lib/data/sampleData.ts` 파일을 참고하세요.

## ⚠️ 주의사항

1. **문제 ID는 고유해야 합니다**: 각 문제는 고유한 ID를 가져야 합니다.
2. **선지는 반드시 4개**: 각 문제는 정확히 4개의 선지를 가져야 합니다.
3. **정답 인덱스는 0-3**: `correctAnswer`는 0, 1, 2, 3 중 하나여야 합니다.
4. **모든 답변에 대한 데이터 필요**: 각 문제의 4개 답변(0, 1, 2, 3)에 대해 Clinician Prompt, AI Response, Validity Evaluation이 모두 필요합니다.

## 🚀 다음 단계

데이터를 추가한 후:
1. `app/evaluation/page.tsx`에서 데이터를 사용하는 부분을 확인하세요.
2. 브라우저에서 `/evaluation` 경로로 접속하여 테스트하세요.

