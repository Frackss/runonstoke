import type { AnalyticsResult, RecoveryEntry, Workout } from "../../types/athlete";
import { normalizeTimeSeries } from "./time-series";

export function average(values: number[], fallback = 0) {
  const valid = values.filter((value) => Number.isFinite(value));
  if (valid.length === 0) return fallback;
  return valid.reduce((sum, value) => sum + value, 0) / valid.length;
}

export function movingAverage(values: number[], windowSize: number) {
  return values.map((_, index) => {
    const start = Math.max(0, index - windowSize + 1);
    return average(values.slice(start, index + 1));
  });
}

export function calculateWeeklyMileage(workouts: Workout[]) {
  return Number(workouts.reduce((sum, workout) => sum + workout.distanceMiles, 0).toFixed(1));
}

export function calculateRollingTrainingLoad(workouts: Workout[]) {
  const load = workouts.reduce((sum, workout) => {
    const intensityMultiplier =
      workout.workoutType === "quality" ? 1.35 : workout.workoutType === "steady" ? 1.15 : 1;
    return sum + workout.distanceMiles * intensityMultiplier;
  }, 0);
  return Math.round(load * 3.4);
}

export function calculateFatigueScore(workouts: Workout[], recovery: RecoveryEntry[]) {
  workouts = normalizeTimeSeries(workouts, "date");
  recovery = normalizeTimeSeries(recovery, "date");
  const load = calculateRollingTrainingLoad(workouts);
  const readiness = average(recovery.slice(-4).map((entry) => entry.readiness), 75);
  const sleep = average(recovery.slice(-4).map((entry) => entry.sleepScore), 80);
  return Math.round(Math.min(100, Math.max(0, load * 0.8 + (82 - readiness) * 0.9 + (84 - sleep) * 0.45)));
}

export function analyzeRecoveryTrend(recovery: RecoveryEntry[]): "improving" | "stable" | "declining" {
  recovery = normalizeTimeSeries(recovery, "date");
  if (recovery.length < 3) return "stable";
  const midpoint = Math.floor(recovery.length / 2);
  const early = average(recovery.slice(0, midpoint).map((entry) => entry.readiness), 75);
  const late = average(recovery.slice(midpoint).map((entry) => entry.readiness), 75);
  if (late - early > 3) return "improving";
  if (early - late > 3) return "declining";
  return "stable";
}

export function readinessConfidence(recovery: RecoveryEntry[]) {
  recovery = normalizeTimeSeries(recovery, "date");
  if (recovery.length === 0) return 45;
  const completeness = Math.min(1, recovery.length / 7);
  const volatility = Math.max(...recovery.map((entry) => entry.readiness)) - Math.min(...recovery.map((entry) => entry.readiness));
  return Math.round(Math.max(50, Math.min(96, 62 + completeness * 28 - volatility * 0.45)));
}

export function correlateSleepAndPerformance(workouts: Workout[], recovery: RecoveryEntry[]) {
  workouts = normalizeTimeSeries(workouts, "date");
  recovery = normalizeTimeSeries(recovery, "date");
  const recoveryByDate = new Map(recovery.map((entry) => [entry.date, entry]));
  const pairs = workouts
    .map((workout) => {
      const entry = recoveryByDate.get(workout.date);
      return entry ? { sleep: entry.sleepScore, pace: workout.paceSecondsPerMile } : null;
    })
    .filter((pair): pair is { sleep: number; pace: number } => Boolean(pair));

  if (pairs.length < 2) return 0.5;

  const highSleep = pairs.filter((pair) => pair.sleep >= 85).map((pair) => pair.pace);
  const lowSleep = pairs.filter((pair) => pair.sleep < 85).map((pair) => pair.pace);
  if (highSleep.length === 0 || lowSleep.length === 0) return 0.5;

  return Number(Math.min(0.95, Math.max(0.1, (average(lowSleep) - average(highSleep)) / 60)).toFixed(2));
}

export function analyzePerformance(workouts: Workout[], recovery: RecoveryEntry[]): AnalyticsResult {
  workouts = normalizeTimeSeries(workouts, "date");
  recovery = normalizeTimeSeries(recovery, "date");
  const weeklyMileage = calculateWeeklyMileage(workouts);
  const previousWeeklyMileage = 8.2;
  const mileageChangePercent =
    previousWeeklyMileage > 0 ? Math.round(((weeklyMileage - previousWeeklyMileage) / previousWeeklyMileage) * 100) : 0;
  const fatigueScore = calculateFatigueScore(workouts, recovery);

  return {
    weeklyMileage,
    previousWeeklyMileage,
    mileageChangePercent,
    rollingTrainingLoad: calculateRollingTrainingLoad(workouts),
    fatigueScore,
    overtrainingRisk: fatigueScore > 72 ? "elevated" : fatigueScore > 52 ? "moderate" : "low",
    readinessConfidence: readinessConfidence(recovery),
    recoveryTrend: analyzeRecoveryTrend(recovery),
    averageSleepScore: Math.round(average(recovery.map((entry) => entry.sleepScore), 80)),
    averageHrv: Math.round(average(recovery.map((entry) => entry.hrv), 58)),
    averageEasyPaceSeconds: Math.round(average(workouts.map((workout) => workout.paceSecondsPerMile), 570)),
    sleepPerformanceCorrelation: correlateSleepAndPerformance(workouts, recovery),
    duplicateWorkoutCount: 0,
  };
}
