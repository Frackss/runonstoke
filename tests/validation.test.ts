import assert from "node:assert/strict";
import test from "node:test";

import { normalizeRecovery, normalizeWorkouts } from "../lib/transformers/athlete-normalizer";
import {
  detectDuplicateWorkouts,
  detectMileageSpike,
  validateRawRecovery,
  validateRawWorkout,
} from "../lib/validation/athlete-validation";
import type { RawRecoveryEntry, RawWorkout, Workout } from "../types/athlete";

test("raw workout validation catches malformed activity objects", () => {
  const raw: RawWorkout = { id: "bad", distance: -2, date: "bad-date", pace: "99:99" };
  const issues = validateRawWorkout(raw, 0);
  assert.ok(issues.some((issue) => issue.code === "invalid_distance"));
  assert.ok(issues.some((issue) => issue.code === "invalid_timestamp"));
});

test("raw recovery validation catches missing HRV and sleep data", () => {
  const raw: RawRecoveryEntry = { date: "2026-04-28", readiness: 82 };
  const issues = validateRawRecovery(raw, 0);
  assert.ok(issues.some((issue) => issue.code === "missing_hrv"));
  assert.ok(issues.some((issue) => issue.code === "missing_sleep"));
});

test("normalization converts kilometers and removes duplicate workouts", () => {
  const raw: RawWorkout[] = [
    { id: "a", title: "Run", date: "2026-04-28", distance: 5, distanceUnit: "km", pace: "9:00" },
    { id: "b", title: "Run", date: "2026-04-28", distance: 3.11, distanceUnit: "mi", pace: "9:00" },
  ];
  const result = normalizeWorkouts(raw);
  assert.equal(result.workouts.length, 1);
  assert.ok(result.logs.some((log) => log.code === "km_to_miles"));
});

test("normalization fills missing recovery values", () => {
  const result = normalizeRecovery([{ date: "2026-04-28", readiness: 82 }]);
  assert.equal(result.recovery[0]?.hrv, 58);
  assert.ok(result.logs.some((log) => log.code === "missing_hrv_fallback"));
});

test("duplicate detection identifies normalized duplicates", () => {
  const workout: Workout = {
    id: "a",
    source: "strava",
    title: "Run",
    date: "2026-04-28",
    distanceMiles: 3,
    paceSecondsPerMile: 540,
    durationMinutes: 27,
    effort: "Easy",
    averageHeartRate: null,
    workoutType: "easy",
  };
  assert.equal(detectDuplicateWorkouts([workout, { ...workout, id: "b" }]).length, 1);
});

test("mileage spike detection catches unsafe load jumps", () => {
  const issue = detectMileageSpike(12, 8);
  assert.equal(issue?.code, "mileage_spike");
});
