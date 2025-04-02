import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { booksData } from "../data/data";
import { motion } from "framer-motion";
import { IoArrowBackOutline } from "react-icons/io5";

export default function StoryReader2() {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = booksData.find((b) => b.id === parseInt(id));
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Play page flip sound
  useEffect(() => {
    const flipSound = new Audio("/sounds/page-flip.mp3");
    flipSound.play();
  }, []);

  // Toggle Dark Mode
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div
      className={`min-h-screen p-6 md:p-12 flex flex-col items-center transition-all duration-300 ${
        isDarkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-orange-50 to-orange-200"
      }`}
    >
      {/* Navbar with Back Button */}
      <div className="w-full max-w-3xl flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-ghost flex items-center gap-2"
        >
          <IoArrowBackOutline size={24} /> Back
        </button>
        <button onClick={toggleDarkMode} className="btn btn-outline btn-sm">
          {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* Story Content */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-2xl p-6 md:p-8 max-w-3xl w-full border-l-4 border-orange-500"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          {book.title}
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed text-justify font-serif">
          {book.story}
        </p>
      </motion.div>

      {/* Reading Progress Bar */}
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: "50%" }}
        transition={{ duration: 1 }}
        className="h-2 bg-orange-500 rounded-full mt-6 max-w-3xl w-full"
      ></motion.div>
    </div>
  );
}
