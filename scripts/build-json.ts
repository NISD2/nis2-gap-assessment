/**
 * Regenerate the published artefacts from src/domains.ts + src/questions/*.ts:
 *
 *   data/gap-assessment.json         — the assessment data, validated
 *   schema/gap-assessment.schema.json — JSON Schema for non-TS consumers
 *
 * The TypeScript source files are the source of truth. Run after editing any
 * of them:
 *
 *   bun run build:json
 *
 * CI runs this and fails if either artefact differs from what the TS would
 * generate (drift detection).
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { zodToJsonSchema } from "zod-to-json-schema";
import { gapAssessment } from "../src/data";
import { gapAssessmentDataSchema } from "../src/schema";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");

const dataPath = join(root, "data", "gap-assessment.json");
const dataOut = JSON.stringify(gapAssessment, null, 2) + "\n";
writeFileSync(dataPath, dataOut);

const schemaDir = join(root, "schema");
mkdirSync(schemaDir, { recursive: true });
const schemaPath = join(schemaDir, "gap-assessment.schema.json");
const jsonSchema = zodToJsonSchema(gapAssessmentDataSchema, {
  name: "GapAssessment",
  $refStrategy: "none",
});
const schemaOut = JSON.stringify(jsonSchema, null, 2) + "\n";
writeFileSync(schemaPath, schemaOut);

console.log(
  `OK: ${dataPath} (${gapAssessment.domains.length} domains, ${gapAssessment.questions.length} questions, v${gapAssessment.version})`,
);
console.log(`OK: ${schemaPath}`);
