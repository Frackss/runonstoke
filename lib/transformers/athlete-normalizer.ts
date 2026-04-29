import type {
  RawRecoveryEntry,
  RawWorkout,
  RecoveryEntry,
  TransformationLog,
  Workout,
} from "../../types/athlete";
import { normalizeTimeSeries } from "../analytics/time-series";

const FALLBACK_DATE = "2026-04-28";

function toNumber(value: unknown, fallback: number): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value.replace(/[^\d.-]/g, ""));
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function normalizeTimestamp(value: unknown, logs: TransformationLog[], entity?: string) {
  if (typeof value === "string") {
    const normalized = value === "Today" ? FALLBACK_DATE : value;
    const date = new Date(normalized);
    if (!Number.isNaN(date.getTime())) return date.toISOString().slice(0, 10);
  }

  logs.push({
    code: "timestamp_repaired",
    message: "Repaired malformed workout timestamp with fallback demo date.",
    entity,
  });
  return FALLBACK_DATE;
}

export function parsePaceToSeconds(value: unknown, fallback = 570): number {
  if (typeof value === "number" && Number.isFinite(value)) return clamp(value, 240, 1200);
  if (typeof value !== "string") return fallback;

  const [minutes, seconds = "0"] = value.replace("/mi", "").trim().split(":");
  const parsed = Number(minutes) * 60 + Number(seconds);
  return Number.isFinite(parsed) ? clamp(parsed, 240, 1200) : fallback;
}

function normalizeDistanceMiles(
  rawDistance: unknown,
  unit: unknown,
  logs: TransformationLog[],
  entity?: string,
) {
  const distance = Math.max(0, toNumber(rawDistance, 0));
  if (unit === "km" || unit === "kilometers") {
    logs.push({
      code: "km_to_miles",
      message: "Converted kilometers to miles.",
      entity,
    });
    return Number((distance * 0.621371).toFixed(2));
  }
  return Number(distance.toFixed(2));
}

export function normalizeWorkouts(rawWorkouts: RawWorkout[]) {
  const logs: TransformationLog[] = [];
  const seen = new Set<string>();
  const workouts: Workout[] = [];

  for (const [index, raw] of rawWorkouts.entries()) {
    const id = typeof raw.id === "string" && raw.id.trim() ? raw.id : `generated-${index}`;
    const title = typeof raw.title === "string" && raw.title.trim() ? raw.title : "Untitled run";
    const date = normalizeTimestamp(raw.date, logs, id);
    const distanceMiles = normalizeDistanceMiles(raw.distance, raw.distanceUnit, logs, id);
    const paceSecondsPerMile = parsePaceToSeconds(raw.pace);
    const duplicateKey = `${date}-${title}-${distanceMiles}`;

    if (seen.has(duplicateKey)) {
      logs.push({
        code: "duplicate_workout_removed",
        message: "Removed duplicate workout during ingestion.",
        entity: id,
      });
      continue;
    }

    seen.add(duplicateKey);
    workouts.push({
      id,
      source: raw.source === "manual" ? "manual" : "strava",
      title,
      date,
      distanceMiles,
      paceSecondsPerMile,
      durationMinutes: Math.max(1, toNumber(raw.durationMinutes, (distanceMiles * paceSecondsPerMile) / 60)),
      effort: typeof raw.effort === "string" ? raw.effort : "Easy",
      averageHeartRate:
        raw.averageHeartRate == null ? null : clamp(toNumber(raw.averageHeartRate, 145), 80, 220),
      workoutType:
        raw.workoutType === "quality" ||
        raw.workoutType === "recovery" ||
        raw.workoutType === "steady" ||
        raw.workoutType === "long"
          ? raw.workoutType
          : "easy",
    });
  }

  return { workouts: normalizeTimeSeries(workouts, "date"), logs };
}

export function normalizeRecovery(rawRecovery: RawRecoveryEntry[]) {
  const logs: TransformationLog[] = [];
  const recovery: RecoveryEntry[] = [];

  for (const [index, raw] of rawRecovery.entries()) {
    const entity = `recovery-${index}`;
    const date = normalizeTimestamp(raw.date, logs, entity);
    const readiness = clamp(toNumber(raw.readiness, 75), 0, 100);
    const sleepScore = clamp(toNumber(raw.sleepScore, 80), 0, 100);
    const sleepHours = clamp(toNumber(raw.sleepHours, 7.2), 0, 14);
    const hrv = clamp(toNumber(raw.hrv, 58), 15, 180);
    const restingHeartRate = clamp(toNumber(raw.restingHeartRate, 50), 30, 110);

    if (raw.hrv == null) {
      logs.push({
        code: "missing_hrv_fallback",
        message: "Missing HRV filled with athlete baseline fallback.",
        entity,
      });
    }
    if (raw.sleepScore == null || raw.sleepHours == null) {
      logs.push({
        code: "incomplete_sleep_fallback",
        message: "Incomplete sleep data normalized with safe fallback values.",
        entity,
      });
    }

    recovery.push({ date, readiness, sleepScore, sleepHours, hrv, restingHeartRate });
  }

  return { recovery: normalizeTimeSeries(recovery, "date"), logs };
}
