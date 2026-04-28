import { z } from "zod";

export const CRITICALITY = {
  LOW: 0,
  MEDIUM: 1,
  HIGH: 2,
  CRITICAL: 3,
} as const;

export const RESPONDENT = {
  CEO: 0,
  IT: 1,
  HR: 2,
  PROCUREMENT: 3,
  ANYONE: 4,
} as const;

export const CONSEQUENCE = {
  AUDIT_FINDING: 0,
  OPERATIONAL_RISK: 1,
  FINE: 2,
  PERSONAL_LIABILITY: 3,
} as const;

export const TIME_TO_FIX = {
  QUICK_WIN: 0,
  DAYS: 1,
  WEEKS: 2,
  MONTHS: 3,
} as const;

export const ANSWER = {
  NA: -1,
  NO: 0,
  PARTIALLY: 1,
  YES: 2,
} as const;

export const MATURITY_LEVELS = [
  { min: 0, max: 24, key: "critical" },
  { min: 25, max: 49, key: "initial" },
  { min: 50, max: 74, key: "developing" },
  { min: 75, max: 89, key: "managed" },
  { min: 90, max: 100, key: "optimized" },
] as const;

export type CriticalityValue = typeof CRITICALITY[keyof typeof CRITICALITY];
export type RespondentValue = typeof RESPONDENT[keyof typeof RESPONDENT];
export type ConsequenceValue = typeof CONSEQUENCE[keyof typeof CONSEQUENCE];
export type TimeToFixValue = typeof TIME_TO_FIX[keyof typeof TIME_TO_FIX];
export type AnswerValue = typeof ANSWER[keyof typeof ANSWER];
export type MaturityKey = typeof MATURITY_LEVELS[number]["key"];

const localisedString = z.object({
  en: z.string().min(1),
  de: z.string().min(1),
});

// Schemas use explicit literal unions instead of z.nativeEnum so the
// inferred types survive .d.ts emission deterministically. Some
// downstream typecheckers (Turbopack in particular) struggle to follow
// z.nativeEnum's inferred narrow union through compiled type
// declarations, leaving consumer-side properties typed as `unknown`.

const dayEnum = z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]);
const domainIdEnum = z.number().int().min(0).max(14);
const criticalityEnum = z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]);
const respondentEnum = z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4)]);
const consequenceEnum = z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]);
const timeToFixEnum = z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]);
const answerEnum = z.union([z.literal(-1), z.literal(0), z.literal(1), z.literal(2)]);

export const gapDomainSchema = z.object({
  id: domainIdEnum,
  code: z.string().min(2).max(8),
  name: localisedString,
  description: localisedString,
  day: dayEnum,
});

export const gapQuestionSchema = z.object({
  id: z.string().min(1),
  domain: domainIdEnum,
  text: localisedString,
  plainText: localisedString,
  legalBasis: z.string().min(1),
  criticality: criticalityEnum,
  respondent: respondentEnum,
  consequence: consequenceEnum,
  fineExposure: z.boolean(),
  timeToFix: timeToFixEnum,
  day: dayEnum,
  dependsOn: z.array(z.string()),
});

export const gapAssessmentDataSchema = z.object({
  version: z.string().regex(/^\d+\.\d+\.\d+$/, "version must be semver X.Y.Z"),
  lastUpdated: z.string(),
  domains: z.array(gapDomainSchema).length(15),
  questions: z.array(gapQuestionSchema).min(1),
});

export const answerMapSchema = z.record(z.string(), answerEnum);

export type GapDomain = z.infer<typeof gapDomainSchema>;
export type GapQuestion = z.infer<typeof gapQuestionSchema>;
export type GapAssessmentData = z.infer<typeof gapAssessmentDataSchema>;
export type AnswerMap = z.infer<typeof answerMapSchema>;

export interface DomainScore {
  domainId: number;
  score: number;
  maxScore: number;
  percentage: number;
  maturity: MaturityKey;
  answeredCount: number;
  totalCount: number;
}

export interface GapItem {
  questionId: string;
  domain: number;
  answer: AnswerValue;
  criticality: CriticalityValue;
  consequence: ConsequenceValue;
  fineExposure: boolean;
  timeToFix: TimeToFixValue;
  gapScore: number;
}

export interface AssessmentScores {
  overall: number;
  domains: DomainScore[];
  gaps: GapItem[];
  totalAnswered: number;
  totalQuestions: number;
}
