---
name: Propose a new question
about: A check that should be in the assessment but isn't. Open an issue before a PR.
title: "[question] "
labels: question-proposal
---

**Proposed question ID**
<!-- e.g. gap-5-12 (zero-padded, follows existing pattern) -->

**Domain**
<!-- 0..14 — see src/domains.ts -->

**Day**
<!-- 1..5 — must match the day of the parent domain -->

**Text (regulator-style, en + de)**
<!-- Long, formal, references the obligation. -->

**Plain text (CEO-readable, en + de)**
<!-- Short, no jargon, what it actually means. -->

**Legal basis**
<!-- e.g. §30(2) Nr. 4 BSIG, NIS2 Art. 21(2)(d), CIR 2024/2690 §5.1.5, BSI IT-Grundschutz BES.4.A5 -->

**Enums**
- Criticality: <!-- LOW | MEDIUM | HIGH | CRITICAL -->
- Respondent: <!-- CEO | IT | HR | PROCUREMENT | ANYONE -->
- Consequence: <!-- AUDIT_FINDING | OPERATIONAL_RISK | FINE | PERSONAL_LIABILITY -->
- Time to fix: <!-- QUICK_WIN | DAYS | WEEKS | MONTHS -->
- Fine exposure: <!-- true | false -->
- Depends on: <!-- IDs of prerequisite questions, or [] -->

**Why this belongs in the base assessment and not in a sector extension**
<!-- One paragraph. -->
