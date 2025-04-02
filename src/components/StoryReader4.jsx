"use client";

import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { booksData } from "../data/data";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { IoArrowBackOutline } from "react-icons/io5";
import { FaSun, FaMoon, FaVolumeUp, FaBookOpen } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import "./StoryReader.css";

export default function StoryReader() {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = booksData.find((b) => b.id === Number.parseInt(id));
  const [progress, setProgress] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [showTitle, setShowTitle] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  const [fontFamily, setFontFamily] = useState("serif");
  const contentRef = useRef(null);
  const scrollRef = useRef(null);
  const lastScrollY = useRef(0);

  // Scroll animation
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowTitle(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const scrollTop = window.scrollY;
        const scrollHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = (scrollTop / scrollHeight) * 100;
        setProgress(scrollProgress);

        // Auto-hide navbar on scroll down, show on scroll up
        if (scrollTop > lastScrollY.current + 20) {
          setShowNavbar(false);
          lastScrollY.current = scrollTop;
        } else if (scrollTop < lastScrollY.current - 20) {
          setShowNavbar(true);
          lastScrollY.current = scrollTop;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle font size changes
  const changeFontSize = (delta) => {
    setFontSize((prevSize) => {
      const newSize = prevSize + delta;
      return Math.min(Math.max(newSize, 14), 24); // Limit between 14px and 24px
    });
  };

  if (!book) return <p className="text-center text-white">Book not found!</p>;

  return (
    <div
      ref={scrollRef}
      className={`relative min-h-screen overflow-hidden transition-colors duration-700 ${
        darkMode
          ? "dark-mode bg-slate-900 text-gray-100"
          : "light-mode bg-amber-50 text-gray-800"
      } font-${fontFamily}`}
    >
      {/* Animated Background with Parallax */}
      <motion.div
        className="fixed inset-0 z-[-2] overflow-hidden"
        style={{ y: backgroundY }}
      >
        <div
          className={`absolute inset-0 ${
            darkMode
              ? "bg-gradient-to-b from-indigo-950 via-slate-900 to-purple-950"
              : "bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100"
          } opacity-80`}
        ></div>

        {/* Abstract shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`shape-${i}`}
              className={`absolute rounded-full blur-3xl ${
                darkMode ? "bg-indigo-900/20" : "bg-amber-200/30"
              }`}
              initial={{
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
                scale: Math.random() * 1 + 0.5,
              }}
              animate={{
                x: [
                  `${Math.random() * 100}%`,
                  `${Math.random() * 100}%`,
                  `${Math.random() * 100}%`,
                ],
                y: [
                  `${Math.random() * 100}%`,
                  `${Math.random() * 100}%`,
                  `${Math.random() * 100}%`,
                ],
                scale: [
                  Math.random() * 1 + 0.5,
                  Math.random() * 1.5 + 0.5,
                  Math.random() * 1 + 0.5,
                ],
              }}
              transition={{
                duration: Math.random() * 60 + 60,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              style={{
                width: `${Math.random() * 40 + 10}vw`,
                height: `${Math.random() * 40 + 10}vh`,
                opacity: Math.random() * 0.2 + 0.1,
              }}
            />
          ))}
        </div>

        {/* Subtle wave effect */}
        <div className="absolute inset-0 opacity-20">
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 800"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              fill={darkMode ? "#4338ca" : "#fbbf24"}
              fillOpacity="0.2"
              initial={{ y: 0 }}
              animate={{ y: [0, -20, 0] }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <motion.path
              d="M0,96L48,128C96,160,192,224,288,213.3C384,203,480,117,576,117.3C672,117,768,203,864,218.7C960,235,1056,181,1152,149.3C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              fill={darkMode ? "#6366f1" : "#f59e0b"}
              fillOpacity="0.2"
              initial={{ y: 0 }}
              animate={{ y: [0, 20, 0] }}
              transition={{
                duration: 25,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </svg>
        </div>
      </motion.div>

      {/* Navbar - Auto-hides on scroll */}
      <AnimatePresence>
        {showNavbar && (
          <motion.div
            className={`fixed top-0 left-0 right-0 z-50 px-4 py-4 flex justify-between items-center ${
              darkMode ? "bg-slate-900/70" : "bg-amber-50/70"
            } backdrop-blur-md border-b ${
              darkMode ? "border-indigo-900/30" : "border-amber-200/50"
            } transition-all duration-300`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <motion.button
              onClick={() => navigate(-1)}
              className={`p-3 rounded-full ${
                darkMode
                  ? "bg-slate-800/80 text-white hover:bg-slate-700/80"
                  : "bg-white/80 text-gray-800 hover:bg-gray-100/80"
              } backdrop-blur-md shadow-lg border ${
                darkMode ? "border-indigo-500/20" : "border-amber-200/50"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <IoArrowBackOutline size={20} />
            </motion.button>

            <h2
              className={`text-lg font-medium ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              {book.title.length > 30
                ? book.title.substring(0, 30) + "..."
                : book.title}
            </h2>

            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-3 rounded-full ${
                darkMode
                  ? "bg-slate-800/80 text-white hover:bg-slate-700/80"
                  : "bg-white/80 text-gray-800 hover:bg-gray-100/80"
              } backdrop-blur-md shadow-lg border ${
                darkMode ? "border-indigo-500/20" : "border-amber-200/50"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
                    <FaSun size={20} className="text-amber-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaMoon size={20} className="text-indigo-400" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Progress Bar - Bottom position */}
      <motion.div
        className={`fixed bottom-0 left-0 h-1 z-50 ${
          darkMode
            ? "bg-gradient-to-r from-indigo-500 to-purple-500"
            : "bg-gradient-to-r from-amber-400 to-orange-400"
        }`}
        style={{ width: `${progress}%` }}
        initial={{ width: "0%" }}
        animate={{ width: `${progress}%` }}
        transition={{ type: "spring", stiffness: 50 }}
      />

      {/* Circular Progress Indicator */}
      <motion.div
        className={`fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full flex items-center justify-center ${
          darkMode
            ? "bg-slate-800/80 text-white border border-indigo-500/30"
            : "bg-white/80 text-gray-800 border border-amber-300/50"
        } backdrop-blur-md shadow-lg`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <svg className="w-full h-full" viewBox="0 0 36 36">
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke={darkMode ? "#312e81" : "#fef3c7"}
            strokeWidth="3"
            strokeDasharray="100, 100"
          />
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke={darkMode ? "#818cf8" : "#f59e0b"}
            strokeWidth="3"
            strokeDasharray={`${progress}, 100`}
          />
          <text
            x="18"
            y="21"
            textAnchor="middle"
            fontSize="10"
            fill={darkMode ? "#ffffff" : "#1f2937"}
            fontWeight="bold"
          >
            {Math.round(progress)}%
          </text>
        </svg>
      </motion.div>

      {/* Text Settings Button */}
      <motion.button
        onClick={() => setShowSettings(!showSettings)}
        className={`fixed bottom-6 left-6 z-40 p-3 rounded-full ${
          darkMode
            ? "bg-slate-800/80 text-white border border-indigo-500/30"
            : "bg-white/80 text-gray-800 border border-amber-300/50"
        } backdrop-blur-md shadow-lg`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <span className="text-lg font-serif font-bold">Aa</span>
      </motion.button>

      {/* Text Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            className={`fixed bottom-20 left-6 z-40 p-4 rounded-xl ${
              darkMode
                ? "bg-slate-800/90 text-white border border-indigo-500/30"
                : "bg-white/90 text-gray-800 border border-amber-300/50"
            } backdrop-blur-md shadow-lg w-64`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Text Settings</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <IoMdClose size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Font Size</label>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => changeFontSize(-1)}
                    className={`p-2 rounded-md ${
                      darkMode
                        ? "bg-slate-700 hover:bg-slate-600"
                        : "bg-amber-100 hover:bg-amber-200"
                    }`}
                  >
                    A-
                  </button>
                  <span>{fontSize}px</span>
                  <button
                    onClick={() => changeFontSize(1)}
                    className={`p-2 rounded-md ${
                      darkMode
                        ? "bg-slate-700 hover:bg-slate-600"
                        : "bg-amber-100 hover:bg-amber-200"
                    }`}
                  >
                    A+
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Font Family</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setFontFamily("serif")}
                    className={`p-2 rounded-md font-serif ${
                      fontFamily === "serif"
                        ? darkMode
                          ? "bg-indigo-600 text-white"
                          : "bg-amber-400 text-white"
                        : darkMode
                        ? "bg-slate-700"
                        : "bg-amber-100"
                    }`}
                  >
                    Serif
                  </button>
                  <button
                    onClick={() => setFontFamily("sans")}
                    className={`p-2 rounded-md font-sans ${
                      fontFamily === "sans"
                        ? darkMode
                          ? "bg-indigo-600 text-white"
                          : "bg-amber-400 text-white"
                        : darkMode
                        ? "bg-slate-700"
                        : "bg-amber-100"
                    }`}
                  >
                    Sans
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Animation */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className={`fixed inset-0 z-50 flex items-center justify-center ${
              darkMode ? "bg-slate-900" : "bg-amber-50"
            }`}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div className="flex flex-col items-center">
              <motion.div
                className={`w-16 h-16 mb-4 ${
                  darkMode ? "text-indigo-500" : "text-amber-500"
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <FaBookOpen size={64} />
              </motion.div>

              <motion.div
                className={`h-1 w-48 rounded-full overflow-hidden ${
                  darkMode ? "bg-slate-800" : "bg-amber-100"
                }`}
              >
                <motion.div
                  className={`h-full ${
                    darkMode ? "bg-indigo-500" : "bg-amber-500"
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Story Content */}
      <div className="flex flex-col items-center justify-center min-h-screen p-6 py-20">
        <motion.div
          ref={contentRef}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className={`relative max-w-3xl w-full p-8 md:p-10 rounded-3xl shadow-2xl ${
            darkMode
              ? "bg-slate-800/40 text-gray-100"
              : "bg-white/90 text-gray-800"
          } backdrop-blur-md border ${
            darkMode ? "border-indigo-500/20" : "border-amber-200/30"
          }`}
          style={{
            boxShadow: darkMode
              ? "0 10px 30px -5px rgba(79, 70, 229, 0.2)"
              : "0 10px 30px -5px rgba(251, 191, 36, 0.2)",
          }}
        >
          {/* Paper texture overlay for light mode */}
          {!darkMode && (
            <div
              className="absolute inset-0 rounded-3xl opacity-5 pointer-events-none"
              style={{
                backgroundImage:
                  "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmOWY5ZjkiPjwvcmVjdD4KPC9zdmc+')",
              }}
            />
          )}

          {/* Glow effect */}
          <div
            className={`absolute inset-0 rounded-3xl ${
              darkMode
                ? "bg-gradient-to-br from-indigo-500/5 to-purple-500/5"
                : "bg-gradient-to-br from-amber-200/10 to-orange-300/10"
            } z-[-1] blur-xl`}
          ></div>

          {/* Typing Title Effect */}
          <AnimatePresence>
            {showTitle && (
              <motion.h1
                className={`text-3xl md:text-5xl font-bold mb-8 text-center tracking-wide ${
                  darkMode
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400"
                    : "text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500"
                } ${fontFamily === "serif" ? "font-serif" : "font-sans"}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                  textShadow: darkMode
                    ? "0 0 20px rgba(79, 70, 229, 0.3)"
                    : "0 0 20px rgba(251, 191, 36, 0.3)",
                }}
              >
                <div className="relative">
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

                  {/* Decorative underline */}
                  <motion.div
                    className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 h-0.5 w-24 ${
                      darkMode
                        ? "bg-gradient-to-r from-indigo-500/50 via-purple-500/50 to-indigo-500/50"
                        : "bg-gradient-to-r from-amber-400/50 via-orange-400/50 to-amber-400/50"
                    }`}
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "40%", opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                  />
                </div>
              </motion.h1>
            )}
          </AnimatePresence>

          {/* AI Voice Narration Button */}
          <motion.button
            className={`mb-10 px-6 py-3 rounded-full flex items-center justify-center gap-2 mx-auto ${
              darkMode
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                : "bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white"
            } shadow-lg`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            style={{
              boxShadow: darkMode
                ? "0 4px 14px rgba(79, 70, 229, 0.4)"
                : "0 4px 14px rgba(251, 191, 36, 0.4)",
            }}
          >
            <FaVolumeUp className="text-lg" />
            <span
              className={`font-medium ${
                fontFamily === "serif" ? "font-serif" : "font-sans"
              }`}
            >
              Play Narration
            </span>
          </motion.button>

          {/* Story Content */}
          <motion.div
            className="space-y-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 1 }}
            style={{ fontSize: `${fontSize}px` }}
          >
            {book.story.split("\n\n").map((paragraph, index) => (
              <div key={index} className="relative">
                {/* Chapter marker if it's the first paragraph */}
                {index === 0 && (
                  <div className="flex items-center mb-6">
                    <div
                      className={`flex-grow h-px ${
                        darkMode ? "bg-indigo-500/30" : "bg-amber-400/30"
                      } mr-3`}
                    />
                    <div
                      className={`flex items-center gap-2 text-sm ${
                        darkMode ? "text-indigo-300" : "text-amber-600"
                      }`}
                    >
                      <FaBookOpen size={14} />
                      <span className="uppercase tracking-wider font-medium">
                        Chapter 1
                      </span>
                    </div>
                    <div
                      className={`flex-grow h-px ${
                        darkMode ? "bg-indigo-500/30" : "bg-amber-400/30"
                      } ml-3`}
                    />
                  </div>
                )}

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 1.8 + index * 0.1,
                    duration: 0.5,
                  }}
                  className={`${
                    darkMode ? "text-gray-200" : "text-gray-800"
                  } tracking-wide leading-relaxed ${
                    fontFamily === "serif" ? "font-serif" : "font-sans"
                  } ${
                    index === 0
                      ? "first-letter:text-4xl first-letter:font-bold first-letter:mr-1 first-letter:float-left first-letter:leading-none first-paragraph"
                      : ""
                  }`}
                  style={{
                    textShadow: darkMode
                      ? "0 0 1px rgba(255, 255, 255, 0.1)"
                      : "0 0 1px rgba(0, 0, 0, 0.05)",
                    letterSpacing: fontSize > 18 ? "0.01em" : "normal",
                  }}
                >
                  {paragraph}
                </motion.p>

                {/* Paragraph divider */}
                {index < book.story.split("\n\n").length - 1 && (
                  <div className="flex justify-center my-8">
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        darkMode ? "bg-indigo-500/40" : "bg-amber-400/40"
                      } mx-1`}
                    />
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        darkMode ? "bg-indigo-500/40" : "bg-amber-400/40"
                      } mx-1`}
                    />
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        darkMode ? "bg-indigo-500/40" : "bg-amber-400/40"
                      } mx-1`}
                    />
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Custom Scrollbar - Added via CSS */}
    </div>
  );
}
