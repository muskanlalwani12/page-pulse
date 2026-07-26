import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { AuditReport as AuditReportType } from "../types/audit";

type Props = {
  report: AuditReportType;
};

export function calculateScore(report: AuditReportType): number {
  let score = 100;

  if (report.status !== 200) score -= 40;
  if (!report.title) score -= 15;
  if (!report.metaDescription) score -= 15;
  if (report.h1Count === 0) score -= 10;
  if (report.imagesWithoutAlt > 10) score -= 10;
  if (report.wordCount < 300) score -= 10;

  return Math.max(0, score);
}

function getRating(score: number): {
  label: string;
  ring: string;
  text: string;
  bg: string;
} {
  if (score >= 90) {
    return {
      label: "Excellent",
      ring: "stroke-green-500",
      text: "text-green-600 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-950/30",
    };
  }
  if (score >= 70) {
    return {
      label: "Good",
      ring: "stroke-blue-500",
      text: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-950/30",
    };
  }
  if (score >= 50) {
    return {
      label: "Fair",
      ring: "stroke-orange-500",
      text: "text-orange-600 dark:text-orange-400",
      bg: "bg-orange-50 dark:bg-orange-950/30",
    };
  }
  return {
    label: "Needs Improvement",
    ring: "stroke-red-500",
    text: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-950/30",
  };
}

const DURATION_MS = 900;

export default function SeoScore({ report }: Props) {
  const score = calculateScore(report);
  const rating = getRating(score);
  const [displayScore, setDisplayScore] = useState(0);

  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayScore / 100) * circumference;

  useEffect(() => {
    setDisplayScore(0);
    let start: number | null = null;
    let frameId: number;

    function step(timestamp: number) {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / DURATION_MS, 1);
      // ease-out cubic, matches the "easeOut" feel used elsewhere in the app
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(eased * score));
      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      }
    }

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [score]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col items-center gap-4 rounded-xl border border-slate-200 p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.01] dark:border-slate-700 sm:flex-row sm:justify-center sm:gap-6 ${rating.bg}`}
    >
      <div className="relative h-28 w-28 shrink-0">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            strokeWidth="8"
            className="stroke-slate-200 dark:stroke-slate-700"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={rating.ring}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            {displayScore}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">/ 100</span>
        </div>
      </div>

      <div className="text-center sm:text-left">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          Overall SEO Score
        </p>
        <p className={`text-xl font-bold ${rating.text}`}>{rating.label}</p>
      </div>
    </motion.div>
  );
}
