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
  Quote,
  Plus,
  Minus,
} from "lucide-react";
import {Link} from "react-router-dom";
import { cn } from "@/lib/utils"
import { booksData } from "../data/data"
import { useStoryPagination } from "./use-story-pagination"
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import SocialShare from "./SocialShare";
import { useSwipeGestures } from "./SwipeGestures";
import QuoteShareCard from "./QuoteShareCard";
import EmojiReactions from "./EmojiReactions";
import ReadingStreak from "./ReadingStreak";
import confetti from 'canvas-confetti';
import { 
  trackUserSession, 
  trackStoryStart, 
  trackStoryComplete, 
  trackStoryProgress, 
  trackUserInteraction, 
  trackReadingMilestone, 
  setUserPreferences,
  trackError 
} from '../utils/analytics';
import { likeBook, getBookLikes } from "../lib/firebaseFunctions";


// Import refactored components
import StoryReaderNavbar from "./story-reader-components/StoryReaderNavbar";
import StoryReaderSettings from "./story-reader-components/StoryReaderSettings";
import StoryReaderFAB from "./story-reader-components/StoryReaderFAB";
import StoryReaderContent from "./story-reader-components/StoryReaderContent";
import StoryReaderNavigation from "./story-reader-components/StoryReaderNavigation";
import StoryCompletionCelebration from "./story-reader-components/StoryCompletionCelebration";

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
  const [selectedQuote, setSelectedQuote] = useState("");
  const [showQuoteShare, setShowQuoteShare] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [showMobileFAB, setShowMobileFAB] = useState(false);
  const [storyStarted, setStoryStarted] = useState(false);

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

  // Swipe gestures for mobile navigation
  const swipeRef = useSwipeGestures(
    () => nextPage(), // swipe left = next page
    () => previousPage() // swipe right = previous page
  );

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

  // Simulate loading with faster title reveal
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    // Show title immediately after loading
    const titleTimer = setTimeout(() => {
      setShowTitle(true);
    }, 900);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(titleTimer);
    };
  }, []);

  // Track user session and story start
  useEffect(() => {
    if (!isLoading && book && !storyStarted) {
      try {
        trackUserSession();
        trackStoryStart(book);
        setStoryStarted(true);
      } catch (error) {
        trackError(error, 'story_start_tracking');
      }
    }
  }, [isLoading, book, storyStarted]);

  // Track story progress
  useEffect(() => {
    if (book && currentPage > 0) {
      trackStoryProgress(book, currentPage, totalPages, readingTime);
    }
  }, [currentPage, totalPages, readingTime, book]);

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

  // Reading time tracker with milestone tracking
  useEffect(() => {
    if (!isLoading) {
      readingTimer.current = setInterval(() => {
        setReadingTime((prev) => {
          const newTime = prev + 1;
          
          // Track reading milestones
          if (newTime === 60) { // 1 minute
            trackReadingMilestone('1_minute', newTime, book?.id);
          } else if (newTime === 120) { // 2 minutes
            trackReadingMilestone('2_minutes', newTime, book?.id);
            setAchievementType("time");
            setShowAchievement(true);
            setTimeout(() => setShowAchievement(false), 3000);
          } else if (newTime === 300) { // 5 minutes
            trackReadingMilestone('5_minutes', newTime, book?.id);
          }
          
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (readingTimer.current) {
        clearInterval(readingTimer.current);
      }
    };
  }, [isLoading, book?.id]);

  // Show completion celebration on last page
  useEffect(() => {
    if (
      isLastPage &&
      currentPage === totalPages &&
      !showCompletionCelebration &&
      book
    ) {
      setShowCompletionCelebration(true);
      // Track story completion
      trackStoryComplete(book, readingTime, totalPages);
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isLastPage, currentPage, totalPages, showCompletionCelebration, book, readingTime]);

  // Handle font size changes with tracking
  const changeFontSize = (delta) => {
    setFontSize((prevSize) => {
      const newSize = prevSize + delta;
      const finalSize = Math.min(Math.max(newSize, 14), 24);
      
      // Track user preferences
      trackUserInteraction('font_size_change', book, { 
        old_size: prevSize, 
        new_size: finalSize 
      });
      
      setUserPreferences({ fontSize: finalSize, theme: 'dark' });
      
      return finalSize;
    });
  };

  // Handle line height changes
  const changeLineHeight = (delta) => {
    setLineHeight((prevHeight) => {
      const newHeight = Number.parseFloat((prevHeight + delta).toFixed(1));
      const finalHeight = Math.min(Math.max(newHeight, 1.2), 2.4);
      
      trackUserInteraction('line_height_change', book, { 
        old_height: prevHeight, 
        new_height: finalHeight 
      });
      
      return finalHeight;
    });
  };

  useEffect(() => {
    const fetchLikes = async () => {
      const likes = await getBookLikes(book.id);
      setLikeCount(likes);
  
      const liked = localStorage.getItem(`liked-${book.id}`);
      if (liked) setHasLiked(true);
    };
  
    fetchLikes();
  }, [book.id]);
  // Handle like button click
  // This function updates the like count in Firebase and localStorage  

  const handleLike = async () => {
    if (hasLiked) return;

    const success = await likeBook(book.id); // updates Firebase + localStorage
    if (success) {
      setHasLiked(true);
      setLikeCount((prev) => prev + 1);
      setShowLikeAnimation(true);
      setTimeout(() => setShowLikeAnimation(false), 1000);

      // Optional: Track interaction
      trackUserInteraction("like", book, { like_count: likeCount + 1 });
    }
  };

  const formatReadingTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // Handle text selection for quote sharing
  const handleTextSelection = () => {
    const selection = window.getSelection();
    const text = selection.toString().trim();
    if (text.length > 10) {
      setSelectedText(text);
    }
  };

  // Handle quote sharing
  const handleQuoteShare = (text) => {
    setSelectedQuote(text || selectedText);
    setShowQuoteShare(true);
    
    trackUserInteraction('quote_share_initiated', book, { 
      quote_length: (text || selectedText).length 
    });
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
          <Link to="/library" className="text-orange-500 hover:underline">
            Return to library
          </Link>
        </p>
      </div>
    );


    const handleSubmitFeedback = async () => {
      if (!userRating || !userFeedback.trim()) {
        alert("Please provide both rating and feedback.");
        return;
      }

      const feedbackEntry = {
        storyId: book.id,
        storyTitle: book.title,
        userRating,
        userFeedback: userFeedback.trim(),
        submittedAt: new Date(),
        readingTime: readingTime,
        screenSize: `${window.innerHeight}x${window.innerWidth}`,
        userAgent: navigator.userAgent,
        timezoneOffset: new Date().getTimezoneOffset(),
      };

      try {
        await addDoc(collection(db, "storyFeedback"), feedbackEntry);
        setFeedbackSubmitted(true);
        
        // Track feedback submission
        trackUserInteraction('feedback_submitted', book, { 
          rating: userRating, 
          feedback_length: userFeedback.length,
          reading_time: readingTime 
        });
        
        alert("✅ Feedback submitted!");
      } catch (error) {
        console.error("Error submitting feedback:", error);
        trackError(error, 'feedback_submission');
        alert("❌ Something went wrong. Please try again later.");
      }
    };  
  return (
    <div
      ref={(el) => {
        scrollRef.current = el;
        swipeRef.current = el;
      }}
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

      {/* Refactored Components */}
      <StoryReaderNavbar 
        showNavbar={showNavbar}
        currentPage={currentPage}
        totalPages={totalPages}
        readingTime={readingTime}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
      />

      <StoryReaderFAB 
        book={book}
        hasLiked={hasLiked}
        likeCount={likeCount}
        showLikeAnimation={showLikeAnimation}
        handleLike={handleLike}
        handleQuoteShare={handleQuoteShare}
      />

      <div className="hidden sm:block">
        <motion.div
          className="fixed top-20 left-6 z-40"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2 }}
        >
          <ReadingStreak readingTime={readingTime} />
        </motion.div>
      </div>

      <StoryReaderSettings 
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        fontSize={fontSize}
        setFontSize={setFontSize}
        lineHeight={lineHeight}
        setLineHeight={setLineHeight}
        fontFamily={fontFamily}
        setFontFamily={setFontFamily}
        textAlign={textAlign}
        setTextAlign={setTextAlign}
        trackUserInteraction={trackUserInteraction}
        setUserPreferences={setUserPreferences}
        book={book}
      />

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
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              </motion.div>

              <motion.p
                className="mt-4 text-sm text-zinc-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Preparing your reading experience...
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Story Content */}
      <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 py-20">
        <StoryReaderContent 
          showTitle={showTitle}
          book={book}
          currentPageContent={currentPageContent}
          currentPage={currentPage}
          isLastPage={isLastPage}
          fontSize={fontSize}
          lineHeight={lineHeight}
          textAlign={textAlign}
          selectedText={selectedText}
          handleQuoteShare={handleQuoteShare}
          isAnimating={isAnimating}
          onTextSelection={handleTextSelection}
        />

        <StoryReaderNavigation 
          currentPage={currentPage}
          totalPages={totalPages}
          isFirstPage={isFirstPage}
          isLastPage={isLastPage}
          isAnimating={isAnimating}
          previousPage={previousPage}
          nextPage={nextPage}
          goToPage={goToPage}
          trackUserInteraction={trackUserInteraction}
          book={book}
        />

        <StoryCompletionCelebration 
          showCompletionCelebration={showCompletionCelebration}
          isLastPage={isLastPage}
          book={book}
          readingTime={readingTime}
        />
      </div>

      <QuoteShareCard
        quote={selectedQuote}
        story={book}
        isOpen={showQuoteShare}
        onClose={() => setShowQuoteShare(false)}
      />
    </div>
  );
}
