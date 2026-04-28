import { type GapQuestion, type AnswerMap, type DomainScore, type GapItem, type AssessmentScores } from "./schema";
export declare function computeDomainScores(questions: GapQuestion[], answers: AnswerMap): DomainScore[];
export declare function computeGaps(questions: GapQuestion[], answers: AnswerMap): GapItem[];
export declare function computeScores(questions: GapQuestion[], answers: AnswerMap): AssessmentScores;
//# sourceMappingURL=scoring.d.ts.map