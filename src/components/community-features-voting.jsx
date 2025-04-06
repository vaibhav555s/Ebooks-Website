"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, MessageSquare, Trophy, Calendar } from "lucide-react";

const features = [
  {
    id: "creatorProfiles",
    title: "Creator Profiles",
    description: "Follow your favorite storytellers",
    icon: <Users className="w-8 h-8" />,
    color: "from-pink-500 to-rose-500",
  },
  {
    id: "socialComments",
    title: "Social Comments",
    description: "Discuss stories with the community",
    icon: <MessageSquare className="w-8 h-8" />,
    color: "from-purple-500 to-indigo-500",
  },
  {
    id: "readerRankings",
    title: "Reader Rankings",
    description: "Earn status as you read more",
    icon: <Trophy className="w-8 h-8" />,
    color: "from-amber-500 to-orange-500",
  },
  {
    id: "liveStoryEvents",
    title: "Live Story Events",
    description: "Join interactive storytelling sessions",
    icon: <Calendar className="w-8 h-8" />,
    color: "from-cyan-500 to-blue-500",
  },
];

export default function CommunityFeaturesVoting({ ratings = {}, onChange }) {
  const [featureRatings, setFeatureRatings] = useState(ratings);
  const [activeCard, setActiveCard] = useState(null);

  const handleRating = (featureId, rating) => {
    const newRatings = {
      ...featureRatings,
      [featureId]: rating,
    };
    setFeatureRatings(newRatings);
    if (onChange) onChange(newRatings);
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
        className="text-2xl md:text-3xl font-bold mb-2 text-center"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
          Help shape our community
        </span>
      </motion.h2>

      <p className="text-center text-purple-200 mb-8">
        Rate these upcoming features to help us prioritize
      </p>

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
              className={`relative bg-gradient-to-br from-purple-900/40 to-fuchsia-900/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10 overflow-hidden transition-all duration-300 ${
                activeCard === feature.id
                  ? "shadow-lg shadow-purple-500/20"
                  : ""
              }`}
            >
              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${
                  feature.color
                } opacity-5 transition-opacity duration-300 ${
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
                  <h3 className="text-xl font-semibold mb-1 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-purple-200 mb-4">
                    {feature.description}
                  </p>

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
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-400"
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
                            className="absolute inset-0 rounded-full bg-yellow-400/30"
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
  );
}
