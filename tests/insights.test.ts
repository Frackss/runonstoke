import assert from "node:assert/strict";
import test from "node:test";

import { generateAiInsights } from "../lib/insights/insight-engine";
import type { AnalyticsResult, DataQualityReport } from "../types/athlete";

const analytics: AnalyticsResult = {
  weeklyMileage: 12,
  previousWeeklyMileage: 8,
  mileageChangePercent: 50,
  rollingTrainingLoad: 48,
  fatigueScore: 74,
  overtrainingRisk: "elevated",
  readinessConfidence: 82,
  recoveryTrend: "declining",
  averageSleepScore: 78,
  averageHrv: 54,
  averageEasyPaceSeconds: 560,
  sleepPerformanceCorrelation: 0.72,
  duplicateWorkoutCount: 0,
};

const report: DataQualityReport = {
  score: 84,
  issues: [{ code: "missing_hrv", severity: "warning", message: "Missing HRV detected." }],
  transformations: [],
  summary: "1 issue detected.",
};

test("insight generation produces contextual runner recommendations", () => {
  const insights = generateAiInsights(analytics, report);
  assert.ok(insights.length >= 4);
  assert.ok(insights.some((insight) => insight.title.includes("Acute training load")));
  assert.ok(insights.some((insight) => insight.category === "Fatigue"));
  assert.ok(insights.every((insight) => insight.recommendation.length > 20));
});
