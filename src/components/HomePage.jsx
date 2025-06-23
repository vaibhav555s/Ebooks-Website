"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FeedbackSection from "./FeedbackSection";
import FeedbackCTA from "./FeedbackCTA";
import Footer from "./Footer";
import Navbar from "./Navbar3";
import { ThemeProvider } from "./theme-provider";
import Hero2 from "./Hero2";
import BooksSection2 from "./BooksSection2";
import BookmarksSection from "./BookmarksSection";
import ReadingHistory from "./ReadingHistory";
import CommunityEngagement from "./CommunityEngagement";
import FloatingCTA from "./FloatingCTA";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('trending');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'bookmarks':
        return <BookmarksSection />;
      case 'history':
        return <ReadingHistory />;
      default:
        return (
          <BooksSection2 
            showLimited={true} 
            onViewAll={() => navigate('/trending')}
            selectedGenre={selectedGenre}
            showGenreFilter={true}
            onGenreChange={setSelectedGenre}
          />
        );
    }
  };

  return (
    <ThemeProvider defaultTheme="light" storageKey="storywave-theme">
      <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-900 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
        <Navbar />
        <FloatingCTA />
        
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
              
              {/* Section Navigation */}
              <div className="container mx-auto px-4 py-8">
                <div className="flex justify-center mb-8">
                  <div className="flex items-center bg-white dark:bg-zinc-800 rounded-full p-1 shadow-sm border border-zinc-200 dark:border-zinc-700">
                    <button
                      onClick={() => setActiveSection('trending')}
                      className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                        activeSection === 'trending'
                          ? 'bg-orange-500 text-white shadow-sm'
                          : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
                      }`}
                    >
                      Trending Stories
                    </button>
                    <button
                      onClick={() => setActiveSection('bookmarks')}
                      className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                        activeSection === 'bookmarks'
                          ? 'bg-orange-500 text-white shadow-sm'
                          : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
                      }`}
                    >
                      Bookmarks
                    </button>
                    <button
                      onClick={() => setActiveSection('history')}
                      className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                        activeSection === 'history'
                          ? 'bg-orange-500 text-white shadow-sm'
                          : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
                      }`}
                    >
                      Reading History
                    </button>
                  </div>
                </div>

                {/* Active Section Content */}
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderActiveSection()}
                </motion.div>
              </div>

              {/* Community Engagement Section */}
              <div data-section="community">
                <CommunityEngagement />
              </div>

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
