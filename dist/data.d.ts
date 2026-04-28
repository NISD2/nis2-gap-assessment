import { type GapAssessmentData } from "./schema";
/**
 * Source of truth lives in `src/domains.ts` and `src/questions/day-<n>.ts`
 * (TypeScript with full type safety on enums, IDs, and citations). The
 * bundled JSON artefact at `data/gap-assessment.json` is generated from
 * these files via `bun run build:json` and shipped for non-TS consumers.
 *
 * Bump these constants when shipping a release; CI will fail if the
 * generated JSON falls out of sync.
 */
export declare const VERSION = "2.0.1";
export declare const LAST_UPDATED = "2026-04-28";
export declare const gapAssessment: GapAssessmentData;
//# sourceMappingURL=data.d.ts.map