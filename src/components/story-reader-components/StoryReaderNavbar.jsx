
import { useState } from "react";
import { ArrowLeft, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ReadingStreak from "../ReadingStreak";

export default function StoryReaderNavbar({ 
  showNavbar, 
  currentPage, 
  totalPages, 
  readingTime, 
  showSettings, 
  setShowSettings 
}) {
  return (
    <AnimatePresence>
      {showNavbar && (
        <motion.div
          className="fixed top-0 left-0 right-0 z-50 px-4 py-4 flex justify-between items-center bg-zinc-900/70 backdrop-blur-md border-b border-zinc-800/30"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <Link to="/">
            <motion.button
              className="p-4 rounded-full bg-zinc-800/80 text-white hover:bg-zinc-700/80 border border-zinc-700 backdrop-blur-md shadow-lg min-w-[48px] min-h-[48px] flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={20} />
            </motion.button>
          </Link>

          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-sm font-medium text-zinc-300 hidden sm:block">
              Page {currentPage} of {totalPages}
            </span>
            <div className="block sm:hidden">
              <ReadingStreak readingTime={readingTime} />
            </div>
          </motion.div>

          <motion.button
            onClick={() => setShowSettings(!showSettings)}
            className="p-4 rounded-full bg-zinc-800/80 text-white hover:bg-zinc-700/80 border border-zinc-700 backdrop-blur-md shadow-lg min-w-[48px] min-h-[48px] flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Settings size={20} className="text-orange-500" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
