"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";
import EmotionFeedbackSlider from "./emotion-feedback-slider";
import ContentDiscoveryPreferences from "./content-discovery-preferences";
import FormatPreferencesGrid from "./format-preferences-grid";
import CommunityFeaturesVoting from "./community-features-voting";
import FeedbackRatingSlider from "./feedback-rating-slider";
import FeedbackCanvas from "./feedback-canvas";
import SubmitExperience from "./submit-experience";
import RoadmapTimeline from "./roadmap-timeline";
// import { useToast } from "@/components/ui/use-toast";
// import { useTheme } from "next-themes";
import { db } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function FeedbackSection() {
  const theme = "dark";
  // const { toast } = useToast();
  const [scrollY, setScrollY] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const containerRef = useRef(null);

  const [feedbackData, setFeedbackData] = useState({
    emotion: 3, // Default to 😊
    contentPreferences: [],
    formatPreferences: [],
    overallRating: 5, // Default to middle value
    communityRatings: {
      creatorProfiles: 0,
      readerRankings: 0,
    },
    feedbackText: "",
  });

  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const backgroundY1 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const backgroundY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.6, 0.2]);
  const opacity2 = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.6, 1]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const updateFeedbackData = (key, value) => {
    setFeedbackData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    if (!feedbackData.feedbackText.trim()) {
      alert("Please enter some feedback before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Send feedbackData to Firestore with a timestamp
      await addDoc(collection(db, "feedback"), {
        ...feedbackData,
        submittedAt: new Date(),
        userAgent: navigator.userAgent,
        screenSize: `${window.innerWidth}x${window.innerHeight}`,
        language: navigator.language,
        timezoneOffset: new Date().getTimezoneOffset(),
      });

      console.log("✅ Feedback submitted to Firebase:", feedbackData);
      setIsSubmitted(true);

      // Optional: trigger confetti
      const canvas = document.createElement("canvas");
      canvas.style.position = "fixed";
      canvas.style.inset = "0";
      canvas.style.width = "100vw";
      canvas.style.height = "100vh";
      canvas.style.zIndex = "999";
      canvas.style.pointerEvents = "none";
      document.body.appendChild(canvas);

      const myConfetti = confetti.create(canvas, {
        resize: true,
        useWorker: true,
      });

      myConfetti({
        particleCount: 100,
        spread: 160,
        origin: { y: 0.6 },
        colors: ["#f97316", "#f59e0b", "#ec4899", "#f43f5e", "#fb923c"],
      });

      setTimeout(() => {
        document.body.removeChild(canvas);
      }, 3000);
    } catch (error) {
      console.error("🚨 Error submitting feedback:", error.message, error.code);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 overflow-hidden space-y-20"
      id="feedback"
    >
      {/* Background Elements with Parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 dark:bg-orange-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"
          style={{ y: backgroundY1, opacity: opacity1 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/10 dark:bg-pink-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"
          style={{ y: backgroundY2, opacity: opacity2 }}
        />

        {/* Paper texture */}
        <div className="absolute inset-0 opacity-5 mix-blend-overlay">
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
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500 dark:from-orange-400 dark:to-pink-400">
          Shape StoryWave's Future
        </h1>
        <div className="flex items-center justify-center gap-2 text-xl text-zinc-600 dark:text-zinc-300">
          <Sparkles className="h-5 w-5 text-orange-500 dark:text-orange-400" />
          <p>Your feedback powers our next chapter</p>
          <Sparkles className="h-5 w-5 text-orange-500 dark:text-orange-400" />
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

          <FeedbackRatingSlider
            value={feedbackData.overallRating}
            onChange={(value) => updateFeedbackData("overallRating", value)}
          />

          <FeedbackCanvas
            value={feedbackData.feedbackText}
            onChange={(value) => updateFeedbackData("feedbackText", value)}
          />

          <SubmitExperience
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      )}

      <div>
        <RoadmapTimeline />
      </div>
    </div>
  );
}

function ThankYouScreen({ resetForm }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl rounded-3xl p-10 text-center space-y-8 border border-zinc-200 dark:border-zinc-800 shadow-xl"
    >
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>
      </div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-24 h-24 mx-auto bg-gradient-to-br from-orange-500 to-pink-500 dark:from-orange-400 dark:to-pink-400 rounded-full flex items-center justify-center"
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
        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500 dark:from-orange-400 dark:to-pink-400">
          Thanks for shaping StoryWave's future!
        </h2>
        <p className="text-zinc-600 dark:text-zinc-300 text-lg max-w-2xl mx-auto">
          Your feedback is the ink in our next chapter. We're constantly
          evolving to create the ultimate storytelling experience for you.
        </p>
      </div>

      {/* <div className="pt-6">
        <motion.button
          onClick={resetForm}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-gradient-to-r from-orange-500 to-pink-500 dark:from-orange-400 dark:to-pink-400 rounded-full text-white font-medium shadow-lg"
        >
          Back to Home
        </motion.button>
      </div> */}
    </motion.div>
  );
}
