import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import Toast from "./Toast";

type Props = {
  targetId: string;
  fileName: string;
};

export default function ExportButton({ targetId, fileName }: Props) {
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMsg(message);
    setTimeout(() => setToastMsg(null), 2000);
  };

  const handleExport = async () => {
    setExporting(true);
    setError(null);

    try {
      const node = document.getElementById(targetId);
      if (!node) {
        throw new Error(`Could not find element with id "${targetId}" to export.`);
      }

      // html2canvas-pro (not html2canvas) is required here because Tailwind v4
      // compiles colors to oklch(), which the original html2canvas can't parse.
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas-pro"),
        import("jspdf"),
      ]);

      const canvas = await html2canvas(node, {
        scale: 2,
        backgroundColor: "#f8fafc",
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgHeight = (canvas.height * pageWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(fileName);
      showToast("Report exported successfully");
    } catch (err) {
      console.error("PDF export failed:", err);
      setError(
        err instanceof Error ? err.message : "Failed to export PDF. Please try again."
      );
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="relative flex flex-col items-end gap-1.5">
      <Toast message={toastMsg} />
      <button
        type="button"
        onClick={handleExport}
        disabled={exporting}
        className="group flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
      >
        {exporting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Exporting...
          </>
        ) : (
          <>
            <Download className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
            Export Report
          </>
        )}
      </button>
      {error && (
        <p className="max-w-xs text-right text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
