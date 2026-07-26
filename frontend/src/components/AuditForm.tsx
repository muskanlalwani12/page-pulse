import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Loader2, AlertCircle } from "lucide-react";
import { auditWebsite } from "../services/auditService";
import type { AuditReport as AuditReportType } from "../types/audit";
import AuditReport from "./AuditReport";
import AuditSkeleton from "./Auditskeleton";
import EmptyState from "./EmptyState";
import AuditHistory from "./Audithistory";
import ThemeToggle from "./ThemeToggle";
import {
  getHistory,
  saveToHistory,
  type HistoryEntry,
} from "../lib/auditHistory";

function isValidUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export default function AuditForm() {
  const [url, setUrl] = useState("");
  const [report, setReport] = useState<AuditReportType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>(getHistory);
  const [loadingPhase, setLoadingPhase] = useState(0);

  const loadingPhrases = [
    "Checking website...",
    "Downloading HTML...",
    "Analyzing SEO...",
    "Preparing report...",
  ];

  useEffect(() => {
    if (!loading) {
      setLoadingPhase(0);
      return;
    }
    const interval = setInterval(() => {
      setLoadingPhase((prev) => (prev + 1) % loadingPhrases.length);
    }, 900);
    return () => clearInterval(interval);
  }, [loading]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const trimmedUrl = url.trim();

    if (!trimmedUrl) {
      setError("Please enter a website URL.");
      return;
    }
    if (!isValidUrl(trimmedUrl)) {
      setError("Please enter a valid URL (e.g. https://example.com).");
      return;
    }

    setLoading(true);
    setReport(null);

    try {
      const response = await auditWebsite(trimmedUrl);
      setReport(response.data);

      if (response.data.status >= 200 && response.data.status < 300) {
        const updated = saveToHistory({
          url: trimmedUrl,
          date: new Date().toISOString(),
          report: response.data,
        });
        setHistory(updated);
      }
    } catch (err: any) {
      const backendMessage = err?.response?.data?.message;
      if (backendMessage) setError(backendMessage);
      else if (err?.code === "ECONNABORTED") setError("The request timed out. Try again.");
      else if (err?.request) setError("Could not reach the server. Please check your connection.");
      else setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleHistorySelect = (entry: HistoryEntry) => {
    setUrl(entry.url);
    setReport(entry.report);
    setError(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-6xl rounded-2xl bg-white/80 p-10 shadow-2xl ring-1 ring-slate-200 backdrop-blur-sm dark:bg-slate-900/80 dark:ring-slate-700 lg:p-12"
    >
      <div className="mb-2 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-600 p-2.5 shadow-lg shadow-blue-600/30">
            <Globe className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-6xl">
            Page Pulse
          </h1>
        </div>
        <ThemeToggle />
      </div>
      <p className="mb-8 text-slate-600 leading-relaxed dark:text-slate-400">
        Instant SEO health check — paste a URL and get a full audit in seconds.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div>
          <label
            htmlFor="website-url"
            className="mb-2 block font-medium text-slate-700 dark:text-slate-300"
          >
            Website URL
          </label>

          <input
            id="website-url"
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            aria-invalid={!!error}
            aria-describedby={error ? "url-error" : undefined}
            className={`w-full rounded-xl border px-4 py-4 text-base outline-none transition-all duration-200 placeholder:text-slate-400 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 ${
              error
                ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100 dark:border-red-500 dark:focus:ring-red-900/40"
                : "border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 dark:border-slate-600 dark:focus:ring-blue-900/40"
            }`}
          />
        </div>

        <AnimatePresence>
          {error && (
            <motion.p
              id="url-error"
              role="alert"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2 overflow-hidden rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:bg-red-950/40 dark:text-red-400"
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-4 text-base font-semibold text-white shadow-lg transition-all hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              {loadingPhrases[loadingPhase]}
            </>
          ) : (
            "Audit Website"
          )}
        </motion.button>
      </form>

      <AuditHistory history={history} onSelect={handleHistorySelect} />

      {loading && <AuditSkeleton />}
      {!loading && !report && !error && <EmptyState />}
      <AuditReport report={report} url={url} />
    </motion.div>
  );
}
