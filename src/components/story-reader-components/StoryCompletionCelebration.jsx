
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Star, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { trackUserInteraction, trackError } from "../../utils/analytics";

export default function StoryCompletionCelebration({ 
  showCompletionCelebration, 
  isLastPage, 
  book, 
  readingTime 
}) {
  const [userRating, setUserRating] = useState(0);
  const [userFeedback, setUserFeedback] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const formatReadingTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleSubmitFeedback = async () => {
    if (!userRating || !userFeedback.trim()) {
      alert("Please provide both rating and feedback.");
      return;
    }

    const feedbackEntry = {
      storyId: book.id,
      storyTitle: book.title,
      userRating,
      userFeedback: userFeedback.trim(),
      submittedAt: new Date(),
      readingTime: readingTime,
      screenSize: `${window.innerHeight}x${window.innerWidth}`,
      userAgent: navigator.userAgent,
      timezoneOffset: new Date().getTimezoneOffset(),
    };

    try {
      await addDoc(collection(db, "storyFeedback"), feedbackEntry);
      setFeedbackSubmitted(true);
      
      trackUserInteraction('feedback_submitted', book, { 
        rating: userRating, 
        feedback_length: userFeedback.length,
        reading_time: readingTime 
      });
      
      alert("✅ Feedback submitted!");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      trackError(error, 'feedback_submission');
      alert("❌ Something went wrong. Please try again later.");
    }
  };

  return (
    <AnimatePresence>
      {showCompletionCelebration && isLastPage && (
        <motion.div
          className="mt-12 p-8 rounded-xl border text-center bg-zinc-800/50 border-zinc-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.div
            className="mb-6 mx-auto"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 15,
              delay: 0.7,
            }}
          >
            <Sparkles size={48} className="text-orange-500 mx-auto" />
          </motion.div>

          <motion.h3
            className="text-2xl font-bold mb-3 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            Story Complete!
          </motion.h3>

          <motion.p
            className="mb-8 text-zinc-300 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            You've finished reading "{book.title}" by {book.author}.
            Reading time: {formatReadingTime(readingTime)}
          </motion.p>

          <div className="mb-6">
            <h4 className="font-bold text-sm text-white mb-2">
              Rate this story:
            </h4>
            <div className="flex items-center justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  className="outline-none p-1"
                  onClick={() => setUserRating(star)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Star
                    size={28}
                    className={cn(
                      "cursor-pointer transition-colors duration-200",
                      star <= userRating
                        ? "text-orange-500"
                        : "text-zinc-500"
                    )}
                  />
                </motion.button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="feedback"
              className="block text-sm font-bold text-white mb-2"
            >
              Your Feedback:
            </label>
            <textarea
              id="feedback"
              className="w-full p-3 rounded-md bg-zinc-700 text-white border border-zinc-600 focus:outline-none focus:border-orange-500 resize-none text-sm"
              placeholder="Share your thoughts about the story..."
              value={userFeedback}
              onChange={(e) => setUserFeedback(e.target.value)}
              maxLength={500}
              rows={3}
            />
            <p className="text-xs text-zinc-400 mt-1">
              {userFeedback.length}/{500} characters
            </p>
          </div>

          <motion.button
            className="w-full px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-orange-500 to-pink-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={feedbackSubmitted}
            onClick={handleSubmitFeedback}
          >
            {feedbackSubmitted ? "Submitted ✓" : "Submit Feedback"}
          </motion.button>

          {book.nextStory && (
            <motion.div
              className="p-4 sm:p-6 rounded-lg border flex flex-col sm:flex-row gap-4 items-center text-left bg-zinc-900 border-zinc-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              whileHover={{ y: -5 }}
            >
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={book.nextStory.coverImage || "/placeholder.svg"}
                  alt={book.nextStory.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h4 className="font-bold mb-1 text-white">
                  Up Next: {book.nextStory.title}
                </h4>
                <p className="text-sm text-zinc-400 mb-2">
                  By {book.nextStory.author} • {book.nextStory.readTime}
                </p>
                <span className="inline-block px-2 py-1 rounded-full text-xs bg-zinc-800 text-zinc-300">
                  {book.nextStory.category}
                </span>
              </div>
              <Link to={`/reader/${book.nextStory.id}`}>
                <motion.button
                  className="w-full px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Reading
                </motion.button>
              </Link>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
