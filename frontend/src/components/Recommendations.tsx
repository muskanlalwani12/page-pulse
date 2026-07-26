import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import type { AuditReport as AuditReportType } from "../types/audit";

type Props = {
  report: AuditReportType;
};

type Level = "good" | "warning" | "bad";

type Recommendation = {
  level: Level;
  title: string;
  detail: string;
};

function buildRecommendations(report: AuditReportType): Recommendation[] {
  const items: Recommendation[] = [];

  items.push(
    report.status === 200
      ? {
          level: "good",
          title: "Website Reachable",
          detail: "The site responded normally. Good job!",
        }
      : {
          level: "bad",
          title: "Unhealthy Response",
          detail: `Received HTTP ${report.status} — check server logs or hosting status.`,
        }
  );

  items.push(
    report.title
      ? { level: "good", title: "Title Present", detail: "Good job!" }
      : {
          level: "bad",
          title: "Missing Page Title",
          detail: "Add a title under 60 characters so it isn't cut off in search results.",
        }
  );

  items.push(
    report.metaDescription
      ? { level: "good", title: "Meta Description Present", detail: "Good job!" }
      : {
          level: "warning",
          title: "Meta Description Missing",
          detail: "Add 120–160 characters summarizing the page for search results.",
        }
  );

  items.push(
    report.h1Count === 0
      ? {
          level: "bad",
          title: "No H1 Heading Found",
          detail: "Add a single main heading describing the page content.",
        }
      : report.h1Count > 1
      ? {
          level: "warning",
          title: "Multiple H1 Headings",
          detail: `${report.h1Count} H1 tags found — search engines prefer just one per page.`,
        }
      : { level: "good", title: "H1 Heading Found", detail: "Good job!" }
  );

  items.push(
    report.imagesWithoutAlt > 0
      ? {
          level: "warning",
          title: "Images Missing ALT Text",
          detail: `${report.imagesWithoutAlt} image(s) need ALT text for accessibility and search visibility.`,
        }
      : { level: "good", title: "All Images Have ALT Text", detail: "Good job!" }
  );

  items.push(
    report.wordCount < 300
      ? {
          level: "warning",
          title: "Low Word Count",
          detail: `Page has ${report.wordCount} words — aim for 300+ so search engines have enough context.`,
        }
      : {
          level: "good",
          title: "Good Content Length",
          detail: `${report.wordCount} words found.`,
        }
  );

  return items;
}

const levelStyles: Record<
  Level,
  { icon: React.ReactNode; border: string }
> = {
  good: {
    icon: <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />,
    border: "border-l-4 border-green-500",
  },
  warning: {
    icon: <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />,
    border: "border-l-4 border-yellow-500",
  },
  bad: {
    icon: <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />,
    border: "border-l-4 border-red-500",
  },
};

export default function Recommendations({ report }: Props) {
  const recommendations = buildRecommendations(report);
  const allGood = recommendations.every((item) => item.level === "good");

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.01] dark:border-slate-700 dark:bg-slate-800">
      <h3 className="mb-5 text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100">
        SEO Recommendations
      </h3>

      {allGood && (
        <div className="mb-5 flex flex-col items-center rounded-lg bg-green-50 py-8 text-center dark:bg-green-950/20">
          <span className="text-4xl">🎉</span>
          <p className="mt-3 text-lg font-bold text-green-700 dark:text-green-400">
            Excellent!
          </p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            No major SEO issues detected.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {recommendations.map((item, i) => (
          <RecommendationCard key={item.title} recommendation={item} delay={i * 0.05} />
        ))}
      </div>
    </div>
  );
}

function RecommendationCard({
  recommendation,
  delay,
}: {
  recommendation: Recommendation;
  delay: number;
}) {
  const style = levelStyles[recommendation.level];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: "easeOut" }}
      className={`rounded-lg bg-slate-50 p-4 dark:bg-slate-900/40 ${style.border}`}
    >
      <div className="flex items-start gap-2.5">
        {style.icon}
        <div>
          <p className="font-semibold text-slate-800 dark:text-slate-100">
            {recommendation.title}
          </p>
          <p className="mt-0.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {recommendation.detail}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
