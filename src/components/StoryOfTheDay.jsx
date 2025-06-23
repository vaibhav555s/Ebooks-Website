
import React from 'react';
import { Star, Clock, TrendingUp, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getStoryOfTheDay, getDailyReaderCount } from '../data/data';
import DailyReaderCount from './DailyReaderCount';

const StoryOfTheDay = () => {
  const storyOfDay = getStoryOfTheDay();
  const dailyReaderCount = getDailyReaderCount(storyOfDay.id);

  return (
    <motion.div
      className="story-of-day bg-gradient-to-r from-orange-500/10 to-pink-500/10 dark:from-orange-500/20 dark:to-pink-500/20 rounded-xl p-6 border border-orange-200 dark:border-orange-800 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Star className="w-5 h-5 text-orange-500 fill-current" />
        <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
          Story of the Day
        </h3>
        <TrendingUp className="w-4 h-4 text-orange-500" />
      </div>
      
      <div className="grid md:grid-cols-3 gap-4 items-center">
        <div className="md:col-span-1">
          <img 
            src={storyOfDay.cover} 
            alt={storyOfDay.title}
            className="w-full h-48 object-cover rounded-lg shadow-sm"
          />
        </div>
        
        <div className="md:col-span-2">
          <h4 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-2">
            {storyOfDay.title}
          </h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
            by {storyOfDay.author}
          </p>
          <p className="text-zinc-700 dark:text-zinc-300 mb-4 line-clamp-3">
            {storyOfDay.excerpt}
          </p>
          
          <div className="flex items-center gap-4 mb-4 flex-wrap">
            <div className="flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400">
              <Clock size={14} />
              <span>{storyOfDay.readTime}</span>
            </div>
            <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs rounded-full">
              {storyOfDay.genre}
            </span>
            <div className="flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400">
              <Star size={14} />
              <span>{storyOfDay.rating}</span>
            </div>
            <DailyReaderCount count={dailyReaderCount} />
          </div>
          
          <Link
            to={`/story/${storyOfDay.id}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
          >
            <BookOpen size={16} />
            Read Today's Story
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default StoryOfTheDay;
