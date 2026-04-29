import { rawOuraRecovery, rawStravaWorkouts } from "../../data/raw-demo-data";
import { logger } from "../logger";
import { analyzePerformance } from "../analytics/performance-engine";
import { generateAiInsights } from "../insights/insight-engine";
import { normalizeRecovery, normalizeWorkouts } from "../transformers/athlete-normalizer";
import { createDataQualityReport } from "../validation/data-quality";

export function getDemoAthleteIntelligence() {
  const workoutResult = normalizeWorkouts(rawStravaWorkouts);
  const recoveryResult = normalizeRecovery(rawOuraRecovery);
  const analytics = analyzePerformance(workoutResult.workouts, recoveryResult.recovery);
  const qualityReport = createDataQualityReport({
    rawWorkouts: rawStravaWorkouts,
    rawRecovery: rawOuraRecovery,
    workouts: workoutResult.workouts,
    recovery: recoveryResult.recovery,
    transformations: [...workoutResult.logs, ...recoveryResult.logs],
    weeklyMileage: analytics.weeklyMileage,
    previousWeeklyMileage: analytics.previousWeeklyMileage,
  });
  const insights = generateAiInsights(analytics, qualityReport);

  for (const issue of qualityReport.issues) {
    logger.warn("data-quality", issue.message, issue);
  }
  for (const transformation of qualityReport.transformations) {
    logger.info("normalization", transformation.message, transformation);
  }

  return {
    workouts: workoutResult.workouts,
    recovery: recoveryResult.recovery,
    analytics,
    qualityReport,
    insights,
  };
}
