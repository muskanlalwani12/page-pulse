import { motion } from "framer-motion";

type MetricCardProps = {
  icon: React.ReactNode;
  title: string;
  value: string | number;
};

export default function MetricCard({ icon, title, value }: MetricCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-500"
    >
      <div className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
        {icon}
        {title}
      </div>
      <div className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
        {value}
      </div>
      <a
        href="#recommendations"
        className="mt-3 inline-block text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
      >
        Learn More →
      </a>
    </motion.div>
  );
}
