"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function RoadmapTimeline() {
  const containerRef = useRef(null);
  const [activeItem, setActiveItem] = useState(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const roadmapItems = [
    {
      id: "creator-economy",
      icon: "✨",
      title: "A Gen Z-first story universe",
      timeline: "Q3 2023",
      description:
        "A platform designed for Gen Z storytelling vibes and aesthetic.",
    },
    {
      id: "publishing",
      icon: "📲",
      title: "Publish tiny eBooks",
      timeline: "Q4 2023",
      description:
        "Easy tools for anyone to create and share 3-5 page stories.",
    },
    {
      id: "social",
      icon: "🧑‍🤝‍🧑",
      title: "Grow Your Audience",
      timeline: "Q1 2024",
      description: "Build your follower base and connect with fans..",
    },
    {
      id: "rewards",
      icon: "🎯",
      title: "Earn points, badges & unlock exclusive books",
      timeline: "Q2 2024",
      description:
        "Gamifying the reading experience with rewards and exclusive content.",
    },
    {
      id: "audio",
      icon: "🎤",
      title: "AI Voice Narration",
      timeline: "Q3 2024",
      description: "Let customizable AI voices bring your stories to life.",
    },
    {
      id: "experience",
      icon: "🌙",
      title: "Dark mode, vibe-based filters & interactive animations",
      timeline: "Q4 2024",
      description: "	Dark mode, mood filters, and interactive animations.",
    },
  ];

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-6 h-6 text-orange-500 dark:text-orange-400" />
          <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500 dark:from-orange-400 dark:to-pink-400">
            Our Roadmap
          </h2>
          <Sparkles className="w-6 h-6 text-orange-500 dark:text-orange-400" />
        </div>
        <p className="text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
          We're just getting started! If you love reading or writing tiny
          stories, here's what we're dreaming of building next:
        </p>
      </div>

      <div className="relative mx-auto max-w-4xl">
        {/* Timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-zinc-200 dark:bg-zinc-700 rounded-full">
          <motion.div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-orange-500 to-pink-500 dark:from-orange-400 dark:to-pink-400 rounded-full"
            style={{ height: lineHeight }}
          />
        </div>

        {/* Timeline items */}
        <div className="relative">
          {roadmapItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative mb-16 ${
                index % 2 === 0
                  ? "text-right pr-12 md:pr-0 md:mr-[50%] md:pr-12"
                  : "pl-12 md:pl-0 md:ml-[50%] md:pl-12"
              }`}
              onMouseEnter={() => setActiveItem(item.id)}
              onMouseLeave={() => setActiveItem(null)}
            >
              {/* Timeline dot */}
              <motion.div
                className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                  activeItem === item.id
                    ? "bg-gradient-to-r from-orange-500 to-pink-500 dark:from-orange-400 dark:to-pink-400"
                    : "bg-white dark:bg-zinc-800 border-2 border-orange-500 dark:border-orange-400"
                }`}
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span
                  className={
                    activeItem === item.id
                      ? "text-white"
                      : "text-orange-500 dark:text-orange-400"
                  }
                >
                  {item.icon}
                </span>
              </motion.div>

              {/* Content card */}
              <motion.div
                className="bg-white/70 dark:bg-zinc-800/70 backdrop-blur-sm rounded-xl p-6 shadow-md border border-zinc-200 dark:border-zinc-700 inline-block max-w-xs md:max-w-sm"
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="text-xs font-semibold text-orange-500 dark:text-orange-400 mb-2">
                  {item.timeline}
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-300">
                  {item.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.p
        className="text-center text-zinc-600 dark:text-zinc-400 mt-10 italic"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
      >
        🫶{" "}
        <span className="font-medium">
          We need your support to make this real. Leave your feedback above &
          join our journey!
        </span>
      </motion.p>
    </motion.div>
  );
}
