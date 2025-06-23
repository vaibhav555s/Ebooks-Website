
import { useState } from "react";
import { Heart, Quote, Bookmark, MessageSquare, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import SocialShare from "../SocialShare";

export default function StoryReaderFAB({ 
  book, 
  hasLiked, 
  likeCount, 
  showLikeAnimation,
  handleLike, 
  handleQuoteShare 
}) {
  const [showMobileFAB, setShowMobileFAB] = useState(false);

  return (
    <>
      {/* Mobile Expandable FAB */}
      <div className="block sm:hidden fixed bottom-6 right-6 z-40">
        <motion.button
          onClick={() => setShowMobileFAB(!showMobileFAB)}
          className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg bg-gradient-to-r from-orange-500 to-pink-500 text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ rotate: showMobileFAB ? 45 : 0 }}
        >
          <Plus size={24} />
        </motion.button>

        <AnimatePresence>
          {showMobileFAB && (
            <motion.div
              className="absolute bottom-20 right-0 flex flex-col gap-3"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <motion.button
                onClick={() => {
                  handleLike();
                  setShowMobileFAB(false);
                }}
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center shadow-lg relative",
                  hasLiked
                    ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                    : "bg-zinc-800 border border-zinc-700 text-zinc-400"
                )}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart size={20} className={hasLiked ? "fill-white" : ""} />
                {likeCount > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-5 h-5 rounded-full text-xs flex items-center justify-center px-1 bg-zinc-800 text-white border border-zinc-700">
                    {likeCount}
                  </span>
                )}
              </motion.button>

              <motion.button
                onClick={() => {
                  handleQuoteShare();
                  setShowMobileFAB(false);
                }}
                className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-orange-500"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Quote size={18} />
              </motion.button>

              <motion.button
                className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-orange-500"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowMobileFAB(false)}
              >
                <Bookmark size={18} />
              </motion.button>

              <motion.button
                className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-orange-500"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowMobileFAB(false)}
              >
                <MessageSquare size={18} />
              </motion.button>

              <motion.div
                className="relative"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <SocialShare 
                  story={book} 
                  className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-orange-500"
                  onShare={() => setShowMobileFAB(false)}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Floating Action Buttons */}
      <div className="hidden sm:flex fixed bottom-6 right-6 z-40 flex-col gap-3">
        <motion.button
          onClick={handleLike}
          className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center shadow-lg relative",
            hasLiked
              ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
              : "bg-zinc-800 border border-zinc-700 text-zinc-400"
          )}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart size={24} className={hasLiked ? "fill-white" : ""} />

          <motion.div
            className="absolute -top-2 -right-2 min-w-6 h-6 rounded-full text-xs flex items-center justify-center px-1 bg-zinc-800 text-white border border-zinc-700"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          >
            {likeCount}
          </motion.div>

          <AnimatePresence>
            {showLikeAnimation && (
              <motion.div
                className="absolute inset-0 z-10 pointer-events-none"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute left-1/2 top-1/2 w-3 h-3 text-pink-500"
                    initial={{ x: 0, y: 0, scale: 0 }}
                    animate={{
                      x: Math.cos((i * Math.PI) / 4) * 30,
                      y: Math.sin((i * Math.PI) / 4) * 30,
                      scale: [0, 1.5, 0],
                    }}
                    transition={{ duration: 1 }}
                  >
                    <Heart size={12} className="fill-pink-500" />
                  </motion.div>
                ))}

                <motion.div
                  className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-pink-500"
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 2, 1] }}
                  transition={{ duration: 0.5 }}
                >
                  <Heart size={24} className="fill-pink-500" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        <motion.button
          onClick={() => handleQuoteShare()}
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-orange-500"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Quote size={20} />
        </motion.button>

        <motion.button
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-orange-500"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Bookmark size={20} />
        </motion.button>

        <motion.button
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-orange-500"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MessageSquare size={20} />
        </motion.button>

        <div className="relative">
          <SocialShare 
            story={book} 
            className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-orange-500"
          />
        </div>
      </div>
    </>
  );
}
