
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Sparkles, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import EmojiReactions from "../EmojiReactions";

export default function StoryReaderContent({ 
  showTitle, 
  book, 
  currentPageContent, 
  currentPage, 
  isLastPage, 
  fontSize, 
  lineHeight, 
  textAlign, 
  selectedText, 
  handleQuoteShare, 
  isAnimating 
}) {
  return (
    <motion.div
      className="relative max-w-4xl w-full p-6 sm:p-8 md:p-12 rounded-3xl shadow-2xl bg-zinc-900/40 text-zinc-100 border border-zinc-800/30"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      <AnimatePresence>
        {showTitle && (
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 tracking-wide relative"
              style={{
                background: "linear-gradient(135deg, #fb923c 0%, #ec4899 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "0 0 30px rgba(251, 146, 60, 0.3)",
              }}
            >
              <div className="relative z-10">
                {book.title.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20, rotateX: 90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      delay: 0.1 + index * 0.03,
                      duration: 0.4,
                      ease: "easeOut",
                    }}
                    className="inline-block"
                    style={{ transformOrigin: "center bottom" }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </div>

              <motion.div
                className="absolute -bottom-6 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                <div className="flex items-center gap-2">
                  <div className="h-0.5 w-12 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
                  <Sparkles size={16} className="text-orange-400" />
                  <div className="h-0.5 w-12 bg-gradient-to-r from-transparent via-pink-500 to-transparent"></div>
                </div>
              </motion.div>

              <motion.div
                className="absolute inset-0 blur-2xl opacity-20 z-[-1]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ delay: 0.8, duration: 1 }}
                style={{
                  background: "linear-gradient(135deg, #fb923c, #ec4899)",
                }}
              />
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative min-h-[400px] mb-8 sm:mb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.3,
            }}
            className={`space-y-4 sm:space-y-6 leading-relaxed text-${textAlign}`}
            style={{
              fontSize: `${Math.max(fontSize, 16)}px`,
              lineHeight: lineHeight,
            }}
          >
            {currentPage === 1 && (
              <div className="flex items-center mb-6 sm:mb-8">
                <div className="flex-grow h-px bg-zinc-700 mr-3" />
                <div className="flex items-center gap-2 text-sm text-orange-500">
                  <BookOpen size={14} />
                  <span className="uppercase tracking-wider font-medium">
                    Chapter 1
                  </span>
                </div>
                <div className="flex-grow h-px bg-zinc-700 ml-3" />
              </div>
            )}

            {currentPageContent.split("\n\n").map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                }}
                className={cn(
                  "tracking-wide text-zinc-200 cursor-pointer select-text",
                  currentPage === 1 && index === 0
                    ? "first-letter:text-5xl first-letter:font-bold first-letter:mr-2 first-letter:float-left first-letter:leading-none first-letter:text-orange-400"
                    : ""
                )}
                style={{
                  textShadow: "0 0 1px rgba(255, 255, 255, 0.1)",
                  letterSpacing: fontSize > 18 ? "0.01em" : "normal",
                }}
                onClick={() => selectedText && handleQuoteShare(paragraph)}
              >
                {paragraph}
              </motion.p>
            ))}

            {isLastPage && (
              <motion.div
                className="text-center mt-8 sm:mt-12 pt-8 border-t border-zinc-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400 mb-4">
                  THE END
                </h2>
                <div className="flex items-center justify-center gap-2 text-zinc-400 mb-6">
                  <Sparkles size={16} />
                  <span>Thank you for reading</span>
                  <Sparkles size={16} />
                </div>
                
                <div className="flex justify-center">
                  <EmojiReactions 
                    onReaction={(reaction) => console.log('Story reaction:', reaction)}
                  />
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {isAnimating && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-zinc-900/50 backdrop-blur-sm rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              <motion.div
                className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
