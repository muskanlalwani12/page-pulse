import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

type Props = {
  message: string | null;
};

export default function Toast({ message }: Props) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute -top-11 right-0 z-20 flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white shadow-lg dark:bg-slate-700"
        >
          <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
