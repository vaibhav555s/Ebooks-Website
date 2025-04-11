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
    color: "from-orange-500 to-pink-500 dark:from-orange-400 to-pink-400",
    bgColor: "bg-orange-100 dark:bg-orange-900/30",
    textColor: "text-orange-700 dark:text-orange-300",
    borderColor: "border-orange-200 dark:border-orange-800",
  },
  {
    id: "horror",
    label: "Horror",
    icon: <Skull className="w-4 h-4" />,
    color: "from-red-500 to-orange-500 dark:from-red-400 to-orange-400",
    bgColor: "bg-red-100 dark:bg-red-900/30",
    textColor: "text-red-700 dark:text-red-300",
    borderColor: "border-red-200 dark:border-red-800",
  },
  {
    id: "scifi",
    label: "Sci-Fi",
    icon: <Rocket className="w-4 h-4" />,
    color: "from-amber-500 to-orange-500 dark:from-amber-400 to-orange-400",
    bgColor: "bg-amber-100 dark:bg-amber-900/30",
    textColor: "text-amber-700 dark:text-amber-300",
    borderColor: "border-amber-200 dark:border-amber-800",
  },
  {
    id: "mystery",
    label: "Mystery",
    icon: <Compass className="w-4 h-4" />,
    color: "from-orange-500 to-amber-500 dark:from-orange-400 to-amber-400",
    bgColor: "bg-orange-100 dark:bg-orange-900/30",
    textColor: "text-orange-700 dark:text-orange-300",
    borderColor: "border-orange-200 dark:border-orange-800",
  },
  {
    id: "fantasy",
    label: "Fantasy",
    icon: <Wand2 className="w-4 h-4" />,
    color: "from-pink-500 to-orange-500 dark:from-pink-400 to-orange-400",
    bgColor: "bg-pink-100 dark:bg-pink-900/30",
    textColor: "text-pink-700 dark:text-pink-300",
    borderColor: "border-pink-200 dark:border-pink-800",
  },
  {
    id: "sliceoflife",
    label: "Slice-of-Life",
    icon: <Coffee className="w-4 h-4" />,
    color: "from-amber-500 to-yellow-500 dark:from-amber-400 to-yellow-400",
    bgColor: "bg-amber-100 dark:bg-amber-900/30",
    textColor: "text-amber-700 dark:text-amber-300",
    borderColor: "border-amber-200 dark:border-amber-800",
  },
  {
    id: "poetry",
    label: "Poetry",
    icon: <BookText className="w-4 h-4" />,
    color: "from-orange-500 to-amber-500 dark:from-orange-400 to-amber-400",
    bgColor: "bg-orange-100 dark:bg-orange-900/30",
    textColor: "text-orange-700 dark:text-orange-300",
    borderColor: "border-orange-200 dark:border-orange-800",
  },
  {
    id: "interactive",
    label: "Interactive Adventures",
    icon: <Map className="w-4 h-4" />,
    color: "from-rose-500 to-orange-500 dark:from-rose-400 to-orange-400",
    bgColor: "bg-rose-100 dark:bg-rose-900/30",
    textColor: "text-rose-700 dark:text-rose-300",
    borderColor: "border-rose-200 dark:border-rose-800",
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
        <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500 dark:from-orange-400 to-pink-400">
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
                ? `bg-gradient-to-r ${category.color} shadow-md`
                : `${category.bgColor} border ${category.borderColor}`
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
                  : category.textColor
              }
            >
              {category.icon}
            </span>
            <span
              className={`text-sm font-medium ${
                selectedCategories.includes(category.id)
                  ? "text-white"
                  : category.textColor
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
