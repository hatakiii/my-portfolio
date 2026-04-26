"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { ExternalLink, GitMerge, GitPullRequest, GitFork, Star } from "lucide-react";

/* ─── GitHub SVG icon ──────────────────────────────────────────── */
const GitHubIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
  </svg>
);

/* ─── Types ────────────────────────────────────────────────────── */
interface ContributionDay {
  contributionCount: number;
  date: string;
  color: string;
}

interface GitHubData {
  contributionsCollection: {
    contributionCalendar: {
      totalContributions: number;
      weeks: { contributionDays: ContributionDay[] }[];
    };
  };
  pullRequests: { totalCount: number };
  openPRs: { totalCount: number };
  closedPRs: { totalCount: number };
  mergedPRs: { totalCount: number };
  repositoriesContributedTo: { totalCount: number };
  repositories: { totalCount: number };
}

/* ─── Month names ──────────────────────────────────────────────── */
const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAY_LABELS  = ["","Mon","","Wed","","Fri",""];

/* ─── Animated counter ─────────────────────────────────────────── */
function Counter({ to, duration = 1.6 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const spring = useSpring(0, { stiffness: 60, damping: 18 });
  const rounded = useTransform(spring, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (inView) spring.set(to);
  }, [inView, to, spring]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

/* ─── Donut chart ──────────────────────────────────────────────── */
function DonutChart({
  open,
  closed,
  merged,
}: {
  open: number;
  closed: number;
  merged: number;
}) {
  const total = open + closed + merged || 1;
  const r = 52;
  const circ = 2 * Math.PI * r;

  const segments = [
    { value: merged, color: "#8b5cf6", label: "Merged" },
    { value: open,   color: "#10b981", label: "Open"   },
    { value: closed, color: "#ef4444", label: "Closed"  },
  ];

  let offset = 0;
  const arcs = segments.map((s) => {
    const dash = (s.value / total) * circ;
    const arc = { ...s, dash, offset };
    offset += dash;
    return arc;
  });

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
      <svg width={128} height={128} viewBox="0 0 128 128">
        <circle cx="64" cy="64" r={r} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="18" />
        {arcs.map((a, i) => (
          <motion.circle
            key={i}
            cx="64" cy="64" r={r}
            fill="none"
            stroke={a.color}
            strokeWidth="18"
            strokeDasharray={`${a.dash} ${circ - a.dash}`}
            strokeDashoffset={circ / 4 - a.offset}
            strokeLinecap="butt"
            initial={{ strokeDasharray: `0 ${circ}` }}
            whileInView={{ strokeDasharray: `${a.dash} ${circ - a.dash}` }}
            transition={{ duration: 1.2, delay: i * 0.18, ease: "easeOut" }}
            viewport={{ once: true }}
          />
        ))}
        <text x="64" y="60" textAnchor="middle" fill="#111" fontSize="16" fontWeight="700" fontFamily="Inter, sans-serif">
          {(open + closed + merged).toLocaleString()}
        </text>
        <text x="64" y="76" textAnchor="middle" fill="rgba(0,0,0,0.45)" fontSize="10" fontFamily="Inter, sans-serif">
          Total PRs
        </text>
      </svg>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {segments.map((s) => (
          <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 11, color: "rgba(0,0,0,0.45)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>
                {s.label}
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#111", lineHeight: 1.1 }}>
                {s.value.toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Contribution heatmap ─────────────────────────────────────── */
function Heatmap({ weeks }: { weeks: GitHubData["contributionsCollection"]["contributionCalendar"]["weeks"] }) {
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);

  const CELL = 12;
  const GAP  = 3;
  const STEP = CELL + GAP;

  const monthLabels: { label: string; colIndex: number }[] = [];
  weeks.forEach((week, wIdx) => {
    const firstDay = week.contributionDays[0];
    if (firstDay) {
      const month = new Date(firstDay.date).getMonth();
      const prevMonth = wIdx > 0 ? new Date(weeks[wIdx - 1].contributionDays[0]?.date).getMonth() : -1;
      if (month !== prevMonth) monthLabels.push({ label: MONTH_NAMES[month], colIndex: wIdx });
    }
  });

  // Green palette tuned for dark background
  const colorMap: Record<string, string> = {
    "#ebedf0": "rgba(0,0,0,0.06)",
    "#9be9a8": "#9be9a8",
    "#40c463": "#40c463",
    "#30a14e": "#30a14e",
    "#216e39": "#216e39",
  };

  return (
    <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: "touch", paddingBottom: 8 }}>
      <div style={{ position: "relative", minWidth: `${weeks.length * STEP + 36}px` }}>
        {/* Month labels */}
        <div style={{ display: "flex", paddingLeft: 32, marginBottom: 6 }}>
          {weeks.map((_, wIdx) => {
            const lbl = monthLabels.find((m) => m.colIndex === wIdx);
            return (
              <div key={wIdx} style={{ width: STEP, flexShrink: 0, fontSize: 10, fontWeight: 600, color: "rgba(0,0,0,0.3)", letterSpacing: "0.04em" }}>
                {lbl ? lbl.label : ""}
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start" }}>
          {/* Day labels */}
          <div style={{ display: "flex", flexDirection: "column", gap: GAP, marginRight: 8 }}>
            {DAY_LABELS.map((lbl, i) => (
              <div key={i} style={{ height: CELL, lineHeight: `${CELL}px`, width: 24, fontSize: 10, color: "rgba(0,0,0,0.28)", textAlign: "right", fontWeight: 500 }}>
                {lbl}
              </div>
            ))}
          </div>

          {/* Week columns */}
          <div style={{ display: "flex", flexDirection: "row", gap: GAP }}>
            {weeks.map((week, wIdx) => (
              <div key={wIdx} style={{ display: "flex", flexDirection: "column", gap: GAP }}>
                {wIdx === 0 && Array.from({ length: 7 - week.contributionDays.length }).map((_, i) => (
                  <div key={`pad-${i}`} style={{ width: CELL, height: CELL }} />
                ))}
                {week.contributionDays.map((day, dIdx) => (
                  <motion.div
                    key={dIdx}
                    initial={{ opacity: 0, scale: 0.4 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25, delay: wIdx * 0.008 }}
                    viewport={{ once: true }}
                    style={{
                      width: CELL,
                      height: CELL,
                      backgroundColor: colorMap[day.color] ?? (day.contributionCount === 0 ? "rgba(255,255,255,0.07)" : "#26a641"),
                      borderRadius: 2,
                      cursor: "pointer",
                      flexShrink: 0,
                      transition: "transform 0.12s ease",
                    }}
                    whileHover={{ scale: 1.35 }}
                    onMouseEnter={(e) => {
                      const rect = (e.target as HTMLElement).getBoundingClientRect();
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

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: "translate(-50%, -100%)",
            background: "rgba(15,23,42,0.95)",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(8px)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          }}
        >
          {tooltip.text}
          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0" style={{ borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "5px solid rgba(15,23,42,0.95)" }} />
        </div>
      )}
    </div>
  );
}

/* ─── Main component ───────────────────────────────────────────── */
export default function GitHubStats() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then((json) => {
        if (json.success) setData(json.data);
        else setError(json.error ?? "Unknown error");
      })
      .catch(() => setError("Failed to load GitHub stats"))
      .finally(() => setLoading(false));
  }, []);

  /* ── Loading ─────────────────────────────────────────────────── */
  if (loading) {
    return (
      <section className="section">
        <div className="container">
          <div style={{ height: 320, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 20, background: "linear-gradient(135deg,#0f172a,#1e293b)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ width: 36, height: 36, border: "3px solid rgba(139,92,246,0.35)", borderTop: "3px solid #8b5cf6", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
          </div>
        </div>
      </section>
    );
  }

  /* ── Error / no token ────────────────────────────────────────── */
  if (error || !data) {
    return (
      <section className="section">
        <div className="container">
          <div style={{ padding: "56px 40px", textAlign: "center", borderRadius: 20, background: "linear-gradient(135deg,#0f172a,#1e293b)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ color: "rgba(255,255,255,0.25)", marginBottom: 20 }}>
              <GitHubIcon size={52} />
            </div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff", marginBottom: 8 }}>GitHub Үйл ажиллагаа</h3>
            <p style={{ color: "rgba(255,255,255,0.45)", marginBottom: 24 }}>GITHUB_TOKEN тохиргоог хийснээр таны хувь нэмрийн мэдээлэл энд харагдана.</p>
            <div style={{ display: "inline-block", padding: "8px 20px", borderRadius: 100, background: "rgba(139,92,246,0.15)", color: "#a78bfa", fontSize: 13, fontWeight: 600, border: "1px solid rgba(139,92,246,0.3)" }}>
              {error ?? "Token шаардлагатай"}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const { totalContributions, weeks: allWeeks } = data.contributionsCollection.contributionCalendar;
  // Show only the last 24 weeks (approx 6 months) for a "recent" view
  const weeks = allWeeks.slice(-24);

  const stats = [
    { icon: <GitPullRequest size={18} />, label: "Нийт хувь нэмэр", value: totalContributions, accent: "#8b5cf6" },
    { icon: <GitMerge size={18} />,       label: "Pull Requests",    value: data.pullRequests.totalCount, accent: "#10b981" },
    { icon: <GitFork size={18} />,        label: "Репозитори",       value: data.repositories.totalCount, accent: "#f59e0b" },
    { icon: <Star size={18} />,           label: "Хамтран ажилласан", value: data.repositoriesContributedTo.totalCount, accent: "#ef4444" },
  ];

  /* ── Render ──────────────────────────────────────────────────── */
  return (
    <section className="section" id="github">
      <div className="container">

        {/* ── Section header ────────────────────────────────────── */}
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: 48 }}
        >
          <span className="section-tag">Үйл ажиллагаа</span>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <h2 className="section-title" style={{ marginBottom: 0 }}>GitHub Үзүүлэлтүүд</h2>
            <a
              href="https://github.com/hatakiii"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{ gap: 8 }}
            >
              <GitHubIcon size={15} />
              Профайл үзэх
              <ExternalLink size={13} />
            </a>
          </div>
          <p style={{ color: "var(--text-secondary)", marginTop: 8, fontSize: "1rem" }}>
            Нийт хугацааны нээлттэй эхийн болон бусад төслүүд дэх хувь нэмэр
          </p>
        </motion.header>

        {/* ── Dark wrapper ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: "linear-gradient(145deg, #fdfbf7 0%, #f5f0e8 100%)",
            border: "1px solid rgba(0,0,0,0.08)",
            borderRadius: 24,
            boxShadow: "0 24px 80px rgba(0,0,0,0.08)",
          }}
        >
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "14px 24px",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
            background: "rgba(0,0,0,0.02)",
          }}>
            {["#ff5f57","#febc2e","#28c840"].map((c, i) => (
              <div key={i} style={{ width: 11, height: 11, borderRadius: "50%", background: c, border: "1px solid rgba(0,0,0,0.05)" }} />
            ))}
            <div style={{ marginLeft: 12, display: "flex", alignItems: "center", gap: 8, color: "rgba(0,0,0,0.3)", fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>
              <GitHubIcon size={13} />
              github.com / hatakiii
            </div>
          </div>

          {/* ── Stat cards row ───────────────────────────────────── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 0 }}>
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: "-50px" }}
                style={{
                  padding: "28px 24px",
                  borderRight: i < stats.length - 1 ? "1px solid rgba(0,0,0,0.06)" : undefined,
                  borderBottom: "1px solid rgba(0,0,0,0.06)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Glow blob */}
                <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: s.accent, opacity: 0.08, filter: "blur(20px)" }} />

                <div style={{ display: "flex", alignItems: "center", gap: 8, color: s.accent, marginBottom: 12 }}>
                  {s.icon}
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(0,0,0,0.38)" }}>
                    {s.label}
                  </span>
                </div>
                <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "#111", lineHeight: 1, fontFeatureSettings: '"tnum"' }}>
                  <Counter to={s.value} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Middle section: Donut + Heatmap ─────────────────── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 0 }}>

            {/* Donut */}
            <div style={{ padding: "32px 32px", borderRight: "1px solid rgba(0,0,0,0.06)", borderBottom: "1px solid rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(0,0,0,0.35)", marginBottom: 4 }}>
                  PR Задаргаа
                </div>
              </div>
              <DonutChart
                open={data.openPRs.totalCount}
                closed={data.closedPRs.totalCount}
                merged={data.mergedPRs.totalCount}
              />
            </div>

            {/* Heatmap */}
            <div style={{ padding: "32px 28px 28px", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(0,0,0,0.35)", marginBottom: 4 }}>
                    Хувь нэмрийн хүснэгт
                  </div>
                  <div style={{ color: "#111", fontWeight: 700, fontSize: "1rem" }}>
                    <Counter to={totalContributions} /> <span style={{ color: "rgba(0,0,0,0.4)", fontWeight: 500, fontSize: "0.85rem" }}>сүүлийн 6 сард</span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ fontSize: 10, color: "rgba(0,0,0,0.3)", marginRight: 4 }}>Бага</span>
                  {["rgba(0,0,0,0.06)","#9be9a8","#40c463","#30a14e","#216e39"].map((c, i) => (
                    <div key={i} style={{ width: 11, height: 11, background: c, borderRadius: 2 }} />
                  ))}
                  <span style={{ fontSize: 10, color: "rgba(0,0,0,0.3)", marginLeft: 4 }}>Их</span>
                </div>
              </div>

              <Heatmap weeks={weeks} />
            </div>
          </div>

          <div style={{ padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <div style={{ fontSize: 12, color: "rgba(0,0,0,0.25)" }}>
              GitHub GraphQL API · Өнгөрсөн 365 хоног
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#26a641", boxShadow: "0 0 6px #26a641" }} />
              <span style={{ fontSize: 12, color: "rgba(0,0,0,0.3)" }}>Live data</span>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 720px) {
          #github [style*="grid-template-columns: auto 1fr"] {
            grid-template-columns: 1fr !important;
          }
          #github [style*="border-right: 1px solid rgba(0,0,0,0.06)"] {
            border-right: none !important;
            border-bottom: 1px solid rgba(0,0,0,0.06) !important;
          }
        }
      `}</style>
    </section>
  );
}
