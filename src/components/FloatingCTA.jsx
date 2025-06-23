
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, X } from 'lucide-react';

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 300px and not dismissed
      const scrolled = window.scrollY > 300;
      setIsVisible(scrolled && !isDismissed);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const scrollToCommunity = () => {
    const communitySection = document.querySelector('[data-section="community"]');
    if (communitySection) {
      communitySection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsDismissed(true);
  };

  const handleDismiss = (e) => {
    e.stopPropagation();
    setIsDismissed(true);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div
            onClick={scrollToCommunity}
            className="relative bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-3 rounded-full shadow-lg cursor-pointer hover:from-orange-600 hover:to-pink-600 transition-all duration-300 flex items-center gap-2 group"
          >
            <button
              onClick={handleDismiss}
              className="absolute -top-2 -right-2 w-6 h-6 bg-zinc-700 text-white rounded-full flex items-center justify-center hover:bg-zinc-800 transition-colors"
            >
              <X size={12} />
            </button>
            
            <BookOpen size={18} className="animate-pulse" />
            <span className="font-medium text-sm">Got a Story?</span>
            
            {/* Floating animation */}
            <motion.div
              animate={{ y: [-2, 2, -2] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full -z-10 blur-sm opacity-50"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingCTA;
