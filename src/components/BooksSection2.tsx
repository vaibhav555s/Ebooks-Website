
import React, { useState, useEffect } from 'react';
import { Heart, Clock, Star, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import {booksData} from '../data/data'; // Assuming you have a data file with book details

interface Story {
  id: string;
  title: string;
  author: string;
  genre: string;
  readTime: string;
  rating: number;
  likes: number;
  cover: string;
  excerpt: string;
  isLiked: boolean;
}

const BooksSection2 = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [loading, setLoading] = useState(true);

  const genres = ['all', 'fantasy', 'romance', 'sci-fi', 'mystery', 'adventure'];
  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'recent', label: 'Recently Added' },
    { value: 'rating', label: 'Highest Rated' }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStories(booksData);
      setLoading(false);
    }, 1000);
  }, []);
  // useEffect(() => {
  //   // Simulate API call
  //   setTimeout(() => {
  //     setStories([
  //       {
  //         id: '1',
  //         title: 'The Digital Prophecy',
  //         author: 'Alex Chen',
  //         genre: 'sci-fi',
  //         readTime: '15 min',
  //         rating: 4.8,
  //         likes: 1247,
  //         cover: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=600&fit=crop',
  //         excerpt: 'In a world where AI has evolved beyond human comprehension...',
  //         isLiked: false
  //       },
  //       {
  //         id: '2',
  //         title: 'Echoes of Tomorrow',
  //         author: 'Maya Rodriguez',
  //         genre: 'fantasy',
  //         readTime: '12 min',
  //         rating: 4.6,
  //         likes: 987,
  //         cover: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=600&fit=crop',
  //         excerpt: 'When ancient magic meets modern technology...',
  //         isLiked: true
  //       },
  //       {
  //         id: '3',
  //         title: 'Neon Hearts',
  //         author: 'Jordan Kim',
  //         genre: 'romance',
  //         readTime: '8 min',
  //         rating: 4.9,
  //         likes: 2156,
  //         cover: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=600&fit=crop',
  //         excerpt: 'Love finds a way in the neon-lit streets of Neo Tokyo...',
  //         isLiked: false
  //       },
  //       {
  //         id: '4',
  //         title: 'The Memory Thief',
  //         author: 'Sam Wilson',
  //         genre: 'mystery',
  //         readTime: '20 min',
  //         rating: 4.7,
  //         likes: 834,
  //         cover: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=600&fit=crop',
  //         excerpt: 'Detective Sarah Miles discovers a conspiracy that threatens...',
  //         isLiked: false
  //       },
  //       {
  //         id: '5',
  //         title: 'Quantum Dreams',
  //         author: 'Riley Zhang',
  //         genre: 'adventure',
  //         readTime: '18 min',
  //         rating: 4.5,
  //         likes: 1456,
  //         cover: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=400&h=600&fit=crop',
  //         excerpt: 'When dreams and reality collide in the quantum realm...',
  //         isLiked: true
  //       },
  //       {
  //         id: '6',
  //         title: 'The Last Algorithm',
  //         author: 'Casey Park',
  //         genre: 'sci-fi',
  //         readTime: '25 min',
  //         rating: 4.8,
  //         likes: 1789,
  //         cover: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=600&fit=crop',
  //         excerpt: 'In a post-digital world, one programmer holds the key...',
  //         isLiked: false
  //       }
  //     ]);
  //     setLoading(false);
  //   }, 1000);
  // }, []);

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

  const filteredStories = stories
    .filter(story => filter === 'all' || story.genre === filter)
    .sort((a, b) => {
      switch (sortBy) {
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

  if (loading) {
    return (
      <section className="books-section">
        <div className="container">
          <div className="loading-grid">
            {Array.from({ length: 6 }).map((_, i) => (
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
          <h2 className="section-title">Trending Stories</h2>
          <p className="section-subtitle">
            Discover the most captivating stories our community is reading
          </p>
        </div>

        <div className="filters-container">
          <div className="genre-filters">
            {genres.map(genre => (
              <button
                key={genre}
                onClick={() => setFilter(genre)}
                className={`filter-button ${filter === genre ? 'active' : ''}`}
              >
                {genre.charAt(0).toUpperCase() + genre.slice(1)}
              </button>
            ))}
          </div>

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
        </div>

        <div className="stories-grid">
          {filteredStories.map((story) => (
            <div key={story.id} className="story-card">
              <div className="story-cover">
                <img src={story.cover} alt={story.title} />
                <div className="story-overlay">
                  <Link to={`/story/${story.id}`} className="read-button">
                    <BookOpen size={20} />
                    Read Now
                  </Link>
                </div>
                <button
                  onClick={() => handleLike(story.id)}
                  className={`like-button ${story.isLiked ? 'liked' : ''}`}
                >
                  <Heart size={16} fill={story.isLiked ? 'currentColor' : 'none'} />
                </button>
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

                <div className="story-footer">
                  <span className="likes-count">
                    <Heart size={14} />
                    {story.likes.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BooksSection2;
