import { useState } from "react";
import { Globe, ArrowUpRight, Copy } from "lucide-react";
import Toast from "./Toast";

type Props = {
  url: string;
  title: string | null;
  description: string | null;
};

export default function PagePreview({
  url,
  title,
  description,
}: Props) {
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setToastMsg("URL copied");
      setTimeout(() => setToastMsg(null), 2000);
    } catch {
      setToastMsg("Could not copy URL");
      setTimeout(() => setToastMsg(null), 2000);
    }
  };

  return (
    <div className="relative rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.01] dark:border-slate-700 dark:bg-slate-800">
      <Toast message={toastMsg} />

      <div className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
        <Globe className="h-4 w-4" />
        Website Preview
      </div>

      <h3 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
        {title || "Untitled Page"}
      </h3>

      <p className="mt-1 truncate text-sm text-green-700 dark:text-green-500">
        {url}
      </p>

      <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-400">
        {description || "No meta description found."}
      </p>

      <div className="mt-5 flex items-center gap-4">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Visit Website
          <ArrowUpRight className="h-4 w-4" />
        </a>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 transition hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        >
          Copy URL
          <Copy className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
