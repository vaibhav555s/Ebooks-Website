
import React from 'react';
import { TrendingUp, Eye, Heart, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const TrendingStats = ({ story, compact = false }) => {
  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  if (compact) {
    return (
      <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
        <div className="flex items-center gap-1">
          <Eye size={12} />
          <span>{formatNumber(story.views || 0)}</span>
        </div>
        <div className="flex items-center gap-1">
          <Heart size={12} />
          <span>{formatNumber(story.likes || 0)}</span>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="flex items-center gap-4 py-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-1 text-sm text-zinc-600 dark:text-zinc-400">
        <TrendingUp size={14} className="text-orange-500" />
        <span className="font-medium">Trending</span>
      </div>
      
      <div className="flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400">
        <Eye size={14} />
        <span>{formatNumber(story.views || 0)} views</span>
      </div>
      
      <div className="flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400">
        <Heart size={14} />
        <span>{formatNumber(story.likes || 0)} likes</span>
      </div>
      
      <div className="flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400">
        <Clock size={14} />
        <span>{story.readTime}</span>
      </div>
    </motion.div>
  );
};

export default TrendingStats;
