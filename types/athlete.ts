export type Severity = "info" | "warning" | "critical";

export type RawWorkout = {
  id?: string;
  source?: "strava" | "manual";
  title?: unknown;
  date?: unknown;
  distance?: unknown;
  distanceUnit?: unknown;
  pace?: unknown;
  durationMinutes?: unknown;
  effort?: unknown;
  averageHeartRate?: unknown;
  workoutType?: unknown;
};

export type RawRecoveryEntry = {
  date?: unknown;
  readiness?: unknown;
  sleepScore?: unknown;
  sleepHours?: unknown;
  hrv?: unknown;
  restingHeartRate?: unknown;
};

export type Workout = {
  id: string;
  source: "strava" | "manual";
  title: string;
  date: string;
  distanceMiles: number;
  paceSecondsPerMile: number;
  durationMinutes: number;
  effort: string;
  averageHeartRate: number | null;
  workoutType: "easy" | "steady" | "quality" | "recovery" | "long";
};

export type RecoveryEntry = {
  date: string;
  readiness: number;
  sleepScore: number;
  sleepHours: number;
  hrv: number;
  restingHeartRate: number;
};

export type DataIssue = {
  code: string;
  severity: Severity;
  message: string;
  entity?: string;
};

export type TransformationLog = {
  code: string;
  message: string;
  entity?: string;
};

export type DataQualityReport = {
  score: number;
  issues: DataIssue[];
  transformations: TransformationLog[];
  summary: string;
};

export type AnalyticsResult = {
  weeklyMileage: number;
  previousWeeklyMileage: number;
  mileageChangePercent: number;
  rollingTrainingLoad: number;
  fatigueScore: number;
  overtrainingRisk: "low" | "moderate" | "elevated";
  readinessConfidence: number;
  recoveryTrend: "improving" | "stable" | "declining";
  averageSleepScore: number;
  averageHrv: number;
  averageEasyPaceSeconds: number;
  sleepPerformanceCorrelation: number;
  duplicateWorkoutCount: number;
};

export type GeneratedInsight = {
  title: string;
  category: "Recovery" | "Training" | "Performance" | "Fatigue";
  status: "Positive" | "Watch" | "Pattern" | "Caution";
  severity: string;
  timestamp: string;
  explanation: string;
  recommendation: string;
};
