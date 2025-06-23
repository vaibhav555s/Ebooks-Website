
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, X, Download, Share2, Instagram, Twitter } from 'lucide-react';

export default function QuoteShareCard({ quote, story, isOpen, onClose }) {
  const [selectedTheme, setSelectedTheme] = useState('gradient');

  const themes = {
    gradient: 'bg-gradient-to-br from-orange-500 to-pink-500',
    dark: 'bg-zinc-900 border border-zinc-700',
    minimal: 'bg-white text-zinc-900 border border-zinc-200'
  };

  const shareToSocial = (platform) => {
    const text = `"${quote}" - from "${story.title}" by ${story.author}`;
    const url = `${window.location.origin}/story/${story.id}`;
    
    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'instagram') {
      navigator.clipboard.writeText(`${text}\n\nRead more: ${url}`);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-md bg-zinc-900 rounded-2xl p-6 border border-zinc-700"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-white">Share Quote</h3>
              <button onClick={onClose} className="text-zinc-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            {/* Quote Card Preview */}
            <div className={`relative p-6 rounded-xl mb-6 ${themes[selectedTheme]} ${selectedTheme === 'minimal' ? 'text-zinc-900' : 'text-white'}`}>
              <Quote size={32} className="opacity-20 absolute top-4 left-4" />
              <blockquote className="text-lg font-medium mb-4 relative z-10">
                "{quote}"
              </blockquote>
              <div className="text-sm opacity-80">
                — {story.title} by {story.author}
              </div>
            </div>

            {/* Theme Selection */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-zinc-300 mb-3">Theme</h4>
              <div className="flex gap-2">
                {Object.entries(themes).map(([name, classes]) => (
                  <button
                    key={name}
                    onClick={() => setSelectedTheme(name)}
                    className={`w-8 h-8 rounded-lg ${classes} border-2 ${
                      selectedTheme === name ? 'border-orange-500' : 'border-transparent'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Share Options */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => shareToSocial('twitter')}
                className="flex items-center justify-center gap-2 p-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                <Twitter size={16} />
                Twitter
              </button>
              <button
                onClick={() => shareToSocial('instagram')}
                className="flex items-center justify-center gap-2 p-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition-opacity"
              >
                <Instagram size={16} />
                Instagram
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
