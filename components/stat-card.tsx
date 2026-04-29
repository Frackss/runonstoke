import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const toneMap = {
  emerald: "from-emerald-300/20 to-emerald-300/5 text-emerald-200",
  cyan: "from-cyan-300/20 to-cyan-300/5 text-cyan-200",
  violet: "from-violet-300/20 to-violet-300/5 text-violet-200",
  amber: "from-amber-300/20 to-amber-300/5 text-amber-200",
};

type StatCardProps = {
  label: string;
  value: string;
  unit?: string;
  delta: string;
  detail: string;
  tone: keyof typeof toneMap;
};

export function StatCard({
  label,
  value,
  unit,
  delta,
  detail,
  tone,
}: StatCardProps) {
  const improving = delta.startsWith("+") || delta.startsWith("-");

  return (
    <Card className="overflow-hidden transition duration-300 hover:-translate-y-0.5 hover:border-white/20">
      <CardContent className="p-4">
        <div
          className={cn(
            "mb-4 h-1.5 w-16 rounded-full bg-gradient-to-r",
            toneMap[tone],
          )}
        />
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
              {label}
            </p>
            <div className="mt-2 flex items-end gap-1">
              <span className="text-2xl font-semibold text-white">{value}</span>
              {unit ? (
                <span className="pb-1 text-xs text-zinc-400">{unit}</span>
              ) : null}
            </div>
          </div>
          <Badge variant="secondary" className="gap-1">
            {improving ? (
              <ArrowUpRight className="size-3" />
            ) : (
              <ArrowDownRight className="size-3" />
            )}
            {delta}
          </Badge>
        </div>
        <p className="mt-3 text-xs text-zinc-400">{detail}</p>
      </CardContent>
    </Card>
  );
}
