"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Code,
  Sparkles,
  Headphones,
  Users,
  Trophy,
  GraduationCap,
} from "lucide-react";

const futureFeatures = [
  {
    id: "creator-economy",
    title: "Creator Economy",
    description: "Publish and earn from your stories",
    icon: <Code className="w-6 h-6" />,
    color: "from-amber-500 to-yellow-400",
    timeline: "Coming Q3 2023",
    hypeCount: 1243,
  },
  {
    id: "story-collabs",
    title: "Story Collabs",
    description: "Co-create with friends and strangers",
    icon: <Users className="w-6 h-6" />,
    color: "from-pink-500 to-rose-400",
    timeline: "Coming Q4 2023",
    hypeCount: 982,
  },
  {
    id: "ai-narration",
    title: "AI Narration Studio",
    description: "Turn text into professional audio",
    icon: <Headphones className="w-6 h-6" />,
    color: "from-purple-500 to-indigo-500",
    timeline: "Coming Q1 2024",
    hypeCount: 1567,
  },
  {
    id: "reader-achievements",
    title: "Reader Achievements",
    description: "Earn badges and status",
    icon: <Trophy className="w-6 h-6" />,
    color: "from-cyan-500 to-blue-500",
    timeline: "Coming Q2 2024",
    hypeCount: 876,
  },
  {
    id: "creator-academy",
    title: "Content Creator Academy",
    description: "Learn storytelling from pros",
    icon: <GraduationCap className="w-6 h-6" />,
    color: "from-green-500 to-emerald-500",
    timeline: "Coming Q3 2024",
    hypeCount: 654,
  },
  {
    id: "reading-circles",
    title: "Social Reading Circles",
    description: "Discuss and share reactions",
    icon: <Sparkles className="w-6 h-6" />,
    color: "from-fuchsia-500 to-pink-500",
    timeline: "Coming Q4 2024",
    hypeCount: 1089,
  },
];

export default function FutureVisionShowcase() {
  const containerRef = useRef(null);
  const [activeFeature, setActiveFeature] = useState(null);
  const { scrollXProgress } = useScroll({ container: containerRef });

  const backgroundOpacity = useTransform(scrollXProgress, [0, 1], [0.1, 0.3]);

  const handleHype = (featureId) => {
    // In a real app, this would send an API request to increment the hype count
    console.log(`Hyped feature: ${featureId}`);
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
        <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
          Our Roadmap
        </span>
      </motion.h2>

      <p className="text-center text-purple-200 mb-8">
        Exciting features coming to StoryWave
      </p>

      <div className="relative">
        {/* Background gradient that changes with scroll */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl -z-10"
          style={{ opacity: backgroundOpacity }}
        />

        <div
          ref={containerRef}
          className="flex overflow-x-auto pb-8 pt-4 px-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {futureFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              className="min-w-[280px] md:min-w-[320px] snap-center mx-3 first:ml-0 last:mr-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, container: containerRef }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onHoverStart={() => setActiveFeature(feature.id)}
              onHoverEnd={() => setActiveFeature(null)}
            >
              <motion.div
                className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 h-full"
                whileHover={{
                  y: -10,
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                }}
              >
                {/* Gold accent for premium feel */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-amber-400/10 to-yellow-400/10 rounded-bl-3xl rounded-tr-2xl -z-10"></div>

                <div className="flex flex-col h-full">
                  {/* Icon */}
                  <motion.div
                    className={`w-14 h-14 rounded-xl mb-4 flex items-center justify-center bg-gradient-to-br ${feature.color}`}
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {feature.icon}
                  </motion.div>

                  {/* Title with gradient text */}
                  <h3
                    className={`text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r ${feature.color}`}
                  >
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-purple-200 mb-4">
                    {feature.description}
                  </p>

                  {/* Timeline */}
                  <div className="text-xs text-purple-300 mb-6">
                    {feature.timeline}
                  </div>

                  {/* Hype button */}
                  <div className="mt-auto">
                    <motion.button
                      onClick={() => handleHype(feature.id)}
                      className="w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-medium text-white flex items-center justify-center gap-2 transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Sparkles className="w-4 h-4" />
                      Hype This! ({feature.hypeCount})
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Scroll indicators */}
        <div className="flex justify-center mt-4 gap-1">
          {futureFeatures.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === 0 ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
