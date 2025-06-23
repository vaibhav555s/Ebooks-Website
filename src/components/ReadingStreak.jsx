
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, Calendar } from 'lucide-react';
import { trackUserInteraction, trackReadingMilestone } from '../utils/analytics';

export default function ReadingStreak({ readingTime, className = "" }) {
  const [streak, setStreak] = useState(1);
  const [showStreakUpdate, setShowStreakUpdate] = useState(false);

  useEffect(() => {
    // Check reading time milestones
    if (readingTime > 0 && readingTime % 300 === 0) { // Every 5 minutes
      const newStreak = streak + 1;
      setStreak(newStreak);
      setShowStreakUpdate(true);
      setTimeout(() => setShowStreakUpdate(false), 3000);
      
      // Track streak milestone
      trackUserInteraction('reading_streak_increased', null, { 
        new_streak: newStreak,
        reading_time: readingTime 
      });
      
      trackReadingMilestone(`${readingTime / 60}_minute_streak`, readingTime, null);
    }
  }, [readingTime, streak]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <motion.div
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-800/80 text-zinc-300 border border-zinc-700"
        animate={showStreakUpdate ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.5 }}
      >
        <Flame size={14} className="text-orange-500" />
        <span className="text-sm font-medium">{streak} day streak</span>
      </motion.div>

      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-800/80 text-zinc-300 border border-zinc-700">
        <Calendar size={14} className="text-blue-500" />
        <span className="text-sm">{formatTime(readingTime)}</span>
      </div>

      {showStreakUpdate && (
        <motion.div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 px-3 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          Streak increased! 🔥
        </motion.div>
      )}
    </div>
  );
}
