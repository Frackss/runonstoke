import Link from "next/link";
import { ArrowRight, Circle, Footprints, LockKeyhole, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { demoAthlete } from "@/data/demo-athlete";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
      <section className="flex min-h-screen flex-col justify-between px-5 py-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-300 text-zinc-950 shadow-[0_0_30px_rgba(52,211,153,0.22)]">
              <Footprints className="size-5" />
            </div>
            <div>
              <p className="font-semibold text-white">Stoke</p>
              <p className="text-xs text-zinc-500">AI recovery intelligence for runners.</p>
            </div>
          </div>
          <Badge variant="outline">Demo only</Badge>
        </div>

        <div className="mx-auto w-full max-w-md py-12">
          <Badge className="mb-5 gap-1.5">
            <Sparkles className="size-3.5" />
            Recovery intelligence for runners
          </Badge>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Train smarter before the watch says you overdid it.
          </h1>
          <p className="mt-4 text-sm leading-6 text-zinc-400">
            A premium demo account that combines training, recovery, and AI coaching signals for a single runner.
          </p>

          <Card className="mt-8 bg-zinc-950/75">
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

        <p className="text-xs text-zinc-600">
          No OAuth, backend, or real athlete data is connected in this MVP.
        </p>
      </section>

      <section className="hidden min-h-screen border-l border-white/10 bg-[linear-gradient(145deg,rgba(16,185,129,0.12),rgba(9,9,11,0.76)_44%,rgba(14,165,233,0.12))] p-8 lg:flex lg:items-center">
        <div className="w-full">
          <Card className="overflow-hidden border-emerald-300/15 bg-black/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    Demo athlete
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold text-white">
                    {demoAthlete.name}
                  </h2>
                  <p className="mt-1 text-sm text-zinc-400">
                    {demoAthlete.age} · {demoAthlete.goal} · {demoAthlete.currentBlock}
                  </p>
                </div>
                <div className="flex size-16 items-center justify-center rounded-full bg-emerald-300/15 text-xl font-semibold text-emerald-100">
                  {demoAthlete.initials}
                </div>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3">
                {[
                  ["Readiness", demoAthlete.readiness],
                  ["Mileage", `${demoAthlete.weeklyMileage} mi`],
                  ["Goal", "Sub-25"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-xs text-zinc-500">{label}</p>
                    <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-white/10 bg-zinc-950/60 p-4">
                <p className="text-sm font-medium text-white">Today&apos;s AI recommendation</p>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  {demoAthlete.recommendation}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
