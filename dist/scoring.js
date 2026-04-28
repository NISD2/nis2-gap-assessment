import { ANSWER, CONSEQUENCE, MATURITY_LEVELS, } from "./schema";
function getMaturityLevel(percentage) {
    for (const level of MATURITY_LEVELS) {
        if (percentage >= level.min && percentage <= level.max)
            return level.key;
    }
    return "critical";
}
const CONSEQUENCE_MULTIPLIER = {
    [CONSEQUENCE.AUDIT_FINDING]: 1,
    [CONSEQUENCE.OPERATIONAL_RISK]: 1.5,
    [CONSEQUENCE.FINE]: 2,
    [CONSEQUENCE.PERSONAL_LIABILITY]: 3,
};
export function computeDomainScores(questions, answers) {
    const domainIds = [...new Set(questions.map((q) => q.domain))].sort((a, b) => a - b);
    return domainIds.map((domainId) => {
        const domainQuestions = questions.filter((q) => q.domain === domainId);
        const scored = domainQuestions.filter((q) => answers[q.id] !== undefined && answers[q.id] !== ANSWER.NA);
        const score = scored.reduce((sum, q) => sum + (answers[q.id] ?? 0), 0);
        const maxScore = scored.length * 2;
        const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
        return {
            domainId,
            score,
            maxScore,
            percentage,
            maturity: getMaturityLevel(percentage),
            answeredCount: scored.length,
            totalCount: domainQuestions.length,
        };
    });
}
export function computeGaps(questions, answers) {
    return questions
        .filter((q) => {
        const answer = answers[q.id];
        return answer !== undefined && answer !== ANSWER.NA && answer !== ANSWER.YES;
    })
        .map((q) => {
        const answer = answers[q.id] ?? ANSWER.NO;
        const gapScore = (2 - answer) * q.criticality * CONSEQUENCE_MULTIPLIER[q.consequence];
        return {
            questionId: q.id,
            domain: q.domain,
            answer,
            criticality: q.criticality,
            consequence: q.consequence,
            fineExposure: q.fineExposure,
            timeToFix: q.timeToFix,
            gapScore,
        };
    })
        .sort((a, b) => b.gapScore - a.gapScore);
}
export function computeScores(questions, answers) {
    const domains = computeDomainScores(questions, answers);
    const gaps = computeGaps(questions, answers);
    const scoredDomains = domains.filter((d) => d.answeredCount > 0);
    const overall = scoredDomains.length > 0
        ? Math.round(scoredDomains.reduce((sum, d) => sum + d.percentage, 0) / scoredDomains.length)
        : 0;
    const totalAnswered = Object.values(answers).filter((a) => a !== undefined).length;
    return {
        overall,
        domains,
        gaps,
        totalAnswered,
        totalQuestions: questions.length,
    };
}
//# sourceMappingURL=scoring.js.map