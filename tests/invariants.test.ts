import { describe, expect, test } from "bun:test";
import { gapAssessment } from "../src/data";
import { ANSWER, MATURITY_LEVELS } from "../src/schema";
import { computeScores } from "../src/scoring";

// These tests guard invariants that the Zod schema cannot express:
// uniqueness, cross-references, semantic content, scoring behaviour.
// Anything Zod already enforces (enum membership, min-length on locales)
// is intentionally not covered here — the parse in src/data.ts would
// fail first.

describe("data loads", () => {
  test("schema parses; shape is non-empty and 15 domains", () => {
    expect(gapAssessment.questions.length).toBeGreaterThan(0);
    expect(gapAssessment.domains.length).toBe(15);
    expect(gapAssessment.version).toMatch(/^\d+\.\d+\.\d+$/);
  });
});

describe("uniqueness", () => {
  test("domain IDs are 0..14, contiguous", () => {
    const ids = gapAssessment.domains.map((d) => d.id).sort((a, b) => a - b);
    expect(ids).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
  });

  test("domain codes are unique", () => {
    const codes = gapAssessment.domains.map((d) => d.code);
    expect(new Set(codes).size).toBe(codes.length);
  });

  test("question IDs are unique", () => {
    const ids = gapAssessment.questions.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("cross-references", () => {
  test("every domain has at least one question", () => {
    const domainIds = new Set(gapAssessment.questions.map((q) => q.domain));
    for (const domain of gapAssessment.domains) {
      expect(domainIds.has(domain.id)).toBe(true);
    }
  });

  test("every question.domain resolves to an existing domain", () => {
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

  test("dependsOn graph has no cycles", () => {
    const graph = new Map<string, readonly string[]>(
      gapAssessment.questions.map((q) => [q.id, q.dependsOn]),
    );
    const visiting = new Set<string>();
    const visited = new Set<string>();

    function visit(id: string, path: string[]): void {
      if (visited.has(id)) return;
      if (visiting.has(id)) {
        throw new Error(`dependsOn cycle: ${[...path, id].join(" -> ")}`);
      }
      visiting.add(id);
      for (const dep of graph.get(id) ?? []) {
        visit(dep, [...path, id]);
      }
      visiting.delete(id);
      visited.add(id);
    }

    for (const id of graph.keys()) {
      expect(() => visit(id, [])).not.toThrow();
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
