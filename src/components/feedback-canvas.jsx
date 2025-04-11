"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Smile, Meh, Frown } from "lucide-react";

const placeholderTexts = [
  "Tell us what you love about StoryWave...",
  "Share your wildest ideas for the platform...",
  "What would make StoryWave perfect for you?",
  "Any features you're missing?",
  "How can we improve your reading experience?",
];

export default function FeedbackCanvas({ value = "", onChange }) {
  const [text, setText] = useState(value);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [sentiment, setSentiment] = useState("neutral"); // positive, neutral, negative
  const [particles, setParticles] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const maxLength = 500;

  // Cycle through placeholder texts
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholderTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Simple sentiment analysis
  useEffect(() => {
    if (text.length > 10) {
      // This is a very simplified sentiment analysis
      // In a real app, you'd use a proper NLP service
      const positiveWords = [
        "love",
        "great",
        "amazing",
        "awesome",
        "excellent",
        "good",
        "like",
        "enjoy",
      ];
      const negativeWords = [
        "hate",
        "bad",
        "terrible",
        "awful",
        "poor",
        "dislike",
        "boring",
        "annoying",
      ];

      const lowerText = text.toLowerCase();
      let positiveCount = 0;
      let negativeCount = 0;

      positiveWords.forEach((word) => {
        if (lowerText.includes(word)) positiveCount++;
      });

      negativeWords.forEach((word) => {
        if (lowerText.includes(word)) negativeCount++;
      });

      if (positiveCount > negativeCount) {
        setSentiment("positive");
      } else if (negativeCount > positiveCount) {
        setSentiment("negative");
      } else {
        setSentiment("neutral");
      }
    } else {
      setSentiment("neutral");
    }
  }, [text]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    if (newText.length <= maxLength) {
      setText(newText);
      if (onChange) onChange(newText);

      // Generate typing particles
      if (newText.length > text.length) {
        generateParticles();
      }
    }
  };

  const generateParticles = () => {
    const newParticles = [];
    for (let i = 0; i < 3; i++) {
      newParticles.push({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 2,
        duration: Math.random() * 1 + 0.5,
        delay: Math.random() * 0.2,
      });
    }
    setParticles([...particles, ...newParticles]);

    // Remove old particles
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newParticles[0].id));
    }, 1500);
  };

  // Calculate progress percentage
  const progress = (text.length / maxLength) * 100;

  // Get color based on sentiment
  const getSentimentColor = () => {
    if (sentiment === "positive")
      return "from-orange-500 to-amber-500 dark:from-orange-400 dark:to-amber-400";
    if (sentiment === "negative")
      return "from-rose-500 to-orange-500 dark:from-rose-400 dark:to-orange-400";
    return "from-amber-500 to-orange-500 dark:from-amber-400 dark:to-orange-400";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <motion.h2
        className="text-2xl md:text-3xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-400 dark:to-amber-400">
          Share your thoughts
        </span>
      </motion.h2>

      <div className="relative">
        {/* Animated gradient border */}
        <motion.div
          className={`absolute -inset-0.5 bg-gradient-to-r ${getSentimentColor()} rounded-2xl blur opacity-30 transition duration-1000`}
          animate={{
            opacity: isFocused ? 0.5 : 0.3,
            scale: isFocused ? 1.01 : 1,
          }}
          transition={{ duration: 0.3 }}
        />

        <div className="relative bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-md">
          {/* Particles container */}
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
                  y: [0, -20],
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>

          <div className="flex items-start gap-4 mb-4">
            {/* Sentiment emoji */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                sentiment === "positive"
                  ? "bg-orange-100 dark:bg-orange-900/30"
                  : sentiment === "negative"
                  ? "bg-rose-100 dark:bg-rose-900/30"
                  : "bg-amber-100 dark:bg-amber-900/30"
              }`}
            >
              {sentiment === "positive" ? (
                <Smile className="w-6 h-6 text-orange-500 dark:text-orange-400" />
              ) : sentiment === "negative" ? (
                <Frown className="w-6 h-6 text-rose-500 dark:text-rose-400" />
              ) : (
                <Meh className="w-6 h-6 text-amber-500 dark:text-amber-400" />
              )}
            </motion.div>

            {/* Character count */}
            <div className="relative w-12 h-12">
              <svg className="w-12 h-12" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#444"
                  strokeWidth="1"
                  strokeDasharray="100, 100"
                  className="text-zinc-300 dark:text-zinc-600"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={
                    progress > 75
                      ? "#f87171"
                      : progress > 50
                      ? "#f59e0b"
                      : "#f97316"
                  }
                  strokeWidth="2"
                  strokeDasharray={`${progress}, 100`}
                />
                <text
                  x="18"
                  y="20.5"
                  textAnchor="middle"
                  fontSize="8"
                  fill="currentColor"
                  className="text-zinc-700 dark:text-zinc-300"
                  fontWeight="bold"
                >
                  {text.length}
                </text>
              </svg>
            </div>
          </div>

          <div className="relative">
            <textarea
              value={text}
              onChange={handleTextChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={placeholderTexts[placeholderIndex]}
              className="w-full min-h-[200px] bg-white/50 dark:bg-zinc-800/50 rounded-xl p-4 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 dark:focus:ring-orange-400/50 resize-none"
            />

            <div className="absolute bottom-4 right-4 text-xs text-zinc-500 dark:text-zinc-400">
              {maxLength - text.length} characters left
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
