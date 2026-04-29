import type { AnalyticsResult, DataQualityReport, GeneratedInsight } from "../../types/athlete";

function nowLabel(index: number) {
  return index === 0 ? "8:12 AM" : index === 1 ? "7:48 AM" : `${index + 1}h ago`;
}

export function generateAiInsights(
  analytics: AnalyticsResult,
  qualityReport: DataQualityReport,
): GeneratedInsight[] {
  const insights: GeneratedInsight[] = [];

  insights.push({
    title: `Acute training load increased ${Math.max(0, analytics.mileageChangePercent)}% compared to baseline.`,
    category: "Training",
    status: analytics.mileageChangePercent > 20 ? "Watch" : "Positive",
    severity: analytics.mileageChangePercent > 20 ? "Moderate" : "Controlled",
    timestamp: nowLabel(0),
    explanation:
      analytics.mileageChangePercent > 20
        ? "The mileage increase is useful, but a second jump would raise fatigue risk before Wes has enough base volume."
        : "The training increase is controlled and matches the current comeback block.",
    recommendation:
      "Hold this week steady before adding volume. Consistency matters more than a bigger mileage jump right now.",
  });

  insights.push({
    title: `Recovery trend is ${analytics.recoveryTrend}.`,
    category: "Recovery",
    status: analytics.recoveryTrend === "declining" ? "Caution" : "Positive",
    severity: analytics.recoveryTrend === "declining" ? "Elevated" : "Good",
    timestamp: nowLabel(1),
    explanation: `Average sleep is ${analytics.averageSleepScore} and HRV is ${analytics.averageHrv} ms, which supports aerobic training but not reckless intensity.`,
    recommendation:
      analytics.recoveryTrend === "declining"
        ? "Use a recovery-focused day and reassess high-intensity readiness tomorrow."
        : "Use the recovery window for aerobic work and keep intensity optional.",
  });

  insights.push({
    title: "Sleep quality is a key performance driver.",
    category: "Performance",
    status: "Pattern",
    severity: "Strong signal",
    timestamp: nowLabel(2),
    explanation: `Sleep-performance correlation is ${Math.round(analytics.sleepPerformanceCorrelation * 100)}%, with smoother pacing after high sleep-score nights.`,
    recommendation:
      "Place progress checks after sleep scores above 85 instead of forcing them on fixed calendar days.",
  });

  insights.push({
    title: `Fatigue accumulation risk is ${analytics.overtrainingRisk}.`,
    category: "Fatigue",
    status: analytics.overtrainingRisk === "elevated" ? "Caution" : "Watch",
    severity: analytics.overtrainingRisk === "elevated" ? "High" : "Low-moderate",
    timestamp: nowLabel(3),
    explanation: `The fatigue score is ${analytics.fatigueScore}/100 after combining recent load, readiness, and sleep stability.`,
    recommendation:
      "Avoid stacking hard sessions. If legs feel flat, convert the next quality day into strides plus easy mileage.",
  });

  if (qualityReport.issues.length > 0) {
    insights.push({
      title: "Data quality checks changed the confidence of this recommendation.",
      category: "Recovery",
      status: "Watch",
      severity: "System",
      timestamp: nowLabel(4),
      explanation: `${qualityReport.issues.length} data issue(s) were detected and normalized before generating insights.`,
      recommendation:
        "Treat confidence labels as important. More complete recovery data improves recommendation precision.",
    });
  }

  return insights;
}
