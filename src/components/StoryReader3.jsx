"use client";

import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { booksData } from "../data/data";
import { motion, AnimatePresence } from "framer-motion";
import { IoArrowBackOutline } from "react-icons/io5";
import { FaVolumeUp, FaSun, FaMoon } from "react-icons/fa";

export default function StoryReader() {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = booksData.find((b) => b.id === Number.parseInt(id));
  const [progress, setProgress] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [showTitle, setShowTitle] = useState(false);
  const contentRef = useRef(null);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowTitle(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const element = contentRef.current;
        const scrollTop = window.scrollY;
        const scrollHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = (scrollTop / scrollHeight) * 100;
        setProgress(scrollProgress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!book) return <p className="text-center text-white">Book not found!</p>;

  return (
    <div
      className={`relative min-h-screen overflow-hidden transition-colors duration-700 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      {/* Animated Background */}
      <div className="fixed inset-0 z-[-2] overflow-hidden">
        <div
          className={`absolute inset-0 ${
            darkMode
              ? "bg-gradient-to-br from-indigo-900/30 via-purple-900/30 to-gray-900/30"
              : "bg-gradient-to-br from-orange-100/30 via-amber-100/30 to-gray-100/30"
          }`}
        ></div>

        {/* Animated particles/stars */}
        <div className="stars-container">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${
                darkMode ? "bg-white" : "bg-amber-400"
              }`}
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                opacity: Math.random() * 0.5 + 0.1,
                scale: Math.random() * 0.5 + 0.1,
              }}
              animate={{
                x: [null, `${Math.random() * 100}%`, `${Math.random() * 100}%`],
                y: [null, `${Math.random() * 100}%`, `${Math.random() * 100}%`],
                opacity: [
                  null,
                  Math.random() * 0.7 + 0.3,
                  Math.random() * 0.5 + 0.1,
                ],
              }}
              transition={{
                duration: Math.random() * 60 + 30,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{
                width: `${Math.random() * 6 + 1}px`,
                height: `${Math.random() * 6 + 1}px`,
              }}
            />
          ))}
        </div>

        {/* Light rays */}
        <motion.div
          className={`absolute inset-0 ${
            darkMode
              ? "bg-gradient-radial from-purple-500/10 via-transparent to-transparent"
              : "bg-gradient-radial from-amber-300/20 via-transparent to-transparent"
          }`}
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{
            backgroundSize: "200% 200%",
            backgroundPosition: "center",
            transform: "translate(-50%, -50%)",
            left: "50%",
            top: "50%",
            width: "150%",
            height: "150%",
          }}
        />
      </div>

      {/* Nebula effect */}
      <div className="fixed inset-0 z-[-1] opacity-30">
        <div
          className={`absolute inset-0 ${
            darkMode
              ? "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/40 via-indigo-900/20 to-transparent"
              : "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-200/40 via-orange-100/20 to-transparent"
          }`}
        ></div>
      </div>

      {/* Scroll Progress Bar */}
      <motion.div
        className={`fixed top-0 left-0 h-1 z-50 ${
          darkMode
            ? "bg-gradient-to-r from-purple-500 to-orange-500"
            : "bg-gradient-to-r from-amber-400 to-orange-500"
        }`}
        style={{ width: `${progress}%` }}
        initial={{ width: "0%" }}
        animate={{ width: `${progress}%` }}
        transition={{ type: "spring", stiffness: 50 }}
      />

      {/* Back Button */}
      <motion.button
        onClick={() => navigate(-1)}
        className={`fixed top-6 left-6 z-50 p-3 rounded-full ${
          darkMode
            ? "bg-gray-800/80 text-white hover:bg-gray-700/80"
            : "bg-white/80 text-gray-800 hover:bg-gray-100/80"
        } backdrop-blur-md shadow-lg border border-gray-700/20`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <IoArrowBackOutline size={24} />
      </motion.button>

      {/* Dark Mode Toggle Button */}
      <motion.button
        onClick={() => setDarkMode(!darkMode)}
        className={`fixed top-6 right-6 z-50 p-3 rounded-full ${
          darkMode
            ? "bg-gray-800/80 text-white hover:bg-gray-700/80"
            : "bg-white/80 text-gray-800 hover:bg-gray-100/80"
        } backdrop-blur-md shadow-lg border border-gray-700/20`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <AnimatePresence mode="wait">
          {darkMode ? (
            <motion.div
              key="sun"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FaSun size={24} className="text-amber-400" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FaMoon size={24} className="text-indigo-400" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Loading Animation */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className={`w-16 h-16 rounded-full border-4 ${
                darkMode
                  ? "border-purple-500 border-t-transparent"
                  : "border-orange-500 border-t-transparent"
              }`}
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Story Card */}
      <div className="flex flex-col items-center justify-center min-h-screen p-6 py-20">
        <motion.div
          ref={contentRef}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className={`relative max-w-3xl w-full p-8 md:p-10 rounded-3xl shadow-2xl ${
            darkMode
              ? "bg-gray-800/40 text-gray-100"
              : "bg-white/70 text-gray-800"
          } backdrop-blur-md border ${
            darkMode ? "border-purple-500/20" : "border-amber-200/30"
          }`}
          style={{
            boxShadow: darkMode
              ? "0 0 40px rgba(139, 92, 246, 0.15)"
              : "0 0 40px rgba(251, 191, 36, 0.15)",
          }}
        >
          {/* Glow effect */}
          <div
            className={`absolute inset-0 rounded-3xl ${
              darkMode
                ? "bg-gradient-to-br from-purple-500/5 to-orange-500/5"
                : "bg-gradient-to-br from-amber-200/10 to-orange-300/10"
            } z-[-1] blur-xl`}
          ></div>

          {/* Typing Title Effect */}
          <AnimatePresence>
            {showTitle && (
              <motion.h1
                className={`text-3xl md:text-5xl font-bold mb-6 text-center tracking-wide ${
                  darkMode
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400"
                    : "text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500"
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {book.title.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.8 + index * 0.05,
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.h1>
            )}
          </AnimatePresence>

          {/* AI Voice Narration Button */}
          <motion.button
            className={`mb-8 px-6 py-3 rounded-full flex items-center justify-center gap-2 mx-auto ${
              darkMode
                ? "bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white"
                : "bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white"
            } shadow-lg`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <FaVolumeUp className="text-lg" />
            <span className="font-medium">Play Narration</span>
          </motion.button>

          {/* Story Content */}
          <motion.div
            className="space-y-6 text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 1 }}
          >
            {book.story.split("\n\n").map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 1.8 + index * 0.1,
                  duration: 0.5,
                }}
                className={`${
                  darkMode ? "text-gray-200" : "text-gray-700"
                } tracking-wide leading-relaxed`}
                whileHover={{
                  scale: 1.01,
                  transition: { duration: 0.2 },
                }}
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Custom Scrollbar - Added via CSS */}
    </div>
  );
}
