import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type RecoveryCardProps = {
  title: string;
  value: string;
  unit: string;
  detail: string;
  progress: number;
  accent: string;
};

export function RecoveryCard({
  title,
  value,
  unit,
  detail,
  progress,
  accent,
}: RecoveryCardProps) {
  return (
    <Card className="relative overflow-hidden transition duration-300 hover:-translate-y-0.5 hover:border-white/20">
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-px bg-gradient-to-r opacity-80",
          accent,
        )}
      />
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
              {title}
            </p>
            <div className="mt-2 flex items-end gap-1">
              <span className="text-3xl font-semibold text-white">{value}</span>
              <span className="pb-1 text-xs text-zinc-400">{unit}</span>
            </div>
          </div>
          <div className={cn("size-10 rounded-full bg-gradient-to-br", accent)} />
        </div>
        <Progress value={progress} className="mt-4" />
        <p className="mt-3 text-xs text-zinc-400">{detail}</p>
      </CardContent>
    </Card>
  );
}
