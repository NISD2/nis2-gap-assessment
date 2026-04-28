import raw from "../data/gap-assessment.json";
import { gapAssessmentDataSchema, type GapAssessmentData } from "./schema";

export const gapAssessment: GapAssessmentData = gapAssessmentDataSchema.parse(raw);
