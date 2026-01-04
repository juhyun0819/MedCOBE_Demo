// MedCOBE 점수 데이터를 직접 import하여 사용
// 이렇게 하면 빌드 시 번들에 포함되어 Vercel에서도 안정적으로 작동

import totalData from './total_medcobe_score.json'
import cardiologyData from './cardiology_medcobe_score.json'
import dermatologyData from './dermatology_medcobe_score.json'
import generalInternalMedicineData from './general_internal_medicine_medcobe_score.json'
import neurologyData from './neurology_medcobe_score.json'
import oncologyData from './oncology_medcobe_score.json'
import ophthalmologyData from './ophthalmology_medcobe_score.json'
import otolaryngologyData from './otolaryngology_medcobe_score.json'

export const medcobeScores: Record<string, { scores: Array<{ modelName: string; score: number }> }> = {
  all: totalData,
  cardiology: cardiologyData,
  dermatology: dermatologyData,
  'general-internal-medicine': generalInternalMedicineData,
  neurology: neurologyData,
  oncology: oncologyData,
  ophthalmology: ophthalmologyData,
  otolaryngology: otolaryngologyData,
}

