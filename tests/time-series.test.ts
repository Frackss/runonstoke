import assert from "node:assert/strict";
import test from "node:test";

import {
  assertNowIsLast,
  normalizeDaySeries,
  normalizeTimeSeries,
  normalizeWeeklySeries,
} from "../lib/analytics/time-series";

test("sorts date-based series from old to new", () => {
  const sorted = normalizeTimeSeries(
    [
      { date: "2026-04-28", value: "now" },
      { date: "2026-04-22", value: "old" },
      { date: "2026-04-25", value: "middle" },
    ],
    "date",
  );

  assert.deepEqual(sorted.map((item) => item.value), ["old", "middle", "now"]);
});

test("normalizes week labels with Now at the far right", () => {
  const sorted = normalizeWeeklySeries([
    { week: "Now", value: 3 },
    { week: "W-5", value: 1 },
    { week: "W-1", value: 2 },
  ]);

  assert.deepEqual(sorted.map((item) => item.week), ["W-5", "W-1", "Now"]);
  assert.equal(assertNowIsLast(sorted), true);
});

test("normalizes day labels from Monday to Sunday", () => {
  const sorted = normalizeDaySeries([
    { day: "Sun", miles: 3 },
    { day: "Mon", miles: 1 },
    { day: "Wed", miles: 2 },
  ]);

  assert.deepEqual(sorted.map((item) => item.day), ["Mon", "Wed", "Sun"]);
});
