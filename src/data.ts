import { gapAssessmentDataSchema, type GapAssessmentData } from "./schema";
import { domains } from "./domains";
import { allQuestions } from "./questions";

/**
 * Source of truth lives in `src/domains.ts` and `src/questions/day-<n>.ts`
 * (TypeScript with full type safety on enums, IDs, and citations). The
 * bundled JSON artefact at `data/gap-assessment.json` is generated from
 * these files via `bun run build:json` and shipped for non-TS consumers.
 *
 * Bump these constants when shipping a release; CI will fail if the
 * generated JSON falls out of sync.
 */
export const VERSION = "1.2.0";
export const LAST_UPDATED = "2026-04-28";

export const gapAssessment: GapAssessmentData = gapAssessmentDataSchema.parse({
  version: VERSION,
  lastUpdated: LAST_UPDATED,
  domains,
  questions: allQuestions,
});
