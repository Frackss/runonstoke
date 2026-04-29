import { Moon, Waves, Zap } from "lucide-react";

import { DashboardCharts } from "@/components/dashboard-charts";
import { EmptyState } from "@/components/empty-state";
import { PageShell } from "@/components/page-shell";
import { RecoveryCard } from "@/components/recovery-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  demoAthlete,
  emptyStates,
  recoveryCards,
  sleepTrend,
} from "@/data/demo-athlete";

const recoveryPlaybook = [
  {
    title: "Protect sleep",
    detail: "Target 7h 45m tonight to keep readiness above baseline.",
    Icon: Moon,
  },
  {
    title: "Hydration check",
    detail: "Add electrolytes before the next run if morning RHR is elevated.",
    Icon: Waves,
  },
  {
    title: "Intensity cap",
    detail: "Strides are okay; hard intervals wait until the base reaches 12 mi/week.",
    Icon: Zap,
  },
];

export default function RecoveryPage() {
  const avgSleep =
    sleepTrend.reduce((total, day) => total + day.sleep, 0) / sleepTrend.length;

  return (
    <PageShell
      eyebrow="Recovery"
      title="Sleep, HRV, and readiness"
      description="A recovery-first view designed for runners who need to know when to push and when to absorb training."
    >
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {recoveryCards.map((card) => (
          <RecoveryCard key={card.title} {...card} />
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="border-emerald-300/15 bg-[linear-gradient(145deg,rgba(6,78,59,0.3),rgba(9,9,11,0.9))]">
          <CardHeader>
            <CardTitle>Readiness baseline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              ["Readiness", demoAthlete.readiness, demoAthlete.readinessBaseline.readiness],
              ["HRV", 65, demoAthlete.readinessBaseline.hrv],
              ["Sleep", Math.round(avgSleep), demoAthlete.readinessBaseline.sleepScore],
            ].map(([label, value, baseline]) => (
              <div key={label} className="rounded-xl bg-white/[0.04] p-4">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-white">{label}</span>
                  <span className="text-zinc-400">{value} vs {baseline} base</span>
                </div>
                <Progress value={Number(value)} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recovery playbook</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            {recoveryPlaybook.map(({ title, detail, Icon }) => (
              <div key={title} className="flex gap-3 rounded-xl bg-white/[0.04] p-4 transition hover:bg-white/[0.07]">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-cyan-300/10 text-cyan-200">
                  <Icon className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-zinc-400">{detail}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <DashboardCharts />
      <EmptyState title={emptyStates.alerts.title} detail={emptyStates.alerts.detail} />
    </PageShell>
  );
}
