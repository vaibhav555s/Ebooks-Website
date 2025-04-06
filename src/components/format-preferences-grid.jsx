"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  Zap,
  BookOpen,
  Image,
  Headphones,
  GitBranch,
} from "lucide-react";

const formatOptions = [
  {
    id: "short",
    title: "Short Stories",
    description: "3 min reads",
    icon: <Clock className="w-6 h-6" />,
    color: "from-pink-500 to-rose-500",
    pattern:
      "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
    patternSize: "10px 10px",
  },
  {
    id: "flash",
    title: "Flash Fiction",
    description: "1 min reads",
    icon: <Zap className="w-6 h-6" />,
    color: "from-orange-500 to-amber-500",
    pattern:
      "linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)",
    patternSize: "10px 10px",
  },
  {
    id: "series",
    title: "Chapter Series",
    description: "Episodic content",
    icon: <BookOpen className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-500",
    pattern:
      "repeating-linear-gradient(0deg, rgba(255,255,255,0.1), rgba(255,255,255,0.1) 1px, transparent 1px, transparent 6px)",
    patternSize: "6px 6px",
  },
  {
    id: "visual",
    title: "Visual Stories",
    description: "Image-rich content",
    icon: <Image className="w-6 h-6" />,
    color: "from-purple-500 to-indigo-500",
    pattern:
      "repeating-radial-gradient(rgba(255,255,255,0.1) 0, rgba(255,255,255,0.1) 1px, transparent 1px, transparent 100%)",
    patternSize: "10px 10px",
  },
  {
    id: "audio",
    title: "Audio Stories",
    description: "Listen on the go",
    icon: <Headphones className="w-6 h-6" />,
    color: "from-green-500 to-emerald-500",
    pattern:
      "linear-gradient(135deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)",
    patternSize: "10px 10px",
  },
  {
    id: "interactive",
    title: "Interactive",
    description: "Branching narratives",
    icon: <GitBranch className="w-6 h-6" />,
    color: "from-fuchsia-500 to-pink-500",
    pattern:
      "repeating-linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.1) 1px, transparent 1px, transparent 6px)",
    patternSize: "8px 8px",
  },
];

export default function FormatPreferencesGrid({ selected = [], onChange }) {
  const [selectedFormats, setSelectedFormats] = useState(selected);

  const toggleFormat = (formatId) => {
    const newSelected = selectedFormats.includes(formatId)
      ? selectedFormats.filter((id) => id !== formatId)
      : [...selectedFormats, formatId];

    setSelectedFormats(newSelected);
    if (onChange) onChange(newSelected);
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
        <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
          How do you like your stories served?
        </span>
      </motion.h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {formatOptions.map((format, index) => (
          <motion.div
            key={format.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
            whileHover={{ y: -5 }}
            className="relative"
          >
            <motion.button
              onClick={() => toggleFormat(format.id)}
              className={`relative w-full h-full rounded-2xl p-5 text-left transition-all duration-300 overflow-hidden ${
                selectedFormats.includes(format.id)
                  ? `bg-gradient-to-br ${format.color} shadow-lg`
                  : "bg-white/5 hover:bg-white/10 border border-white/10"
              }`}
            >
              {/* Background pattern */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: format.pattern,
                  backgroundSize: format.patternSize,
                }}
              ></div>

              <div className="flex flex-col h-full">
                <div
                  className={`w-12 h-12 rounded-xl mb-3 flex items-center justify-center ${
                    selectedFormats.includes(format.id)
                      ? "bg-white/20"
                      : "bg-white/10"
                  }`}
                >
                  <span
                    className={
                      selectedFormats.includes(format.id)
                        ? "text-white"
                        : "text-purple-200"
                    }
                  >
                    {format.icon}
                  </span>
                </div>

                <h3
                  className={`text-lg font-semibold mb-1 ${
                    selectedFormats.includes(format.id)
                      ? "text-white"
                      : "text-purple-100"
                  }`}
                >
                  {format.title}
                </h3>

                <p
                  className={`text-sm ${
                    selectedFormats.includes(format.id)
                      ? "text-white/80"
                      : "text-purple-200"
                  }`}
                >
                  {format.description}
                </p>

                {/* Toggle indicator */}
                <div className="mt-auto pt-3 flex items-center">
                  <div
                    className={`w-10 h-5 rounded-full relative ${
                      selectedFormats.includes(format.id)
                        ? "bg-white/30"
                        : "bg-white/10"
                    } transition-colors duration-300`}
                  >
                    <motion.div
                      animate={{
                        x: selectedFormats.includes(format.id) ? 20 : 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                      className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full ${
                        selectedFormats.includes(format.id)
                          ? "bg-white"
                          : "bg-purple-300"
                      }`}
                    />
                  </div>
                  <span
                    className={`ml-2 text-xs ${
                      selectedFormats.includes(format.id)
                        ? "text-white"
                        : "text-purple-200"
                    }`}
                  >
                    {selectedFormats.includes(format.id)
                      ? "Selected"
                      : "Tap to select"}
                  </span>
                </div>
              </div>
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
