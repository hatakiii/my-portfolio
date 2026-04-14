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
  repositories: { totalCount: number };
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
        {/* Header - Minimalist */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="section-tag">Үйл ажиллагаа</span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">GitHub Үзүүлэлтүүд</h2>
            <p className="text-slate-500 mt-2">Миний нээлттэй эхийн болон бусад төслүүд дэх хувь нэмэр</p>
          </div>
          <a
            href="https://github.com/hatakiii"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <GitHubIcon size={16} />
            Профайл үзэх
            <ExternalLink size={14} />
          </a>
        </header>

        {/* Ultra-Minimalist Stats */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-20 mb-16 px-2">
          {[
            { label: "Нийт хувь нэмэр", value: totalContributions.toLocaleString() },
            { label: "Pull Requests", value: data.pullRequests.totalCount },
            { label: "Нийт Репозитори", value: data.repositories.totalCount },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col"
            >
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">{stat.label}</span>
              <span className="text-4xl lg:text-5xl font-light text-slate-800 tracking-tight">{stat.value}</span>
            </motion.div>
          ))}
        </div>

        {/* Contribution Calendar Card - Minimalist */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-slate-100 rounded-3xl p-6 lg:p-8 relative"
        >
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
                style={{ display: "flex", paddingLeft: 32, marginBottom: 8 }}
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
                        fontWeight: 500,
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
                        fontWeight: 500,
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
                        <div
                          key={dIdx}
                          style={{
                            width: CELL,
                            height: CELL,
                            backgroundColor:
                              day.contributionCount === 0
                                ? "#ebedf0"
                                : day.color,
                            borderRadius: 2,
                            cursor: "pointer",
                            flexShrink: 0,
                            transition: "transform 0.1s ease",
                          }}
                          onMouseEnter={(e) => {
                             (e.target as HTMLElement).style.transform = "scale(1.2)";
                             const rect = (e.target as HTMLElement).getBoundingClientRect();
                             setTooltip({
                               text: `${day.contributionCount} contribution${day.contributionCount !== 1 ? "s" : ""} on ${new Date(day.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`,
                               x: rect.left + rect.width / 2,
                               y: rect.top - 8,
                             });
                          }}
                          onMouseLeave={(e) => {
                             (e.target as HTMLElement).style.transform = "scale(1)";
                             setTooltip(null);
                          }}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-2 mt-6 text-xs text-slate-400 font-medium">
            <span>Бага</span>
            <div className="flex items-center gap-1.5">
              {["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"].map(
                (color, i) => (
                  <div
                    key={i}
                    style={{
                      width: 12,
                      height: 12,
                      backgroundColor: color,
                      borderRadius: 2,
                    }}
                  />
                ),
              )}
            </div>
            <span>Их</span>
          </div>
        </motion.div>

        {/* Tooltip (fixed position) */}
        {tooltip && (
          <div
            className="fixed z-50 pointer-events-none px-3 py-2 rounded-md bg-slate-800 text-white text-xs font-medium shadow-sm whitespace-nowrap"
            style={{
              left: tooltip.x,
              top: tooltip.y,
              transform: "translate(-50%, -100%)",
            }}
          >
            {tooltip.text}
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-[5px] border-x-transparent border-t-[5px] border-t-slate-800" />
          </div>
        )}
      </div>
    </section>
  );
}
