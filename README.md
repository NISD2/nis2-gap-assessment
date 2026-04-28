# NIS2 Gap Assessment

[![License: MIT + CC BY 4.0](https://img.shields.io/badge/license-MIT%20%2B%20CC%20BY%204.0-blue.svg)](./LICENSE)

**An open NIS2 gap assessment as a typed Zod schema.** 116 questions, 15 domains, 5-day completion structure. Each question is anchored to a specific source — NIS2 Directive (EU) 2022/2555, BSIG (Germany), CIR 2024/2690 (EU), or BSI IT-Grundschutz.

Maintained by [Kardashev Catalyst UG](https://nisd2.eu) — operator of [nisd2.eu](https://nisd2.eu) — and the same schema that powers [nisd2.eu/nis2-gap-assessment](https://nisd2.eu/nis2-gap-assessment).

Source of truth lives in [`src/domains.ts`](./src/domains.ts) and [`src/questions/day-<n>.ts`](./src/questions/) — typed, with full TypeScript autocomplete on enums and IDs. The bundled JSON at [`data/gap-assessment.json`](./data/gap-assessment.json) is generated from these files for non-TS consumers.

---

## Why a schema, not just a JSON file

A JSON-only release is a dead artefact: nobody can validate it without re-deriving the rules, and forks drift silently. The TypeScript source files + Zod schema are alive:

- **TypeScript consumers** import the data directly and get full type safety, autocomplete on enums (`CRITICALITY.HIGH`, `RESPONDENT.CEO`, etc.), and inline IDE hints.
- **Non-TS consumers** read the bundled `data/gap-assessment.json` directly, or generate JSON Schema via [`zod-to-json-schema`](https://github.com/StefanTerdell/zod-to-json-schema) and use it from Python, Go, Rust, regulators' Excel rigs, anywhere.
- **Drizzle / Prisma / Kysely consumers** see `examples/drizzle-storage-reference.ts` for a suggested response-storage layer keyed to our question IDs.
- **Forks stay honest** — the JSON is regenerated from TS via `bun run build:json`; CI fails if it drifts.

### Source layout

```
src/
  schema.ts                Zod schema, enums (CRITICALITY, RESPONDENT, etc.)
  domains.ts               15 domains
  questions/
    day-1.ts               26 questions  (Scoping & Governance)
    day-2.ts               17 questions  (Risk Management)
    day-3.ts               19 questions  (Incident Handling & BCP)
    day-4.ts               26 questions  (Supply Chain, Training, Access, Physical)
    day-5.ts               28 questions  (Dev/Procurement, Effectiveness, Crypto, Comms, Network, Evidence)
    index.ts               combines into allQuestions
  data.ts                  wraps domains + allQuestions, validates against schema
  scoring.ts               reference scoring logic
data/
  gap-assessment.json      GENERATED — do not edit by hand
scripts/
  build-json.ts            regenerates the JSON from TS source
```

### Editing questions

1. Edit the relevant `src/questions/day-<n>.ts` file (TypeScript, autocomplete works on enums).
2. Run `bun run build:json` to regenerate `data/gap-assessment.json`.
3. Run `bun run validate` and `bun run typecheck` to confirm everything is consistent.

CI runs `bun run check:json-in-sync` and fails if the bundled JSON doesn't match what the TS would generate.

---

## Install

```bash
npm install @nisd2/nis2-gap-assessment
# or
bun add @nisd2/nis2-gap-assessment
```

Or pin to a specific commit / tag without npm:

```bash
npm install github:NISD2/nis2-gap-assessment#v1.1.0
```

---

## Usage

### Score a company

```ts
import {
  gapAssessment,
  computeScores,
  ANSWER,
  type AnswerMap,
} from "@nisd2/nis2-gap-assessment";

const answers: AnswerMap = {
  "GOV-1": ANSWER.YES,
  "GOV-2": ANSWER.PARTIALLY,
  "GOV-3": ANSWER.NO,
  // ... continue for as many questions as the company has answered
};

const scores = computeScores(gapAssessment.questions, answers);

console.log(`Overall maturity: ${scores.overall}%`);
console.log(`Top gaps:`, scores.gaps.slice(0, 5));
```

### Validate your own data against the schema

```ts
import { gapAssessmentDataSchema } from "@nisd2/nis2-gap-assessment";

const myData = JSON.parse(fs.readFileSync("./my-fork.json", "utf8"));
const validated = gapAssessmentDataSchema.parse(myData); // throws on drift
```

### Generate JSON Schema for non-TS consumers

```ts
import { zodToJsonSchema } from "zod-to-json-schema";
import { gapAssessmentDataSchema } from "@nisd2/nis2-gap-assessment";

const jsonSchema = zodToJsonSchema(gapAssessmentDataSchema, "GapAssessment");
fs.writeFileSync("./schema.json", JSON.stringify(jsonSchema, null, 2));
```

---

## Schema overview

The full schema is in [`src/schema.ts`](./src/schema.ts). Highlights:

```ts
gapDomainSchema = {
  id:          number       // 0..14
  code:        string       // "GOV", "SUP", ...
  name:        { en, de }   // localised
  description: { en, de }
  day:         1..5         // which day of the 5-day flow
}

gapQuestionSchema = {
  id:           string      // e.g. "GOV-1"
  domain:       0..14
  text:         { en, de }  // formal version with legal-language anchors
  plainText:    { en, de }  // plain-language version
  legalBasis:   string      // e.g. "NIS2 Art. 20(1) / BSIG § 38(1)"
  criticality:  CRITICALITY.LOW | MEDIUM | HIGH | CRITICAL  // 0..3
  respondent:   RESPONDENT.CEO | IT | HR | PROCUREMENT | ANYONE  // 0..4
  consequence:  CONSEQUENCE.AUDIT_FINDING | OPERATIONAL_RISK | FINE | PERSONAL_LIABILITY  // 0..3
  fineExposure: boolean
  timeToFix:    TIME_TO_FIX.QUICK_WIN | DAYS | WEEKS | MONTHS  // 0..3
  day:          1..5
  dependsOn:    string[]    // question IDs that should be answered first
}
```

### Answer values

| Const         | Value | Score weight |
|---------------|------:|-------------:|
| `ANSWER.YES`        | `2`  | 100% |
| `ANSWER.PARTIALLY`  | `1`  | 50%  |
| `ANSWER.NO`         | `0`  | 0%   |
| `ANSWER.NA`         | `-1` | excluded |

### Maturity bands

| Score range | `MaturityKey` |
|------------:|---------------|
| 0 – 24%     | `"critical"` |
| 25 – 49%    | `"initial"` |
| 50 – 74%    | `"developing"` |
| 75 – 89%    | `"managed"` |
| 90 – 100%   | `"optimized"` |

---

## What this is NOT

- **Not legal advice.** Structured guidance based on our reading of the NIS2 Directive, BSIG, CIR 2024/2690, and IT-Grundschutz. Consult qualified counsel.
- **Not a certification.** No regulator has validated this assessment. BSI does not certify NIS2 tools.
- **Not exhaustive.** Sector-specific obligations (KRITIS, energy, telecommunications, etc.) may add requirements.

---

## Contributing

PRs welcome. We are particularly interested in:

- **Corrections to `legalBasis`** — if you read a directive article differently, open a PR with a primary-source citation (EUR-Lex, gesetze-im-internet.de, BSI, ANSSI, etc.). Press articles alone are not sufficient.
- **Additional translations** — French, Italian, Spanish, etc. Extend `localisedString` to `{ en, de, fr, it, es }` (breaking change, target a `2.0.0` release).
- **Sector-specific question sets** — energy, healthcare, telecommunications. Deliver as separate domain sets that compose with the base 15 domains.
- **National transposition deltas** — what differs between BSIG (Germany), Cyberbeveiligingswet (Netherlands), CSCI (France).

For substantial changes please open an issue first.

---

## Versioning

`gap-assessment.json#version` follows semver:

- **Major** — breaking schema change (field added/removed/renamed, enum values changed)
- **Minor** — questions or domains added; existing items unchanged
- **Patch** — wording fixes, clarifications, legal-basis corrections

Older versions remain reachable via git tags.

---

## Related

- **Companion repo:** [NISD2/nis2-supplier-questionnaire](https://github.com/NISD2/nis2-supplier-questionnaire) — open NIS2 supply-chain questionnaire under the same Zod-first model.
- **Live tool:** [nisd2.eu/nis2-gap-assessment](https://nisd2.eu/nis2-gap-assessment) — fill out, score, export PDF.
- **Source legislation:**
  - [Directive (EU) 2022/2555 (NIS2)](https://eur-lex.europa.eu/eli/dir/2022/2555/oj)
  - [Commission Implementing Regulation (EU) 2024/2690](https://eur-lex.europa.eu/eli/reg_impl/2024/2690/oj)
  - [BSIG (German transposition)](https://www.gesetze-im-internet.de/bsig_2009/)
  - [BSI IT-Grundschutz](https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/IT-Grundschutz/it-grundschutz_node.html)

---

## Licence

Dual: **MIT** for code, **CC BY 4.0** for content. See [LICENSE](./LICENSE).

Substantive issues / partnership questions: [contact@nisd2.eu](mailto:contact@nisd2.eu).
