
import { X, Type, AlignLeft, AlignCenter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function StoryReaderSettings({
  showSettings,
  setShowSettings,
  fontSize,
  setFontSize,
  lineHeight,
  setLineHeight,
  fontFamily,
  setFontFamily,
  textAlign,
  setTextAlign,
  trackUserInteraction,
  setUserPreferences,
  book
}) {
  const changeFontSize = (delta) => {
    setFontSize((prevSize) => {
      const newSize = prevSize + delta;
      const finalSize = Math.min(Math.max(newSize, 14), 24);
      
      trackUserInteraction('font_size_change', book, { 
        old_size: prevSize, 
        new_size: finalSize 
      });
      
      setUserPreferences({ fontSize: finalSize, theme: 'dark' });
      
      return finalSize;
    });
  };

  const changeLineHeight = (delta) => {
    setLineHeight((prevHeight) => {
      const newHeight = Number.parseFloat((prevHeight + delta).toFixed(1));
      const finalHeight = Math.min(Math.max(newHeight, 1.2), 2.4);
      
      trackUserInteraction('line_height_change', book, { 
        old_height: prevHeight, 
        new_height: finalHeight 
      });
      
      return finalHeight;
    });
  };

  return (
    <AnimatePresence>
      {showSettings && (
        <motion.div
          className="fixed inset-x-4 bottom-4 sm:bottom-6 sm:left-6 sm:right-auto z-40 p-4 sm:p-6 rounded-xl shadow-lg w-auto sm:w-80 bg-zinc-800/95 border border-zinc-700 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-white">Reading Settings</h3>
            <button
              onClick={() => setShowSettings(false)}
              className="text-zinc-400 hover:text-zinc-200 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4 sm:space-y-5">
            <div className="space-y-3">
              <label className="text-sm font-medium flex items-center gap-2 text-zinc-300">
                <Type size={14} />
                Font Size
              </label>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => changeFontSize(-1)}
                  className="p-3 rounded-md bg-zinc-900 hover:bg-zinc-700 text-zinc-300 min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  A-
                </button>
                <span className="text-zinc-300 px-4">{fontSize}px</span>
                <button
                  onClick={() => changeFontSize(1)}
                  className="p-3 rounded-md bg-zinc-900 hover:bg-zinc-700 text-zinc-300 min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  A+
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium flex items-center gap-2 text-zinc-300">
                <AlignLeft size={14} />
                Line Spacing
              </label>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => changeLineHeight(-0.1)}
                  className="p-3 rounded-md bg-zinc-900 hover:bg-zinc-700 text-zinc-300 min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  -
                </button>
                <span className="text-zinc-300 px-4">{lineHeight}x</span>
                <button
                  onClick={() => changeLineHeight(0.1)}
                  className="p-3 rounded-md bg-zinc-900 hover:bg-zinc-700 text-zinc-300 min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-300">
                Font Family
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setFontFamily("serif")}
                  className={cn(
                    "p-3 rounded-md font-serif min-h-[44px]",
                    fontFamily === "serif"
                      ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                      : "bg-zinc-900 text-zinc-300"
                  )}
                >
                  Serif
                </button>
                <button
                  onClick={() => setFontFamily("sans")}
                  className={cn(
                    "p-3 rounded-md font-sans min-h-[44px]",
                    fontFamily === "sans"
                      ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                      : "bg-zinc-900 text-zinc-300"
                  )}
                >
                  Sans
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-300">
                Text Alignment
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setTextAlign("left")}
                  className={cn(
                    "p-3 rounded-md flex justify-center min-h-[44px]",
                    textAlign === "left"
                      ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                      : "bg-zinc-900 text-zinc-300"
                  )}
                >
                  <AlignLeft size={16} />
                </button>
                <button
                  onClick={() => setTextAlign("center")}
                  className={cn(
                    "p-3 rounded-md flex justify-center min-h-[44px]",
                    textAlign === "center"
                      ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                      : "bg-zinc-900 text-zinc-300"
                  )}
                >
                  <AlignCenter size={16} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
