import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { booksData } from "../data/data";
import { motion } from "framer-motion";
import { IoArrowBackOutline } from "react-icons/io5";
import { FaVolumeUp, FaSun, FaMoon } from "react-icons/fa";
// import useSound from "use-sound";
// import pageFlipSound from "../assets/page-flip.mp3";

export default function StoryReader2() {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = booksData.find((b) => b.id === parseInt(id));
  const [progress, setProgress] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  // const [play] = useSound(pageFlipSound, { volume: 0.5 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = (scrollTop / scrollHeight) * 100;
      setProgress(scrollProgress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!book) return <p className="text-center text-white">Book not found!</p>;

  return (
    <div
      className={`relative min-h-screen overflow-hidden transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Background Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className={`absolute inset-0 ${
          darkMode
            ? "bg-gradient-to-br from-gray-800 to-gray-900"
            : "bg-gradient-to-br from-gray-200 to-gray-300"
        } opacity-75 z-[-1]`}
      />

      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 w-full h-1 bg-orange-500"
        style={{ width: `${progress}%` }}
      />

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 text-white p-2 rounded-full bg-gray-700 hover:bg-gray-600"
      >
        <IoArrowBackOutline size={30} />
      </button>

      {/* Dark Mode Toggle Button */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4 p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-white"
      >
        {darkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
      </button>

      {/* Story Card */}
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className={`max-w-3xl p-8 ${
            darkMode
              ? "bg-white bg-opacity-10 text-gray-200"
              : "bg-white text-gray-900"
          } backdrop-blur-lg rounded-3xl shadow-lg text-center`}
        >
          {/* Typing Title Effect */}
          <h1 className="text-3xl md:text-5xl font-bold text-orange-400 mb-4">
            {book.title}
          </h1>

          {/* AI Voice Narration Button */}
          <button className="mb-4 text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg flex items-center gap-2">
            <FaVolumeUp /> Play Narration (Coming Soon)
          </button>

          {/* Story Content */}
          <p className="text-lg leading-relaxed">{book.story}</p>
        </motion.div>
      </div>
    </div>
  );
}
