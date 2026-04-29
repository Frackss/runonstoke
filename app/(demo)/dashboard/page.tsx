import {
  Activity,
  Brain,
  ChevronRight,
  Footprints,
  HeartPulse,
  Moon,
  Zap,
} from "lucide-react";

import { DashboardCharts } from "@/components/dashboard-charts";
import { PageShell } from "@/components/page-shell";
import { RecoveryCard } from "@/components/recovery-card";
import { StatCard } from "@/components/stat-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  coachInsights,
  demoAthlete,
  notifications,
  recoveryCards,
  summaryStats,
  workouts,
} from "@/data/demo-athlete";

const todayFocusItems = [
  {
    title: "Warmup response",
    text: "10 min easy + mobility",
    Icon: HeartPulse,
  },
  {
    title: "Main set",
    text: "Aerobic run, no hard reps",
    Icon: Footprints,
  },
  {
    title: "Recovery guardrail",
    text: "Hydrate early + protect sleep",
    Icon: Moon,
  },
];

export default function DashboardPage() {
  return (
    <PageShell
      eyebrow="Overview"
      title={`Good morning, ${demoAthlete.firstName}.`}
      description="Your demo dashboard blends training load, sleep, HRV, readiness, and AI coaching signals into one runner-first view."
    >
      <section className="grid gap-4 lg:grid-cols-[1.55fr_0.9fr]">
        <Card className="relative overflow-hidden border-emerald-300/15 bg-[linear-gradient(135deg,rgba(20,184,166,0.16),rgba(9,9,11,0.9)_42%,rgba(14,165,233,0.12))]">
          <div className="absolute right-[-80px] top-[-90px] size-64 rounded-full bg-emerald-300/10 blur-3xl" />
          <CardContent className="relative p-5 sm:p-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <Badge className="mb-4 gap-1.5">
                  <Zap className="size-3.5" />
                  Demo athlete active
                </Badge>
                <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  {demoAthlete.goal} block
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-300">
                  {demoAthlete.recommendation}
                </p>
              </div>
              <div className="min-w-40 rounded-xl border border-white/10 bg-black/25 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">
                  Readiness
                </p>
                <div className="mt-2 flex items-end gap-2">
                  <span className="text-5xl font-semibold text-white">
                    {demoAthlete.readiness}
                  </span>
                  <span className="pb-2 text-sm text-emerald-200">good</span>
                </div>
                <Progress value={demoAthlete.readiness} className="mt-4" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-950/80">
          <CardHeader>
            <CardTitle>Today&apos;s focus</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            {todayFocusItems.map(({ title, text, Icon }) => (
              <div key={title} className="flex items-center gap-3 rounded-xl bg-white/[0.04] p-3 transition hover:bg-white/[0.07]">
                <div className="flex size-9 items-center justify-center rounded-full bg-emerald-300/10 text-emerald-200">
                  <Icon className="size-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white">{title}</p>
                  <p className="truncate text-xs text-zinc-400">{text}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {recoveryCards.map((card) => (
          <RecoveryCard key={card.title} {...card} />
        ))}
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      <DashboardCharts />

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Recent runs</CardTitle>
              <p className="text-xs text-zinc-400">Demo Strava-style training feed</p>
            </div>
            <Badge variant="secondary" className="gap-1.5">
              <Activity className="size-3.5" />
              Local mock
            </Badge>
          </CardHeader>
          <CardContent className="grid gap-1">
            {workouts.map((run, index) => (
              <div key={run.title}>
                <div className="group grid gap-3 rounded-xl p-3 transition hover:bg-white/[0.04] sm:grid-cols-[1fr_auto]">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium text-white">{run.title}</p>
                      <Badge variant={run.effort === "Light quality" ? "warning" : "outline"}>
                        {run.effort}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-zinc-400">{run.note}</p>
                  </div>
                  <div className="flex items-center justify-between gap-5 text-sm sm:justify-end">
                    <div>
                      <p className="font-medium text-white">{run.distance}</p>
                      <p className="text-xs text-zinc-500">{run.date}</p>
                    </div>
                    <div>
                      <p className="font-medium text-white">{run.pace}</p>
                      <p className="text-xs text-zinc-500">avg pace</p>
                    </div>
                    <ChevronRight className="size-4 text-zinc-600 transition group-hover:text-emerald-200" />
                  </div>
                </div>
                {index < workouts.length - 1 ? <Separator /> : null}
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <Card className="border-cyan-300/15 bg-[linear-gradient(145deg,rgba(8,47,73,0.32),rgba(9,9,11,0.86))]">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex size-9 items-center justify-center rounded-full bg-cyan-300/10 text-cyan-200">
                  <Brain className="size-4" />
                </div>
                <div>
                  <CardTitle>AI coach insights</CardTitle>
                  <p className="text-xs text-zinc-400">Generated from recovery and run trends</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {coachInsights.map((insight, index) => (
                <div key={insight} className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="flex size-6 items-center justify-center rounded-full bg-emerald-300/12 text-xs font-semibold text-emerald-200">
                      {index + 1}
                    </span>
                    <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                      Signal
                    </p>
                  </div>
                  <p className="text-sm leading-6 text-zinc-200">{insight}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              {notifications.map((notification) => (
                <div key={notification.title} className="rounded-xl bg-white/[0.04] p-3">
                  <p className="text-sm font-medium text-white">{notification.title}</p>
                  <p className="mt-1 text-xs leading-5 text-zinc-400">{notification.detail}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
    </PageShell>
  );
}
