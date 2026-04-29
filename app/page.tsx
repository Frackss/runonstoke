import Link from "next/link";
import { ArrowRight, Circle, Footprints, LockKeyhole, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <main className="min-h-screen">
      <section className="flex min-h-screen flex-col justify-between py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 px-5 sm:px-8 lg:px-12">
            <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-300 text-zinc-950 shadow-[0_0_30px_rgba(52,211,153,0.22)]">
              <Footprints className="size-5" />
            </div>
            <div>
              <p className="font-semibold text-white">Stoke</p>
              <p className="text-xs text-zinc-500">AI recovery intelligence for runners.</p>
            </div>
          </div>
          <div className="px-5 sm:px-8 lg:px-12">
            <Badge variant="outline">Demo only</Badge>
          </div>
        </div>

        <div className="mx-auto w-full max-w-3xl px-5 py-12 text-center sm:px-8 lg:px-12">
          <Badge className="mb-5 gap-1.5">
            <Sparkles className="size-3.5" />
            Recovery intelligence for runners
          </Badge>
          <p className="text-sm font-medium text-zinc-300">
            Most runners overtrain by the time they feel it.
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
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

        <div className="mx-auto grid w-full max-w-[1200px] gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:px-12 lg:items-start">
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

                <div className="border-l-2 border-cyan-300 pl-3">
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

        <p className="px-5 text-xs text-zinc-600 sm:px-8 lg:px-12">Live demo — no signup required</p>
      </section>

    </main>
  );
}
