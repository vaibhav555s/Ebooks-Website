
import React from 'react';
import { ArrowLeft, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const BackToHomeButton = ({ variant = 'floating' }) => {
  if (variant === 'floating') {
    return (
      <motion.div
        className="fixed top-20 left-4 z-40"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link to="/">
          <motion.button
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/90 backdrop-blur-sm text-zinc-300 hover:text-white border border-zinc-700 hover:border-orange-500/50 transition-all duration-300 glow-border-orange"
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Home className="w-4 h-4" />
            <span className="text-sm font-medium">Home</span>
          </motion.button>
        </Link>
      </motion.div>
    );
  }

  return (
    <Link to="/">
      <motion.button
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 hover:border-orange-500/50 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back to Home</span>
      </motion.button>
    </Link>
  );
};

export default BackToHomeButton;
