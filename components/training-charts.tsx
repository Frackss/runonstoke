"use client";

import { useEffect, useState } from "react";
import {
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
import { logger } from "@/lib/logger";
import { paceTrend, weeklySummaries } from "@/data/demo-athlete";

const tooltipStyle = {
  background: "rgba(9, 9, 11, 0.94)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "12px",
  color: "#fafafa",
};

function minutesToPace(value: number) {
  const totalSeconds = Math.round(value * 60);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}/mi`;
}

function formatPaceTooltip(value: unknown) {
  if (typeof value === "number") return minutesToPace(value);
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? minutesToPace(parsed) : value;
  }
  if (Array.isArray(value)) {
    const first = value[0];
    if (typeof first === "number") return minutesToPace(first);
    if (typeof first === "string") {
      const parsed = Number(first);
      return Number.isFinite(parsed) ? minutesToPace(parsed) : first;
    }
  }
  return "--";
}

export function TrainingCharts() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!mounted) {
    return (
      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Pace trend" description="Preparing demo pace data">
          <div className="h-full rounded-xl bg-white/[0.03]" />
        </ChartCard>
        <ChartCard title="Weekly consistency" description="Preparing demo consistency data">
          <div className="h-full rounded-xl bg-white/[0.03]" />
        </ChartCard>
      </div>
    );
  }

  if (paceTrend.length < 2 || weeklySummaries.length < 2) {
    logger.warn("chart", "Training chart fallback rendered because dataset is too small.");
    return (
      <EmptyState
        title="Not enough training history"
        detail="Training charts need at least two valid data points. The app is preserving the page instead of crashing."
      />
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <ChartCard title="Pace trend" description="Easy pace moving toward goal fitness">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={paceTrend} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis dataKey="week" tickLine={false} axisLine={false} tick={{ fill: "#a1a1aa", fontSize: 12 }} />
            <YAxis domain={[8, 12.2]} tickLine={false} axisLine={false} tick={{ fill: "#71717a", fontSize: 12 }} />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={formatPaceTooltip}
            />
            <Line type="monotone" dataKey="easy" stroke="#34d399" strokeWidth={3} dot={false} />
            <Line type="monotone" dataKey="goal" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Weekly consistency" description="Completion, mileage, and readiness">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklySummaries} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis dataKey="week" tickLine={false} axisLine={false} tick={{ fill: "#a1a1aa", fontSize: 12 }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: "#71717a", fontSize: 12 }} />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
            <Bar dataKey="miles" fill="#22d3ee" radius={[8, 8, 0, 0]} />
            <Bar dataKey="completed" fill="#34d399" radius={[8, 8, 0, 0]} opacity={0.45} />
            <Bar dataKey="readiness" fill="#a78bfa" radius={[8, 8, 0, 0]} opacity={0.3} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
