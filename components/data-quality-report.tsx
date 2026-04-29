import { AlertTriangle, CheckCircle2, FileWarning, Wrench } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { DataQualityReport } from "@/types/athlete";

export function DataQualityReportCard({ report }: { report: DataQualityReport }) {
  const visibleIssues = report.issues.slice(0, 4);
  const visibleTransforms = report.transformations.slice(0, 3);

  return (
    <Card className="border-emerald-300/15 bg-[linear-gradient(145deg,rgba(6,78,59,0.18),rgba(9,9,11,0.88))]">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <div>
            <CardTitle>Athlete data quality report</CardTitle>
            <p className="text-xs text-zinc-400">Validation, normalization, and ingestion reliability</p>
          </div>
          <Badge variant={report.score >= 80 ? "default" : "warning"}>{report.score}%</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-zinc-400">Reliability score</span>
            <span className="font-medium text-white">{report.score}/100</span>
          </div>
          <Progress value={report.score} />
          <p className="mt-2 text-sm leading-6 text-zinc-400">{report.summary}</p>
        </div>

        <div className="grid gap-3 lg:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-black/20 p-3">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-white">
              <FileWarning className="size-4 text-amber-200" />
              Quality checks
            </div>
            <div className="grid gap-2">
              {visibleIssues.length > 0 ? (
                visibleIssues.map((issue) => (
                  <div key={`${issue.code}-${issue.entity}`} className="flex gap-2 text-xs leading-5 text-zinc-400">
                    <AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-amber-200" />
                    <span>{issue.message}</span>
                  </div>
                ))
              ) : (
                <div className="flex gap-2 text-xs leading-5 text-zinc-400">
                  <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-emerald-200" />
                  <span>No validation issues detected.</span>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/20 p-3">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-white">
              <Wrench className="size-4 text-cyan-200" />
              Normalization log
            </div>
            <div className="grid gap-2">
              {visibleTransforms.length > 0 ? (
                visibleTransforms.map((transform) => (
                  <div key={`${transform.code}-${transform.entity}`} className="flex gap-2 text-xs leading-5 text-zinc-400">
                    <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-cyan-200" />
                    <span>{transform.message}</span>
                  </div>
                ))
              ) : (
                <div className="flex gap-2 text-xs leading-5 text-zinc-400">
                  <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-emerald-200" />
                  <span>No transformations were required.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
