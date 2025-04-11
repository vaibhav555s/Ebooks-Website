"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useParams } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Settings,
  X,
  Volume2,
  Type,
  AlignLeft,
  AlignCenter,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import {booksData} from "../data/data"; // Import your book data

// Sample book data


export default function StoryReader() {
  const { id } = useParams();
  const book = booksData.find((b) => b.id === id);

  const [progress, setProgress] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [showTitle, setShowTitle] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  const [fontFamily, setFontFamily] = useState("serif");
  const [textAlign, setTextAlign] = useState("left");
  const contentRef = useRef(null);
  const scrollRef = useRef(null);
  const lastScrollY = useRef(0);

  // Particles for ambient effect
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

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

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle font size changes
  const changeFontSize = (delta) => {
    setFontSize((prevSize) => {
      const newSize = prevSize + delta;
      return Math.min(Math.max(newSize, 14), 24); // Limit between 14px and 24px
    });
  };

  if (!book)
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <p className="text-center text-white">
          Story not found!{" "}
          <Link href="/library" className="text-orange-500 hover:underline">
            Return to library
          </Link>
        </p>
      </div>
    );

  return (
    <div
      ref={scrollRef}
      className={`relative min-h-screen overflow-hidden transition-colors duration-700 bg-zinc-950 text-gray-100`}
      style={{
        fontFamily:
          fontFamily === "serif"
            ? "'Playfair Display', Georgia, serif"
            : "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Animated Background with Parallax */}
      <motion.div
        className="fixed inset-0 z-[-2] overflow-hidden"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 opacity-80"></div>

        {/* Abstract shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`shape-${i}`}
              className="absolute rounded-full blur-3xl bg-orange-500/10"
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

        {/* Floating particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: 0.1,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, particle.id % 2 === 0 ? 10 : -10, 0],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: particle.delay,
            }}
          />
        ))}
      </motion.div>

      {/* Navbar - Auto-hides on scroll */}
      <AnimatePresence>
        {showNavbar && (
          <motion.div
            className="fixed top-0 left-0 right-0 z-50 px-4 py-4 flex justify-between items-center glass border-b border-zinc-800 transition-all duration-300"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Link to="/">
              <motion.button
                className="p-3 rounded-full bg-zinc-800/80 text-white hover:bg-zinc-700/80 backdrop-blur-md shadow-lg border border-zinc-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft size={20} />
              </motion.button>
            </Link>

            <h2 className="text-lg font-medium text-white">
              {book.title.length > 30
                ? book.title.substring(0, 30) + "..."
                : book.title}
            </h2>

            <motion.button
              onClick={() => setShowSettings(!showSettings)}
              className="p-3 rounded-full bg-zinc-800/80 text-white hover:bg-zinc-700/80 backdrop-blur-md shadow-lg border border-zinc-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Settings size={20} className="text-orange-500" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Progress Bar - Bottom position */}
      <motion.div
        className="fixed bottom-0 left-0 h-1 z-50 bg-gradient-to-r from-orange-500 to-pink-500 glow-border-orange"
        style={{ width: `${progress}%` }}
        initial={{ width: "0%" }}
        animate={{ width: `${progress}%` }}
        transition={{ type: "spring", stiffness: 50 }}
      />

      {/* Circular Progress Indicator */}
      <motion.div
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full flex items-center justify-center glass border border-zinc-700 glow-border-orange"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <svg className="w-full h-full" viewBox="0 0 36 36">
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#27272a"
            strokeWidth="3"
            strokeDasharray="100, 100"
          />
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="3"
            strokeDasharray={`${progress}, 100`}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          <text
            x="18"
            y="21"
            textAnchor="middle"
            fontSize="10"
            fill="#ffffff"
            fontWeight="bold"
          >
            {Math.round(progress)}%
          </text>
        </svg>
      </motion.div>

      {/* Text Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            className="fixed bottom-20 right-6 z-40 p-4 rounded-xl glass border border-zinc-700 shadow-lg w-64"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-white">Reading Settings</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-zinc-400 hover:text-zinc-200"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                  <Type size={14} />
                  Font Size
                </label>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => changeFontSize(-1)}
                    className="p-2 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                  >
                    A-
                  </button>
                  <span className="text-zinc-300">{fontSize}px</span>
                  <button
                    onClick={() => changeFontSize(1)}
                    className="p-2 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                  >
                    A+
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                  <BookOpen size={14} />
                  Font Family
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setFontFamily("serif")}
                    className={`p-2 rounded-md font-serif ${
                      fontFamily === "serif"
                        ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                        : "bg-zinc-800 text-zinc-300"
                    }`}
                  >
                    Serif
                  </button>
                  <button
                    onClick={() => setFontFamily("sans")}
                    className={`p-2 rounded-md font-sans ${
                      fontFamily === "sans"
                        ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                        : "bg-zinc-800 text-zinc-300"
                    }`}
                  >
                    Sans
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                  <AlignLeft size={14} />
                  Text Alignment
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setTextAlign("left")}
                    className={`p-2 rounded-md flex justify-center ${
                      textAlign === "left"
                        ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                        : "bg-zinc-800 text-zinc-300"
                    }`}
                  >
                    <AlignLeft size={16} />
                  </button>
                  <button
                    onClick={() => setTextAlign("center")}
                    className={`p-2 rounded-md flex justify-center ${
                      textAlign === "center"
                        ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                        : "bg-zinc-800 text-zinc-300"
                    }`}
                  >
                    <AlignCenter size={16} />
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setShowSettings(false)}
                  className="w-full p-2 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 flex items-center justify-center gap-2"
                >
                  <Volume2 size={14} />
                  <span>Enable Audio (Coming Soon)</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Animation */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div className="flex flex-col items-center">
              <motion.div
                className="w-16 h-16 mb-4 text-orange-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <BookOpen size={64} />
              </motion.div>

              <motion.div className="h-1 w-48 rounded-full overflow-hidden bg-zinc-800">
                <motion.div
                  className="h-full bg-gradient-to-r from-orange-500 to-pink-500"
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
          className="relative max-w-3xl w-full p-8 md:p-10 rounded-3xl shadow-2xl glass border border-zinc-800"
        >
          {/* Typing Title Effect */}
          <AnimatePresence>
            {showTitle && (
              <motion.h1
                className="text-3xl md:text-5xl font-bold mb-8 text-center tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 glow-text-orange"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
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
                    className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 h-0.5 w-24 bg-gradient-to-r from-orange-500/50 via-pink-500/50 to-orange-500/50"
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
            className="mb-10 px-6 py-3 rounded-full flex items-center justify-center gap-2 mx-auto bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-500 hover:to-pink-500 text-white shadow-lg glow-border-orange"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <Volume2 className="text-lg" />
            <span className="font-medium">Play Narration</span>
          </motion.button>

          {/* Story Content */}
          <motion.div
            className={`space-y-8 leading-relaxed reading-typography text-${textAlign}`}
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
                    <div className="flex-grow h-px bg-zinc-700 mr-3" />
                    <div className="flex items-center gap-2 text-sm text-orange-500">
                      <BookOpen size={14} />
                      <span className="uppercase tracking-wider font-medium">
                        Chapter 1
                      </span>
                    </div>
                    <div className="flex-grow h-px bg-zinc-700 ml-3" />
                  </div>
                )}

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 1.8 + index * 0.1,
                    duration: 0.5,
                  }}
                  className={`text-gray-200 tracking-wide leading-relaxed ${
                    index === 0
                      ? "first-letter:text-4xl first-letter:font-bold first-letter:mr-1 first-letter:float-left first-letter:leading-none first-letter:text-orange-500 first-paragraph"
                      : ""
                  }`}
                >
                  {paragraph}
                </motion.p>

                {/* Paragraph divider */}
                {index < book.story.split("\n\n").length - 1 && (
                  <div className="flex justify-center my-8">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-700 mx-1" />
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-700 mx-1" />
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-700 mx-1" />
                  </div>
                )}
              </div>
            ))}
          </motion.div>

          {/* Navigation buttons */}
          <div className="mt-12 flex justify-between">
            <motion.button
              className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 border border-zinc-700 flex items-center gap-2"
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronUp size={16} />
              <span>Back to Top</span>
            </motion.button>

            <motion.button
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-orange-600 to-pink-600 text-white flex items-center gap-2"
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Next Story</span>
              <ChevronDown size={16} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
