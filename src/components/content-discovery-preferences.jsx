"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Skull,
  Rocket,
  Compass,
  Wand2,
  Coffee,
  BookText,
  Map,
} from "lucide-react";

const categories = [
  {
    id: "romance",
    label: "Romance",
    icon: <BookOpen className="w-4 h-4" />,
    color: "from-pink-500 to-rose-400",
  },
  {
    id: "horror",
    label: "Horror",
    icon: <Skull className="w-4 h-4" />,
    color: "from-red-500 to-orange-500",
  },
  {
    id: "scifi",
    label: "Sci-Fi",
    icon: <Rocket className="w-4 h-4" />,
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: "mystery",
    label: "Mystery",
    icon: <Compass className="w-4 h-4" />,
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: "fantasy",
    label: "Fantasy",
    icon: <Wand2 className="w-4 h-4" />,
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    id: "sliceoflife",
    label: "Slice-of-Life",
    icon: <Coffee className="w-4 h-4" />,
    color: "from-amber-500 to-yellow-400",
  },
  {
    id: "poetry",
    label: "Poetry",
    icon: <BookText className="w-4 h-4" />,
    color: "from-emerald-500 to-teal-400",
  },
  {
    id: "interactive",
    label: "Interactive Adventures",
    icon: <Map className="w-4 h-4" />,
    color: "from-purple-500 to-pink-500",
  },
];

export default function ContentDiscoveryPreferences({
  selected = [],
  onChange,
}) {
  const [selectedCategories, setSelectedCategories] = useState(selected);

  const toggleCategory = (categoryId) => {
    const newSelected = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];

    setSelectedCategories(newSelected);
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
        <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500">
          Most interested in reading...
        </span>
      </motion.h2>

      <div className="flex flex-wrap justify-center gap-3 md:gap-4">
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            onClick={() => toggleCategory(category.id)}
            className={`relative group ${
              selectedCategories.includes(category.id)
                ? `bg-gradient-to-r ${category.color} shadow-lg`
                : "bg-white/5 hover:bg-white/10"
            } rounded-full px-4 py-2 transition-all duration-300 flex items-center gap-2`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
          >
            <span
              className={
                selectedCategories.includes(category.id)
                  ? "text-white"
                  : "text-purple-200"
              }
            >
              {category.icon}
            </span>
            <span
              className={`text-sm font-medium ${
                selectedCategories.includes(category.id)
                  ? "text-white"
                  : "text-purple-200"
              }`}
            >
              {category.label}
            </span>

            {/* Selection animation */}
            {selectedCategories.includes(category.id) && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.5, 1] }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 rounded-full bg-white/20 -z-10"
              />
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
