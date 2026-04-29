import type {
  DataIssue,
  RawRecoveryEntry,
  RawWorkout,
  RecoveryEntry,
  Workout,
} from "../../types/athlete";
import { parsePaceToSeconds } from "../transformers/athlete-normalizer";

export function detectDuplicateWorkouts(workouts: Workout[]) {
  const seen = new Set<string>();
  const duplicates: Workout[] = [];

  for (const workout of workouts) {
    const key = `${workout.date}-${workout.title}-${workout.distanceMiles}`;
    if (seen.has(key)) duplicates.push(workout);
    seen.add(key);
  }

  return duplicates;
}

export function validateRawWorkout(raw: RawWorkout, index: number): DataIssue[] {
  const issues: DataIssue[] = [];
  const entity = typeof raw.id === "string" ? raw.id : `raw-workout-${index}`;

  if (!raw.title || typeof raw.title !== "string") {
    issues.push({ code: "missing_workout_title", severity: "warning", message: "Workout title missing.", entity });
  }
  if (raw.distance == null || Number(raw.distance) < 0) {
    issues.push({ code: "invalid_distance", severity: "warning", message: "Workout distance missing or negative.", entity });
  }
  if (raw.date && Number.isNaN(new Date(String(raw.date === "Today" ? "2026-04-28" : raw.date)).getTime())) {
    issues.push({ code: "invalid_timestamp", severity: "warning", message: "Workout timestamp is malformed.", entity });
  }
  if (raw.pace != null) {
    const pace = parsePaceToSeconds(raw.pace);
    if (pace < 270 || pace > 900) {
      issues.push({ code: "pace_outlier", severity: "info", message: "Workout pace is outside expected runner range.", entity });
    }
  }

  return issues;
}

export function validateRawRecovery(raw: RawRecoveryEntry, index: number): DataIssue[] {
  const issues: DataIssue[] = [];
  const entity = `raw-recovery-${index}`;
  const hrv = Number(raw.hrv);
  const readiness = Number(raw.readiness);

  if (raw.hrv == null) {
    issues.push({ code: "missing_hrv", severity: "warning", message: "Missing HRV detected.", entity });
  } else if (Number.isFinite(hrv) && (hrv < 20 || hrv > 150)) {
    issues.push({ code: "hrv_outlier", severity: "warning", message: "Unrealistic HRV value detected.", entity });
  }
  if (raw.sleepScore == null || raw.sleepHours == null) {
    issues.push({ code: "missing_sleep", severity: "warning", message: "Incomplete sleep score or duration detected.", entity });
  }
  if (Number.isFinite(readiness) && (readiness < 0 || readiness > 100)) {
    issues.push({ code: "readiness_outlier", severity: "critical", message: "Readiness value outside 0-100 range.", entity });
  }

  return issues;
}

export function detectMileageSpike(weeklyMileage: number, previousMileage: number): DataIssue | null {
  if (previousMileage <= 0) return null;
  const increase = ((weeklyMileage - previousMileage) / previousMileage) * 100;
  if (increase > 20) {
    return {
      code: "mileage_spike",
      severity: "warning",
      message: `Weekly mileage spike exceeds safe threshold: ${Math.round(increase)}%.`,
      entity: "weekly-mileage",
    };
  }
  return null;
}

export function validateNormalizedData(workouts: Workout[], recovery: RecoveryEntry[]): DataIssue[] {
  const issues: DataIssue[] = [];
  const duplicates = detectDuplicateWorkouts(workouts);

  if (workouts.length === 0) {
    issues.push({ code: "empty_workout_history", severity: "warning", message: "No workout history available." });
  }
  if (recovery.length === 0) {
    issues.push({ code: "empty_recovery_history", severity: "warning", message: "No recovery history available." });
  }
  if (duplicates.length > 0) {
    issues.push({
      code: "duplicate_workouts",
      severity: "warning",
      message: `${duplicates.length} duplicate workout entries found.`,
    });
  }

  for (const workout of workouts) {
    if (workout.distanceMiles > 35) {
      issues.push({
        code: "distance_outlier",
        severity: "warning",
        message: "Extremely high single-run mileage outlier detected.",
        entity: workout.id,
      });
    }
    if (workout.paceSecondsPerMile < 270 || workout.paceSecondsPerMile > 900) {
      issues.push({
        code: "inconsistent_pace",
        severity: "info",
        message: "Inconsistent pace value detected after normalization.",
        entity: workout.id,
      });
    }
  }

  for (const entry of recovery) {
    if (entry.hrv < 20 || entry.hrv > 150) {
      issues.push({
        code: "hrv_outlier",
        severity: "warning",
        message: "Unrealistic HRV value detected after normalization.",
        entity: entry.date,
      });
    }
  }

  return issues;
}
