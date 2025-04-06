"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function SubmitExperience({ onSubmit }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = () => {
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
      colors: ["#f472b6", "#a78bfa", "#60a5fa", "#34d399", "#fbbf24"],
    });

    // Remove canvas after animation
    setTimeout(() => {
      document.body.removeChild(canvas);
    }, 3000);

    if (onSubmit) onSubmit();
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
          className="relative w-full py-5 rounded-xl overflow-hidden group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>

          {/* Ripple effect */}
          {isHovered && (
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
            className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-0"
          />

          <div className="relative z-10 text-center">
            <span className="text-xl font-bold text-white tracking-wider">
              Submit Your Feedback
            </span>
          </div>
        </motion.button>
      </div>

      <p className="text-center text-purple-300 text-sm mt-4">
        Your feedback will help build the next generation of storytelling
      </p>
    </motion.div>
  );
}
