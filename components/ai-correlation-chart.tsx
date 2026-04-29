"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { correlationChartData } from "@/data/demo-athlete";
import { logger } from "@/lib/logger";

const tooltipStyle = {
  background: "rgba(9, 9, 11, 0.94)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "12px",
  color: "#fafafa",
};

export function AiCorrelationChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!mounted) {
    return <div className="h-[220px] rounded-xl bg-white/[0.03]" />;
  }

  if (correlationChartData.length < 2) {
    logger.warn("chart", "AI correlation chart fallback rendered because dataset is too small.");
    return (
      <div className="flex h-[220px] items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center text-sm text-zinc-400">
        More validated workouts are needed before correlation confidence is available.
      </div>
    );
  }

  return (
    <div className="h-[220px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={correlationChartData} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
          <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
          <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: "#a1a1aa", fontSize: 12 }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fill: "#71717a", fontSize: 12 }} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
          <Bar dataKey="quality" fill="#34d399" radius={[8, 8, 0, 0]} />
          <Bar dataKey="recovery" fill="#22d3ee" radius={[8, 8, 0, 0]} opacity={0.42} />
          <Line type="monotone" dataKey="pace" stroke="#f59e0b" strokeWidth={3} dot={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
