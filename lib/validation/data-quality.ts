import type { DataQualityReport, RawRecoveryEntry, RawWorkout, TransformationLog } from "../../types/athlete";
import {
  detectMileageSpike,
  validateNormalizedData,
  validateRawRecovery,
  validateRawWorkout,
} from "./athlete-validation";
import type { RecoveryEntry, Workout } from "../../types/athlete";

export function createDataQualityReport({
  rawWorkouts,
  rawRecovery,
  workouts,
  recovery,
  transformations,
  weeklyMileage,
  previousWeeklyMileage,
}: {
  rawWorkouts: RawWorkout[];
  rawRecovery: RawRecoveryEntry[];
  workouts: Workout[];
  recovery: RecoveryEntry[];
  transformations: TransformationLog[];
  weeklyMileage: number;
  previousWeeklyMileage: number;
}): DataQualityReport {
  const issues = [
    ...rawWorkouts.flatMap((raw, index) => validateRawWorkout(raw, index)),
    ...rawRecovery.flatMap((raw, index) => validateRawRecovery(raw, index)),
    ...validateNormalizedData(workouts, recovery),
  ];
  const spike = detectMileageSpike(weeklyMileage, previousWeeklyMileage);
  if (spike) issues.push(spike);

  const penalty = issues.reduce((score, issue) => {
    if (issue.severity === "critical") return score + 18;
    if (issue.severity === "warning") return score + 8;
    return score + 3;
  }, 0);
  const score = Math.max(35, 100 - penalty);

  return {
    score,
    issues,
    transformations,
    summary:
      issues.length === 0
        ? "Demo athlete data passed validation with no issues."
        : `${issues.length} issue(s) detected; ${transformations.length} transformation(s) applied before analytics.`,
  };
}
