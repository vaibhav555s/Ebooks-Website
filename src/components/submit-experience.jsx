"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function SubmitExperience({ onSubmit, isSubmitting = false }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = () => {
    if (isSubmitting) return;

    // Trigger confetti
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

    // Remove canvas after animation
    setTimeout(() => {
      document.body.removeChild(canvas);
    }, 1000);

    // Call onSubmit to update UI state
    if (onSubmit) onSubmit();

    // Wait for UI to update, then scroll
    setTimeout(() => {
      const feedbackSection = document.getElementById("feedback");
      if (feedbackSection) {
        feedbackSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 1000); // slight delay to allow re-render
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <div className="relative">
        <motion.button
          onClick={handleSubmit}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          disabled={isSubmitting}
          className="relative w-full py-5 rounded-xl overflow-hidden group disabled:opacity-70"
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 dark:from-orange-400 dark:to-pink-400 opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 dark:from-orange-400 dark:to-pink-400 blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>

          {/* Ripple effect */}
          {isHovered && !isSubmitting && (
            <motion.div
              initial={{ scale: 0, opacity: 0.7 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full"
            />
          )}

          {/* Pulse animation */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.7, 0.9, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 dark:from-orange-400 dark:to-pink-400 opacity-0"
          />

          <div className="relative z-10 text-center flex items-center justify-center">
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin text-white" />
                <span className="text-xl font-bold text-white tracking-wider">
                  Submitting...
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-white tracking-wider">
                Submit Your Feedback
              </span>
            )}
          </div>
        </motion.button>
      </div>

      <p className="text-center text-zinc-600 dark:text-zinc-400 text-sm mt-4">
        Your feedback will be stored in our database to help build the next
        generation of storytelling
      </p>
    </motion.div>
  );
}
