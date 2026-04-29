"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusSections = [
  {
    label: "Base phases",
    statuses: ["Base build", "Mileage progression", "Aerobic development"],
  },
  {
    label: "Peak phases",
    statuses: ["Sharpening", "Peak week", "Threshold block"],
  },
  {
    label: "Recovery phases",
    statuses: ["Active recovery", "Deload week", "Post-race recovery"],
  },
  {
    label: "Pre-race phases",
    statuses: ["Tapering", "Race ready", "Race week"],
  },
  {
    label: "Warning statuses",
    statuses: ["Overreach risk", "Fatigue accumulated", "Forced rest"],
  },
];

const activeStatus = "Base build";

export function ProfileTrainingStatusTag() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex"
        aria-expanded={open}
        aria-label="Show training status details"
      >
        <Badge className="cursor-pointer gap-1">
          Base build
          <span aria-hidden className="text-[11px] leading-none text-zinc-300">
            i
          </span>
        </Badge>
      </button>

      <div
        className={cn(
          "pointer-events-none absolute left-0 top-full z-40 mt-2 min-w-[260px] rounded-xl border border-white/10 bg-zinc-950/95 p-3 text-[12px] text-zinc-300 shadow-2xl transition-opacity duration-150",
          open ? "opacity-100" : "opacity-0",
        )}
        role="tooltip"
      >
        <div className="absolute -top-1 left-4 size-2 rotate-45 border-l border-t border-white/10 bg-zinc-950/95" />
        <div className="space-y-2">
          {statusSections.map((section) => (
            <div key={section.label}>
              <p className="mb-1 text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                {section.label}
              </p>
              <p className="leading-5">
                {section.statuses.map((status, index) => (
                  <span key={status}>
                    {index > 0 ? " · " : ""}
                    <span
                      className={cn(
                        status === activeStatus && "text-zinc-100",
                      )}
                    >
                      {status === activeStatus ? "● " : ""}
                      {status}
                    </span>
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
