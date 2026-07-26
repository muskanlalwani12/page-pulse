import type { AuditReport as AuditReportType } from "../types/audit";
import { calculateScore } from "./SeoScore";

type Props = {
  report: AuditReportType;
};

type Gauge = {
  label: string;
  value: number;
};

function estimatePerformance(report: AuditReportType): number {
  // Heuristic based on response time — not a real Lighthouse measurement.
  if (report.responseTime < 300) return 95;
  if (report.responseTime < 800) return 85;
  if (report.responseTime < 1500) return 70;
  if (report.responseTime < 3000) return 55;
  return 40;
}

function estimateAccessibility(report: AuditReportType): number {
  let score = 100;
  if (report.imagesWithoutAlt > 0) {
    score -= Math.min(40, report.imagesWithoutAlt * 4);
  }
  if (report.h1Count === 0) score -= 15;
  return Math.max(0, score);
}

function estimateBestPractices(report: AuditReportType): number {
  let score = 100;
  if (report.status !== 200) score -= 30;
  if (!report.title) score -= 10;
  if (!report.metaDescription) score -= 10;
  return Math.max(0, score);
}

function barColor(value: number): string {
  if (value >= 90) return "bg-green-500";
  if (value >= 70) return "bg-blue-500";
  if (value >= 50) return "bg-yellow-500";
  return "bg-red-500";
}

function textColor(value: number): string {
  if (value >= 90) return "text-green-600 dark:text-green-400";
  if (value >= 70) return "text-blue-600 dark:text-blue-400";
  if (value >= 50) return "text-yellow-600 dark:text-yellow-400";
  return "text-red-600 dark:text-red-400";
}

export default function PerformanceGauge({ report }: Props) {
  const gauges: Gauge[] = [
    { label: "SEO", value: calculateScore(report) },
    { label: "Performance", value: estimatePerformance(report) },
    { label: "Accessibility", value: estimateAccessibility(report) },
    { label: "Best Practices", value: estimateBestPractices(report) },
  ];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.01] dark:border-slate-700 dark:bg-slate-800">
      <h3 className="mb-6 text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100">
        Category Scores
      </h3>

      <div className="space-y-5">
        {gauges.map((gauge) => (
          <div key={gauge.label}>
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="font-medium text-slate-600 dark:text-slate-300">
                {gauge.label}
              </span>
              <span className={`font-bold ${textColor(gauge.value)}`}>
                {gauge.value}
              </span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
              <div
                className={`h-full rounded-full ${barColor(gauge.value)} transition-all duration-700 ease-out`}
                style={{ width: `${gauge.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-xs leading-relaxed text-slate-400 dark:text-slate-500">
        SEO is calculated from real audit data. Performance, Accessibility, and
        Best Practices are estimated heuristically.
      </p>
    </div>
  );
}
