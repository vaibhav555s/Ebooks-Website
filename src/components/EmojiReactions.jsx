
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EmojiReactions({ onReaction, className = "" }) {
  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState(null);

  const reactions = [
    { emoji: '❤️', label: 'Love it' },
    { emoji: '😍', label: 'Amazing' },
    { emoji: '🤔', label: 'Interesting' },
    { emoji: '😭', label: 'Emotional' },
    { emoji: '🔥', label: 'Fire' },
    { emoji: '👏', label: 'Applause' }
  ];

  const handleReaction = (reaction) => {
    setSelectedReaction(reaction);
    onReaction?.(reaction);
    setShowReactions(false);

    // Show feedback for 2 seconds
    setTimeout(() => setSelectedReaction(null), 2000);
  };

  return (
    <div className={`relative ${className}`}>
      <motion.button
        onClick={() => setShowReactions(!showReactions)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:text-orange-500 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {selectedReaction ? (
          <>
            <span className="text-lg">{selectedReaction.emoji}</span>
            <span>{selectedReaction.label}</span>
          </>
        ) : (
          <>
            <span className="text-lg">😊</span>
            <span>React</span>
          </>
        )}
      </motion.button>

      <AnimatePresence>
        {showReactions && (
          <motion.div
            className="absolute bottom-full left-0 mb-2 flex gap-1 p-2 bg-zinc-800 rounded-lg border border-zinc-700 shadow-lg"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            {reactions.map((reaction, index) => (
              <motion.button
                key={reaction.emoji}
                onClick={() => handleReaction(reaction)}
                className="w-10 h-10 rounded-lg hover:bg-zinc-700 flex items-center justify-center text-lg transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                {reaction.emoji}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
