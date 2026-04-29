import assert from "node:assert/strict";
import test from "node:test";

import {
  analyzePerformance,
  calculateFatigueScore,
  calculateWeeklyMileage,
  movingAverage,
} from "../lib/analytics/performance-engine";
import type { RecoveryEntry, Workout } from "../types/athlete";

const workouts: Workout[] = [
  {
    id: "a",
    source: "strava",
    title: "Easy",
    date: "2026-04-27",
    distanceMiles: 3,
    paceSecondsPerMile: 560,
    durationMinutes: 28,
    effort: "Easy",
    averageHeartRate: 140,
    workoutType: "easy",
  },
  {
    id: "b",
    source: "strava",
    title: "Steady",
    date: "2026-04-28",
    distanceMiles: 4,
    paceSecondsPerMile: 520,
    durationMinutes: 35,
    effort: "Steady",
    averageHeartRate: 152,
    workoutType: "steady",
  },
];

const recovery: RecoveryEntry[] = [
  { date: "2026-04-27", readiness: 80, sleepScore: 86, sleepHours: 7.7, hrv: 61, restingHeartRate: 49 },
  { date: "2026-04-28", readiness: 84, sleepScore: 89, sleepHours: 8, hrv: 65, restingHeartRate: 48 },
];

test("calculates weekly mileage from normalized workouts", () => {
  assert.equal(calculateWeeklyMileage(workouts), 7);
});

test("moving averages handle small datasets", () => {
  assert.deepEqual(movingAverage([2, 4, 6], 2), [2, 3, 5]);
});

test("fatigue score remains bounded", () => {
  const score = calculateFatigueScore(workouts, recovery);
  assert.ok(score >= 0);
  assert.ok(score <= 100);
});

test("performance analysis generates readiness confidence", () => {
  const result = analyzePerformance(workouts, recovery);
  assert.ok(result.readinessConfidence >= 50);
  assert.equal(result.recoveryTrend, "stable");
});
