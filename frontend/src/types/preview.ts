// ✅ src/types/preview.ts
import { ResultInput } from "@/infra/api/resultsApi";

export interface PreviewItem extends ResultInput {
  exercise_name: string;
  maxValue: number;
  maxScore: number;
}
