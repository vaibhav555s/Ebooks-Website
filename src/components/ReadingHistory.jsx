
import React, { useState, useEffect } from 'react';
import { Clock, BookOpen, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { booksData } from '../data/data';

const ReadingHistory = () => {
  const [readStories, setReadStories] = useState([]);
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    const savedReadStories = localStorage.getItem('storywave-read-stories');
    const savedHistory = localStorage.getItem('storywave-reading-history');
    
    if (savedReadStories) {
      const readIds = JSON.parse(savedReadStories);
      setReadStories(readIds);
      
      // Get story details for read stories
      const readStoriesData = booksData.filter(story => readIds.includes(story.id));
      setHistoryData(readStoriesData);
    }
    
    if (savedHistory) {
      // Future: implement detailed reading history with timestamps
    }
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('storywave-read-stories');
    localStorage.removeItem('storywave-reading-history');
    setReadStories([]);
    setHistoryData([]);
  };

  const removeFromHistory = (storyId) => {
    const updatedReadStories = readStories.filter(id => id !== storyId);
    const updatedHistoryData = historyData.filter(story => story.id !== storyId);
    
    setReadStories(updatedReadStories);
    setHistoryData(updatedHistoryData);
    localStorage.setItem('storywave-read-stories', JSON.stringify(updatedReadStories));
  };

  if (historyData.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="w-16 h-16 text-zinc-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-zinc-600 dark:text-zinc-300 mb-2">
          No Reading History Yet
        </h3>
        <p className="text-zinc-500 dark:text-zinc-400">
          Start reading stories to build your personal library
        </p>
      </div>
    );
  }

  return (
    <div className="reading-history">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
          Reading History
        </h2>
        {historyData.length > 0 && (
          <button
            onClick={clearHistory}
            className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:text-red-600 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <Trash2 size={16} />
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {historyData.map((story) => (
          <motion.div
            key={story.id}
            className="reading-history-card bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700 overflow-hidden hover:shadow-md transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative h-48">
              <img 
                src={story.cover} 
                alt={story.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                <Link
                  to={`/story/${story.id}`}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Read Again
                </Link>
              </div>
              <button
                onClick={() => removeFromHistory(story.id)}
                className="absolute top-2 right-2 p-2 bg-red-500/80 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-zinc-800 dark:text-zinc-100 mb-1 line-clamp-2">
                {story.title}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                by {story.author}
              </p>
              <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                <Clock size={12} />
                <span>{story.readTime}</span>
                <span>•</span>
                <span>{story.genre}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ReadingHistory;
