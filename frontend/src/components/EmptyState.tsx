import { Globe } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-white/40 px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-800/30">
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950/40">
        <Globe className="h-10 w-10 text-blue-600 dark:text-blue-400" />
      </div>
      <h3 className="text-xl font-bold tracking-tight text-slate-700 dark:text-slate-200">
        Enter a Website URL
      </h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-500 dark:text-slate-400">
        Run an SEO audit to analyse Performance, Accessibility, Best Practices,
        and SEO — all in one report.
      </p>
    </div>
  );
}
