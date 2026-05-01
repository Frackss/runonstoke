"use client";

import { Eye, Lock, Shield, X } from "lucide-react";
import { useMemo, useState } from "react";

import { PageShell } from "@/components/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Device = {
  key: "oura" | "apple" | "strava";
  name: string;
  description: string;
  buttonLabel: string;
  accentClass: string;
  bulletPoints: string[];
};

const devices: Device[] = [
  {
    key: "oura",
    name: "Oura Ring",
    description:
      "Sleep stages, HRV, readiness score, and body temperature — the core of your nightly recovery signal.",
    buttonLabel: "Connect Oura",
    accentClass: "text-violet-300 border-violet-300/30 hover:bg-violet-300/10",
    bulletPoints: [
      "Whole-night HRV average",
      "Sleep score + stages",
      "Readiness score",
      "Body temperature deviation",
    ],
  },
  {
    key: "apple",
    name: "Apple Health",
    description:
      "Resting heart rate, workout data, VO2 max, and GPS runs directly from your iPhone and Apple Watch.",
    buttonLabel: "Connect Apple Health",
    accentClass: "text-red-300 border-red-300/30 hover:bg-red-300/10",
    bulletPoints: [
      "Resting heart rate",
      "HRV spot readings",
      "Workouts + GPS pace",
      "Active calories",
    ],
  },
  {
    key: "strava",
    name: "Strava",
    description:
      "Your full run history, pace trends, segment data, and training load from every recorded activity.",
    buttonLabel: "Connect Strava",
    accentClass: "text-orange-300 border-orange-300/30 hover:bg-orange-300/10",
    bulletPoints: [
      "Run history + pace",
      "Distance + elevation",
      "Training load trend",
      "Personal records",
    ],
  },
];

function DeviceIcon({ type }: { type: Device["key"] }) {
  if (type === "oura") {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="8" stroke="#9b6dff" strokeWidth="2.6" />
      </svg>
    );
  }
  if (type === "apple") {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 20s-6-3.5-6-8.3c0-2.1 1.6-3.7 3.6-3.7 1.3 0 2.1.6 2.4 1 .3-.4 1.1-1 2.4-1 2 0 3.6 1.6 3.6 3.7 0 4.8-6 8.3-6 8.3Z"
          stroke="#ef4444"
          strokeWidth="2"
        />
      </svg>
    );
  }
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M11 3 6 12h4l-1 9 9-13h-5l2-5h-4Z" fill="#fc4c02" />
    </svg>
  );
}

export default function ConnectPage() {
  const [active, setActive] = useState<Device | null>(null);

  const usageItems = useMemo(
    () => [
      {
        title: "Read only",
        text: "Stoke never writes to your devices or modifies your health data.",
        Icon: Eye,
      },
      {
        title: "Private by default",
        text: "Your recovery data stays on your device. Stoke processes locally.",
        Icon: Lock,
      },
      {
        title: "You stay in control",
        text: "Disconnect any device at any time from this page.",
        Icon: Shield,
      },
    ],
    [],
  );

  return (
    <PageShell
      eyebrow="DEVICES"
      title="Connect your devices"
      description="Stoke reads your recovery data from the devices you already own. Connect once and your dashboard updates every morning."
    >
      <section className="grid gap-4">
        {devices.map((device) => (
          <Card key={device.key}>
            <CardContent className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex size-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <DeviceIcon type={device.key} />
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-semibold text-white">{device.name}</p>
                  <p className="max-w-2xl text-sm leading-6 text-zinc-400">{device.description}</p>
                  <div className="grid gap-1 pt-1 text-xs text-zinc-500 sm:grid-cols-2">
                    {device.bulletPoints.map((point) => (
                      <p key={point}>· {point}</p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex min-w-[220px] flex-col items-start gap-3 md:items-end">
                <Badge variant="outline">Not connected</Badge>
                <Button
                  variant="outline"
                  className={device.accentClass}
                  onClick={() => setActive(device)}
                >
                  {device.buttonLabel}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {usageItems.map(({ title, text, Icon }) => (
          <Card key={title}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Icon className="size-4 text-emerald-200" />
                <CardTitle>{title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-zinc-400">{text}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {active ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 transition-opacity duration-150"
          onClick={() => setActive(null)}
        >
          <Card
            className="w-full max-w-[420px] animate-in fade-in duration-150"
            onClick={(event) => event.stopPropagation()}
          >
            <CardHeader className="flex-row items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
                  <DeviceIcon type={active.key} />
                </div>
                <div>
                  <CardTitle>{active.name}</CardTitle>
                  <p className="mt-1 text-sm text-zinc-400">Coming soon</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="inline-flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08]"
                aria-label="Close modal"
              >
                <X className="size-4" />
              </button>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-6 text-zinc-300">
                Live {active.name} integration is in active development. In the meantime, Stoke is
                running on real athlete data to demonstrate the full experience.
              </p>
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-zinc-500">What will sync</p>
                <ul className="grid gap-1 text-sm text-zinc-300">
                  {active.bulletPoints.map((point) => (
                    <li key={point}>· {point}</li>
                  ))}
                </ul>
              </div>
              <Button className="w-full" onClick={() => setActive(null)}>
                Got it
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : null}
    </PageShell>
  );
}
