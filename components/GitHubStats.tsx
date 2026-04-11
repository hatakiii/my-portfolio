"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const GitHubIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

interface ContributionDay {
  contributionCount: number;
  date: string;
  color: string;
}

interface GitHubData {
  contributionsCollection: {
    contributionCalendar: {
      totalContributions: number;
      weeks: {
        contributionDays: ContributionDay[];
      }[];
    };
  };
  pullRequests: { totalCount: number };
  openPRs: { totalCount: number };
  closedPRs: { totalCount: number };
  mergedPRs: { totalCount: number };
  repositoriesContributedTo: { totalCount: number };
}

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const DAY_LABELS = ["Mon", "", "Wed", "", "Fri", "", ""];

export default function GitHubStats() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/github");
        const json = await res.json();
        if (json.success) {
          setData(json.data);
        } else if (json.error) {
          setError(json.error);
        }
      } catch {
        setError("Failed to load GitHub stats");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="section">
        <div className="container">
          <div className="h-64 glass-card flex items-center justify-center">
            <div className="animate-spin h-8 w-8 border-4 border-accent-indigo border-t-transparent rounded-full" />
          </div>
        </div>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="section">
        <div className="container">
          <div className="p-12 glass-card text-center">
            <div className="flex justify-center mb-4 text-text-muted">
              <GitHubIcon size={48} />
            </div>
            <h3 className="text-xl font-bold mb-2">GitHub Үйл ажиллагаа</h3>
            <p className="text-text-secondary max-w-md mx-auto mb-6">
              GitHub хаягаа холбосноор таны хувь нэмрийн хүснэгт энд харагдах
              болно.
            </p>
            <div className="bg-amber-50 border border-amber-100 p-4 rounded-lg text-amber-800 text-sm inline-block">
              {error || "GITHUB_TOKEN тохиргоог хийснээр энэ хэсэг идэвхжинэ."}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const { totalContributions, weeks } =
    data.contributionsCollection.contributionCalendar;

  // Build month labels: find which column index each new month starts at
  const monthLabels: { label: string; colIndex: number }[] = [];
  weeks.forEach((week, wIdx) => {
    const firstDay = week.contributionDays[0];
    if (firstDay) {
      const month = new Date(firstDay.date).getMonth();
      const prevWeekFirstDay =
        wIdx > 0 ? weeks[wIdx - 1].contributionDays[0] : null;
      const prevMonth = prevWeekFirstDay
        ? new Date(prevWeekFirstDay.date).getMonth()
        : -1;
      if (month !== prevMonth) {
        monthLabels.push({ label: MONTH_NAMES[month], colIndex: wIdx });
      }
    }
  });

  const CELL = 13; // cell size px
  const GAP = 3; // gap px
  const STEP = CELL + GAP;

  return (
    <section className="section" id="github">
      <div className="container">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="section-tag">Үйл ажиллагаа</span>
            <h2 className="section-title">GitHub Үзүүлэлтүүд</h2>
          </div>
          <a
            href="https://github.com/khatanbaatar"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            <GitHubIcon size={18} />
            Профайл үзэх
            <ExternalLink size={14} />
          </a>
        </header>

        {/* Contribution Calendar Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-slate-100 rounded-3xl shadow-[0_8px_32px_-8px_rgba(15,23,42,0.08)] p-8 lg:p-10 relative"
        >
          {/* Top row: total + link */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-lg font-bold text-slate-700">
              <span className="text-slate-900">
                {totalContributions.toLocaleString()} contributions
              </span>
              <span className="text-slate-400 font-medium ml-2">
                in the last year
              </span>
            </p>
          </div>

          {/* Calendar wrapper - horizontally scrollable on small screens */}
          <div
            className="overflow-x-auto pb-2"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <div
              className="relative"
              style={{ minWidth: `${weeks.length * STEP + 32}px` }}
            >
              {/* Month labels row */}
              <div
                style={{ display: "flex", paddingLeft: 32, marginBottom: 6 }}
              >
                {weeks.map((_, wIdx) => {
                  const label = monthLabels.find((m) => m.colIndex === wIdx);
                  return (
                    <div
                      key={wIdx}
                      style={{
                        width: STEP,
                        flexShrink: 0,
                        fontSize: 11,
                        fontWeight: 600,
                        color: "#94a3b8",
                      }}
                    >
                      {label ? label.label : ""}
                    </div>
                  );
                })}
              </div>

              {/* Grid: day labels + cells */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                }}
              >
                {/* Day labels */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: GAP,
                    marginRight: 8,
                  }}
                >
                  {DAY_LABELS.map((label, i) => (
                    <div
                      key={i}
                      style={{
                        height: CELL,
                        lineHeight: `${CELL}px`,
                        width: 24,
                        fontSize: 11,
                        fontWeight: 600,
                        color: "#94a3b8",
                        textAlign: "right",
                      }}
                    >
                      {label}
                    </div>
                  ))}
                </div>

                {/* Weeks columns */}
                <div
                  style={{ display: "flex", flexDirection: "row", gap: GAP }}
                >
                  {weeks.map((week, wIdx) => (
                    <div
                      key={wIdx}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: GAP,
                      }}
                    >
                      {/* Pad if the first week doesn't start on Sunday */}
                      {wIdx === 0 &&
                        Array.from({
                          length: 7 - week.contributionDays.length,
                        }).map((_, i) => (
                          <div
                            key={`pad-${i}`}
                            style={{ width: CELL, height: CELL }}
                          />
                        ))}
                      {week.contributionDays.map((day, dIdx) => (
                        <motion.div
                          key={dIdx}
                          whileHover={{ scale: 1.35 }}
                          style={{
                            width: CELL,
                            height: CELL,
                            backgroundColor:
                              day.contributionCount === 0
                                ? "#ebedf0"
                                : day.color,
                            borderRadius: 3,
                            cursor: "default",
                            flexShrink: 0,
                          }}
                          onMouseEnter={(e) => {
                            const rect = (
                              e.target as HTMLElement
                            ).getBoundingClientRect();
                            setTooltip({
                              text: `${day.contributionCount} contribution${day.contributionCount !== 1 ? "s" : ""} on ${new Date(day.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`,
                              x: rect.left + rect.width / 2,
                              y: rect.top - 8,
                            });
                          }}
                          onMouseLeave={() => setTooltip(null)}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-2 mt-5 text-xs text-slate-400 font-semibold">
            <span>Less</span>
            <div className="flex items-center gap-1">
              {["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"].map(
                (color, i) => (
                  <div
                    key={i}
                    style={{
                      width: 12,
                      height: 12,
                      backgroundColor: color,
                      borderRadius: 3,
                    }}
                  />
                ),
              )}
            </div>
            <span>More</span>
          </div>
        </motion.div>

        {/* Tooltip (fixed position) */}
        {tooltip && (
          <div
            className="fixed z-50 pointer-events-none px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-medium shadow-xl whitespace-nowrap"
            style={{
              left: tooltip.x,
              top: tooltip.y,
              transform: "translate(-50%, -100%)",
            }}
          >
            {tooltip.text}
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-900" />
          </div>
        )}
      </div>
    </section>
  );
}
