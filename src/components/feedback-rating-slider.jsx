"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Frown, Meh, Smile } from "lucide-react";

export default function FeedbackRatingSlider({ value = 5, onChange }) {
  const [rating, setRating] = useState(value);
  const [isDragging, setIsDragging] = useState(false);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    if (onChange) onChange(newRating);
  };

  // Get emoji and text based on rating
  const getEmoji = () => {
    if (rating <= 3)
      return <Frown className="w-8 h-8 text-rose-500 dark:text-rose-400" />;
    if (rating <= 7)
      return <Meh className="w-8 h-8 text-amber-500 dark:text-amber-400" />;
    return <Smile className="w-8 h-8 text-emerald-500 dark:text-emerald-400" />;
  };

  const getText = () => {
    if (rating <= 3) return "Not my vibe";
    if (rating <= 7) return "It's okay";
    return "Absolutely love it!";
  };

  // Get color based on rating
  const getColor = () => {
    if (rating <= 3)
      return "from-rose-500 to-orange-500 dark:from-rose-400 dark:to-orange-400";
    if (rating <= 7)
      return "from-amber-500 to-orange-500 dark:from-amber-400 dark:to-orange-400";
    return "from-orange-500 to-amber-500 dark:from-orange-400 dark:to-amber-400";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <div className="relative bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-zinc-900 dark:text-white">
          How would you rate this eBook concept for Gen Z readers?
        </h2>

        <div className="flex flex-col items-center mb-10">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            className="mb-2"
          >
            {getEmoji()}
          </motion.div>
          <motion.p
            className="text-lg font-medium text-zinc-700 dark:text-zinc-300"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            {getText()}
          </motion.p>
        </div>

        <div className="relative mb-6 px-4">
          {/* Track background */}
          <div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full"></div>

          {/* Colored progress */}
          <motion.div
            className={`absolute top-0 left-0 h-2 bg-gradient-to-r ${getColor()} rounded-full`}
            style={{ width: `${(rating / 10) * 100}%` }}
            animate={{
              boxShadow: isDragging
                ? `0 0 0 2px rgba(255, 255, 255, 0.5), 0 0 10px 0 ${
                    rating <= 3
                      ? "rgba(244, 63, 94, 0.5)"
                      : rating <= 7
                      ? "rgba(245, 158, 11, 0.5)"
                      : "rgba(249, 115, 22, 0.5)"
                  }`
                : "none",
            }}
            transition={{ duration: 0.2 }}
          />

          {/* Thumb */}
          <motion.div
            className={`absolute top-0 w-6 h-6 bg-white dark:bg-zinc-100 rounded-full shadow-md cursor-pointer transform -translate-y-1/2 -translate-x-1/2 border-2 ${
              rating <= 3
                ? "border-rose-500 dark:border-rose-400"
                : rating <= 7
                ? "border-amber-500 dark:border-amber-400"
                : "border-orange-500 dark:border-orange-400"
            }`}
            style={{ left: `${(rating / 10) * 100}%` }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            animate={{
              boxShadow: isDragging
                ? `0 0 0 8px ${
                    rating <= 3
                      ? "rgba(244, 63, 94, 0.2)"
                      : rating <= 7
                      ? "rgba(245, 158, 11, 0.2)"
                      : "rgba(249, 115, 22, 0.2)"
                  }`
                : "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>

        {/* Numeric indicators */}
        <div className="flex justify-between px-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <motion.button
              key={num}
              onClick={() => handleRatingChange(num)}
              className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-medium ${
                rating === num
                  ? `bg-gradient-to-r ${getColor()} text-white`
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              {num}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
