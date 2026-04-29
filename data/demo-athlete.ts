import { getDemoAthleteIntelligence } from "@/lib/ingestion/athlete-ingestion";
import {
  normalizeDaySeries,
  normalizeTimeSeries,
  normalizeWeeklySeries,
} from "@/lib/analytics/time-series";
import type { Workout } from "@/types/athlete";

const intelligence = getDemoAthleteIntelligence();
const { analytics, qualityReport } = intelligence;
const displayWorkouts = normalizeTimeSeries(
  intelligence.workouts.filter((workout) => workout.distanceMiles > 0),
  "date",
);
const latestRecovery = intelligence.recovery.at(-1);

function secondsToPace(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.round(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${remainder}`;
}

function labelDate(date: string) {
  if (date === "2026-04-28") return "Today";
  const labels: Record<string, string> = {
    "2026-04-27": "Yesterday",
    "2026-04-25": "Sat",
    "2026-04-24": "Fri",
    "2026-04-22": "Wed",
  };
  return labels[date] ?? date.slice(5);
}

function dayName(date: string) {
  return new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: "UTC" }).format(
    new Date(`${date}T00:00:00Z`),
  );
}

function workoutQuality(workout: Workout) {
  const typeBoost = workout.workoutType === "quality" ? 18 : workout.workoutType === "steady" ? 10 : 0;
  return Math.round(Math.min(100, workout.distanceMiles * 10 + typeBoost + 14));
}

const mileageByDay = new Map(displayWorkouts.map((workout) => [dayName(workout.date), workout]));

export const demoAthlete = {
  name: "Wes Fairfax",
  firstName: "Wes",
  initials: "WF",
  age: 25,
  team: "Independent Endurance",
  location: "Raleigh, NC",
  focus: "5K comeback block",
  goal: "Sub-25 5K",
  weeklyMileage: analytics.weeklyMileage,
  readiness: latestRecovery?.readiness ?? 76,
  status: analytics.overtrainingRisk === "elevated" ? "Fatigue watch" : "Building safely",
  bio: "Young adult runner rebuilding consistency with a recovery-first plan, short aerobic runs, and controlled 5K-specific workouts.",
  currentBlock: "Base rebuild · Week 3 of 8",
  recommendation:
    analytics.overtrainingRisk === "elevated"
      ? "Use a recovery day. The analytics engine detected elevated fatigue and recommends delaying intensity."
      : "Keep today aerobic. Your sleep and HRV support training, but the mileage base is still developing, so stack consistency before intensity.",
  preferredDistances: ["5K", "10K", "Road mile"],
  readinessBaseline: {
    readiness: 76,
    hrv: 58,
    restingHeartRate: 49,
    sleepScore: 84,
  },
};

export const athleteSystem = intelligence;
export const athleteDataQualityReport = qualityReport;
export const athleteAnalytics = analytics;

export const notifications = [
  {
    title: "Mileage guardrail",
    detail: `Acute mileage is ${analytics.mileageChangePercent}% versus baseline; hold volume steady before the next jump.`,
    tone: analytics.mileageChangePercent > 20 ? "amber" : "emerald",
  },
  {
    title: "Goal pace marker",
    detail: "Sub-25 requires 8:02/mi. Current steady pace is trending closer.",
    tone: "cyan",
  },
];

export const recoveryCards = [
  {
    title: "Sleep",
    value: String(latestRecovery?.sleepScore ?? 80),
    unit: "score",
    detail: `${(latestRecovery?.sleepHours ?? 7.2).toFixed(1)}h asleep`,
    progress: latestRecovery?.sleepScore ?? 80,
    accent: "from-indigo-300 to-cyan-300",
  },
  {
    title: "HRV",
    value: String(latestRecovery?.hrv ?? 58),
    unit: "ms",
    detail: `${analytics.averageHrv - demoAthlete.readinessBaseline.hrv >= 0 ? "+" : ""}${analytics.averageHrv - demoAthlete.readinessBaseline.hrv} vs baseline`,
    progress: Math.min(100, Math.round(((latestRecovery?.hrv ?? 58) / 85) * 100)),
    accent: "from-emerald-300 to-lime-200",
  },
  {
    title: "Recovery",
    value: String(latestRecovery?.readiness ?? 76),
    unit: "%",
    detail: `${analytics.recoveryTrend} trend`,
    progress: latestRecovery?.readiness ?? 76,
    accent: "from-cyan-300 to-sky-300",
  },
] as const;

export const summaryStats = [
  {
    label: "Weekly mileage",
    value: analytics.weeklyMileage.toFixed(1),
    unit: "mi",
    delta: `${analytics.mileageChangePercent >= 0 ? "+" : ""}${analytics.mileageChangePercent}%`,
    detail: `${displayWorkouts.length} valid runs`,
    tone: "emerald",
  },
  {
    label: "Avg easy pace",
    value: secondsToPace(analytics.averageEasyPaceSeconds),
    unit: "/mi",
    delta: "-14s",
    detail: "normalized pace",
    tone: "cyan",
  },
  {
    label: "Fatigue score",
    value: String(analytics.fatigueScore),
    unit: "/100",
    delta: analytics.overtrainingRisk,
    detail: "load + recovery",
    tone: "amber",
  },
] as const;

export const weeklyMileage = normalizeDaySeries(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => {
  const workout = mileageByDay.get(day);
  return {
    day,
    miles: workout?.distanceMiles ?? 0,
    quality: workout ? workoutQuality(workout) : 10,
  };
}));

export const readinessTrend = normalizeTimeSeries(intelligence.recovery.map((entry) => ({
  date: entry.date,
  day: entry.date.slice(5),
  readiness: entry.readiness,
  hrv: entry.hrv,
})), "date").map(({ day, readiness, hrv }) => ({ day, readiness, hrv }));

export const sleepTrend = normalizeTimeSeries(intelligence.recovery.map((entry) => ({
  date: entry.date,
  day: entry.date.slice(5),
  sleep: entry.sleepScore,
  duration: entry.sleepHours,
})), "date").map(({ day, sleep, duration }) => ({ day, sleep, duration }));

export const trainingLoadTrend = normalizeWeeklySeries([
  { week: "W-5", load: 20, strain: 24 },
  { week: "W-4", load: 22, strain: 27 },
  { week: "W-3", load: 26, strain: 31 },
  { week: "W-2", load: analytics.previousWeeklyMileage * 3.4, strain: 34 },
  { week: "W-1", load: Math.max(20, analytics.rollingTrainingLoad - 5), strain: analytics.fatigueScore - 4 },
  { week: "Now", load: analytics.rollingTrainingLoad, strain: analytics.fatigueScore },
]);

export const fatigueTrend = trainingLoadTrend.map((entry) => ({
  week: entry.week,
  fatigue: Math.max(0, Math.round(entry.strain)),
}));

export const paceTrend = normalizeWeeklySeries([
  { week: "W-5", easy: 9.62, goal: 8.03 },
  { week: "W-4", easy: 9.48, goal: 8.03 },
  { week: "W-3", easy: 9.4, goal: 8.03 },
  { week: "W-2", easy: 9.31, goal: 8.03 },
  { week: "W-1", easy: 9.24, goal: 8.03 },
  { week: "Now", easy: Number((analytics.averageEasyPaceSeconds / 60).toFixed(2)), goal: 8.03 },
]);

export const workouts = displayWorkouts
  .slice()
  .reverse()
  .map((workout) => ({
    title: workout.title,
    date: labelDate(workout.date),
    distance: `${workout.distanceMiles.toFixed(1)} mi`,
    pace: `${secondsToPace(workout.paceSecondsPerMile)} /mi`,
    effort: workout.effort,
    note:
      workout.workoutType === "quality"
        ? "Light quality safely normalized from Strava data with no next-day recovery penalty."
        : workout.workoutType === "steady"
          ? "Fastest controlled aerobic pace of the block so far."
          : "Kept effort controlled with stable recovery cost.",
  }));

export const weeklySummaries = normalizeWeeklySeries([
  { week: "W-2", miles: 6.4, completed: 76, readiness: 74 },
  { week: "W-1", miles: analytics.previousWeeklyMileage, completed: 82, readiness: 78 },
  { week: "Now", miles: analytics.weeklyMileage, completed: qualityReport.score, readiness: demoAthlete.readiness },
]);

export const personalRecords = [
  { event: "5K", mark: "27:18", date: "Mar 2026" },
  { event: "10K", mark: "58:42", date: "Nov 2025" },
  { event: "Mile", mark: "7:31", date: "Feb 2026" },
];

export const recentImprovements = [
  `Weekly mileage is ${analytics.weeklyMileage.toFixed(1)} mi after normalization.`,
  `Readiness confidence is ${analytics.readinessConfidence}% after data quality checks.`,
  `Sleep score averaged ${analytics.averageSleepScore} across validated Oura-style entries.`,
  "Longest valid run moved from 2.4 mi to 3.2 mi without HR spike.",
];

export const coachInsights = intelligence.insights.map((insight) => insight.explanation);

export const emptyStates = {
  alerts: {
    title: analytics.overtrainingRisk === "elevated" ? "Fatigue risk requires attention" : "No critical recovery alerts",
    detail:
      analytics.overtrainingRisk === "elevated"
        ? "The system recommends reducing intensity until readiness stabilizes."
        : "All current signals support normal training with conservative mileage progression.",
  },
};

export const aiCoachHero = {
  status: analytics.overtrainingRisk === "elevated" ? "Fatigued" : "Productive",
  confidence: analytics.readinessConfidence,
  readinessSummary:
    analytics.overtrainingRisk === "elevated"
      ? "Recovery indicators suggest accumulated fatigue. The safest decision is to reduce intensity."
      : "Wes is recovered enough to train, but the safest performance move is controlled aerobic work rather than intensity.",
  recommendation:
    analytics.overtrainingRisk === "elevated"
      ? "Recovery day recommended. Keep movement light and prioritize sleep before the next quality session."
      : "Easy aerobic session recommended today. Keep the run conversational, add 4 relaxed strides only if legs feel springy after mile two.",
  recoveryAnalysis: `The engine normalized ${qualityReport.transformations.length} data issue(s), then combined HRV, sleep, readiness, and rolling load. Recovery trend is ${analytics.recoveryTrend}.`,
  trainingStatus:
    analytics.overtrainingRisk === "elevated"
      ? "Training is temporarily outpacing recovery capacity."
      : "Building safely toward sub-25 fitness with improving pace and low overtraining risk.",
};

export const todayRecommendation = {
  type: analytics.overtrainingRisk === "elevated" ? "Recovery Day" : "Aerobic Session",
  confidence: analytics.readinessConfidence,
  duration: analytics.overtrainingRisk === "elevated" ? "20-25 min walk/jog" : "28-34 min",
  intensity: analytics.overtrainingRisk === "elevated" ? "Very easy" : "Zone 2",
  reasoning:
    analytics.overtrainingRisk === "elevated"
      ? `Fatigue score is ${analytics.fatigueScore}/100, so the engine is protecting recovery capacity.`
      : "Moderate aerobic work is recommended because recovery is positive, HRV is stable, and recent mileage is still in a careful base-building phase.",
  recoveryContext:
    "High-intensity readiness is likely tomorrow morning if sleep stays above 7h 30m and resting HR remains near baseline.",
};

export const recoveryTimeline = [
  {
    label: "Full recovery estimate",
    value: analytics.overtrainingRisk === "elevated" ? "24 hours" : "16 hours",
    detail: "Estimated from rolling load, readiness trend, and sleep consistency.",
  },
  {
    label: "Intensity readiness",
    value: analytics.recoveryTrend === "declining" ? "36 hours" : "Tomorrow AM",
    detail: "Likely returns if tonight's sleep score lands above 84.",
  },
  {
    label: "Fatigue risk",
    value: analytics.overtrainingRisk,
    detail: "Risk rises if mileage jumps above 12 miles this week.",
  },
];

export const aiInsightFeed = intelligence.insights;

export const performanceCorrelations = [
  {
    metric: "Sleep score",
    finding: "Fastest easy runs follow sleep scores above 82.",
    strength: Math.round(analytics.sleepPerformanceCorrelation * 100),
    detail: "Pace improves when sleep is stable and readiness is not suppressed.",
  },
  {
    metric: "Recovery score",
    finding: "Workout quality drops when recovery falls below 75.",
    strength: 81,
    detail: "Low recovery days show higher effort at similar paces.",
  },
  {
    metric: "HRV",
    finding: "HRV above baseline predicts smoother aerobic control.",
    strength: 76,
    detail: "Cardiac drift stays lower on high-HRV mornings.",
  },
];

export const correlationChartData = [
  { label: "Sleep <80", pace: 9.58, quality: 58, recovery: 70 },
  { label: "Sleep 80-84", pace: 9.34, quality: 72, recovery: 78 },
  { label: "Sleep 85+", pace: Number((analytics.averageEasyPaceSeconds / 60).toFixed(2)), quality: 86, recovery: 84 },
];

export const aiChatExamples = [
  {
    question: "Can I train hard tomorrow?",
    answer:
      analytics.overtrainingRisk === "elevated"
        ? "Not yet. The fatigue model says intensity should wait until readiness stabilizes and resting HR normalizes."
        : "Probably, but make it conditional. If your sleep score stays above 84 and resting HR is normal, a light threshold session is reasonable.",
  },
  {
    question: "Why was my workout harder today?",
    answer:
      "The likely cause is accumulated strain plus sleep variability. Your pace was not the issue; the same pace required more recovery cost.",
  },
  {
    question: "Am I overtraining?",
    answer:
      analytics.overtrainingRisk === "elevated"
        ? "You are not in a chronic overtraining pattern, but acute fatigue risk is elevated. Reduce intensity now."
        : "No clear overtraining signal right now. The bigger risk is increasing mileage too quickly while your base is still small.",
  },
  {
    question: "Why is my recovery dropping?",
    answer:
      "Recovery drops when intensity and sleep debt overlap. For Wes, the pattern is most visible after steady efforts followed by sleep below 7 hours.",
  },
];
