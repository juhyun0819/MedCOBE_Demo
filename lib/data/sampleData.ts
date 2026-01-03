/**
 * 샘플 데이터
 * 실제 데이터는 나중에 추가될 예정
 */

import type {
  Model,
  Question,
  ClinicianPrompt,
  AIPartnerResponse,
  ValidityEvaluation,
} from "@/lib/types/evaluation";

// 샘플 모델 목록
export const SAMPLE_MODELS: Model[] = [
  { id: "gpt-4", name: "GPT-4", description: "OpenAI GPT-4" },
  { id: "gpt-3.5", name: "GPT-3.5 Turbo", description: "OpenAI GPT-3.5 Turbo" },
  { id: "claude-3", name: "Claude 3", description: "Anthropic Claude 3" },
  { id: "gemini-pro", name: "Gemini Pro", description: "Google Gemini Pro" },
];

// 샘플 문제 (실제 데이터로 교체 필요)
export const SAMPLE_QUESTIONS: Question[] = [
  {
    id: "q1",
    question: "65세 남성 환자가 흉통을 호소하며 내원했습니다. 심전도에서 ST 상승이 관찰되었습니다. 가장 적절한 초기 치료는?",
    options: [
      "아스피린 325mg 경구 투여",
      "니트로글리세린 설하 투여",
      "모르핀 정맥 주사",
      "베타 차단제 경구 투여",
    ],
    correctAnswer: 0,
  },
  {
    id: "q2",
    question: "당뇨병 환자에서 가장 흔한 합병증은?",
    options: [
      "신증",
      "망막병증",
      "신경병증",
      "심혈관 질환",
    ],
    correctAnswer: 3,
  },
];

// Clinician Simulator 프롬프트 (각 답변별로)
// 실제 데이터 구조: { questionId: { answerIndex: prompt } }
export const CLINICIAN_PROMPTS: Record<string, Record<number, string>> = {
  q1: {
    0: "이 환자에게 아스피린을 투여하는 것이 적절한 선택입니다. ST 상승 심근경색증의 초기 치료로 아스피린은 필수적입니다.",
    1: "니트로글리세린은 통증 완화에 도움이 될 수 있지만, 초기 치료의 우선순위는 아닙니다.",
    2: "모르핀은 통증 완화에 사용될 수 있지만, 초기 치료의 첫 번째 선택은 아닙니다.",
    3: "베타 차단제는 심박수 조절에 도움이 되지만, 급성기 초기 치료의 우선순위는 아닙니다.",
  },
  q2: {
    0: "신증은 당뇨병의 중요한 합병증이지만, 가장 흔한 것은 아닙니다.",
    1: "망막병증도 흔한 합병증이지만, 가장 흔한 것은 아닙니다.",
    2: "신경병증은 흔한 합병증이지만, 가장 흔한 것은 아닙니다.",
    3: "심혈관 질환이 당뇨병 환자에서 가장 흔하고 치명적인 합병증입니다.",
  },
};

// AI Partner 응답 (각 답변별로)
export const AI_PARTNER_RESPONSES: Record<string, Record<number, string>> = {
  q1: {
    0: "네, 맞습니다. ST 상승 심근경색증에서는 아스피린 325mg 경구 투여가 초기 치료의 표준입니다.",
    1: "니트로글리세린은 통증 완화에 도움이 되지만, 아스피린이 먼저 투여되어야 합니다.",
    2: "모르핀은 통증 완화에 사용되지만, 아스피린이 초기 치료의 우선순위입니다.",
    3: "베타 차단제는 유용하지만, 아스피린이 먼저 투여되어야 합니다.",
  },
  q2: {
    0: "신증은 중요하지만, 당뇨병 환자에서 가장 흔한 합병증은 심혈관 질환입니다.",
    1: "망막병증도 흔하지만, 가장 흔한 합병증은 심혈관 질환입니다.",
    2: "신경병증도 흔하지만, 가장 흔한 합병증은 심혈관 질환입니다.",
    3: "맞습니다. 당뇨병 환자에서 심혈관 질환이 가장 흔하고 치명적인 합병증입니다.",
  },
};

// Validity 평가 샘플 데이터
export const VALIDITY_EVALUATIONS: Record<string, Record<number, ValidityEvaluation>> = {
  q1: {
    0: {
      action: "confirmation",
      isValid: true,
      reason: "정답에 대한 확인이 적절하게 이루어졌습니다.",
    },
    1: {
      action: "correction",
      isValid: true,
      reason: "오답에 대한 수정이 적절하게 이루어졌습니다.",
    },
    2: {
      action: "correction",
      isValid: true,
      reason: "오답에 대한 수정이 적절하게 이루어졌습니다.",
    },
    3: {
      action: "correction",
      isValid: true,
      reason: "오답에 대한 수정이 적절하게 이루어졌습니다.",
    },
  },
  q2: {
    0: {
      action: "correction",
      isValid: true,
      reason: "오답에 대한 수정이 적절하게 이루어졌습니다.",
    },
    1: {
      action: "correction",
      isValid: true,
      reason: "오답에 대한 수정이 적절하게 이루어졌습니다.",
    },
    2: {
      action: "correction",
      isValid: true,
      reason: "오답에 대한 수정이 적절하게 이루어졌습니다.",
    },
    3: {
      action: "confirmation",
      isValid: true,
      reason: "정답에 대한 확인이 적절하게 이루어졌습니다.",
    },
  },
};

