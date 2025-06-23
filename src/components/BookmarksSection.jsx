
import React, { useState, useEffect } from 'react';
import { Bookmark, BookOpen, Heart, Star, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { booksData } from '../data/data';

const BookmarksSection = () => {
  const [bookmarkedStories, setBookmarkedStories] = useState([]);
  const [bookmarksData, setBookmarksData] = useState([]);

  useEffect(() => {
    const savedBookmarks = localStorage.getItem('storywave-bookmarks');
    
    if (savedBookmarks) {
      const bookmarkIds = JSON.parse(savedBookmarks);
      setBookmarkedStories(bookmarkIds);
      
      // Get story details for bookmarked stories
      const bookmarkedStoriesData = booksData.filter(story => bookmarkIds.includes(story.id));
      setBookmarksData(bookmarkedStoriesData);
    }
  }, []);

  const removeBookmark = (storyId) => {
    const updatedBookmarks = bookmarkedStories.filter(id => id !== storyId);
    const updatedBookmarksData = bookmarksData.filter(story => story.id !== storyId);
    
    setBookmarkedStories(updatedBookmarks);
    setBookmarksData(updatedBookmarksData);
    localStorage.setItem('storywave-bookmarks', JSON.stringify(updatedBookmarks));
  };

  if (bookmarksData.length === 0) {
    return (
      <div className="text-center py-12">
        <Bookmark className="w-16 h-16 text-zinc-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-zinc-600 dark:text-zinc-300 mb-2">
          No Bookmarks Yet
        </h3>
        <p className="text-zinc-500 dark:text-zinc-400">
          Bookmark stories to save them for later reading
        </p>
      </div>
    );
  }

  return (
    <div className="bookmarks-section">
      <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-6">
        Your Bookmarks
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookmarksData.map((story) => (
          <motion.div
            key={story.id}
            className="bookmark-card bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700 overflow-hidden hover:shadow-md transition-shadow"
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
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
                >
                  <BookOpen size={16} />
                  Read Now
                </Link>
              </div>
              <button
                onClick={() => removeBookmark(story.id)}
                className="absolute top-2 right-2 p-2 bg-orange-500/80 text-white rounded-full hover:bg-orange-600 transition-colors"
              >
                <Bookmark size={14} fill="currentColor" />
              </button>
            </div>
            
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs rounded-full">
                  {story.genre}
                </span>
                <div className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                  <Star size={12} />
                  <span>{story.rating}</span>
                </div>
              </div>
              
              <h3 className="font-semibold text-zinc-800 dark:text-zinc-100 mb-1 line-clamp-2">
                {story.title}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                by {story.author}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3 line-clamp-2">
                {story.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                  <Clock size={12} />
                  <span>{story.readTime}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                  <Heart size={12} />
                  <span>{story.likes.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BookmarksSection;
