"use client";

import {
  Activity,
  ArrowRight,
  Brain,
  ChevronDown,
  Clock3,
  Gauge,
  HeartPulse,
  MessageCircle,
  Moon,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useState } from "react";

import { AiCorrelationChart } from "@/components/ai-correlation-chart";
import { DataQualityReportCard } from "@/components/data-quality-report";
import { PageShell } from "@/components/page-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  aiChatExamples,
  aiCoachHero,
  aiInsightFeed,
  athleteDataQualityReport,
  demoAthlete,
  performanceCorrelations,
  recoveryTimeline,
  todayRecommendation,
} from "@/data/demo-athlete";
import { cn } from "@/lib/utils";

const statusStyles = {
  Positive: "border-emerald-300/20 bg-emerald-300/12 text-emerald-100",
  Watch: "border-amber-300/20 bg-amber-300/12 text-amber-100",
  Pattern: "border-cyan-300/20 bg-cyan-300/12 text-cyan-100",
  Caution: "border-rose-300/20 bg-rose-300/12 text-rose-100",
};

const categoryIcons = {
  Recovery: HeartPulse,
  Training: Activity,
  Performance: TrendingUp,
  Fatigue: ShieldAlert,
};

const heroAnalysisCards = [
  {
    title: "Recovery analysis",
    detail: aiCoachHero.recoveryAnalysis,
    Icon: HeartPulse,
  },
  {
    title: "Performance question",
    detail:
      "Can I train hard today? Not optimally. The better decision is aerobic work now, intensity soon.",
    Icon: Brain,
  },
  {
    title: "Overtraining read",
    detail:
      "No chronic overload signal, but avoid stacking mileage jumps before the base stabilizes.",
    Icon: ShieldAlert,
  },
];

function AccordionPanel({
  title,
  summary,
  open,
  onToggle,
  children,
}: {
  title: string;
  summary: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <Card className="overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-5 py-4 text-left transition hover:bg-white/[0.03]"
      >
        <div>
          <p className="text-sm font-semibold text-white">{title}</p>
          {!open ? <p className="mt-1 text-xs text-zinc-400">{summary}</p> : null}
        </div>
        <ChevronDown
          className={cn(
            "size-4 text-zinc-400 transition-transform duration-300 ease-in-out",
            open && "rotate-180",
          )}
        />
      </button>
      <div
        aria-hidden={!open}
        className={cn(
          "accordion-content overflow-hidden transition-all duration-300 ease-in-out",
          open ? "open max-h-[2200px] opacity-100" : "collapsed max-h-0 p-0 opacity-0",
        )}
      >
        <div className={cn(open ? "border-t border-white/10 p-4" : "border-none p-0 m-0")}>
          {children}
        </div>
      </div>
    </Card>
  );
}

export default function InsightsPage() {
  const [qualityOpen, setQualityOpen] = useState(false);
  const [insightsOpen, setInsightsOpen] = useState(false);
  const [correlationsOpen, setCorrelationsOpen] = useState(false);

  return (
    <PageShell
      eyebrow="AI Coach"
      title="Athlete intelligence"
      description="A personal running coach that connects recovery, training load, and performance patterns into practical decisions."
    >
      <section className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
        <Card className="relative overflow-hidden border-emerald-300/20 bg-[linear-gradient(135deg,rgba(16,185,129,0.18),rgba(9,9,11,0.92)_46%,rgba(14,165,233,0.16))]">
          <div className="absolute right-[-90px] top-[-120px] size-72 rounded-full bg-emerald-300/12 blur-3xl" />
          <div className="absolute bottom-[-120px] left-[-80px] size-64 rounded-full bg-cyan-300/10 blur-3xl" />
          <CardContent className="relative p-5 sm:p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="gap-1.5">
                    <Sparkles className="size-3.5" />
                    AI coach online
                  </Badge>
                  <Badge variant="outline" className="gap-1.5">
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-300 opacity-60" />
                      <span className="relative inline-flex size-2 rounded-full bg-emerald-300" />
                    </span>
                    Live demo signal
                  </Badge>
                </div>
                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  {aiCoachHero.status}: train, but do not force intensity.
                </h2>
                <p className="mt-4 text-sm leading-6 text-zinc-300">
                  {aiCoachHero.readinessSummary}
                </p>
                <div className="mt-5 rounded-xl border border-white/10 bg-black/24 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-emerald-100/70">
                    Coach recommendation
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white">
                    {aiCoachHero.recommendation}
                  </p>
                </div>
              </div>

              <div className="grid min-w-56 gap-3 sm:grid-cols-3 lg:grid-cols-1">
                <div className="rounded-xl border border-white/10 bg-black/25 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
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
                <div className="rounded-xl border border-white/10 bg-black/25 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                    Confidence
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-white">
                    {aiCoachHero.confidence}%
                  </p>
                  <Progress value={aiCoachHero.confidence} className="mt-4" />
                </div>
                <div className="rounded-xl border border-white/10 bg-black/25 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                    Status
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-emerald-100">
                    {aiCoachHero.status}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-zinc-400">
                    {aiCoachHero.trainingStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-3 lg:grid-cols-3">
              {heroAnalysisCards.map(({ title, detail, Icon }) => (
                <div key={title} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="mb-3 flex items-center gap-2 text-sm font-medium text-white">
                    <Icon className="size-4 text-emerald-200" />
                    {title}
                  </div>
                  <p className="text-sm leading-6 text-zinc-400">{detail}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-cyan-300/15 bg-zinc-950/80">
          <CardHeader>
            <CardTitle>Today&apos;s Recommendation</CardTitle>
            <p className="text-xs text-zinc-400">Daily training decision engine</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-xl border border-cyan-300/15 bg-cyan-300/[0.06] p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-cyan-100/70">
                    Output
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-white">
                    {todayRecommendation.type}
                  </p>
                </div>
                <div className="flex size-12 items-center justify-center rounded-xl bg-cyan-300/12 text-cyan-100">
                  <Gauge className="size-5" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-zinc-400">Confidence</span>
                <span className="font-medium text-white">{todayRecommendation.confidence}%</span>
              </div>
              <Progress value={todayRecommendation.confidence} className="mt-2" />
            </div>

            <div className="grid gap-3">
              <div className="rounded-xl bg-white/[0.04] p-3">
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                  Reasoning
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  {todayRecommendation.reasoning}
                </p>
              </div>
              <div className="rounded-xl bg-white/[0.04] p-3">
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                  Recovery context
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  {todayRecommendation.recoveryContext}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white/[0.04] p-3">
                  <p className="text-xs text-zinc-500">Duration</p>
                  <p className="mt-1 font-semibold text-white">{todayRecommendation.duration}</p>
                </div>
                <div className="rounded-xl bg-white/[0.04] p-3">
                  <p className="text-xs text-zinc-500">Intensity</p>
                  <p className="mt-1 font-semibold text-white">{todayRecommendation.intensity}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid items-start gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <AccordionPanel
          title="Athlete Data Quality Report"
          summary="38% reliability · 9 issues detected"
          open={qualityOpen}
          onToggle={() => setQualityOpen((prev) => !prev)}
        >
          <DataQualityReportCard report={athleteDataQualityReport} />
        </AccordionPanel>

        <Card>
          <CardHeader>
            <CardTitle>Predictive recovery timeline</CardTitle>
            <p className="text-xs text-zinc-400">What the AI expects over the next training window</p>
          </CardHeader>
          <CardContent className="grid gap-3">
            {recoveryTimeline.map((item, index) => (
              <div key={item.label} className="relative rounded-xl border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-start gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-300/10 text-emerald-200">
                    {index === 0 ? <Clock3 className="size-4" /> : index === 1 ? <Zap className="size-4" /> : <ShieldAlert className="size-4" />}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white">{item.label}</p>
                    <p className="mt-1 text-2xl font-semibold text-emerald-100">{item.value}</p>
                    <p className="mt-1 text-sm leading-6 text-zinc-400">{item.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <AccordionPanel
          title="Performance Correlations"
          summary="How recovery signals show up in run quality"
          open={correlationsOpen}
          onToggle={() => setCorrelationsOpen((prev) => !prev)}
        >
          <Card className="border-emerald-300/15 bg-[linear-gradient(145deg,rgba(6,78,59,0.22),rgba(9,9,11,0.9))]">
            <CardHeader>
              <CardTitle>Performance correlations</CardTitle>
              <p className="text-xs text-zinc-400">How recovery signals show up in run quality</p>
            </CardHeader>
            <CardContent className="grid gap-4">
              <AiCorrelationChart />
              <div className="grid gap-3 lg:grid-cols-3">
                {performanceCorrelations.map((correlation) => (
                  <div key={correlation.metric} className="rounded-xl border border-white/10 bg-black/20 p-4 transition hover:-translate-y-0.5 hover:border-white/20">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                        {correlation.metric}
                      </p>
                      <Badge variant="secondary">{correlation.strength}%</Badge>
                    </div>
                    <p className="mt-3 text-sm font-medium leading-6 text-white">
                      {correlation.finding}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-zinc-400">
                      {correlation.detail}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </AccordionPanel>
      </section>

      <section className="grid items-start gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <AccordionPanel
          title="AI Insights Feed"
          summary="Pattern recognition, fatigue warnings, and actionable coaching"
          open={insightsOpen}
          onToggle={() => setInsightsOpen((prev) => !prev)}
        >
          <Card>
            <CardHeader>
              <CardTitle>AI insights feed</CardTitle>
              <p className="text-xs text-zinc-400">Pattern recognition, fatigue warnings, and actionable coaching</p>
            </CardHeader>
            <CardContent className="grid gap-3">
              {aiInsightFeed.map((insight) => {
                const Icon = categoryIcons[insight.category as keyof typeof categoryIcons];
                return (
                  <div key={insight.title} className="group rounded-xl border border-white/10 bg-white/[0.035] p-4 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.055]">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-emerald-200">
                          <Icon className="size-5" />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-medium text-white">{insight.title}</p>
                            <span
                              className={cn(
                                "rounded-full border px-2 py-0.5 text-xs font-medium",
                                statusStyles[insight.status as keyof typeof statusStyles],
                              )}
                            >
                              {insight.status}
                            </span>
                          </div>
                          <p className="mt-2 text-sm leading-6 text-zinc-400">
                            {insight.explanation}
                          </p>
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center gap-2 text-xs text-zinc-500">
                        <Clock3 className="size-3.5" />
                        {insight.timestamp}
                      </div>
                    </div>
                    <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-3">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                          Recommendation
                        </p>
                        <Badge variant="outline">{insight.severity}</Badge>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-zinc-200">
                        {insight.recommendation}
                      </p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </AccordionPanel>

        <Card className="sticky top-4 h-fit border-cyan-300/15 bg-[linear-gradient(145deg,rgba(8,47,73,0.28),rgba(9,9,11,0.9))]">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-200">
                <MessageCircle className="size-5" />
              </div>
              <div>
                <CardTitle>AI chat coach</CardTitle>
                <p className="text-xs text-zinc-400">Mock questions answered with Wes&apos; training context</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-3">
            {aiChatExamples.map((chat) => (
              <div key={chat.question} className="rounded-xl border border-white/10 bg-black/20 p-4">
                <div className="flex items-start gap-2">
                  <Badge variant="secondary">Athlete</Badge>
                  <p className="text-sm font-medium text-white">{chat.question}</p>
                </div>
                <div className="mt-3 rounded-xl bg-cyan-300/[0.06] p-3">
                  <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-cyan-100/70">
                    <Brain className="size-3.5" />
                    Coach response
                  </div>
                  <p className="text-sm leading-6 text-zinc-200">{chat.answer}</p>
                </div>
              </div>
            ))}

            <div className="rounded-xl border border-emerald-300/15 bg-emerald-300/[0.05] p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-emerald-100">
                <Moon className="size-4" />
                Next best question
              </div>
              <p className="mt-2 text-sm leading-6 text-zinc-300">
                Ask: “How should I adjust this week if my sleep drops tonight?”
              </p>
              <div className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-emerald-200">
                Demo answer ready
                <ArrowRight className="size-3.5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </PageShell>
  );
}
