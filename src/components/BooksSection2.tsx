
import React, { useState, useEffect } from 'react';
import { Heart, Clock, Star, BookOpen, Bookmark, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { booksData, getTrendingStories } from '../data/data';
import SearchBar from './SearchBar';
import StoryOfTheDay from './StoryOfTheDay';
import SocialShare from './SocialShare';
import TrendingStats from './TrendingStats';
import './Phase1.css';

interface Story {
  id: string;
  title: string;
  author: string;
  genre: string;
  readTime: string;
  rating: number;
  likes: number;
  views?: number;
  cover: string;
  excerpt: string;
  isLiked: boolean;
}

interface BooksSection2Props {
  showLimited?: boolean;
  onViewAll?: () => void;
  selectedGenre?: string;
  showGenreFilter?: boolean;
  onGenreChange?: (genre: string) => void;
}

const BooksSection2: React.FC<BooksSection2Props> = ({ 
  showLimited = false, 
  onViewAll, 
  selectedGenre = 'all',
  showGenreFilter = false,
  onGenreChange 
}) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [filter, setFilter] = useState(selectedGenre);
  const [sortBy, setSortBy] = useState('trending');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [bookmarkedStories, setBookmarkedStories] = useState<string[]>([]);
  const [readStories, setReadStories] = useState<string[]>([]);

  const genres = ['all', 'fantasy', 'romance', 'sci-fi', 'mystery', 'adventure'];
  const sortOptions = [
    { value: 'trending', label: 'Trending Now' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'recent', label: 'Recently Added' },
    { value: 'rating', label: 'Highest Rated' }
  ];

  // Update filter when selectedGenre prop changes
  useEffect(() => {
    setFilter(selectedGenre);
  }, [selectedGenre]);

  useEffect(() => {
    const savedBookmarks = localStorage.getItem('storywave-bookmarks');
    const savedReadStories = localStorage.getItem('storywave-read-stories');
    
    if (savedBookmarks) {
      setBookmarkedStories(JSON.parse(savedBookmarks));
    }
    if (savedReadStories) {
      setReadStories(JSON.parse(savedReadStories));
    }

    setTimeout(() => {
      const storiesWithViews = booksData.map(story => ({
        ...story,
        views: story.views || Math.floor(Math.random() * 5000) + 1000,
        isLiked: false
      }));
      setStories(storiesWithViews);
      setLoading(false);
    }, 1000);
  }, []);

  const handleGenreChange = (genre: string) => {
    setFilter(genre);
    if (onGenreChange) {
      onGenreChange(genre);
    }
  };

  const handleLike = (storyId: string) => {
    setStories(prev => prev.map(story => 
      story.id === storyId 
        ? { 
            ...story, 
            isLiked: !story.isLiked,
            likes: story.isLiked ? story.likes - 1 : story.likes + 1
          }
        : story
    ));
  };

  const handleBookmark = (storyId: string) => {
    const newBookmarks = bookmarkedStories.includes(storyId)
      ? bookmarkedStories.filter(id => id !== storyId)
      : [...bookmarkedStories, storyId];
    
    setBookmarkedStories(newBookmarks);
    localStorage.setItem('storywave-bookmarks', JSON.stringify(newBookmarks));
  };

  const handleMarkAsRead = (storyId: string) => {
    const newReadStories = readStories.includes(storyId)
      ? readStories.filter(id => id !== storyId)
      : [...readStories, storyId];
    
    setReadStories(newReadStories);
    localStorage.setItem('storywave-read-stories', JSON.stringify(newReadStories));
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const filteredStories = stories
    .filter(story => {
      const matchesGenre = filter === 'all' || (story.genre && story.genre.toLowerCase() === filter.toLowerCase());
      const matchesSearch = !searchTerm || 
        (story.title && story.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (story.author && story.author.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (story.genre && story.genre.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesGenre && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'trending':
          const scoreA = (a.views || 0) + (a.likes || 0) * 3;
          const scoreB = (b.views || 0) + (b.likes || 0) * 3;
          return scoreB - scoreA;
        case 'popular':
          return b.likes - a.likes;
        case 'rating':
          return b.rating - a.rating;
        case 'recent':
          return b.id.localeCompare(a.id);
        default:
          return 0;
      }
    });

  // Limit stories to 3 if showLimited is true
  const displayedStories = showLimited ? filteredStories.slice(0, 3) : filteredStories;

  if (loading) {
    return (
      <section className="books-section">
        <div className="container">
          <div className="loading-grid">
            {Array.from({ length: showLimited ? 3 : 6 }).map((_, i) => (
              <div key={i} className="story-card-skeleton">
                <div className="skeleton-cover"></div>
                <div className="skeleton-content">
                  <div className="skeleton-title"></div>
                  <div className="skeleton-author"></div>
                  <div className="skeleton-tags"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="books-section" id="books1">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Discover Amazing Stories</h2>
          <p className="section-subtitle">
            Immerse yourself in captivating narratives that transport you to new worlds
          </p>
        </div>

        {!showLimited && <StoryOfTheDay />}

        {!showLimited && (
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <SearchBar 
              onSearch={handleSearch} 
              placeholder="Search stories, authors, or genres..."
            />
          </motion.div>
        )}

        {(showGenreFilter || !showLimited) && (
          <div className="filters-container">
            <div className="genre-filters">
              {genres.map(genre => (
                <button
                  key={genre}
                  onClick={() => handleGenreChange(genre)}
                  className={`filter-button ${filter === genre ? 'active' : ''}`}
                >
                  {genre.charAt(0).toUpperCase() + genre.slice(1)}
                </button>
              ))}
            </div>

            {!showLimited && (
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          </div>
        )}

        {searchTerm && !showLimited && (
          <motion.div 
            className="mb-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-zinc-400 text-sm">
              Found {filteredStories.length} {filteredStories.length === 1 ? 'story' : 'stories'} 
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </motion.div>
        )}

        <div className="stories-grid">
          {displayedStories.map((story) => {
            const isBookmarked = bookmarkedStories.includes(story.id);
            const isRead = readStories.includes(story.id);
            
            return (
              <motion.div 
                key={story.id} 
                className={`story-card ${isRead ? 'read-story' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="story-cover">
                  <img src={story.cover} alt={story.title} />
                  {isRead && (
                    <div className="read-badge">
                      <span className="text-xs font-medium">Read</span>
                    </div>
                  )}
                  {sortBy === 'trending' && (
                    <div className="trending-badge">
                      <span className="text-xs font-medium">Trending</span>
                    </div>
                  )}
                  <div className="story-overlay">
                    <Link to={`/story/${story.id}`} className="read-button">
                      <BookOpen size={20} />
                      {isRead ? 'Read Again' : 'Read Now'}
                    </Link>
                  </div>
                  <div className="story-actions">
                    <button
                      onClick={() => handleLike(story.id)}
                      className={`action-button like-button ${story.isLiked ? 'liked' : ''}`}
                    >
                      <Heart size={16} fill={story.isLiked ? 'currentColor' : 'none'} />
                    </button>
                    <button
                      onClick={() => handleBookmark(story.id)}
                      className={`action-button bookmark-button ${isBookmarked ? 'bookmarked' : ''}`}
                    >
                      <Bookmark size={16} fill={isBookmarked ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                </div>

                <div className="story-content">
                  <div className="story-meta">
                    <span className="genre-tag">{story.genre}</span>
                    <div className="story-stats">
                      <span className="read-time">
                        <Clock size={14} />
                        {story.readTime}
                      </span>
                      <span className="rating">
                        <Star size={14} />
                        {story.rating}
                      </span>
                    </div>
                  </div>

                  <h3 className="story-title">{story.title}</h3>
                  <p className="story-author">by {story.author}</p>
                  <p className="story-excerpt">{story.excerpt}</p>

                  <TrendingStats story={story} compact={true} />

                  <div className="story-footer">
                    <span className="likes-count">
                      <Heart size={14} />
                      {story.likes.toLocaleString()}
                    </span>
                    <div className="story-footer-actions">
                      <SocialShare story={story} className="mr-2" />
                      <button
                        onClick={() => handleMarkAsRead(story.id)}
                        className={`mark-read-button ${isRead ? 'marked' : ''}`}
                      >
                        {isRead ? 'Mark Unread' : 'Mark as Read'}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {showLimited && onViewAll && (
          <motion.div 
            className="text-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <button
              onClick={onViewAll}
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-colors duration-300 shadow-sm hover:shadow-md"
            >
              <span>View All Stories</span>
              <ArrowRight size={16} />
            </button>
          </motion.div>
        )}

        {filteredStories.length === 0 && !loading && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-zinc-400 text-lg">No stories found matching your criteria</p>
            <p className="text-zinc-500 text-sm mt-2">Try adjusting your search or filters</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BooksSection2;
