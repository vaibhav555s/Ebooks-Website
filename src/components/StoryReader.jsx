import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Moon,
  Sun,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function StoryReader({ title, content, onBack }) {
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  const [currentPage, setCurrentPage] = useState(0);

  // Split content into pages (simplified approach)
  const contentArray = content.split("\n\n");
  const pagesCount = Math.ceil(contentArray.length / 3);
  const pages = Array.from({ length: pagesCount }, (_, i) =>
    contentArray.slice(i * 3, (i + 1) * 3).join("\n\n")
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") nextPage();
      else if (e.key === "ArrowLeft") prevPage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage]);

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-gray-100"
          : "bg-gradient-to-br from-rose-100 via-violet-100 to-indigo-100 text-gray-800"
      }`}
    >
      <div className="fixed top-0 w-full px-6 py-4 flex justify-between items-center z-10 backdrop-blur-sm bg-opacity-30">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium rounded-full px-4 py-2 transition-all hover:scale-105 active:scale-95"
        >
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>
        <h1 className="text-xl md:text-2xl font-serif font-bold tracking-tight">
          {title}
        </h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="rounded-full p-2 transition-all hover:scale-110 active:scale-95"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
      <div className="pt-20 pb-24 px-4 md:px-0 flex justify-center items-center min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className={`w-full max-w-2xl mx-auto rounded-2xl shadow-xl overflow-hidden ${
              darkMode ? "bg-gray-800/70" : "bg-white/80"
            } backdrop-blur-md`}
          >
            <div className="p-8 md:p-12">
              <div
                className="prose prose-lg max-w-none"
                style={{ fontSize: `${fontSize}px`, lineHeight: "1.8" }}
              >
                {pages[currentPage].split("\n\n").map((paragraph, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="mb-6"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="fixed bottom-0 w-full px-6 py-4 flex justify-between items-center backdrop-blur-sm bg-opacity-30">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFontSize((size) => Math.max(14, size - 1))}
            className="rounded-full p-2 transition-all hover:scale-110 active:scale-95"
            disabled={fontSize <= 14}
          >
            <Minus size={18} />
          </button>
          <span className="text-sm font-medium">{fontSize}px</span>
          <button
            onClick={() => setFontSize((size) => Math.min(24, size + 1))}
            className="rounded-full p-2 transition-all hover:scale-110 active:scale-95"
            disabled={fontSize >= 24}
          >
            <Plus size={18} />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">
            Page {currentPage + 1} of {pages.length}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={prevPage}
              className="rounded-full p-2 transition-all hover:scale-110 active:scale-95"
              disabled={currentPage <= 0}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextPage}
              className="rounded-full p-2 transition-all hover:scale-110 active:scale-95"
              disabled={currentPage >= pages.length - 1}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
