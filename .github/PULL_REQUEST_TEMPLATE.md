## What this changes

<!-- One paragraph. What and why, not how. -->

## Type of change

- [ ] Wording / typo fix (patch)
- [ ] Citation correction (patch)
- [ ] Scoring logic change (minor or major depending on output impact)
- [ ] New question (minor)
- [ ] Schema change (major)
- [ ] Tooling / CI / docs

## Checklist

- [ ] Edited the TS source in `src/domains.ts` or `src/questions/day-<n>.ts`, not the JSON
- [ ] Ran `bun run build:json` to regenerate `data/gap-assessment.json`
- [ ] `bun test` passes
- [ ] `bun run typecheck` passes
- [ ] `bun run check:json-in-sync` passes
- [ ] If you added a question: `domain` and `day` are consistent (day matches the parent domain's day)
- [ ] If you added a question: `dependsOn` references existing question IDs only
- [ ] Bumped `VERSION` in `src/data.ts` and `package.json` if shipping
- [ ] Updated `CHANGELOG.md`
- [ ] If you used an LLM to draft content, disclosed in the description

## Primary-source citation

<!-- Required for any change to legalBasis or new question. -->
<!-- Provide a stable URL to the regulation, BSI document, or ENISA publication. -->
