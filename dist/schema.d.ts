import { z } from "zod";
export declare const CRITICALITY: {
    readonly LOW: 0;
    readonly MEDIUM: 1;
    readonly HIGH: 2;
    readonly CRITICAL: 3;
};
export declare const RESPONDENT: {
    readonly CEO: 0;
    readonly IT: 1;
    readonly HR: 2;
    readonly PROCUREMENT: 3;
    readonly ANYONE: 4;
};
export declare const CONSEQUENCE: {
    readonly AUDIT_FINDING: 0;
    readonly OPERATIONAL_RISK: 1;
    readonly FINE: 2;
    readonly PERSONAL_LIABILITY: 3;
};
export declare const TIME_TO_FIX: {
    readonly QUICK_WIN: 0;
    readonly DAYS: 1;
    readonly WEEKS: 2;
    readonly MONTHS: 3;
};
export declare const ANSWER: {
    readonly NA: -1;
    readonly NO: 0;
    readonly PARTIALLY: 1;
    readonly YES: 2;
};
export declare const MATURITY_LEVELS: readonly [{
    readonly min: 0;
    readonly max: 24;
    readonly key: "critical";
}, {
    readonly min: 25;
    readonly max: 49;
    readonly key: "initial";
}, {
    readonly min: 50;
    readonly max: 74;
    readonly key: "developing";
}, {
    readonly min: 75;
    readonly max: 89;
    readonly key: "managed";
}, {
    readonly min: 90;
    readonly max: 100;
    readonly key: "optimized";
}];
export type CriticalityValue = typeof CRITICALITY[keyof typeof CRITICALITY];
export type RespondentValue = typeof RESPONDENT[keyof typeof RESPONDENT];
export type ConsequenceValue = typeof CONSEQUENCE[keyof typeof CONSEQUENCE];
export type TimeToFixValue = typeof TIME_TO_FIX[keyof typeof TIME_TO_FIX];
export type AnswerValue = typeof ANSWER[keyof typeof ANSWER];
export type MaturityKey = typeof MATURITY_LEVELS[number]["key"];
export declare const gapDomainSchema: z.ZodObject<{
    id: z.ZodNumber;
    code: z.ZodString;
    name: z.ZodObject<{
        en: z.ZodString;
        de: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        en: string;
        de: string;
    }, {
        en: string;
        de: string;
    }>;
    description: z.ZodObject<{
        en: z.ZodString;
        de: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        en: string;
        de: string;
    }, {
        en: string;
        de: string;
    }>;
    day: z.ZodUnion<[z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>]>;
}, "strip", z.ZodTypeAny, {
    code: string;
    id: number;
    name: {
        en: string;
        de: string;
    };
    description: {
        en: string;
        de: string;
    };
    day: 1 | 2 | 3 | 4 | 5;
}, {
    code: string;
    id: number;
    name: {
        en: string;
        de: string;
    };
    description: {
        en: string;
        de: string;
    };
    day: 1 | 2 | 3 | 4 | 5;
}>;
export declare const gapQuestionSchema: z.ZodObject<{
    id: z.ZodString;
    domain: z.ZodNumber;
    text: z.ZodObject<{
        en: z.ZodString;
        de: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        en: string;
        de: string;
    }, {
        en: string;
        de: string;
    }>;
    plainText: z.ZodObject<{
        en: z.ZodString;
        de: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        en: string;
        de: string;
    }, {
        en: string;
        de: string;
    }>;
    legalBasis: z.ZodString;
    criticality: z.ZodNativeEnum<{
        readonly LOW: 0;
        readonly MEDIUM: 1;
        readonly HIGH: 2;
        readonly CRITICAL: 3;
    }>;
    respondent: z.ZodNativeEnum<{
        readonly CEO: 0;
        readonly IT: 1;
        readonly HR: 2;
        readonly PROCUREMENT: 3;
        readonly ANYONE: 4;
    }>;
    consequence: z.ZodNativeEnum<{
        readonly AUDIT_FINDING: 0;
        readonly OPERATIONAL_RISK: 1;
        readonly FINE: 2;
        readonly PERSONAL_LIABILITY: 3;
    }>;
    fineExposure: z.ZodBoolean;
    timeToFix: z.ZodNativeEnum<{
        readonly QUICK_WIN: 0;
        readonly DAYS: 1;
        readonly WEEKS: 2;
        readonly MONTHS: 3;
    }>;
    day: z.ZodUnion<[z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>]>;
    dependsOn: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    day: 1 | 2 | 3 | 4 | 5;
    domain: number;
    text: {
        en: string;
        de: string;
    };
    plainText: {
        en: string;
        de: string;
    };
    legalBasis: string;
    criticality: 0 | 1 | 2 | 3;
    respondent: 0 | 1 | 2 | 3 | 4;
    consequence: 0 | 1 | 2 | 3;
    fineExposure: boolean;
    timeToFix: 0 | 1 | 2 | 3;
    dependsOn: string[];
}, {
    id: string;
    day: 1 | 2 | 3 | 4 | 5;
    domain: number;
    text: {
        en: string;
        de: string;
    };
    plainText: {
        en: string;
        de: string;
    };
    legalBasis: string;
    criticality: 0 | 1 | 2 | 3;
    respondent: 0 | 1 | 2 | 3 | 4;
    consequence: 0 | 1 | 2 | 3;
    fineExposure: boolean;
    timeToFix: 0 | 1 | 2 | 3;
    dependsOn: string[];
}>;
export declare const gapAssessmentDataSchema: z.ZodObject<{
    version: z.ZodString;
    lastUpdated: z.ZodString;
    domains: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        code: z.ZodString;
        name: z.ZodObject<{
            en: z.ZodString;
            de: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            en: string;
            de: string;
        }, {
            en: string;
            de: string;
        }>;
        description: z.ZodObject<{
            en: z.ZodString;
            de: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            en: string;
            de: string;
        }, {
            en: string;
            de: string;
        }>;
        day: z.ZodUnion<[z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>]>;
    }, "strip", z.ZodTypeAny, {
        code: string;
        id: number;
        name: {
            en: string;
            de: string;
        };
        description: {
            en: string;
            de: string;
        };
        day: 1 | 2 | 3 | 4 | 5;
    }, {
        code: string;
        id: number;
        name: {
            en: string;
            de: string;
        };
        description: {
            en: string;
            de: string;
        };
        day: 1 | 2 | 3 | 4 | 5;
    }>, "many">;
    questions: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        domain: z.ZodNumber;
        text: z.ZodObject<{
            en: z.ZodString;
            de: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            en: string;
            de: string;
        }, {
            en: string;
            de: string;
        }>;
        plainText: z.ZodObject<{
            en: z.ZodString;
            de: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            en: string;
            de: string;
        }, {
            en: string;
            de: string;
        }>;
        legalBasis: z.ZodString;
        criticality: z.ZodNativeEnum<{
            readonly LOW: 0;
            readonly MEDIUM: 1;
            readonly HIGH: 2;
            readonly CRITICAL: 3;
        }>;
        respondent: z.ZodNativeEnum<{
            readonly CEO: 0;
            readonly IT: 1;
            readonly HR: 2;
            readonly PROCUREMENT: 3;
            readonly ANYONE: 4;
        }>;
        consequence: z.ZodNativeEnum<{
            readonly AUDIT_FINDING: 0;
            readonly OPERATIONAL_RISK: 1;
            readonly FINE: 2;
            readonly PERSONAL_LIABILITY: 3;
        }>;
        fineExposure: z.ZodBoolean;
        timeToFix: z.ZodNativeEnum<{
            readonly QUICK_WIN: 0;
            readonly DAYS: 1;
            readonly WEEKS: 2;
            readonly MONTHS: 3;
        }>;
        day: z.ZodUnion<[z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>, z.ZodLiteral<4>, z.ZodLiteral<5>]>;
        dependsOn: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        day: 1 | 2 | 3 | 4 | 5;
        domain: number;
        text: {
            en: string;
            de: string;
        };
        plainText: {
            en: string;
            de: string;
        };
        legalBasis: string;
        criticality: 0 | 1 | 2 | 3;
        respondent: 0 | 1 | 2 | 3 | 4;
        consequence: 0 | 1 | 2 | 3;
        fineExposure: boolean;
        timeToFix: 0 | 1 | 2 | 3;
        dependsOn: string[];
    }, {
        id: string;
        day: 1 | 2 | 3 | 4 | 5;
        domain: number;
        text: {
            en: string;
            de: string;
        };
        plainText: {
            en: string;
            de: string;
        };
        legalBasis: string;
        criticality: 0 | 1 | 2 | 3;
        respondent: 0 | 1 | 2 | 3 | 4;
        consequence: 0 | 1 | 2 | 3;
        fineExposure: boolean;
        timeToFix: 0 | 1 | 2 | 3;
        dependsOn: string[];
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    version: string;
    lastUpdated: string;
    domains: {
        code: string;
        id: number;
        name: {
            en: string;
            de: string;
        };
        description: {
            en: string;
            de: string;
        };
        day: 1 | 2 | 3 | 4 | 5;
    }[];
    questions: {
        id: string;
        day: 1 | 2 | 3 | 4 | 5;
        domain: number;
        text: {
            en: string;
            de: string;
        };
        plainText: {
            en: string;
            de: string;
        };
        legalBasis: string;
        criticality: 0 | 1 | 2 | 3;
        respondent: 0 | 1 | 2 | 3 | 4;
        consequence: 0 | 1 | 2 | 3;
        fineExposure: boolean;
        timeToFix: 0 | 1 | 2 | 3;
        dependsOn: string[];
    }[];
}, {
    version: string;
    lastUpdated: string;
    domains: {
        code: string;
        id: number;
        name: {
            en: string;
            de: string;
        };
        description: {
            en: string;
            de: string;
        };
        day: 1 | 2 | 3 | 4 | 5;
    }[];
    questions: {
        id: string;
        day: 1 | 2 | 3 | 4 | 5;
        domain: number;
        text: {
            en: string;
            de: string;
        };
        plainText: {
            en: string;
            de: string;
        };
        legalBasis: string;
        criticality: 0 | 1 | 2 | 3;
        respondent: 0 | 1 | 2 | 3 | 4;
        consequence: 0 | 1 | 2 | 3;
        fineExposure: boolean;
        timeToFix: 0 | 1 | 2 | 3;
        dependsOn: string[];
    }[];
}>;
export declare const answerMapSchema: z.ZodRecord<z.ZodString, z.ZodNativeEnum<{
    readonly NA: -1;
    readonly NO: 0;
    readonly PARTIALLY: 1;
    readonly YES: 2;
}>>;
export type GapDomain = z.infer<typeof gapDomainSchema>;
export type GapQuestion = z.infer<typeof gapQuestionSchema>;
export type GapAssessmentData = z.infer<typeof gapAssessmentDataSchema>;
export type AnswerMap = z.infer<typeof answerMapSchema>;
export interface DomainScore {
    domainId: number;
    score: number;
    maxScore: number;
    percentage: number;
    maturity: MaturityKey;
    answeredCount: number;
    totalCount: number;
}
export interface GapItem {
    questionId: string;
    domain: number;
    answer: AnswerValue;
    criticality: CriticalityValue;
    consequence: ConsequenceValue;
    fineExposure: boolean;
    timeToFix: TimeToFixValue;
    gapScore: number;
}
export interface AssessmentScores {
    overall: number;
    domains: DomainScore[];
    gaps: GapItem[];
    totalAnswered: number;
    totalQuestions: number;
}
//# sourceMappingURL=schema.d.ts.map