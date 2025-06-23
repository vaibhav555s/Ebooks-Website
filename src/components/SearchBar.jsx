
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = ({ onSearch, placeholder = "Search stories..." }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <motion.div
      className="relative w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`relative flex items-center rounded-full transition-all duration-300 ${
        isFocused 
          ? 'bg-white dark:bg-zinc-800 ring-2 ring-orange-500/50 shadow-lg' 
          : 'bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm'
      }`}>
        <Search className="absolute left-4 w-5 h-5 text-zinc-400" />
        
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-3 bg-transparent text-zinc-800 dark:text-white placeholder-zinc-400 rounded-full focus:outline-none text-sm"
        />
        
        <AnimatePresence>
          {searchTerm && (
            <motion.button
              onClick={clearSearch}
              className="absolute right-4 w-5 h-5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors duration-200"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-full h-full" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      
      {isFocused && (
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/10 to-pink-500/10 blur-xl -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </motion.div>
  );
};

export default SearchBar;
