"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const emotions = [
  { emoji: "😍", label: "Love it", color: "from-pink-500 to-rose-500" },
  { emoji: "🤩", label: "Amazing", color: "from-fuchsia-500 to-purple-500" },
  { emoji: "😊", label: "Good", color: "from-violet-500 to-indigo-500" },
  { emoji: "😐", label: "Okay", color: "from-blue-500 to-cyan-500" },
  { emoji: "😕", label: "Meh", color: "from-cyan-500 to-teal-500" },
  { emoji: "😢", label: "Sad", color: "from-teal-500 to-emerald-500" },
];

export default function EmotionFeedbackSlider({ value = 3, onChange }) {
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
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-r ${emotions[selectedEmotion].color} opacity-10 rounded-3xl blur-xl transition-all duration-500`}
      ></div>

      <div className="relative bg-gradient-to-br from-purple-900/40 to-fuchsia-900/40 backdrop-blur-xl rounded-3xl p-8 border border-white/10 overflow-hidden">
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-white opacity-70"
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

        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-white">
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
                  : "bg-white/5 hover:bg-white/10"
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
                  selectedEmotion === index ? "text-white" : "text-purple-200"
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
