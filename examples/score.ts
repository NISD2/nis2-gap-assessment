// Run with: bun examples/score.ts

import { gapAssessment, computeScores, ANSWER, type AnswerMap } from "../src";

const answers: AnswerMap = {
  "gap-0-01": ANSWER.YES,
  "gap-0-02": ANSWER.PARTIALLY,
  "gap-0-03": ANSWER.NO,
  "gap-1-01": ANSWER.PARTIALLY,
  "gap-1-02": ANSWER.NA,
  "gap-2-01": ANSWER.YES,
};

const scores = computeScores(gapAssessment.questions, answers);

console.log(`Overall maturity: ${scores.overall}% — ${scores.totalAnswered}/${scores.totalQuestions} answered`);
console.log();
console.log("Per-domain breakdown:");
for (const d of scores.domains) {
  if (d.answeredCount === 0) continue;
  console.log(`  domain ${d.domainId}: ${d.percentage}% (${d.maturity}) — ${d.answeredCount}/${d.totalCount}`);
}

console.log();
console.log("Top 5 gaps (by gapScore):");
for (const g of scores.gaps.slice(0, 5)) {
  const flag = g.fineExposure ? " [fine exposure]" : "";
  console.log(`  ${g.questionId}: gapScore=${g.gapScore.toFixed(1)} (criticality=${g.criticality}, consequence=${g.consequence})${flag}`);
}
