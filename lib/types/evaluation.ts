/**
 * MedCOBE 평가 시스템 타입 정의
 * SOLID 원칙: 단일 책임 원칙에 따라 타입 정의를 분리
 */

// 모델 타입
export type ModelId = string;

export interface Model {
  id: ModelId;
  name: string;
  description?: string;
}

// 문제 및 선지 타입
export interface Question {
  id: string;
  question: string;
  options: string[]; // 4개의 선지
  correctAnswer: number; // 0-3 인덱스
}

// 사용자 응답 타입
export type UserAnswer = number; // 0-3 인덱스

// Clinician Simulator 프롬프트 타입
export interface ClinicianPrompt {
  answerIndex: number; // 사용자가 선택한 답변 인덱스
  prompt: string; // Clinician Simulator가 보낼 메시지
}

// AI Partner 응답 타입
export interface AIPartnerResponse {
  answerIndex: number; // 사용자가 선택한 답변 인덱스
  response: string; // AI Partner의 응답
}

// 사용자 동의/비동의 타입
export type AgreementType = "agree" | "disagree" | "neutral";

// 사용자 최종 답변 타입
export interface FinalUserResponse {
  agreement: AgreementType;
  finalAnswer?: number; // 최종 선택한 답변 (동의하지 않는 경우)
}

// AI Action 타입
export type AIAction = "confirmation" | "correction" | "neutral" | "none";

// Validity 평가 타입
export interface ValidityEvaluation {
  action: AIAction;
  isValid: boolean;
  reason?: string;
}

// MedCOBE Score 타입
export interface MedCOBEScore {
  recallOfConfirmation: number; // 0-1 사이 값
  recallOfCorrection: number; // 0-1 사이 값
  overallScore: number; // 평균 또는 가중 평균
}

// 평가 세션 전체 데이터 타입
export interface EvaluationSession {
  question: Question;
  selectedModel: ModelId;
  userAnswer: UserAnswer;
  clinicianPrompt: ClinicianPrompt;
  aiPartnerResponse: AIPartnerResponse;
  userAgreement: AgreementType;
  finalUserResponse?: FinalUserResponse;
  aiAction: AIAction;
  validityEvaluation: ValidityEvaluation;
  medcobeScore: MedCOBEScore;
}

// 평가 단계 타입
export type EvaluationStep =
  | "question" // 문제 표시 및 모델 선택
  | "answer" // 선지 선택
  | "chat" // 채팅 인터페이스 (Clinician Simulator)
  | "aiResponse" // AI Partner 응답
  | "agreement" // 사용자 동의/비동의
  | "finalAnswer" // 사용자 최종 답변
  | "evaluation" // Action 및 Validity 평가
  | "score"; // MedCOBE Score 표시

