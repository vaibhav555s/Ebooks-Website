"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { useParams, useNavigate } from "react-router-dom"
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
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Timer,
  BookOpen,
  Star,
} from "lucide-react";
import {Link} from "react-router-dom";
import { cn } from "@/lib/utils"
import { booksData } from "../data/data"
import { useStoryPagination } from "./use-story-pagination"

export default function StoryReader() {
  const { id } = useParams();
  const router = useNavigate();
  const book = booksData.find((b) => b.id === id);
  const isDark = true; // Always use dark theme

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
  const [userRating, setUserRating] = useState(0);
  const [userFeedback, setUserFeedback] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const contentRef = useRef(null);
  const scrollRef = useRef(null);
  const lastScrollY = useRef(0);
  const readingTimer = useRef(null);

  // Use pagination hook
  const {
    currentPage,
    totalPages,
    progress,
    currentPageContent,
    isFirstPage,
    isLastPage,
    isAnimating,
    nextPage,
    previousPage,
    goToPage,
  } = useStoryPagination(book);

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

  // Handle scroll events for navbar auto-hide
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      // Auto-hide navbar on scroll down, show on scroll up
      if (scrollTop > lastScrollY.current + 20) {
        setShowNavbar(false);
        lastScrollY.current = scrollTop;
      } else if (scrollTop < lastScrollY.current - 20) {
        setShowNavbar(true);
        lastScrollY.current = scrollTop;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // Show completion celebration on last page
  useEffect(() => {
    if (
      isLastPage &&
      currentPage === totalPages &&
      !showCompletionCelebration
    ) {
      setShowCompletionCelebration(true);
    }
  }, [isLastPage, currentPage, totalPages, showCompletionCelebration]);

  // Handle font size changes
  const changeFontSize = (delta) => {
    setFontSize((prevSize) => {
      const newSize = prevSize + delta;
      return Math.min(Math.max(newSize, 14), 24);
    });
  };

  // Handle line height changes
  const changeLineHeight = (delta) => {
    setLineHeight((prevHeight) => {
      const newHeight = Number.parseFloat((prevHeight + delta).toFixed(1));
      return Math.min(Math.max(newHeight, 1.2), 2.4);
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

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        previousPage();
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        nextPage();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [nextPage, previousPage]);

  // Auto-scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

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
      className="relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-100"
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

      {/* Progress Bar - Top of page */}
      <motion.div
        className="fixed top-0 left-0 h-1 z-50 bg-gradient-to-r from-orange-500 to-pink-500"
        style={{ width: `${progress}%` }}
        initial={{ width: "0%" }}
        animate={{ width: `${progress}%` }}
        transition={{ type: "spring", stiffness: 50 }}
      />

      {/* Navbar - Auto-hides on scroll */}
      <AnimatePresence>
        {showNavbar && (
          <motion.div
            className="fixed top-0 left-0 right-0 z-50 px-4 py-4 flex justify-between items-center bg-zinc-900/70 backdrop-blur-md border-b border-zinc-800/30 transition-all duration-300"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Link href="/">
              <motion.button
                className="p-3 rounded-full bg-zinc-800/80 text-white hover:bg-zinc-700/80 border border-zinc-700 backdrop-blur-md shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft size={20} />
              </motion.button>
            </Link>

            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-sm font-medium text-zinc-300">
                Page {currentPage} of {totalPages}
              </span>
            </motion.div>

            <motion.button
              onClick={() => setShowSettings(!showSettings)}
              className="p-3 rounded-full bg-zinc-800/80 text-white hover:bg-zinc-700/80 border border-zinc-700 backdrop-blur-md shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Settings size={20} className="text-orange-500" />
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
            hasLiked
              ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
              : "bg-zinc-800 border border-zinc-700 text-zinc-400"
          )}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart size={24} className={hasLiked ? "fill-white" : ""} />

          {/* Like count */}
          <motion.div
            className="absolute -top-2 -right-2 min-w-6 h-6 rounded-full text-xs flex items-center justify-center px-1 bg-zinc-800 text-white border border-zinc-700"
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
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-orange-500"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Bookmark size={20} />
        </motion.button>

        {/* Comment Button */}
        <motion.button
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-orange-500"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MessageSquare size={20} />
        </motion.button>

        {/* Share Button */}
        <motion.button
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-orange-500"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Share2 size={20} />
        </motion.button>
      </div>

      {/* Reading Time Display */}
      <motion.div
        className="fixed top-20 left-6 z-40 px-3 py-1.5 rounded-full text-sm flex items-center gap-1.5 shadow-lg bg-zinc-800/80 text-zinc-300 border border-zinc-700"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
      >
        <Timer size={14} className="text-orange-500" />
        <span>{formatReadingTime(readingTime)}</span>
      </motion.div>

      {/* Text Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            className="fixed bottom-6 left-6 z-40 p-4 rounded-xl shadow-lg w-72 bg-zinc-800/90 border border-zinc-700"
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

            <div className="space-y-5">
              {/* Font Size */}
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2 text-zinc-300">
                  <Type size={14} />
                  Font Size
                </label>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => changeFontSize(-1)}
                    className="p-2 rounded-md bg-zinc-900 hover:bg-zinc-700 text-zinc-300"
                  >
                    A-
                  </button>
                  <span className="text-zinc-300">{fontSize}px</span>
                  <button
                    onClick={() => changeFontSize(1)}
                    className="p-2 rounded-md bg-zinc-900 hover:bg-zinc-700 text-zinc-300"
                  >
                    A+
                  </button>
                </div>
              </div>

              {/* Line Height */}
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2 text-zinc-300">
                  <AlignLeft size={14} />
                  Line Spacing
                </label>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => changeLineHeight(-0.1)}
                    className="p-2 rounded-md bg-zinc-900 hover:bg-zinc-700 text-zinc-300"
                  >
                    -
                  </button>
                  <span className="text-zinc-300">{lineHeight}x</span>
                  <button
                    onClick={() => changeLineHeight(0.1)}
                    className="p-2 rounded-md bg-zinc-900 hover:bg-zinc-700 text-zinc-300"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Font Family */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">
                  Font Family
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setFontFamily("serif")}
                    className={cn(
                      "p-2 rounded-md font-serif",
                      fontFamily === "serif"
                        ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                        : "bg-zinc-900 text-zinc-300"
                    )}
                  >
                    Serif
                  </button>
                  <button
                    onClick={() => setFontFamily("sans")}
                    className={cn(
                      "p-2 rounded-md font-sans",
                      fontFamily === "sans"
                        ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                        : "bg-zinc-900 text-zinc-300"
                    )}
                  >
                    Sans
                  </button>
                </div>
              </div>

              {/* Text Alignment */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">
                  Text Alignment
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setTextAlign("left")}
                    className={cn(
                      "p-2 rounded-md flex justify-center",
                      textAlign === "left"
                        ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                        : "bg-zinc-900 text-zinc-300"
                    )}
                  >
                    <AlignLeft size={16} />
                  </button>
                  <button
                    onClick={() => setTextAlign("center")}
                    className={cn(
                      "p-2 rounded-md flex justify-center",
                      textAlign === "center"
                        ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                        : "bg-zinc-900 text-zinc-300"
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
            className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 py-3 px-4 rounded-lg shadow-lg flex items-center gap-3 bg-zinc-800 border border-zinc-700"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-orange-500 to-pink-500">
              <Clock size={20} className="text-white" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Reading Streak!</h4>
              <p className="text-xs text-zinc-300">
                You've been reading for 2 minutes straight. Great focus!
              </p>
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

              <motion.p
                className="mt-4 text-sm text-zinc-400"
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
          className="relative max-w-4xl w-full p-8 md:p-12 rounded-3xl shadow-2xl bg-zinc-900/40 text-zinc-100 border border-zinc-800/30"
          style={{
            boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.3)",
          }}
        >
          {/* Typing Title Effect */}
          <AnimatePresence>
            {showTitle && (
              <motion.h1
                className="text-4xl md:text-6xl font-bold mb-4 text-center tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                  background:
                    "linear-gradient(135deg, #fb923c 0%, #ec4899 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
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
                    className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 h-0.5 w-24 bg-gradient-to-r from-orange-500/50 via-pink-500/50 to-orange-500/50"
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
            className="flex justify-center items-center gap-4 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            <div className="px-4 py-2 rounded-full text-sm bg-zinc-800 text-zinc-300">
              By {book.author}
            </div>
            <div className="px-4 py-2 rounded-full text-sm flex items-center gap-1.5 bg-zinc-800 text-zinc-300">
              <Clock size={12} />
              <span>{book.readTime}</span>
            </div>
          </motion.div>

          {/* Page Content with Animation */}
          <div className="relative min-h-[400px] mb-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  duration: 0.3,
                }}
                className={`space-y-6 leading-relaxed text-${textAlign}`}
                style={{
                  fontSize: `${fontSize}px`,
                  lineHeight: lineHeight,
                }}
              >
                {/* Chapter marker for first page */}
                {currentPage === 1 && (
                  <div className="flex items-center mb-8">
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

                {/* Page Content */}
                {currentPageContent.split("\n\n").map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.5,
                    }}
                    className={cn(
                      "tracking-wide text-zinc-200",
                      currentPage === 1 && index === 0
                        ? "first-letter:text-5xl first-letter:font-bold first-letter:mr-2 first-letter:float-left first-letter:leading-none first-letter:text-orange-400"
                        : ""
                    )}
                    style={{
                      textShadow: "0 0 1px rgba(255, 255, 255, 0.1)",
                      letterSpacing: fontSize > 18 ? "0.01em" : "normal",
                    }}
                  >
                    {paragraph}
                  </motion.p>
                ))}

                {/* "THE END" for last page */}
                {isLastPage && (
                  <motion.div
                    className="text-center mt-12 pt-8 border-t border-zinc-700"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400 mb-4">
                      THE END
                    </h2>
                    <div className="flex items-center justify-center gap-2 text-zinc-400">
                      <Sparkles size={16} />
                      <span>Thank you for reading</span>
                      <Sparkles size={16} />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Loading overlay during page transitions */}
            <AnimatePresence>
              {isAnimating && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-zinc-900/50 backdrop-blur-sm rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                >
                  <motion.div
                    className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full"
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
          </div>

          {/* Page Navigation */}
          <div className="flex flex-col items-center gap-6">
            {/* Page Dots Indicator */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <motion.button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={cn(
                      "w-3 h-3 rounded-full transition-all duration-300",
                      page === currentPage
                        ? "bg-gradient-to-r from-orange-500 to-pink-500 scale-125"
                        : "bg-zinc-700 hover:bg-zinc-600"
                    )}
                    whileHover={{ scale: page === currentPage ? 1.25 : 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  />
                )
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between w-full max-w-md">
              <motion.button
                onClick={previousPage}
                disabled={isFirstPage || isAnimating}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300",
                  isFirstPage || isAnimating
                    ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                    : "bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700"
                )}
                whileHover={!isFirstPage && !isAnimating ? { scale: 1.05 } : {}}
                whileTap={!isFirstPage && !isAnimating ? { scale: 0.95 } : {}}
              >
                <ChevronLeft size={20} />
                Previous
              </motion.button>

              <div className="text-center">
                <div className="text-sm text-zinc-400">Page</div>
                <div className="text-lg font-bold text-white">
                  {currentPage} of {totalPages}
                </div>
              </div>

              <motion.button
                onClick={nextPage}
                disabled={isLastPage || isAnimating}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300",
                  isLastPage
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white"
                    : isAnimating
                    ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:opacity-90"
                )}
                whileHover={!isAnimating ? { scale: 1.05 } : {}}
                whileTap={!isAnimating ? { scale: 0.95 } : {}}
              >
                {isLastPage ? "Finished" : "Next"}
                {!isLastPage && <ChevronRight size={20} />}
              </motion.button>
            </div>
          </div>

          {/* Story Complete Celebration */}
          <AnimatePresence>
            {showCompletionCelebration && isLastPage && (
              <motion.div
                className="mt-12 p-8 rounded-xl border text-center bg-zinc-800/50 border-zinc-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <motion.div
                  className="mb-6 mx-auto"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                    delay: 0.7,
                  }}
                >
                  <Sparkles size={48} className="text-orange-500 mx-auto" />
                </motion.div>

                <motion.h3
                  className="text-2xl font-bold mb-3 text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  Story Complete!
                </motion.h3>

                <motion.p
                  className="mb-8 text-zinc-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                >
                  You've finished reading "{book.title}" by {book.author}.
                  Reading time: {formatReadingTime(readingTime)}
                </motion.p>

                {/* Rating System */}
                <div className="mb-6">
                  <h4 className="font-bold text-sm text-white mb-2">
                    Rate this story:
                  </h4>
                  <div className="flex items-center justify-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        className="outline-none"
                        onClick={() => setUserRating(star)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Star
                          size={32}
                          className={cn(
                            "cursor-pointer transition-colors duration-200",
                            star <= userRating
                              ? "text-orange-500"
                              : "text-zinc-500"
                          )}
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Feedback Form */}
                <div className="mb-6">
                  <label
                    htmlFor="feedback"
                    className="block text-sm font-bold text-white mb-2"
                  >
                    Your Feedback:
                  </label>
                  <textarea
                    id="feedback"
                    className="w-full p-3 rounded-md bg-zinc-700 text-white border border-zinc-600 focus:outline-none focus:border-orange-500 resize-none"
                    placeholder="Share your thoughts about the story..."
                    value={userFeedback}
                    onChange={(e) => setUserFeedback(e.target.value)}
                    maxLength={500}
                    rows={4}
                  />
                  <p className="text-xs text-zinc-400 mt-1">
                    {userFeedback.length}/{500} characters
                  </p>
                </div>

                {/* Submit Button */}
                <motion.button
                  className="px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-orange-500 to-pink-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={feedbackSubmitted}
                  onClick={() => {
                    // Simulate submission
                    setFeedbackSubmitted(true);
                    setTimeout(() => {
                      setFeedbackSubmitted(false);
                      alert("Feedback submitted successfully!");
                    }, 2000);
                  }}
                >
                  {feedbackSubmitted ? "Submitting..." : "Submit Feedback"}
                </motion.button>

                {/* Next Story Preview */}
                {book.nextStory && (
                  <motion.div
                    className="p-6 rounded-lg border flex gap-4 items-center text-left bg-zinc-900 border-zinc-700 mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={book.nextStory.coverImage || "/placeholder.svg"}
                        alt={book.nextStory.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold mb-1 text-white">
                        Up Next: {book.nextStory.title}
                      </h4>
                      <p className="text-sm text-zinc-400 mb-2">
                        By {book.nextStory.author} • {book.nextStory.readTime}
                      </p>
                      <span className="inline-block px-2 py-1 rounded-full text-xs bg-zinc-800 text-zinc-300">
                        {book.nextStory.category}
                      </span>
                    </div>
                    <Link href={`/reader/${book.nextStory.id}`}>
                      <motion.button
                        className="px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Start Reading
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
