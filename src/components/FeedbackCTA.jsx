"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function FeedbackCTA() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-orange-50 to-white dark:from-zinc-900 dark:to-zinc-950"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Paper texture */}
        <div className="absolute inset-0 opacity-5 mix-blend-overlay">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>
        </div>

        {/* Decorative elements */}
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 dark:bg-orange-400/10 rounded-full blur-3xl"
          style={{ y, opacity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/10 dark:bg-pink-400/10 rounded-full blur-3xl"
          style={{
            y: useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]),
            opacity,
          }}
        />

        {/* Book illustrations */}
        <motion.div
          className="absolute -left-16 top-1/4 w-32 h-32 opacity-20 dark:opacity-10"
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "30%"]) }}
        >
          <BookOpen className="w-full h-full text-orange-500 dark:text-orange-400" />
        </motion.div>
        <motion.div
          className="absolute -right-16 bottom-1/4 w-32 h-32 opacity-20 dark:opacity-10"
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]) }}
        >
          <BookOpen className="w-full h-full text-pink-500 dark:text-pink-400" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500 dark:from-orange-400 dark:to-pink-400"
          >
            Share Your Voice, Shape Our Future
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-700 dark:text-zinc-300 mb-10 max-w-3xl mx-auto"
          >
            Your valuable feedback helps us understand you and create the
            storytelling platform you deserve. Every suggestion brings us closer
            to the perfect reading experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
                to="/"
                onClick={(e) => {
                  e.preventDefault(); // stop actual route navigation
                  const feedback = document.getElementById("feedback");
                  if (feedback) {
                    feedback.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
              <motion.button
                className="px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 dark:from-orange-400 dark:to-pink-400 text-white font-medium text-lg shadow-lg flex items-center gap-2 mx-auto"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Share Your Feedback</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>

          {/* Paper airplane animation */}
          <motion.div
            className="absolute top-1/2 -right-4 md:right-0 transform -translate-y-1/2 opacity-70 dark:opacity-50 hidden md:block"
            initial={{ x: -100, y: 50, rotate: -20 }}
            animate={{
              x: [null, 0, 100, 200],
              y: [null, 0, -50, -100],
              rotate: [null, 0, 20, 40],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.7071 2.29289C22.0976 2.68342 22.0976 3.31658 21.7071 3.70711L11.7071 13.7071C11.3166 14.0976 10.6834 14.0976 10.2929 13.7071C9.90237 13.3166 9.90237 12.6834 10.2929 12.2929L20.2929 2.29289C20.6834 1.90237 21.3166 1.90237 21.7071 2.29289Z"
                fill="currentColor"
                className="text-orange-500 dark:text-orange-400"
              />
              <path
                d="M21.7071 2.29289C22.0976 2.68342 22.0976 3.31658 21.7071 3.70711L11.7071 13.7071C11.3166 14.0976 10.6834 14.0976 10.2929 13.7071C9.90237 13.3166 9.90237 12.6834 10.2929 12.2929L20.2929 2.29289C20.6834 1.90237 21.3166 1.90237 21.7071 2.29289Z"
                fill="currentColor"
                className="text-orange-500 dark:text-orange-400"
              />
              <path
                d="M2.29289 9.70711C2.68342 9.31658 3.31658 9.31658 3.70711 9.70711L13.7071 19.7071C14.0976 20.0976 14.0976 20.7308 13.7071 21.1213C13.3166 21.5118 12.6834 21.5118 12.2929 21.1213L2.29289 11.1213C1.90237 10.7308 1.90237 10.0976 2.29289 9.70711Z"
                fill="currentColor"
                className="text-pink-500 dark:text-pink-400"
              />
              <path
                d="M21 3C21 2.44772 20.5523 2 20 2H3C2.44772 2 2 2.44772 2 3V20C2 20.5523 2.44772 21 3 21C3.55228 21 4 20.5523 4 20V4H20C20.5523 4 21 3.55228 21 3Z"
                fill="currentColor"
                className="text-orange-500 dark:text-orange-400"
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
