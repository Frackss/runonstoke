import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full rounded-xl border border-white/10 bg-white/[0.05] px-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-emerald-300/50 focus:bg-white/[0.07]",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
