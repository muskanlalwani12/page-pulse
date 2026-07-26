export default function AuditSkeleton() {
  return (
    <div className="mt-8 animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-6 py-4 dark:border-slate-700 dark:bg-slate-800">
        <div className="h-5 w-5 rounded-full bg-slate-200 dark:bg-slate-700" />
        <div className="h-4 w-28 rounded bg-slate-200 dark:bg-slate-700" />
      </div>

      <div className="space-y-8 p-6">
        {/* SEO score skeleton */}
        <div className="flex flex-col items-center gap-4 rounded-xl border border-slate-200 p-6 dark:border-slate-700 sm:flex-row sm:justify-center sm:gap-6">
          <div className="h-28 w-28 shrink-0 rounded-full bg-slate-200 dark:bg-slate-700" />
          <div className="w-32 space-y-2 text-center sm:text-left">
            <div className="mx-auto h-3 w-24 rounded bg-slate-200 dark:bg-slate-700 sm:mx-0" />
            <div className="mx-auto h-5 w-20 rounded bg-slate-200 dark:bg-slate-700 sm:mx-0" />
          </div>
        </div>

        {/* Performance grade + gauge skeleton */}
        <div className="rounded-xl border border-slate-200 p-5 dark:border-slate-700">
          <div className="mb-4 h-3 w-32 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2 text-center">
                <div className="mx-auto h-7 w-10 rounded bg-slate-200 dark:bg-slate-700" />
                <div className="mx-auto h-3 w-14 rounded bg-slate-200 dark:bg-slate-700" />
              </div>
            ))}
          </div>
        </div>

        {/* Website preview skeleton */}
        <div className="space-y-3 rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
          <div className="h-3 w-28 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="h-4 w-48 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="h-3 w-24 rounded bg-slate-200 dark:bg-slate-700" />
        </div>

        {/* Metric cards skeleton */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="space-y-3 rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700"
            >
              <div className="h-3 w-20 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-7 w-14 rounded bg-slate-200 dark:bg-slate-700" />
            </div>
          ))}
        </div>

        {/* Checklist / recommendations skeleton */}
        <div className="space-y-2 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
          <div className="h-3 w-28 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-700" />
          <div className="h-4 w-5/6 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="h-4 w-2/3 rounded bg-slate-200 dark:bg-slate-700" />
        </div>
      </div>
    </div>
  );
}
