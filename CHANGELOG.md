# Changelog

All notable changes to this repository are documented here. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.3.0] — 2026-04-28

### Changed
- README rewritten to lead with what the artefact is (an open data format), not how to use it.
- Test suite trimmed from 22 to 13: removed checks that duplicate Zod's own validation; kept cross-references, semantic invariants, and scoring sanity; added a `dependsOn` cycle-detection test.

## [1.2.0] — 2026-04-28

### Added
- Test suite (`tests/invariants.test.ts`) covering question-ID uniqueness, domain integrity, `dependsOn` reference resolution, day-domain consistency, enum validity, locale completeness, maturity-level coverage, and scoring behaviour.
- Generated JSON Schema artefact at `schema/gap-assessment.schema.json` for non-TS consumers (Python, Go, Excel, etc.) to validate responses without re-deriving rules.
- `CONTRIBUTING.md` with PR checklist, regulatory-change reporting flow, and release process.
- `SECURITY.md` — vulnerability reporting policy.
- Issue and pull-request templates under `.github/`.

### Changed
- CI now runs `bun test` on every push and pull request.
- README restructured with table of contents and a 30-second quickstart.

## [1.1.0] — 2026-04-28

### Changed
- **Source of truth inverted.** TypeScript files in `src/domains.ts` and `src/questions/day-<n>.ts` are now the source; `data/gap-assessment.json` is generated from them via `bun run build:json`. This gives full type safety on enums (`CRITICALITY`, `RESPONDENT`, `CONSEQUENCE`, `TIME_TO_FIX`) and IDs while keeping the published JSON byte-stable for non-TS consumers.
- CI now runs `check:json-in-sync` to catch drift between TS source and the bundled JSON.
- README documents the new source layout and authoring workflow.

### Backwards compatibility
- Public package exports (`gapAssessment`, `computeScores`, schemas, types) are unchanged.
- Consumers reading `data/gap-assessment.json` directly continue to work.

## [1.0.0] — 2026-04-25

### Added
- Initial public release. 116 questions across 15 domains, structured for a 5-day completion cadence.
- Zod schema as runtime-validated source of truth, with enums for criticality, respondent, consequence, time-to-fix, and answer.
- Reference scoring logic at `src/scoring.ts` with maturity-level mapping.
- Anchored to NIS2 Directive (EU) 2022/2555, BSIG, CIR 2024/2690, BSI IT-Grundschutz.
- Drizzle storage reference at `examples/drizzle-storage-reference.ts`.
- Dual licence: MIT for code, CC BY 4.0 for content.
