/**
 * Regenerate data/gap-assessment.json from src/domains.ts + src/questions/*.ts.
 *
 * The TypeScript source files are the source of truth. This script writes
 * the JSON artefact that ships to non-TS consumers.
 *
 * Run after editing any TS source file:
 *   bun run build:json
 *
 * CI runs this script and fails if the JSON in the working tree doesn't
 * match the generated output (drift detection).
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { gapAssessment } from "../src/data";

const here = dirname(fileURLToPath(import.meta.url));
const outPath = join(here, "..", "data", "gap-assessment.json");

const out = JSON.stringify(gapAssessment, null, 2) + "\n";
writeFileSync(outPath, out);

console.log(
  `OK: wrote ${outPath} (${gapAssessment.domains.length} domains, ${gapAssessment.questions.length} questions, v${gapAssessment.version})`,
);
