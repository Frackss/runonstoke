import Link from "next/link";
import { ArrowRight, Circle, Footprints, LockKeyhole, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";

const comparisonRows = [
  {
    title: "Cross-device data fusion",
    sub: "Combines Oura + Apple Watch into one score",
    ouraAw: "partial",
    strava: "no",
    trainingPeaks: "no",
    stoke: "yes",
  },
  {
    title: "Adaptive training plan",
    sub: "Auto-adjusts workouts from last night's data",
    ouraAw: "no",
    strava: "no",
    trainingPeaks: "partial",
    stoke: "yes",
  },
  {
    title: "Plain-English AI coaching",
    sub: "Explains why, not just what the number is",
    ouraAw: "partial",
    strava: "no",
    trainingPeaks: "no",
    stoke: "yes",
  },
  {
    title: "Runner-specific recovery scoring",
    sub: "Built around pace, load and race-day prep",
    ouraAw: "no",
    strava: "partial",
    trainingPeaks: "yes",
    stoke: "yes",
  },
  {
    title: "No extra hardware needed",
    sub: "Works with devices you already own",
    ouraAw: "no",
    strava: "no",
    trainingPeaks: "partial",
    stoke: "partial",
  },
] as const;

function SupportCell({ value, stoke = false }: { value: "yes" | "no" | "partial"; stoke?: boolean }) {
  const base = stoke ? "bg-cyan-300/8 border-l border-r border-cyan-300/25" : "";
  if (value === "yes") {
    return (
      <td className={`px-3 py-4 text-center ${base}`}>
        <span className="why-stoke-yes inline-flex size-6 items-center justify-center rounded-full bg-emerald-900 text-white font-semibold">✓</span>
      </td>
    );
  }
  if (value === "partial") {
    return (
      <td className={`px-3 py-4 text-center ${base}`}>
        <span className="inline-flex size-6 items-center justify-center rounded-full bg-amber-500/35 text-amber-100 font-semibold">–</span>
      </td>
    );
  }
  return (
    <td className={`px-3 py-4 text-center ${base}`}>
      <span className="text-zinc-500">–</span>
    </td>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen">
      <section className="flex min-h-screen flex-col justify-between py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 px-4 sm:px-8 lg:px-12">
            <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-300 text-zinc-950 shadow-[0_0_30px_rgba(52,211,153,0.22)]">
              <Footprints className="size-5" />
            </div>
            <div>
              <p className="font-semibold text-white">Stoke</p>
              <p className="text-xs text-zinc-500">AI recovery intelligence for runners.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 sm:px-8 lg:px-12">
            <ThemeToggle />
            <Badge variant="outline">Demo only</Badge>
          </div>
        </div>

        <div className="mx-auto w-full max-w-3xl px-4 py-12 text-center sm:px-8 lg:px-12">
          <Badge className="mb-5 gap-1.5">
            <Sparkles className="size-3.5" />
            Recovery intelligence for runners
          </Badge>
          <p className="text-sm font-medium text-zinc-300">
            Most runners overtrain by the time they feel it.
          </p>
          <h1 className="text-[32px] font-semibold tracking-tight text-white sm:text-5xl">
            Stoke tells you when to push and when to rest —
            <br />
            before your body pays the price.
          </h1>
          <div className="mt-4 grid gap-2 text-sm text-zinc-400 sm:grid-cols-3">
            <p>Reads your Oura + Apple Watch overnight data</p>
            <p>Fuses HRV, sleep &amp; training load into one score</p>
            <p>Rewrites your training plan every morning</p>
          </div>
        </div>

        <div className="mx-auto grid w-full max-w-[1200px] gap-12 px-4 sm:px-8 lg:grid-cols-2 lg:px-12 lg:items-center">
          <Card className="bg-zinc-950/75">
            <CardContent className="space-y-4 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">HOW IT WORKS</p>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-xs font-medium text-zinc-400">
                    1
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Your devices collect overnight</p>
                    <p className="mt-1 text-sm leading-6 text-zinc-400">
                      Oura Ring tracks HRV and sleep quality. Apple Watch captures resting heart rate and workout load — both running while you sleep.
                    </p>
                  </div>
                </div>

                <div className="border-l-2 border-red-400 pl-3">
                  <div className="flex gap-3">
                    <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-xs font-medium text-zinc-400">
                      2
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Stoke fuses the signals</p>
                      <p className="mt-1 text-sm leading-6 text-zinc-400">
                        When your devices disagree on HRV, Stoke resolves the conflict into one trusted readiness score calibrated to your personal baseline.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-xs font-medium text-zinc-400">
                    3
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Your plan rewrites itself</p>
                    <p className="mt-1 text-sm leading-6 text-zinc-400">
                      Every morning your training plan updates. If your body didn&apos;t recover, today&apos;s hard session becomes an easy run. No guesswork.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-950/75">
            <CardContent className="space-y-3 p-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-400" htmlFor="email">
                  Email
                </label>
                <Input id="email" type="email" placeholder="athlete@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-400" htmlFor="password">
                  Password
                </label>
                <Input id="password" type="password" placeholder="••••••••" />
              </div>
              <Button variant="secondary" className="w-full">
                <LockKeyhole className="size-4" />
                Sign in
              </Button>
              <Button variant="outline" className="w-full">
                <Circle className="size-4" />
                Continue with Google
              </Button>
              <Button asChild className="w-full">
                <Link href="/dashboard">
                  Demo Athlete Login
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <section className="mx-auto w-full max-w-[1200px] px-4 py-12 sm:px-8 lg:px-12">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">WHY STOKE</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Why Stoke?</h2>
          <p className="mt-2 text-sm text-zinc-400">
            An honest look at how we compare — we win where it matters most.
          </p>

          <div className="why-stoke-table relative mt-6 overflow-x-auto rounded-xl border border-white/10 bg-zinc-950/75">
            <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-black/20 to-transparent md:hidden" />
            <table className="w-full min-w-[600px] table-fixed text-sm">
              <thead>
                <tr className="border-b border-white/10 text-zinc-200">
                  <th className="w-[40%] px-3 py-4 text-left font-medium">Feature</th>
                  <th className="px-3 py-4 font-medium">Oura + Apple Watch</th>
                  <th className="px-3 py-4 font-medium">Strava</th>
                  <th className="px-3 py-4 font-medium">TrainingPeaks</th>
                  <th className="border-l border-r border-cyan-300/30 bg-cyan-300/15 px-3 py-4 font-semibold text-cyan-100">Stoke</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, idx) => (
                  <tr key={row.title} className={idx % 2 === 0 ? "bg-white/[0.04]" : ""}>
                    <td className="px-3 py-4 align-top">
                      <p className="font-medium leading-5 text-white">{row.title}</p>
                      <p className="mt-1 text-xs leading-5 text-zinc-500">{row.sub}</p>
                    </td>
                    <SupportCell value={row.ouraAw} />
                    <SupportCell value={row.strava} />
                    <SupportCell value={row.trainingPeaks} />
                    <SupportCell value={row.stoke} stoke />
                  </tr>
                ))}
                <tr className="border-t border-white/10">
                  <td className="px-4 py-3" />
                  <td />
                  <td />
                  <td />
                  <td className="border-l border-r border-cyan-300/30 bg-cyan-300/15 px-3 py-3 text-center text-xs font-semibold text-cyan-100" />
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-zinc-400">✓ Full support  — Partial  · Not available</p>
          <p className="mt-2 text-xs text-zinc-500">
            * Oura + Apple Watch collect great data separately. Stoke is the intelligence layer that connects them.
          </p>
        </section>

        <p className="px-4 pb-20 text-xs text-zinc-600 sm:px-8 lg:px-12 lg:pb-0">Live demo — no signup required</p>
      </section>

    </main>
  );
}
