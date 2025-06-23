
import React, { useState } from 'react';
import { Share2, Instagram, Twitter, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackSocialShare } from '../utils/analytics';

const SocialShare = ({ story, quote = null, className = "", onShare }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareText = quote 
    ? `"${quote}" - from "${story.title}" by ${story.author} 📖✨`
    : `Just read "${story.title}" by ${story.author} - such an amazing story! 📖✨`;
  
  const shareUrl = `${window.location.origin}/story/${story.id}`;

  const shareToInstagram = () => {
    // For Instagram, we'll create a shareable text that users can copy
    const instagramText = `${shareText}\n\nRead it here: ${shareUrl}\n\n#StoryWave #ShortStories #Reading`;
    navigator.clipboard.writeText(instagramText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
    // Track the share
    trackSocialShare('instagram', story, quote);
    onShare?.();
  };

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank');
    
    // Track the share
    trackSocialShare('twitter', story, quote);
    onShare?.();
  };

  const copyToClipboard = () => {
    const fullText = `${shareText}\n\nRead it here: ${shareUrl}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
    // Track the share
    trackSocialShare('copy_link', story, quote);
    onShare?.();
  };

  return (
    <div className={`relative ${className}`}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Share2 size={16} />
        Share
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop to close dropdown */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              className="absolute top-full right-0 mt-2 bg-white dark:bg-zinc-800 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700 p-4 z-50 min-w-[200px]"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              style={{ 
                transformOrigin: 'top right',
                maxWidth: '250px'
              }}
            >
              <div className="space-y-2">
                <button
                  onClick={shareToInstagram}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg transition-colors"
                >
                  <Instagram size={16} className="text-pink-500 flex-shrink-0" />
                  <span className="truncate">{copied ? 'Copied for Instagram!' : 'Share to Instagram'}</span>
                </button>
                
                <button
                  onClick={shareToTwitter}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg transition-colors"
                >
                  <Twitter size={16} className="text-blue-500 flex-shrink-0" />
                  <span className="truncate">Share to Twitter</span>
                </button>
                
                <button
                  onClick={copyToClipboard}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg transition-colors"
                >
                  {copied ? <Check size={16} className="text-green-500 flex-shrink-0" /> : <Copy size={16} className="flex-shrink-0" />}
                  <span className="truncate">{copied ? 'Copied!' : 'Copy Link'}</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SocialShare;
