"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import { DollarSign, Users, Sparkles, Headphones } from "lucide-react";

const visionOptions = [
  {
    id: "creatorEconomy",
    title: "Creator Economy",
    description: "Publish and monetize your stories",
    icon: <DollarSign className="w-8 h-8" />,
    color: "from-amber-500 to-yellow-400",
    gradient:
      "linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(252, 211, 77, 0.2) 100%)",
  },
  {
    id: "socialStorytelling",
    title: "Social Storytelling",
    description: "Collaborate with others on stories",
    icon: <Users className="w-8 h-8" />,
    color: "from-pink-500 to-rose-400",
    gradient:
      "linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, rgba(244, 114, 182, 0.2) 100%)",
  },
  {
    id: "aiStoryEnhancement",
    title: "AI Story Enhancement",
    description: "AI tools to enhance your writing",
    icon: <Sparkles className="w-8 h-8" />,
    color: "from-purple-500 to-indigo-500",
    gradient:
      "linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(99, 102, 241, 0.2) 100%)",
  },
  {
    id: "audioUniverse",
    title: "Audio Universe",
    description: "Professional narrations of stories",
    icon: <Headphones className="w-8 h-8" />,
    color: "from-cyan-500 to-blue-500",
    gradient:
      "linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)",
  },
];

const enthusiasmLabels = [
  "Need it now!",
  "Very excited",
  "Sounds good",
  "Maybe later",
  "Not interested",
];

export default function FutureVisionSelector({ interests = {}, onChange }) {
  const [visionInterests, setVisionInterests] = useState(interests);
  const carouselRef = useRef(null);
  const x = useMotionValue(0);

  const handleInterestLevel = (visionId, level) => {
    const newInterests = {
      ...visionInterests,
      [visionId]: level,
    };
    setVisionInterests(newInterests);
    if (onChange) onChange(newInterests);
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
        <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400">
          The future of StoryWave
        </span>
      </motion.h2>

      <p className="text-center text-purple-200 mb-8">
        How excited are you about these upcoming features?
      </p>

      <div className="overflow-hidden">
        <motion.div
          ref={carouselRef}
          className="flex gap-6 pb-4 px-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          style={{
            x,
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {visionOptions.map((vision, index) => (
            <motion.div
              key={vision.id}
              className="min-w-[300px] md:min-w-[350px] snap-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              <div className="relative bg-gradient-to-br from-purple-900/40 to-fuchsia-900/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10 h-full">
                {/* Gold accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-400/20 to-yellow-400/20 rounded-bl-3xl rounded-tr-2xl -z-10"></div>

                <div className="flex flex-col h-full">
                  <div
                    className={`w-16 h-16 rounded-xl mb-4 flex items-center justify-center bg-gradient-to-br ${vision.color}`}
                  >
                    {vision.icon}
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-white">
                    {vision.title}
                  </h3>

                  <p className="text-sm text-purple-200 mb-6">
                    {vision.description}
                  </p>

                  {/* Enthusiasm meter */}
                  <div className="mt-auto">
                    <p className="text-sm font-medium text-purple-200 mb-2">
                      Your interest level:
                    </p>
                    <div className="flex flex-col gap-2">
                      {enthusiasmLabels.map((label, level) => (
                        <motion.button
                          key={level}
                          onClick={() => handleInterestLevel(vision.id, level)}
                          className={`relative px-4 py-2 rounded-lg text-sm text-left transition-all duration-200 ${
                            visionInterests[vision.id] === level
                              ? `bg-gradient-to-r ${vision.color} text-white`
                              : "bg-white/5 hover:bg-white/10 text-purple-200"
                          }`}
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center">
                            <div
                              className={`w-4 h-4 rounded-full mr-3 flex-shrink-0 ${
                                visionInterests[vision.id] === level
                                  ? "bg-white"
                                  : "border-2 border-purple-300"
                              }`}
                            >
                              {visionInterests[vision.id] === level && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="w-full h-full rounded-full bg-white"
                                />
                              )}
                            </div>
                            {label}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="flex justify-center mt-4 gap-1">
        {visionOptions.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === 0 ? "bg-white" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}
