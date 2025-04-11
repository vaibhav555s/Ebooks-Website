"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const emotions = [
  {
    emoji: "😍",
    label: "Love it",
    color: "from-orange-500 to-pink-500 dark:from-orange-400 to-pink-400",
    bgColor: "bg-orange-100 dark:bg-orange-900/30",
    textColor: "text-orange-700 dark:text-orange-300",
  },
  {
    emoji: "🤩",
    label: "Amazing",
    color: "from-orange-500 to-rose-500 dark:from-orange-400 to-rose-400",
    bgColor: "bg-orange-100 dark:bg-orange-900/30",
    textColor: "text-orange-700 dark:text-orange-300",
  },
  {
    emoji: "😊",
    label: "Good",
    color: "from-amber-500 to-orange-500 dark:from-amber-400 to-orange-400",
    bgColor: "bg-amber-100 dark:bg-amber-900/30",
    textColor: "text-amber-700 dark:text-amber-300",
  },
  {
    emoji: "😐",
    label: "Okay",
    color: "from-yellow-500 to-amber-500 dark:from-yellow-400 to-amber-400",
    bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
    textColor: "text-yellow-700 dark:text-yellow-300",
  },
  {
    emoji: "😕",
    label: "Meh",
    color: "from-orange-400 to-amber-400 dark:from-orange-300 to-amber-300",
    bgColor: "bg-orange-100 dark:bg-orange-900/30",
    textColor: "text-orange-700 dark:text-orange-300",
  },
  {
    emoji: "😢",
    label: "Sad",
    color: "from-rose-500 to-orange-500 dark:from-rose-400 to-orange-400",
    bgColor: "bg-rose-100 dark:bg-rose-900/30",
    textColor: "text-rose-700 dark:text-rose-300",
  },
];

export default function EmotionFeedbackSlider({ value = 3, onChange }) {
  const { theme } = useTheme();
  const [selectedEmotion, setSelectedEmotion] = useState(value);
  const [particles, setParticles] = useState([]);

  const handleSelect = (index) => {
    setSelectedEmotion(index);
    if (onChange) onChange(index);

    // Generate particles on selection
    generateParticles();
  };

  const generateParticles = () => {
    const newParticles = [];
    for (let i = 0; i < 12; i++) {
      newParticles.push({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 10 + 5,
        duration: Math.random() * 1 + 1,
        delay: Math.random() * 0.5,
      });
    }
    setParticles(newParticles);

    // Clear particles after animation
    setTimeout(() => {
      setParticles([]);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-r ${emotions[selectedEmotion].color} opacity-10 rounded-3xl blur-xl transition-all duration-500`}
      ></div>

      <div className="relative bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-lg overflow-hidden">
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-white dark:bg-white/80"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
              }}
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0.8, 0.6, 0],
                y: [0, -50],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-zinc-900 dark:text-white">
          How's your StoryWave experience today?
        </h2>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {emotions.map((emotion, index) => (
            <motion.button
              key={index}
              onClick={() => handleSelect(index)}
              className={`relative group ${
                selectedEmotion === index
                  ? `bg-gradient-to-br ${emotion.color} shadow-lg`
                  : `${emotion.bgColor} hover:bg-opacity-80 dark:hover:bg-opacity-50`
              } rounded-2xl p-4 transition-all duration-300`}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <motion.div
                animate={{
                  scale: selectedEmotion === index ? [1, 1.2, 1] : 1,
                }}
                transition={{
                  duration: 0.5,
                  repeat:
                    selectedEmotion === index ? Number.POSITIVE_INFINITY : 0,
                  repeatType: "reverse",
                }}
                className="text-4xl md:text-5xl mb-2"
                style={{
                  transform: "translateZ(20px)",
                }}
              >
                {emotion.emoji}
              </motion.div>
              <div
                className={`text-sm font-medium ${
                  selectedEmotion === index ? "text-white" : emotion.textColor
                }`}
              >
                {emotion.label}
              </div>

              {/* Selection indicator */}
              {selectedEmotion === index && (
                <motion.div
                  layoutId="emotionIndicator"
                  className="absolute -bottom-1 left-1/2 w-1.5 h-1.5 rounded-full bg-white"
                  style={{ x: "-50%" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
