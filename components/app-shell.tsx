"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Brain,
  ChartNoAxesColumnIncreasing,
  HeartPulse,
  LayoutDashboard,
  UserRound,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { demoAthlete } from "@/data/demo-athlete";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Overview", href: "/dashboard", Icon: LayoutDashboard },
  { label: "Recovery", href: "/recovery", Icon: HeartPulse },
  { label: "Training", href: "/training", Icon: ChartNoAxesColumnIncreasing },
  { label: "Insights", href: "/insights", Icon: Brain },
  { label: "Profile", href: "/profile", Icon: UserRound },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-transparent text-white">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-white/10 bg-zinc-950/70 p-4 backdrop-blur-xl lg:block">
        <Link href="/dashboard" className="flex items-center gap-3">
          <Avatar className="size-11">
            <AvatarFallback>{demoAthlete.initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold">Stoke</p>
            <p className="text-xs text-zinc-500">AI recovery intelligence for runners.</p>
          </div>
        </Link>

        <div className="mt-6 rounded-xl border border-emerald-300/15 bg-emerald-300/8 p-3">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.18em] text-emerald-100/70">
              Demo athlete
            </p>
            <Badge>{demoAthlete.status}</Badge>
          </div>
          <p className="mt-3 text-lg font-semibold">{demoAthlete.name}</p>
          <p className="text-xs text-zinc-400">
            {demoAthlete.goal} · {demoAthlete.weeklyMileage} mi/week
          </p>
        </div>

        <nav className="mt-6 grid gap-1">
          {navItems.map(({ label, href, Icon }) => {
            const active = pathname === href;
            return (
              <Button
                key={href}
                asChild
                variant={active ? "secondary" : "ghost"}
                className={cn(
                  "justify-start",
                  active && "border border-white/10 bg-white/[0.08] text-emerald-100",
                )}
              >
                <Link href={href}>
                  <Icon className="size-4" />
                  {label}
                </Link>
              </Button>
            );
          })}
        </nav>

      </aside>

      <header className="sticky top-0 z-20 border-b border-white/10 bg-zinc-950/72 px-4 py-3 backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <Link href="/dashboard" className="flex items-center gap-3">
            <Avatar className="size-10">
              <AvatarFallback>{demoAthlete.initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold">Stoke</p>
              <p className="text-xs text-zinc-500">{demoAthlete.goal}</p>
            </div>
          </Link>
          <Badge variant="outline">{demoAthlete.status}</Badge>
        </div>
      </header>

      <main className="pb-24 lg:pl-64 lg:pb-0">{children}</main>

      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-white/10 bg-zinc-950/90 px-2 py-2 backdrop-blur-xl lg:hidden">
        {navItems.map(({ label, href, Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-[11px] text-zinc-500 transition",
                active && "bg-white/[0.08] text-emerald-100",
              )}
            >
              <Icon className="size-4" />
              {label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
