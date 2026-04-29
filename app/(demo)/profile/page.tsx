import { Award, CalendarCheck2, Gauge, HeartPulse, MapPin, Target } from "lucide-react";

import { PageShell } from "@/components/page-shell";
import { DataQualityReportCard } from "@/components/data-quality-report";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  athleteDataQualityReport,
  demoAthlete,
  personalRecords,
  recentImprovements,
  weeklySummaries,
} from "@/data/demo-athlete";

const profileStats = [
  {
    label: "Age",
    value: demoAthlete.age,
    Icon: CalendarCheck2,
  },
  {
    label: "Weekly mileage",
    value: `${demoAthlete.weeklyMileage} mi`,
    Icon: Gauge,
  },
  {
    label: "Readiness",
    value: demoAthlete.readiness,
    Icon: HeartPulse,
  },
  {
    label: "Goal",
    value: demoAthlete.goal,
    Icon: Target,
  },
];

export default function ProfilePage() {
  return (
    <PageShell
      eyebrow="Profile"
      title="Demo athlete profile"
      description="A complete runner profile that makes the demo feel personal without adding authentication or a database."
    >
      <section className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <Card className="relative overflow-hidden border-emerald-300/15 bg-[linear-gradient(145deg,rgba(16,185,129,0.14),rgba(9,9,11,0.92))]">
          <CardContent className="p-5">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex size-24 items-center justify-center rounded-full border border-white/10 bg-emerald-300/15 text-3xl font-semibold text-emerald-100">
                {demoAthlete.initials}
              </div>
              <div>
                <Badge>{demoAthlete.status}</Badge>
                <h2 className="mt-3 text-3xl font-semibold text-white">{demoAthlete.name}</h2>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-zinc-400">
                  <span>{demoAthlete.focus}</span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="size-3.5" />
                    {demoAthlete.location}
                  </span>
                </div>
              </div>
            </div>
            <p className="mt-6 text-sm leading-6 text-zinc-300">{demoAthlete.bio}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {demoAthlete.preferredDistances.map((distance) => (
                <Badge key={distance} variant="outline">{distance}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2">
          {profileStats.map(({ label, value, Icon }) => (
            <Card key={label} className="transition hover:-translate-y-0.5 hover:border-white/20">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex size-11 items-center justify-center rounded-xl bg-white/[0.06] text-emerald-200">
                  <Icon className="size-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{label}</p>
                  <p className="mt-1 text-xl font-semibold text-white">{value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <DataQualityReportCard report={athleteDataQualityReport} />

      <section className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Current training block</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-white">{demoAthlete.currentBlock}</p>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Conservative volume build with strides, easy runs, and one weekly progress check.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Readiness baseline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(demoAthlete.readinessBaseline).map(([label, value]) => (
              <div key={label}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="capitalize text-zinc-400">{label.replace(/([A-Z])/g, " $1")}</span>
                  <span className="text-white">{value}</span>
                </div>
                <Progress value={Number(value)} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Personal records</CardTitle>
          </CardHeader>
          <CardContent>
            {personalRecords.map((record, index) => (
              <div key={record.event}>
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <Award className="size-4 text-amber-200" />
                    <div>
                      <p className="font-medium text-white">{record.event}</p>
                      <p className="text-xs text-zinc-500">{record.date}</p>
                    </div>
                  </div>
                  <p className="font-mono text-sm text-zinc-200">{record.mark}</p>
                </div>
                {index < personalRecords.length - 1 ? <Separator /> : null}
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Weekly consistency</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {weeklySummaries.map((week) => (
              <div key={week.week} className="rounded-xl bg-white/[0.04] p-3">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-white">{week.week}</span>
                  <span className="text-zinc-400">{week.miles} mi · {week.completed}%</span>
                </div>
                <Progress value={week.completed} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent progress</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            {recentImprovements.map((improvement) => (
              <div key={improvement} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-sm leading-6 text-zinc-300">{improvement}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </PageShell>
  );
}
