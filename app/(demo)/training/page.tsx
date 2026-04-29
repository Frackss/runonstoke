import { CalendarCheck2, Flag, Gauge, Target } from "lucide-react";

import { PageShell } from "@/components/page-shell";
import { TrainingCharts } from "@/components/training-charts";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { demoAthlete, workouts } from "@/data/demo-athlete";

const trainingStats = [
  {
    label: "Current block",
    value: demoAthlete.currentBlock,
    Icon: CalendarCheck2,
  },
  {
    label: "Goal",
    value: demoAthlete.goal,
    Icon: Target,
  },
  {
    label: "Weekly volume",
    value: `${demoAthlete.weeklyMileage} mi`,
    Icon: Gauge,
  },
];

export default function TrainingPage() {
  return (
    <PageShell
      eyebrow="Training"
      title="Build the sub-25 base"
      description="A compact training view that turns demo workouts into a realistic progression story."
    >
      <section className="grid gap-4 md:grid-cols-3">
        {trainingStats.map(({ label, value, Icon }) => (
          <Card key={label} className="transition hover:-translate-y-0.5 hover:border-white/20">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-300/10 text-emerald-200">
                <Icon className="size-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{label}</p>
                <p className="mt-1 text-lg font-semibold text-white">{value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <TrainingCharts />

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div>
            <CardTitle>Workout progression</CardTitle>
            <p className="text-xs text-zinc-400">Short, repeatable sessions that support the goal</p>
          </div>
          <Badge variant="secondary">
            <Flag className="size-3.5" />
            Demo plan
          </Badge>
        </CardHeader>
        <CardContent>
          {workouts.map((workout, index) => (
            <div key={workout.title}>
              <div className="grid gap-3 rounded-xl p-3 transition hover:bg-white/[0.04] sm:grid-cols-[1fr_auto]">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium text-white">{workout.title}</p>
                    <Badge variant="outline">{workout.effort}</Badge>
                  </div>
                  <p className="mt-1 text-sm leading-6 text-zinc-400">{workout.note}</p>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm sm:text-right">
                  <div>
                    <p className="text-white">{workout.date}</p>
                    <p className="text-xs text-zinc-500">date</p>
                  </div>
                  <div>
                    <p className="text-white">{workout.distance}</p>
                    <p className="text-xs text-zinc-500">distance</p>
                  </div>
                  <div>
                    <p className="text-white">{workout.pace}</p>
                    <p className="text-xs text-zinc-500">pace</p>
                  </div>
                </div>
              </div>
              {index < workouts.length - 1 ? <Separator /> : null}
            </div>
          ))}
        </CardContent>
      </Card>
    </PageShell>
  );
}
