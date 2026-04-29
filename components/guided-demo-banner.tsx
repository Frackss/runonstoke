"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

const DISMISS_KEY = "stoke-dashboard-demo-banner-dismissed";

export function GuidedDemoBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = window.localStorage.getItem(DISMISS_KEY) === "true";
    if (dismissed) return;

    const showTimer = window.setTimeout(() => {
      setVisible(true);
    }, 0);
    const timer = window.setTimeout(() => {
      window.localStorage.setItem(DISMISS_KEY, "true");
      setVisible(false);
    }, 8000);

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(timer);
    };
  }, []);

  const dismiss = () => {
    window.localStorage.setItem(DISMISS_KEY, "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-sky-300/40 bg-sky-200 px-3 py-2 text-sm text-sky-900">
      <p>
        👋 You&apos;re viewing Wes&apos;s recovery dashboard. Start here → then check the Insights tab for AI coaching.
      </p>
      <button
        type="button"
        onClick={dismiss}
        className="shrink-0 rounded-md p-1 text-sky-900/80 transition hover:bg-sky-300/40 hover:text-sky-900"
        aria-label="Dismiss guided demo banner"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}
