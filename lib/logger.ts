type LogLevel = "info" | "warn" | "error";

function write(level: LogLevel, scope: string, message: string, meta?: unknown) {
  if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "production") return;

  const prefix = `[ApexRun:${scope}]`;
  if (level === "error") {
    console.error(prefix, message, meta ?? "");
    return;
  }
  if (level === "warn") {
    console.warn(prefix, message, meta ?? "");
    return;
  }
  console.info(prefix, message, meta ?? "");
}

export const logger = {
  info: (scope: string, message: string, meta?: unknown) =>
    write("info", scope, message, meta),
  warn: (scope: string, message: string, meta?: unknown) =>
    write("warn", scope, message, meta),
  error: (scope: string, message: string, meta?: unknown) =>
    write("error", scope, message, meta),
};
