"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ChartCard } from "@/components/chart-card";
import { EmptyState } from "@/components/empty-state";
import { Card } from "@/components/ui/card";
import { logger } from "@/lib/logger";
import {
  demoAthlete,
  readinessTrend,
  sleepTrend,
  trainingLoadTrend,
  weeklyMileage,
} from "@/data/demo-athlete";

const tooltipStyle = {
  background: "var(--chart-tooltip-bg)",
  border: "1px solid var(--chart-tooltip-border)",
  borderRadius: "12px",
  color: "var(--chart-tooltip-text)",
};

export function DashboardCharts() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!mounted) {
    return (
      <ChartCard
        title="Performance Trends"
        description="Preparing athlete trend data"
        className="overflow-hidden"
      >
        <div className="h-12 rounded-xl bg-white/[0.03]" />
      </ChartCard>
    );
  }

  if (
    weeklyMileage.length === 0 ||
    readinessTrend.length === 0 ||
    sleepTrend.length === 0 ||
    trainingLoadTrend.length === 0
  ) {
    logger.warn("chart", "Dashboard chart fallback rendered because one or more datasets are empty.");
    return (
      <EmptyState
        title="Not enough data for trend charts"
        detail="The dashboard is still usable. Add more valid workouts and recovery entries to unlock trend analysis."
      />
    );
  }

  return (
    <Card className="overflow-hidden p-0">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between px-5 py-4 text-left transition hover:bg-white/[0.03]"
      >
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white">Performance Trends</p>
          {!open ? (
            <p className="mt-1 text-xs text-zinc-400">
              {demoAthlete.weeklyMileage.toFixed(1)} mi this week · Readiness {demoAthlete.readiness}
            </p>
          ) : null}
        </div>
        <ChevronDown className={`size-4 text-zinc-400 transition-transform duration-300 ease-in-out ${open ? "rotate-180" : ""}`} />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-[1400px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="grid gap-4 border-t border-white/10 p-4">
          <ChartCard title="Weekly mileage" description="Miles and workout quality">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyMileage} margin={{ top: 8, right: 4, left: -24, bottom: 0 }}>
                <CartesianGrid stroke="var(--chart-grid)" vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "var(--chart-label)", fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "var(--chart-muted-label)", fontSize: 12 }} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                <Bar dataKey="miles" fill="#34d399" radius={[8, 8, 0, 0]} />
                <Bar dataKey="quality" fill="#22d3ee" radius={[8, 8, 0, 0]} opacity={0.28} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Readiness trend" description="Readiness score with HRV overlay">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={readinessTrend} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
                <CartesianGrid stroke="var(--chart-grid)" vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "var(--chart-label)", fontSize: 12 }} />
                <YAxis domain={[50, 100]} tickLine={false} axisLine={false} tick={{ fill: "var(--chart-muted-label)", fontSize: 12 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="readiness" stroke="#34d399" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="hrv" stroke="#a78bfa" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Sleep trend" description="Sleep score and duration stability">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sleepTrend} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
                <defs>
                  <linearGradient id="sleepFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--chart-grid)" vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "var(--chart-label)", fontSize: 12 }} />
                <YAxis domain={[60, 100]} tickLine={false} axisLine={false} tick={{ fill: "var(--chart-muted-label)", fontSize: 12 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="sleep" stroke="#38bdf8" strokeWidth={3} fill="url(#sleepFill)" />
                <Line type="monotone" dataKey="duration" stroke="#f0abfc" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Training load" description="Six-week load against strain">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trainingLoadTrend} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
                <defs>
                  <linearGradient id="loadFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#fb923c" stopOpacity={0.44} />
                    <stop offset="95%" stopColor="#fb923c" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--chart-grid)" vertical={false} />
                <XAxis dataKey="week" tickLine={false} axisLine={false} tick={{ fill: "var(--chart-label)", fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "var(--chart-muted-label)", fontSize: 12 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="load" stroke="#fb923c" strokeWidth={3} fill="url(#loadFill)" />
                <Line type="monotone" dataKey="strain" stroke="#f43f5e" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </Card>
  );
}
