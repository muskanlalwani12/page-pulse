import { Gauge } from "lucide-react";

type Props = {
  score: number;
};

function getGrade(score: number) {
  if (score >= 90)
    return {
      grade: "A",
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-100 dark:bg-green-950/40",
      title: "Excellent Performance",
      detail: "Your page is in great SEO shape.",
    };

  if (score >= 75)
    return {
      grade: "B",
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-100 dark:bg-blue-950/40",
      title: "Good Performance",
      detail: "Minor SEO issues detected.",
    };

  if (score >= 60)
    return {
      grade: "C",
      color: "text-yellow-600 dark:text-yellow-400",
      bg: "bg-yellow-100 dark:bg-yellow-950/40",
      title: "Fair Performance",
      detail: "A few important fixes are needed.",
    };

  return {
    grade: "D",
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-100 dark:bg-red-950/40",
    title: "Needs Improvement",
    detail: "Several SEO issues need attention.",
  };
}

export default function PerformanceGrade({ score }: Props) {
  const result = getGrade(score);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.01] dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
        <Gauge className="h-4 w-4" />
        <span className="text-sm font-medium">Performance Grade</span>
      </div>

      <div className="mt-5 flex flex-col items-center gap-5 sm:flex-row">
        <div
          className={`flex h-24 w-24 shrink-0 items-center justify-center rounded-full text-4xl font-bold ${result.bg} ${result.color}`}
        >
          {result.grade}
        </div>
        <div className="text-center sm:text-left">
          <p className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {result.title}
          </p>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            {result.detail}
          </p>
        </div>
      </div>
    </div>
  );
}
