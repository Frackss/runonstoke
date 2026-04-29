import { CheckCircle2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export function EmptyState({ title, detail }: { title: string; detail: string }) {
  return (
    <Card className="border-emerald-300/15 bg-emerald-300/[0.04]">
      <CardContent className="flex items-start gap-3 p-4">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-300/10 text-emerald-200">
          <CheckCircle2 className="size-4" />
        </div>
        <div>
          <p className="text-sm font-medium text-white">{title}</p>
          <p className="mt-1 text-sm leading-6 text-zinc-400">{detail}</p>
        </div>
      </CardContent>
    </Card>
  );
}
