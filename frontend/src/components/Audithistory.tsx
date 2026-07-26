import { motion } from "framer-motion";
import { Clock, Globe, ArrowRight } from "lucide-react";
import type { HistoryEntry } from "../lib/auditHistory";
import { formatRelativeDate } from "../lib/auditHistory";
import { calculateScore } from "./SeoScore";

type Props = {
  history: HistoryEntry[];
  onSelect: (entry: HistoryEntry) => void;
};

function scoreColor(score: number): string {
  if (score >= 90) return "text-green-600 dark:text-green-400";
  if (score >= 70) return "text-blue-600 dark:text-blue-400";
  if (score >= 50) return "text-orange-600 dark:text-orange-400";
  return "text-red-600 dark:text-red-400";
}

export default function AuditHistory({ history, onSelect }: Props) {
  return (
    <div className="mt-6 rounded-xl border border-slate-200 bg-white/60 p-4 dark:border-slate-700 dark:bg-slate-800/40">
      <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
        <Clock className="h-4 w-4" />
        Recent Audits
      </div>

      {history.length === 0 ? (
        <div className="flex flex-col items-center py-6 text-center">
          <Clock className="mb-2 h-8 w-8 text-slate-300 dark:text-slate-600" />
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            No previous audits
          </p>
          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
            Your recent website scans will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-1">
          {history.map((entry, i) => {
            const score = calculateScore(entry.report);
            return (
              <motion.button
                key={`${entry.url}-${entry.date}`}
                type="button"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: i * 0.04 }}
                onClick={() => onSelect(entry)}
                className="group flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition hover:bg-slate-50 dark:hover:bg-slate-700/50"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <Globe className="h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500" />
                  <span className="truncate font-medium text-slate-700 dark:text-slate-200">
                    {entry.url.replace(/^https?:\/\//, "")}
                  </span>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <span className={`text-xs font-bold ${scoreColor(score)}`}>
                    {score} SEO
                  </span>
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    {formatRelativeDate(entry.date)}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 -translate-x-1 text-blue-500 opacity-0 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100" />
                </div>
              </motion.button>
            );
          })}
        </div>
      )}
    </div>
  );
}
