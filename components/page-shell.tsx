"use client";

import { motion } from "framer-motion";

export function PageShell({
  eyebrow,
  title,
  description,
  topContent,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  topContent?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8"
    >
      {topContent}
      <div className="py-2">
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-200/70">
          {eyebrow}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
          {description}
        </p>
      </div>
      {children}
    </motion.div>
  );
}
