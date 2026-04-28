import { describe, expect, test } from "bun:test";
import { gapAssessment } from "../src/data";
import {
  CRITICALITY,
  RESPONDENT,
  CONSEQUENCE,
  TIME_TO_FIX,
  ANSWER,
  MATURITY_LEVELS,
} from "../src/schema";
import { computeScores } from "../src/scoring";

describe("schema parses", () => {
  test("loads with no errors", () => {
    expect(gapAssessment.questions.length).toBeGreaterThan(0);
    expect(gapAssessment.domains.length).toBe(15);
    expect(gapAssessment.version).toMatch(/^\d+\.\d+\.\d+$/);
  });
});

describe("domain integrity", () => {
  test("domain IDs are 0..14, contiguous, unique", () => {
    const ids = gapAssessment.domains.map((d) => d.id).sort((a, b) => a - b);
    expect(ids).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
  });

  test("domain codes are unique", () => {
    const codes = gapAssessment.domains.map((d) => d.code);
    expect(new Set(codes).size).toBe(codes.length);
  });

  test("every domain has a day in 1..5", () => {
    for (const domain of gapAssessment.domains) {
      expect([1, 2, 3, 4, 5]).toContain(domain.day);
    }
  });

  test("every domain has at least one question", () => {
    const domainIds = new Set(gapAssessment.questions.map((q) => q.domain));
    for (const domain of gapAssessment.domains) {
      expect(domainIds.has(domain.id)).toBe(true);
    }
  });
});

describe("question IDs", () => {
  test("are unique", () => {
    const ids = gapAssessment.questions.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test("are non-empty strings", () => {
    for (const question of gapAssessment.questions) {
      expect(question.id.trim().length).toBeGreaterThan(0);
    }
  });
});

describe("question references", () => {
  test("every question.domain exists in domains", () => {
    const domainIds = new Set(gapAssessment.domains.map((d) => d.id));
    for (const question of gapAssessment.questions) {
      expect(domainIds.has(question.domain)).toBe(true);
    }
  });

  test("question.day matches the day of its parent domain", () => {
    const domainDayById = new Map(gapAssessment.domains.map((d) => [d.id, d.day]));
    for (const question of gapAssessment.questions) {
      expect(question.day).toBe(domainDayById.get(question.domain));
    }
  });

  test("every dependsOn ID resolves to an existing question", () => {
    const ids = new Set(gapAssessment.questions.map((q) => q.id));
    for (const question of gapAssessment.questions) {
      for (const dep of question.dependsOn) {
        expect(ids.has(dep)).toBe(true);
      }
    }
  });

  test("dependsOn never references the question itself", () => {
    for (const question of gapAssessment.questions) {
      expect(question.dependsOn).not.toContain(question.id);
    }
  });
});

describe("enum values", () => {
  test("every criticality is a known CRITICALITY value", () => {
    const valid = new Set<number>(Object.values(CRITICALITY));
    for (const question of gapAssessment.questions) {
      expect(valid.has(question.criticality)).toBe(true);
    }
  });

  test("every respondent is a known RESPONDENT value", () => {
    const valid = new Set<number>(Object.values(RESPONDENT));
    for (const question of gapAssessment.questions) {
      expect(valid.has(question.respondent)).toBe(true);
    }
  });

  test("every consequence is a known CONSEQUENCE value", () => {
    const valid = new Set<number>(Object.values(CONSEQUENCE));
    for (const question of gapAssessment.questions) {
      expect(valid.has(question.consequence)).toBe(true);
    }
  });

  test("every timeToFix is a known TIME_TO_FIX value", () => {
    const valid = new Set<number>(Object.values(TIME_TO_FIX));
    for (const question of gapAssessment.questions) {
      expect(valid.has(question.timeToFix)).toBe(true);
    }
  });
});

describe("legalBasis", () => {
  test("every question cites a primary source", () => {
    for (const question of gapAssessment.questions) {
      expect(question.legalBasis.trim().length).toBeGreaterThan(0);
    }
  });
});

describe("localised strings", () => {
  test("every text and plainText has en + de", () => {
    for (const question of gapAssessment.questions) {
      expect(question.text.en.trim().length).toBeGreaterThan(0);
      expect(question.text.de.trim().length).toBeGreaterThan(0);
      expect(question.plainText.en.trim().length).toBeGreaterThan(0);
      expect(question.plainText.de.trim().length).toBeGreaterThan(0);
    }
  });

  test("every domain name and description has en + de", () => {
    for (const domain of gapAssessment.domains) {
      expect(domain.name.en.trim().length).toBeGreaterThan(0);
      expect(domain.name.de.trim().length).toBeGreaterThan(0);
      expect(domain.description.en.trim().length).toBeGreaterThan(0);
      expect(domain.description.de.trim().length).toBeGreaterThan(0);
    }
  });
});

describe("maturity levels", () => {
  test("cover the full 0..100 range without gaps or overlap", () => {
    const sorted = [...MATURITY_LEVELS].sort((a, b) => a.min - b.min);
    expect(sorted[0]?.min).toBe(0);
    expect(sorted[sorted.length - 1]?.max).toBe(100);
    for (let i = 1; i < sorted.length; i++) {
      const prev = sorted[i - 1];
      const curr = sorted[i];
      if (!prev || !curr) throw new Error("unreachable");
      expect(curr.min).toBe(prev.max + 1);
    }
  });
});

describe("scoring", () => {
  test("all-yes answers produce a high overall score", () => {
    const allYes: Record<string, (typeof ANSWER)[keyof typeof ANSWER]> = {};
    for (const question of gapAssessment.questions) {
      allYes[question.id] = ANSWER.YES;
    }
    const scores = computeScores(gapAssessment.questions, allYes);
    expect(scores.overall).toBeGreaterThanOrEqual(90);
  });

  test("all-no answers produce a low overall score", () => {
    const allNo: Record<string, (typeof ANSWER)[keyof typeof ANSWER]> = {};
    for (const question of gapAssessment.questions) {
      allNo[question.id] = ANSWER.NO;
    }
    const scores = computeScores(gapAssessment.questions, allNo);
    expect(scores.overall).toBeLessThan(25);
  });

  test("empty answer map produces a defined-but-zero result", () => {
    const scores = computeScores(gapAssessment.questions, {});
    expect(scores.totalAnswered).toBe(0);
    expect(scores.totalQuestions).toBe(gapAssessment.questions.length);
  });
});
