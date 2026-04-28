// Combined source-of-truth question list for the NIS2 gap assessment.
// Edit src/questions/day-<n>.ts and run `bun run build:json`
// to update the published JSON artefact at data/gap-assessment.json.
import { day1Questions } from "./day-1";
import { day2Questions } from "./day-2";
import { day3Questions } from "./day-3";
import { day4Questions } from "./day-4";
import { day5Questions } from "./day-5";
export const allQuestions = [
    ...day1Questions,
    ...day2Questions,
    ...day3Questions,
    ...day4Questions,
    ...day5Questions,
];
//# sourceMappingURL=index.js.map