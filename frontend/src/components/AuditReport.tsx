import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  CheckCircle2,
  Clock,
  FileText,
  Image,
  Type,
} from "lucide-react";
import type { AuditReport as AuditReportType } from "../types/audit";
import MetricCard from "./MetricCard";
import SeoScore, { calculateScore } from "./SeoScore";
import PerformanceGrade from "./Performancegrade";
import PerformanceGauge from "./PerformanceGauge";
import PagePreview from "./PagePreview";
import SeoChecklist from "./SeoChecklist";
import Recommendations from "./Recommendations";
import ExportButton from "./ExportButton";

type Props = {
  report: AuditReportType | null;
  url: string;
};

// Each top-level section fades in with an increasing delay for a scroll-like reveal.
function Section({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  icon,
  children,
}: {
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-slate-200">
      <span aria-hidden="true">{icon}</span>
      {children}
    </h3>
  );
}

export default function AuditReport({ report, url }: Props) {
  return (
    <AnimatePresence>
      {report && report.status >= 200 && report.status < 300 && (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          id="audit-report-content"
          className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-6 py-4 dark:border-slate-700 dark:bg-slate-800">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                Audit Report
              </h2>
            </div>
            <ExportButton
              targetId="audit-report-content"
              fileName={`pagepulse-${url.replace(/^https?:\/\//, "").replace(/\W+/g, "-")}.pdf`}
            />
          </div>

          <div className="space-y-8 p-6 sm:p-8">
            <Section delay={0.1}>
              <SectionHeading icon="📈">SEO Score</SectionHeading>
              <SeoScore report={report} />
            </Section>

            <hr className="border-slate-200 dark:border-slate-700" />

            <Section delay={0.2}>
              <SectionHeading icon="⚡">Performance Grade</SectionHeading>
              <PerformanceGrade score={calculateScore(report)} />
            </Section>

            <hr className="border-slate-200 dark:border-slate-700" />

            <Section delay={0.3}>
              <SectionHeading icon="⚡">Category Scores</SectionHeading>
              <PerformanceGauge report={report} />
            </Section>

            <hr className="border-slate-200 dark:border-slate-700" />

            <Section delay={0.4}>
              <SectionHeading icon="🌐">Website Preview</SectionHeading>
              <PagePreview
                url={url}
                title={report.title}
                description={report.metaDescription}
              />
            </Section>

            <hr className="border-slate-200 dark:border-slate-700" />

            <Section delay={0.5}>
              <SectionHeading icon="📊">SEO Metrics</SectionHeading>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
                <MetricCard
                  icon={<Globe className="h-4 w-4" />}
                  title="HTTP Status"
                  value={report.status}
                />
                <MetricCard
                  icon={<Clock className="h-4 w-4" />}
                  title="Response Time"
                  value={`${report.responseTime} ms`}
                />
                <MetricCard
                  icon={<Type className="h-4 w-4" />}
                  title="H1 Count"
                  value={report.h1Count}
                />
                <MetricCard
                  icon={<Image className="h-4 w-4" />}
                  title="Images Missing ALT"
                  value={report.imagesWithoutAlt}
                />
                <MetricCard
                  icon={<FileText className="h-4 w-4" />}
                  title="Word Count"
                  value={report.wordCount}
                />
              </div>
            </Section>

            <hr className="border-slate-200 dark:border-slate-700" />

            <Section delay={0.6}>
              <SectionHeading icon="✔️">SEO Checklist</SectionHeading>
              <SeoChecklist report={report} />
            </Section>

            <hr className="border-slate-200 dark:border-slate-700" />

            <Section delay={0.7}>
              <div id="recommendations">
                <SectionHeading icon="💡">Recommendations</SectionHeading>
                <Recommendations report={report} />
              </div>
            </Section>

            <Section delay={0.8}>
              <div className="flex flex-col gap-1 border-t border-slate-200 pt-6 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                  Audit completed successfully
                </span>
                <span>
                  Generated by{" "}
                  <span className="font-medium text-slate-700 dark:text-slate-200">
                    Page Pulse
                  </span>
                </span>
                <span>Completed in {report.responseTime} ms</span>
              </div>
            </Section>
          </div>
        </motion.div>
      )}

      {report && report.status >= 400 && (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6 dark:border-red-900/50 dark:bg-red-950/30"
        >
          <h2 className="mb-2 text-lg font-bold tracking-tight text-red-700 dark:text-red-400">
            Unable to Audit Website
          </h2>

          <p className="text-sm leading-relaxed text-red-600 dark:text-red-300">
            This website returned HTTP {report.status}. It may block
            automated requests or require authentication.
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
