// Explicit re-exports — `export *` was dropping type-only re-exports
// through some downstream typecheckers (Turbopack on Vercel with
// isolatedModules) and consumers ended up with `unknown` for properties
// like `question.criticality`. Listing the symbols explicitly avoids
// the ambiguity.

export {
  CRITICALITY,
  RESPONDENT,
  CONSEQUENCE,
  TIME_TO_FIX,
  ANSWER,
  MATURITY_LEVELS,
  gapDomainSchema,
  gapQuestionSchema,
  gapAssessmentDataSchema,
  answerMapSchema,
} from "./schema";

export type {
  CriticalityValue,
  RespondentValue,
  ConsequenceValue,
  TimeToFixValue,
  AnswerValue,
  MaturityKey,
  GapDomain,
  GapQuestion,
  GapAssessmentData,
  AnswerMap,
  DomainScore,
  GapItem,
  AssessmentScores,
} from "./schema";

export { computeDomainScores, computeGaps, computeScores } from "./scoring";

export { gapAssessment } from "./data";
