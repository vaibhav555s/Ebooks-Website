"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Users, MessageSquare, Trophy, Calendar } from "lucide-react"

const features = [
  {
    id: "creatorProfiles",
    title: "Creator Profiles",
    description: "Follow your favorite storytellers",
    icon: <Users className="w-8 h-8" />,
    color: "from-orange-500 to-pink-500 dark:from-orange-400 to-pink-400",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    textColor: "text-orange-700 dark:text-orange-300",
    borderColor: "border-orange-200 dark:border-orange-800",
  },
  // {
  //   id: "socialComments",
  //   title: "Social Comments",
  //   description: "Discuss stories with the community",
  //   icon: <MessageSquare className="w-8 h-8" />,
  //   color: "from-rose-500 to-orange-500 dark:from-rose-400 to-orange-400",
  //   bgColor: "bg-rose-50 dark:bg-rose-900/20",
  //   textColor: "text-rose-700 dark:text-rose-300",
  //   borderColor: "border-rose-200 dark:border-rose-800",
  // },
  {
    id: "readerRankings",
    title: "Reader Rankings",
    description: "Earn points as you read more",
    icon: <Trophy className="w-8 h-8" />,
    color: "from-amber-500 to-orange-500 dark:from-amber-400 to-orange-400",
    bgColor: "bg-amber-50 dark:bg-amber-900/20",
    textColor: "text-amber-700 dark:text-amber-300",
    borderColor: "border-amber-200 dark:border-amber-800",
  },
  // {
  //   id: "liveStoryEvents",
  //   title: "Live Story Events",
  //   description: "Join interactive storytelling sessions",
  //   icon: <Calendar className="w-8 h-8" />,
  //   color: "from-pink-500 to-orange-500 dark:from-pink-400 to-orange-400",
  //   bgColor: "bg-pink-50 dark:bg-pink-900/20",
  //   textColor: "text-pink-700 dark:text-pink-300",
  //   borderColor: "border-pink-200 dark:border-pink-800",
  // },
]

export default function CommunityFeaturesVoting({ ratings = {}, onChange }) {
  const [featureRatings, setFeatureRatings] = useState(ratings)
  const [activeCard, setActiveCard] = useState(null)

  const handleRating = (featureId, rating) => {
    const newRatings = {
      ...featureRatings,
      [featureId]: rating,
    }
    setFeatureRatings(newRatings)
    if (onChange) onChange(newRatings)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <motion.div
        className="text-center mb-8 p-4 rounded-xl bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 shadow-sm"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500 dark:from-orange-400 to-pink-400">
          Help shape our community
        </h2>
        <p className="text-zinc-600 dark:text-zinc-300">Rate these upcoming features to help us prioritize</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
            whileHover={{
              y: -5,
              rotateY: 5,
              rotateX: 5,
              z: 10,
            }}
            onHoverStart={() => setActiveCard(feature.id)}
            onHoverEnd={() => setActiveCard(null)}
            className="relative"
            style={{
              transformStyle: "preserve-3d",
              perspective: "1000px",
            }}
          >
            <div
              className={`relative bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-6 border ${feature.borderColor} overflow-hidden transition-all duration-300 ${
                activeCard === feature.id ? "shadow-lg" : "shadow-sm"
              }`}
            >
              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5 transition-opacity duration-300 ${
                  activeCard === feature.id ? "opacity-10" : "opacity-5"
                }`}
              ></div>

              <div className="flex items-start gap-4">
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${feature.color}`}
                >
                  {feature.icon}
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1 text-zinc-900 dark:text-white">{feature.title}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-4">{feature.description}</p>

                  {/* Star Rating */}
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        onClick={() => handleRating(feature.id, star)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="relative"
                      >
                        <svg
                          className={`w-8 h-8 ${
                            (featureRatings[feature.id] || 0) >= star
                              ? "text-orange-400 fill-orange-400 dark:text-orange-300 dark:fill-orange-300"
                              : "text-zinc-300 dark:text-zinc-600"
                          } transition-colors duration-200`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="1"
                          fill="none"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>

                        {/* Particle effect on selection */}
                        {(featureRatings[feature.id] || 0) === star && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: [0, 1.5, 0] }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 rounded-full bg-orange-400/30 dark:bg-orange-300/30"
                          />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
