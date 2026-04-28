// Reference Drizzle schema for storing user RESPONSES.
// Question content lives in the Zod schema; this file is just a starting
// point for response persistence. Adapt FK targets and tenant model to your
// stack. The only contract is that questionId matches an id from
// gap-assessment.json.

import { pgTable, uuid, varchar, smallint, timestamp, index } from "drizzle-orm/pg-core";

export const gapAssessmentSession = pgTable(
  "gap_assessment_session",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    companyId: uuid("company_id").notNull(),
    startedBy: uuid("started_by").notNull(),
    startedAt: timestamp("started_at", { withTimezone: true }).defaultNow().notNull(),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    schemaVersion: varchar("schema_version", { length: 16 }).notNull(),
  },
  (table) => [index("idx_gap_session_company").on(table.companyId)],
);

export const gapAssessmentAnswer = pgTable(
  "gap_assessment_answer",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    sessionId: uuid("session_id")
      .notNull()
      .references(() => gapAssessmentSession.id, { onDelete: "cascade" }),
    questionId: varchar("question_id", { length: 16 }).notNull(),
    answer: smallint("answer").notNull(),
    answeredBy: uuid("answered_by").notNull(),
    answeredAt: timestamp("answered_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_gap_answer_session").on(table.sessionId),
    index("idx_gap_answer_question").on(table.questionId),
  ],
);
