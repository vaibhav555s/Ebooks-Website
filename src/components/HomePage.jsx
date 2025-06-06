"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FeedbackSection from "./FeedbackSection";
import FeedbackCTA from "./FeedbackCTA";
import Footer from "./Footer";
import Navbar from "./Navbar3"; // or your preferred navbar
import { ThemeProvider } from "./theme-provider"; // Ensure this exists
import Hero2 from "./Hero2"; // Ensure this exists
// import BooksSection1 from "./BooksSection1";
import BooksSection2 from "./BooksSection2";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider defaultTheme="light" storageKey="storywave-theme">
      <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-900 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
        <Navbar />
        <AnimatePresence>
          {isLoading ? (
            <LoadingScreen key="loading" />
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Hero2 />
              <BooksSection2 />
              <FeedbackCTA />
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </ThemeProvider>
  );
}

function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-orange-50 to-white dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-900 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative flex flex-col items-center">
        <motion.div
          className="w-24 h-24 rounded-full border-t-4 border-l-4 border-orange-500 dark:border-orange-400"
          animate={{ rotate: 360 }}
          transition={{
            duration: 0.4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [0.8, 1.2, 1], opacity: [0, 1, 1] }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {/* <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500 dark:from-orange-400 dark:to-pink-400">
            SW
          </span> */}
        </motion.div>
        <motion.p
          className="mt-4 text-zinc-600 dark:text-zinc-300 text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          Loading your experience...
        </motion.p>
      </div>
    </motion.div>
  );
}
