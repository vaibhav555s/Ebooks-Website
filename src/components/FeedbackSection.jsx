"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import EmotionFeedbackSlider from "./emotion-feedback-slider";
import ContentDiscoveryPreferences from "./content-discovery-preferences";
import FormatPreferencesGrid from "./format-preferences-grid";
import CommunityFeaturesVoting from "./community-features-voting";
import FutureVisionSelector from "./future-vision-selector";
import FeedbackCanvas from "./feedback-canvas";
import SubmitExperience from "./submit-experience";
import FutureVisionShowcase from "./future-vision-showcase";
import { Sparkles } from "lucide-react";

export default function FeedbackSection() {
  const [scrollY, setScrollY] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedbackData, setFeedbackData] = useState({
    emotion: 3, // Default to 😊
    contentPreferences: [],
    formatPreferences: [],
    communityRatings: {
      creatorProfiles: 0,
      socialComments: 0,
      readerRankings: 0,
      liveStoryEvents: 0,
    },
    futureVisionInterest: {
      creatorEconomy: 0,
      socialStorytelling: 0,
      aiStoryEnhancement: 0,
      audioUniverse: 0,
    },
    feedbackText: "",
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = () => {
    console.log("Feedback submitted:", feedbackData);
    setIsSubmitted(true);
    // Here you would typically send the data to your backend
  };

  const updateFeedbackData = (key, value) => {
    setFeedbackData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>

        {/* Grain Texture */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>
        </div>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative mb-16 text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">
          Shape StoryWave's Future
        </h1>
        <div className="flex items-center justify-center gap-2 text-xl text-purple-200">
          <Sparkles className="h-5 w-5 text-pink-400" />
          <p>Your feedback powers our next chapter</p>
          <Sparkles className="h-5 w-5 text-pink-400" />
        </div>
      </motion.div>

      {isSubmitted ? (
        <ThankYouScreen resetForm={() => setIsSubmitted(false)} />
      ) : (
        <div className="space-y-24 relative z-10">
          <EmotionFeedbackSlider
            value={feedbackData.emotion}
            onChange={(value) => updateFeedbackData("emotion", value)}
          />

          <ContentDiscoveryPreferences
            selected={feedbackData.contentPreferences}
            onChange={(value) =>
              updateFeedbackData("contentPreferences", value)
            }
          />

          <FormatPreferencesGrid
            selected={feedbackData.formatPreferences}
            onChange={(value) => updateFeedbackData("formatPreferences", value)}
          />

          <CommunityFeaturesVoting
            ratings={feedbackData.communityRatings}
            onChange={(value) => updateFeedbackData("communityRatings", value)}
          />

          <FutureVisionSelector
            interests={feedbackData.futureVisionInterest}
            onChange={(value) =>
              updateFeedbackData("futureVisionInterest", value)
            }
          />

          <FeedbackCanvas
            value={feedbackData.feedbackText}
            onChange={(value) => updateFeedbackData("feedbackText", value)}
          />

          <SubmitExperience onSubmit={handleSubmit} />

          <FutureVisionShowcase />
        </div>
      )}
    </div>
  );
}

function ThankYouScreen({ resetForm }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative bg-gradient-to-br from-purple-900/40 to-fuchsia-900/40 backdrop-blur-xl rounded-3xl p-10 text-center space-y-8 border border-white/10"
    >
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>
      </div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-24 h-24 mx-auto bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center"
      >
        <svg
          className="w-12 h-12 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </motion.div>

      <div className="space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400">
          Thanks for shaping StoryWave's future!
        </h2>
        <p className="text-purple-200 text-lg max-w-2xl mx-auto">
          Your feedback is the ink in our next chapter. We're constantly
          evolving to create the ultimate storytelling experience for you.
        </p>
      </div>

      <div className="pt-6">
        <motion.button
          onClick={resetForm}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white font-medium shadow-lg shadow-purple-500/20"
        >
          Back to Home
        </motion.button>
      </div>
    </motion.div>
  );
}
