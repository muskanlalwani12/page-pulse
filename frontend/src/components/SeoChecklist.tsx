import { motion } from "framer-motion";
import type { AuditReport as AuditReportType } from "../types/audit";

type Props = {
  report: AuditReportType;
};

type Status = "pass" | "warn" | "fail";

type ChecklistEntry = {
  status: Status;
  label: string;
  detail: string;
};

function buildChecklist(report: AuditReportType): ChecklistEntry[] {
  const items: ChecklistEntry[] = [];

  items.push(
    report.title
      ? { status: "pass", label: "Page Title", detail: "Found" }
      : { status: "fail", label: "Page Title", detail: "Missing" }
  );

  items.push(
    report.metaDescription
      ? { status: "pass", label: "Meta Description", detail: "Found" }
      : { status: "warn", label: "Meta Description", detail: "Missing" }
  );

  items.push(
    report.h1Count > 0
      ? {
          status: "pass",
          label: "H1 Tag",
          detail: `${report.h1Count} heading${report.h1Count > 1 ? "s" : ""} found`,
        }
      : { status: "fail", label: "H1 Tag", detail: "No H1 found" }
  );

  items.push(
    report.wordCount >= 300
      ? { status: "pass", label: "Word Count", detail: `${report.wordCount} words` }
      : {
          status: "warn",
          label: "Word Count",
          detail: `${report.wordCount} words (Recommended: 300+)`,
        }
  );

  items.push(
    report.imagesWithoutAlt === 0
      ? { status: "pass", label: "Images ALT", detail: "All images have ALT text" }
      : {
          status: "fail",
          label: "Images ALT",
          detail: `${report.imagesWithoutAlt} image${report.imagesWithoutAlt > 1 ? "s" : ""} missing ALT`,
        }
  );

  items.push(
    report.status === 200
      ? { status: "pass", label: "HTTP Status", detail: "200 OK" }
      : { status: "fail", label: "HTTP Status", detail: `${report.status}` }
  );

  return items;
}

const statusIcon: Record<Status, string> = {
  pass: "✔",
  warn: "⚠",
  fail: "✕",
};

const statusColor: Record<Status, string> = {
  pass: "text-green-600 dark:text-green-400",
  warn: "text-yellow-600 dark:text-yellow-400",
  fail: "text-red-600 dark:text-red-400",
};

export default function SeoChecklist({ report }: Props) {
  const checklist = buildChecklist(report);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.01] dark:border-slate-700 dark:bg-slate-800">
      <h3 className="mb-5 text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100">
        SEO Checklist
      </h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {checklist.map((item, i) => (
          <ChecklistItem key={item.label} entry={item} delay={i * 0.05} />
        ))}
      </div>
    </div>
  );
}

function ChecklistItem({
  entry,
  delay,
}: {
  entry: ChecklistEntry;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay }}
      className="rounded-lg border border-slate-100 p-4 dark:border-slate-700"
    >
      <div className="flex items-center gap-2">
        <span className={`text-lg font-bold ${statusColor[entry.status]}`}>
          {statusIcon[entry.status]}
        </span>
        <p className="font-medium text-slate-800 dark:text-slate-200">
          {entry.label}
        </p>
      </div>
      <p className="mt-1 pl-7 text-sm text-slate-500 dark:text-slate-400">
        {entry.detail}
      </p>
    </motion.div>
  );
}
