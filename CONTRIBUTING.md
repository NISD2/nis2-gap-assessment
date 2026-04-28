# Contributing

Thanks for taking the time. This repo is small and opinionated. Read this once before opening a PR.

## What we accept

- **Corrections to `legalBasis`** — if you read a directive article, a BSIG paragraph, or a Grundschutz Baustein differently, open a PR with the primary-source citation. Press articles and consultancy whitepapers are not enough on their own.
- **Question phrasing improvements** — both `text` (regulator-style) and `plainText` (CEO-readable) versions need to be consistent. Wording fixes welcome in either.
- **Localised string fixes** — typos, awkward German phrasing, terminology corrections. Native-speaker review preferred.
- **New questions** that close a gap in the 15 domains, with clear legal basis and consistent enum values. Open an issue first to discuss whether the question belongs in the public assessment or in a sector-specific extension.
- **Scoring logic improvements** — but only with explanation of why and a test that proves the new behaviour. The default scoring is intentionally conservative.
- **New translations** (FR, IT, ES, NL, PL, ...) — but only if you can commit to keeping them in sync. A stale translation is worse than no translation. The current locale schema is `{ en, de }`; extending it is a 2.0.0 breaking change.

## What we don't accept

- **AI-generated questions without disclosure.** If you used an LLM to draft questions or translations, say so in the PR. We'll review more carefully.
- **Sector-specific obligations bolted onto the base 15 domains.** KRITIS, healthcare, energy, telecom etc. belong in a separate extension that composes with the base.
- **Drift between the TS source and the bundled JSON.** CI runs `bun run check:json-in-sync` and will fail.
- **`as any` casts, non-null assertions (`!`), or `@ts-ignore`.** Fix the type, narrow the input, or open an issue.

## Local setup

```bash
git clone git@github.com:NISD2/nis2-gap-assessment.git
cd nis2-gap-assessment
bun install --no-save
bun test
bun run typecheck
bun run validate
```

## Editing questions

The TypeScript files in `src/domains.ts` and `src/questions/day-<n>.ts` are the source of truth. Do not edit `data/gap-assessment.json` directly — it is regenerated.

```bash
# 1. Edit the relevant day file
$EDITOR src/questions/day-3.ts

# 2. Regenerate the JSON artefact
bun run build:json

# 3. Verify everything is consistent
bun run typecheck
bun run validate
bun test
```

## PR checklist

Before requesting review:

- [ ] Tests pass (`bun test`)
- [ ] Typecheck passes (`bun run typecheck`)
- [ ] Schema validates (`bun run validate`)
- [ ] JSON artefact is in sync (`bun run check:json-in-sync`)
- [ ] Every new `legalBasis` cites a primary source (BSIG paragraph, NIS2 article, CIR section, Grundschutz Baustein)
- [ ] Every new question has both `en` and `de` for `text` and `plainText`
- [ ] Every new question has correct `domain` and `day` (matching the parent domain's day)
- [ ] `dependsOn` references existing questions only
- [ ] Bumped `VERSION` in `src/data.ts` if shipping (semver: minor for added questions, patch for wording, major for breaking changes)

## Releasing (maintainers only)

```bash
# 1. Bump VERSION + LAST_UPDATED in src/data.ts and "version" in package.json
# 2. Regenerate JSON
bun run build:json

# 3. Commit + tag
git commit -am "vX.Y.Z: <one-line summary>"
git tag vX.Y.Z
git push origin main --tags

# 4. Create release notes
gh release create vX.Y.Z --title "vX.Y.Z — <summary>" --notes "<changelog excerpt>"
```

## Reporting a regulatory change

If BSIG is amended, BSI publishes new Grundschutz Bausteine, or NIS2 itself is updated, open an issue with:

- The publishing source (Bundesgesetzblatt, BSI page, EUR-Lex link)
- The published date
- A short summary of what changed and which questions are affected

We update on a best-effort schedule, faster if customers depend on the change.

## Not legal advice

This repository is structured guidance based on our reading of NIS2, BSIG, CIR 2024/2690, and BSI IT-Grundschutz. It does not constitute legal advice. If you need that, hire counsel.
