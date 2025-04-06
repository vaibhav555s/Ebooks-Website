"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Smile, Meh, Frown } from "lucide-react"

const placeholderTexts = [
  "Tell us what you love...",
  "Share your wildest ideas...",
  "What would make StoryWave perfect for you?",
  "Any features you're missing?",
  "How can we improve your reading experience?",
]

export default function FeedbackCanvas({ value = "", onChange }) {
  const [text, setText] = useState(value)
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [sentiment, setSentiment] = useState("neutral") // positive, neutral, negative
  const [particles, setParticles] = useState([])
  const maxLength = 500

  // Cycle through placeholder texts
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholderTexts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Simple sentiment analysis
  useEffect(() => {
    if (text.length > 10) {
      // This is a very simplified sentiment analysis
      // In a real app, you'd use a proper NLP service
      const positiveWords = ["love", "great", "amazing", "awesome", "excellent", "good", "like", "enjoy"]
      const negativeWords = ["hate", "bad", "terrible", "awful", "poor", "dislike", "boring", "annoying"]

      const lowerText = text.toLowerCase()
      let positiveCount = 0
      let negativeCount = 0

      positiveWords.forEach((word) => {
        if (lowerText.includes(word)) positiveCount++
      })

      negativeWords.forEach((word) => {
        if (lowerText.includes(word)) negativeCount++
      })

      if (positiveCount > negativeCount) {
        setSentiment("positive")
      } else if (negativeCount > positiveCount) {
        setSentiment("negative")
      } else {
        setSentiment("neutral")
      }
    } else {
      setSentiment("neutral")
    }
  }, [text])

  const handleTextChange = (e) => {
    const newText = e.target.value
    if (newText.length <= maxLength) {
      setText(newText)
      if (onChange) onChange(newText)

      // Generate typing particles
      if (newText.length > text.length) {
        generateParticles()
      }
    }
  }

  const generateParticles = () => {
    const newParticles = []
    for (let i = 0; i < 3; i++) {
      newParticles.push({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 2,
        duration: Math.random() * 1 + 0.5,
        delay: Math.random() * 0.2,
      })
    }
    setParticles([...particles, ...newParticles])

    // Remove old particles
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newParticles[0].id))
    }, 1500)
  }

  // Calculate progress percentage
  const progress = (text.length / maxLength) * 100

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
        <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
          Share your thoughts
        </span>
      </motion.h2>

      <div className="relative">
        {/* Animated gradient border */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-x"></div>

        <div className="relative bg-gradient-to-br from-purple-900/40 to-fuchsia-900/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          {/* Particles container */}
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
                  ? "bg-green-500/20"
                  : sentiment === "negative"
                    ? "bg-red-500/20"
                    : "bg-blue-500/20"
              }`}
            >
              {sentiment === "positive" ? (
                <Smile className="w-6 h-6 text-green-400" />
              ) : sentiment === "negative" ? (
                <Frown className="w-6 h-6 text-red-400" />
              ) : (
                <Meh className="w-6 h-6 text-blue-400" />
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
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={progress > 75 ? "#f87171" : progress > 50 ? "#fbbf24" : "#60a5fa"}
                  strokeWidth="2"
                  strokeDasharray={`${progress}, 100`}
                />
                <text x="18" y="20.5" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">
                  {text.length}
                </text>
              </svg>
            </div>
          </div>

          <div className="relative">
            <textarea
              value={text}
              onChange={handleTextChange}
              placeholder={placeholderTexts[placeholderIndex]}
              className="w-full min-h-[200px] bg-white/5 rounded-xl p-4 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
            />

            <div className="absolute bottom-4 right-4 text-xs text-purple-300">
              {maxLength - text.length} characters left
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

