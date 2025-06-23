
import React from 'react';
import { Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const DailyReaderCount = ({ count, className = "" }) => {
  const formatCount = (num) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toLocaleString();
  };

  return (
    <motion.div
      className={`flex items-center gap-1 text-sm px-2 py-1 rounded-full bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 border border-emerald-200 dark:border-emerald-700 animate-pulse ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      style={{
        animation: 'pulse 2s infinite, glow 3s ease-in-out infinite alternate'
      }}
    >
      <Eye size={14} className="text-emerald-600 dark:text-emerald-400 animate-pulse" />
      <span className="font-semibold text-emerald-700 dark:text-emerald-300">{formatCount(count)} readers today</span>
    </motion.div>
  );
};

export default DailyReaderCount;
