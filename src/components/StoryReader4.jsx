"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  Share2,
  Bookmark,
  MessageSquare,
  Settings,
  X,
  Type,
  AlignLeft,
  AlignCenter,
  Clock,
  Award,
  Sparkles,
} from "lucide-react";
import {Link} from "react-router-dom";
// No need to import useTheme since we'll use a constant dark theme
import { cn } from "../lib/utils";
import { booksData } from "../data/data";

// Sample book data


export default function StoryReader() {
  const { id } = useParams();
  const router = useNavigate();
  const book = booksData.find((b) => b.id === id);
  const isDark = true; // Always use dark theme

  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showTitle, setShowTitle] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showLikeAnimation, setShowLikeAnimation] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(book?.likes || 0);
  const [showCompletionCelebration, setShowCompletionCelebration] =
    useState(false);
  const [readingTime, setReadingTime] = useState(0);
  const [fontSize, setFontSize] = useState(18);
  const [fontFamily, setFontFamily] = useState("serif");
  const [textAlign, setTextAlign] = useState("left");
  const [lineHeight, setLineHeight] = useState(1.8);
  const [showAchievement, setShowAchievement] = useState(false);
  const [achievementType, setAchievementType] = useState("");

  const contentRef = useRef(null);
  const scrollRef = useRef(null);
  const lastScrollY = useRef(0);
  const readingTimer = useRef(null);

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
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 0.8, 0.5]);

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

        // Show achievement at 50% progress
        if (scrollProgress > 50 && scrollProgress < 52 && !showAchievement) {
          setAchievementType("halfway");
          setShowAchievement(true);
          setTimeout(() => setShowAchievement(false), 3000);
        }

        // Show completion celebration at 95% progress
        if (scrollProgress > 95 && !showCompletionCelebration) {
          setShowCompletionCelebration(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showAchievement, showCompletionCelebration]);

  // Reading time tracker
  useEffect(() => {
    if (!isLoading) {
      readingTimer.current = setInterval(() => {
        setReadingTime((prev) => prev + 1);

        // Show achievement at 2 minutes of reading
        if (readingTime === 120 && !showAchievement) {
          setAchievementType("time");
          setShowAchievement(true);
          setTimeout(() => setShowAchievement(false), 3000);
        }
      }, 1000);
    }

    return () => {
      if (readingTimer.current) {
        clearInterval(readingTimer.current);
      }
    };
  }, [isLoading, readingTime, showAchievement]);

  // Handle font size changes
  const changeFontSize = (delta) => {
    setFontSize((prevSize) => {
      const newSize = prevSize + delta;
      return Math.min(Math.max(newSize, 14), 24); // Limit between 14px and 24px
    });
  };

  // Handle line height changes
  const changeLineHeight = (delta) => {
    setLineHeight((prevHeight) => {
      const newHeight = Number.parseFloat((prevHeight + delta).toFixed(1));
      return Math.min(Math.max(newHeight, 1.2), 2.4); // Limit between 1.2 and 2.4
    });
  };

  const handleLike = () => {
    if (!hasLiked) {
      setHasLiked(true);
      setLikeCount((prev) => prev + 1);
      setShowLikeAnimation(true);
      setTimeout(() => setShowLikeAnimation(false), 1000);
    }
  };

  const formatReadingTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  if (!book)
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 dark:bg-zinc-950">
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
      className={cn(
        "relative min-h-screen overflow-hidden transition-colors duration-700",
        isDark ? "bg-zinc-950 text-zinc-100" : "bg-amber-50 text-zinc-800"
      )}
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
        <div
          className={cn(
            "absolute inset-0 opacity-80",
            isDark
              ? "bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950"
              : "bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100"
          )}
        ></div>

        {/* Abstract shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`shape-${i}`}
              className={cn(
                "absolute rounded-full blur-3xl",
                isDark ? "bg-orange-500/10" : "bg-amber-500/20"
              )}
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
            className={cn(
              "fixed top-0 left-0 right-0 z-50 px-4 py-4 flex justify-between items-center backdrop-blur-md border-b transition-all duration-300",
              isDark
                ? "bg-zinc-900/70 border-zinc-800/30"
                : "bg-amber-50/70 border-amber-200/50"
            )}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Link to="/">
              <motion.button
                className={cn(
                  "p-3 rounded-full backdrop-blur-md shadow-lg border",
                  isDark
                    ? "bg-zinc-800/80 text-white hover:bg-zinc-700/80 border-zinc-700"
                    : "bg-white/80 text-zinc-800 hover:bg-zinc-100/80 border-amber-200/50"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft size={20} />
              </motion.button>
            </Link>

            <motion.button
              onClick={() => setShowSettings(!showSettings)}
              className={cn(
                "p-3 rounded-full backdrop-blur-md shadow-lg border",
                isDark
                  ? "bg-zinc-800/80 text-white hover:bg-zinc-700/80 border-zinc-700"
                  : "bg-white/80 text-zinc-800 hover:bg-zinc-100/80 border-amber-200/50"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Settings
                size={20}
                className={isDark ? "text-orange-500" : "text-amber-500"}
              />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* Like Button */}
        <motion.button
          onClick={handleLike}
          className={cn(
            "w-14 h-14 rounded-full flex items-center justify-center shadow-lg relative",
            isDark
              ? hasLiked
                ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                : "bg-zinc-800 border border-zinc-700 text-zinc-400"
              : hasLiked
              ? "bg-gradient-to-r from-amber-400 to-orange-400 text-white"
              : "bg-white border border-amber-200 text-zinc-500"
          )}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart size={24} className={hasLiked ? "fill-white" : ""} />

          {/* Like count */}
          <motion.div
            className={cn(
              "absolute -top-2 -right-2 min-w-6 h-6 rounded-full text-xs flex items-center justify-center px-1",
              isDark
                ? "bg-zinc-800 text-white border border-zinc-700"
                : "bg-white text-zinc-800 border border-amber-200"
            )}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          >
            {likeCount}
          </motion.div>

          {/* Like animation */}
          <AnimatePresence>
            {showLikeAnimation && (
              <motion.div
                className="absolute inset-0 z-10 pointer-events-none"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                {/* Heart particles */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute left-1/2 top-1/2 w-3 h-3 text-pink-500"
                    initial={{
                      x: 0,
                      y: 0,
                      scale: 0,
                    }}
                    animate={{
                      x: Math.cos((i * Math.PI) / 4) * 30,
                      y: Math.sin((i * Math.PI) / 4) * 30,
                      scale: [0, 1.5, 0],
                    }}
                    transition={{ duration: 1 }}
                  >
                    <Heart size={12} className="fill-pink-500" />
                  </motion.div>
                ))}

                {/* Central heart pulse */}
                <motion.div
                  className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-pink-500"
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 2, 1] }}
                  transition={{ duration: 0.5 }}
                >
                  <Heart size={24} className="fill-pink-500" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Bookmark Button */}
        <motion.button
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center shadow-lg",
            isDark
              ? "bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-orange-500"
              : "bg-white border border-amber-200 text-zinc-500 hover:text-amber-500"
          )}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Bookmark size={20} />
        </motion.button>

        {/* Comment Button */}
        <motion.button
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center shadow-lg",
            isDark
              ? "bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-orange-500"
              : "bg-white border border-amber-200 text-zinc-500 hover:text-amber-500"
          )}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MessageSquare size={20} />
        </motion.button>

        {/* Share Button */}
        <motion.button
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center shadow-lg",
            isDark
              ? "bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-orange-500"
              : "bg-white border border-amber-200 text-zinc-500 hover:text-amber-500"
          )}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Share2 size={20} />
        </motion.button>
      </div>

      {/* Reading Time Display */}
      <motion.div
        className={cn(
          "fixed top-20 left-6 z-40 px-3 py-1.5 rounded-full text-sm flex items-center gap-1.5 shadow-lg",
          isDark
            ? "bg-zinc-800/80 text-zinc-300 border border-zinc-700"
            : "bg-white/80 text-zinc-700 border border-amber-200"
        )}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
      >
        <Clock
          size={14}
          className={isDark ? "text-orange-500" : "text-amber-500"}
        />
        <span>{formatReadingTime(readingTime)}</span>
      </motion.div>

      {/* Scroll Progress Bar - Bottom position */}
      <motion.div
        className={cn(
          "fixed bottom-0 left-0 h-1 z-50",
          isDark
            ? "bg-gradient-to-r from-orange-500 to-pink-500"
            : "bg-gradient-to-r from-amber-400 to-orange-400"
        )}
        style={{ width: `${progress}%` }}
        initial={{ width: "0%" }}
        animate={{ width: `${progress}%` }}
        transition={{ type: "spring", stiffness: 50 }}
      />

      {/* Fixed Progress Indicator */}
      <motion.div
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-zinc-800/90 border border-zinc-700 text-white shadow-lg flex items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="h-1 w-16 rounded-full bg-zinc-700 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-orange-500 to-pink-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-sm font-medium">{Math.round(progress)}%</span>
      </motion.div>

      {/* Text Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            className={cn(
              "fixed bottom-6 left-6 z-40 p-4 rounded-xl shadow-lg w-72",
              isDark
                ? "bg-zinc-800/90 border border-zinc-700"
                : "bg-white/90 border border-amber-200"
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3
                className={cn(
                  "font-medium",
                  isDark ? "text-white" : "text-zinc-800"
                )}
              >
                Reading Settings
              </h3>
              <button
                onClick={() => setShowSettings(false)}
                className={
                  isDark
                    ? "text-zinc-400 hover:text-zinc-200"
                    : "text-zinc-500 hover:text-zinc-700"
                }
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5">
              {/* Font Size */}
              <div className="space-y-2">
                <label
                  className={cn(
                    "text-sm font-medium flex items-center gap-2",
                    isDark ? "text-zinc-300" : "text-zinc-700"
                  )}
                >
                  <Type size={14} />
                  Font Size
                </label>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => changeFontSize(-1)}
                    className={cn(
                      "p-2 rounded-md",
                      isDark
                        ? "bg-zinc-900 hover:bg-zinc-700 text-zinc-300"
                        : "bg-amber-100 hover:bg-amber-200 text-zinc-700"
                    )}
                  >
                    A-
                  </button>
                  <span className={isDark ? "text-zinc-300" : "text-zinc-700"}>
                    {fontSize}px
                  </span>
                  <button
                    onClick={() => changeFontSize(1)}
                    className={cn(
                      "p-2 rounded-md",
                      isDark
                        ? "bg-zinc-900 hover:bg-zinc-700 text-zinc-300"
                        : "bg-amber-100 hover:bg-amber-200 text-zinc-700"
                    )}
                  >
                    A+
                  </button>
                </div>
              </div>

              {/* Line Height */}
              <div className="space-y-2">
                <label
                  className={cn(
                    "text-sm font-medium flex items-center gap-2",
                    isDark ? "text-zinc-300" : "text-zinc-700"
                  )}
                >
                  <AlignLeft size={14} />
                  Line Spacing
                </label>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => changeLineHeight(-0.1)}
                    className={cn(
                      "p-2 rounded-md",
                      isDark
                        ? "bg-zinc-900 hover:bg-zinc-700 text-zinc-300"
                        : "bg-amber-100 hover:bg-amber-200 text-zinc-700"
                    )}
                  >
                    -
                  </button>
                  <span className={isDark ? "text-zinc-300" : "text-zinc-700"}>
                    {lineHeight}x
                  </span>
                  <button
                    onClick={() => changeLineHeight(0.1)}
                    className={cn(
                      "p-2 rounded-md",
                      isDark
                        ? "bg-zinc-900 hover:bg-zinc-700 text-zinc-300"
                        : "bg-amber-100 hover:bg-amber-200 text-zinc-700"
                    )}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Font Family */}
              <div className="space-y-2">
                <label
                  className={cn(
                    "text-sm font-medium",
                    isDark ? "text-zinc-300" : "text-zinc-700"
                  )}
                >
                  Font Family
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setFontFamily("serif")}
                    className={cn(
                      "p-2 rounded-md font-serif",
                      fontFamily === "serif"
                        ? isDark
                          ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                          : "bg-gradient-to-r from-amber-400 to-orange-400 text-white"
                        : isDark
                        ? "bg-zinc-900 text-zinc-300"
                        : "bg-amber-100 text-zinc-700"
                    )}
                  >
                    Serif
                  </button>
                  <button
                    onClick={() => setFontFamily("sans")}
                    className={cn(
                      "p-2 rounded-md font-sans",
                      fontFamily === "sans"
                        ? isDark
                          ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                          : "bg-gradient-to-r from-amber-400 to-orange-400 text-white"
                        : isDark
                        ? "bg-zinc-900 text-zinc-300"
                        : "bg-amber-100 text-zinc-700"
                    )}
                  >
                    Sans
                  </button>
                </div>
              </div>

              {/* Text Alignment */}
              <div className="space-y-2">
                <label
                  className={cn(
                    "text-sm font-medium",
                    isDark ? "text-zinc-300" : "text-zinc-700"
                  )}
                >
                  Text Alignment
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setTextAlign("left")}
                    className={cn(
                      "p-2 rounded-md flex justify-center",
                      textAlign === "left"
                        ? isDark
                          ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                          : "bg-gradient-to-r from-amber-400 to-orange-400 text-white"
                        : isDark
                        ? "bg-zinc-900 text-zinc-300"
                        : "bg-amber-100 text-zinc-700"
                    )}
                  >
                    <AlignLeft size={16} />
                  </button>
                  <button
                    onClick={() => setTextAlign("center")}
                    className={cn(
                      "p-2 rounded-md flex justify-center",
                      textAlign === "center"
                        ? isDark
                          ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                          : "bg-gradient-to-r from-amber-400 to-orange-400 text-white"
                        : isDark
                        ? "bg-zinc-900 text-zinc-300"
                        : "bg-amber-100 text-zinc-700"
                    )}
                  >
                    <AlignCenter size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Achievement Notification */}
      <AnimatePresence>
        {showAchievement && (
          <motion.div
            className={cn(
              "fixed top-24 left-1/2 transform -translate-x-1/2 z-50 py-3 px-4 rounded-lg shadow-lg flex items-center gap-3",
              isDark
                ? "bg-zinc-800 border border-zinc-700"
                : "bg-white border border-amber-200"
            )}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                isDark
                  ? "bg-gradient-to-r from-orange-500 to-pink-500"
                  : "bg-gradient-to-r from-amber-400 to-orange-400"
              )}
            >
              {achievementType === "halfway" ? (
                <Award size={20} className="text-white" />
              ) : (
                <Clock size={20} className="text-white" />
              )}
            </div>
            <div>
              <h4
                className={cn(
                  "font-bold text-sm",
                  isDark ? "text-white" : "text-zinc-800"
                )}
              >
                {achievementType === "halfway"
                  ? "Halfway There!"
                  : "Reading Streak!"}
              </h4>
              <p
                className={cn(
                  "text-xs",
                  isDark ? "text-zinc-300" : "text-zinc-600"
                )}
              >
                {achievementType === "halfway"
                  ? "You're halfway through this story. Keep going!"
                  : "You've been reading for 2 minutes straight. Great focus!"}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Animation */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className={cn(
              "fixed inset-0 z-50 flex items-center justify-center",
              isDark ? "bg-zinc-950" : "bg-amber-50"
            )}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div className="flex flex-col items-center">
              <motion.div
                className={cn(
                  "w-16 h-16 mb-4",
                  isDark ? "text-orange-500" : "text-amber-500"
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              </motion.div>

              <motion.div
                className={cn(
                  "h-1 w-48 rounded-full overflow-hidden",
                  isDark ? "bg-zinc-800" : "bg-amber-200"
                )}
              >
                <motion.div
                  className={cn(
                    "h-full",
                    isDark
                      ? "bg-gradient-to-r from-orange-500 to-pink-500"
                      : "bg-gradient-to-r from-amber-400 to-orange-400"
                  )}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />
              </motion.div>

              <motion.p
                className={cn(
                  "mt-4 text-sm",
                  isDark ? "text-zinc-400" : "text-amber-700"
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Preparing your reading experience...
              </motion.p>
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
          className={cn(
            "relative max-w-3xl w-full p-8 md:p-10 rounded-3xl shadow-2xl",
            isDark
              ? "bg-zinc-900/40 text-zinc-100 border border-zinc-800/30"
              : "bg-white/90 text-zinc-800 border border-amber-200/30"
          )}
          style={{
            boxShadow: isDark
              ? "0 10px 30px -5px rgba(0, 0, 0, 0.3)"
              : "0 10px 30px -5px rgba(251, 191, 36, 0.2)",
          }}
        >
          {/* Paper texture overlay for light mode */}
          {!isDark && (
            <div
              className="absolute inset-0 rounded-3xl opacity-5 pointer-events-none"
              style={{
                backgroundImage:
                  "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmOWY5ZjkiPjwvcmVjdD4KPC9zdmc+')",
              }}
            />
          )}

          {/* Typing Title Effect */}
          <AnimatePresence>
            {showTitle && (
              <motion.h1
                className={cn(
                  "text-3xl md:text-5xl font-bold mb-8 text-center tracking-wide",
                  isDark
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400"
                    : "text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500"
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                  textShadow: isDark
                    ? "0 0 20px rgba(249, 115, 22, 0.3)"
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
                    className={cn(
                      "absolute -bottom-4 left-1/2 transform -translate-x-1/2 h-0.5 w-24",
                      isDark
                        ? "bg-gradient-to-r from-orange-500/50 via-pink-500/50 to-orange-500/50"
                        : "bg-gradient-to-r from-amber-400/50 via-orange-400/50 to-amber-400/50"
                    )}
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "40%", opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                  />
                </div>
              </motion.h1>
            )}
          </AnimatePresence>

          {/* Author and Reading Time */}
          <motion.div
            className="flex justify-center items-center gap-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            <div
              className={cn(
                "px-3 py-1 rounded-full text-sm",
                isDark
                  ? "bg-zinc-800 text-zinc-300"
                  : "bg-amber-100 text-amber-700"
              )}
            >
              By {book.author}
            </div>
            <div
              className={cn(
                "px-3 py-1 rounded-full text-sm flex items-center gap-1.5",
                isDark
                  ? "bg-zinc-800 text-zinc-300"
                  : "bg-amber-100 text-amber-700"
              )}
            >
              <Clock size={12} />
              <span>{book.readTime}</span>
            </div>
          </motion.div>

          {/* Story Content */}
          <motion.div
            className={`space-y-8 leading-relaxed text-${textAlign}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 1 }}
            style={{
              fontSize: `${fontSize}px`,
              lineHeight: lineHeight,
            }}
          >
            {book.story.split("\n\n").map((paragraph, index) => (
              <div key={index} className="relative">
                {/* Chapter marker if it's the first paragraph */}
                {index === 0 && (
                  <div className="flex items-center mb-6">
                    <div
                      className={cn(
                        "flex-grow h-px mr-3",
                        isDark ? "bg-zinc-700" : "bg-amber-200"
                      )}
                    />
                    <div
                      className={cn(
                        "flex items-center gap-2 text-sm",
                        isDark ? "text-orange-500" : "text-amber-600"
                      )}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                      </svg>
                      <span className="uppercase tracking-wider font-medium">
                        Chapter 1
                      </span>
                    </div>
                    <div
                      className={cn(
                        "flex-grow h-px ml-3",
                        isDark ? "bg-zinc-700" : "bg-amber-200"
                      )}
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
                  className={cn(
                    "tracking-wide",
                    isDark ? "text-zinc-200" : "text-zinc-800",
                    index === 0
                      ? "first-letter:text-4xl first-letter:font-bold first-letter:mr-1 first-letter:float-left first-letter:leading-none first-paragraph"
                      : ""
                  )}
                  style={{
                    textShadow: isDark
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
                      className={cn(
                        "w-1.5 h-1.5 rounded-full mx-1",
                        isDark ? "bg-zinc-700" : "bg-amber-200"
                      )}
                    />
                    <div
                      className={cn(
                        "w-1.5 h-1.5 rounded-full mx-1",
                        isDark ? "bg-zinc-700" : "bg-amber-200"
                      )}
                    />
                    <div
                      className={cn(
                        "w-1.5 h-1.5 rounded-full mx-1",
                        isDark ? "bg-zinc-700" : "bg-amber-200"
                      )}
                    />
                  </div>
                )}
              </div>
            ))}
          </motion.div>

          {/* Story Complete Celebration */}
          <AnimatePresence>
            {showCompletionCelebration && (
              <motion.div
                className={cn(
                  "mt-16 p-6 rounded-xl border text-center",
                  isDark
                    ? "bg-zinc-800/50 border-zinc-700"
                    : "bg-amber-50/50 border-amber-200"
                )}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="mb-4 mx-auto"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                    delay: 0.2,
                  }}
                >
                  <Sparkles
                    size={32}
                    className={
                      isDark
                        ? "text-orange-500 mx-auto"
                        : "text-amber-500 mx-auto"
                    }
                  />
                </motion.div>

                <motion.h3
                  className={cn(
                    "text-xl font-bold mb-2",
                    isDark ? "text-white" : "text-zinc-800"
                  )}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Story Complete!
                </motion.h3>

                <motion.p
                  className={cn(
                    "mb-6 text-sm",
                    isDark ? "text-zinc-300" : "text-zinc-600"
                  )}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  You've finished reading "{book.title}" by {book.author}.
                  Reading time: {formatReadingTime(readingTime)}
                </motion.p>

                {/* Next Story Preview */}
                {book.nextStory && (
                  <motion.div
                    className={cn(
                      "p-4 rounded-lg border flex gap-4 items-center text-left",
                      isDark
                        ? "bg-zinc-900 border-zinc-700"
                        : "bg-white border-amber-200"
                    )}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={book.nextStory.coverImage || "/placeholder.svg"}
                        alt={book.nextStory.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4
                        className={cn(
                          "font-bold text-sm mb-1",
                          isDark ? "text-white" : "text-zinc-800"
                        )}
                      >
                        Up Next: {book.nextStory.title}
                      </h4>
                      <p
                        className={cn(
                          "text-xs",
                          isDark ? "text-zinc-400" : "text-zinc-500"
                        )}
                      >
                        By {book.nextStory.author} • {book.nextStory.readTime}
                      </p>
                    </div>
                    <Link href={`/reader/${book.nextStory.id}`}>
                      <motion.button
                        className={cn(
                          "px-3 py-1.5 rounded-full text-sm font-medium",
                          isDark
                            ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                            : "bg-gradient-to-r from-amber-400 to-orange-400 text-white"
                        )}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Read
                      </motion.button>
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
