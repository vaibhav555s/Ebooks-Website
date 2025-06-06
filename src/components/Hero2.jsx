"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";
import {Link} from "react-router-dom";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Create particles
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden py-20"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950"></div>

        {/* Paper texture */}
        <div className="absolute inset-0 paper-texture opacity-10"></div>

        {/* Glowing orbs */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-orange-500/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          style={{ y }}
        />

        <motion.div
          className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-pink-500/10 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 1,
          }}
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]) }}
        />

        {/* Floating particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: 0.1,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, particle.id % 2 === 0 ? 10 : -10, 0],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ opacity }}
          >
            {/* <motion.div
              className="inline-block mb-4 p-2 rounded-full bg-zinc-800/50 backdrop-blur-sm border border-zinc-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="px-4 py-1 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm font-medium">
                Immersive Reading Experience
              </span>
            </motion.div> */}

            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 glow-text-orange">
                Stories that transport you
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-zinc-300 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Dive into captivating short stories designed for the modern
              reader. Experience immersive narratives in a sleek,
              distraction-free environment
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Link
                to="/"
                onClick={(e) => {
                  e.preventDefault(); // stop actual route navigation
                  const booksSection = document.getElementById("books1");
                  if (booksSection) {
                    booksSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <motion.button
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-medium text-lg shadow-lg flex items-center gap-2 glow-border-orange"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 15px rgba(249, 115, 22, 0.5)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <BookOpen className="w-5 h-5" />
                  <span>Start Reading</span>
                </motion.button>
              </Link>

              <Link
                to="/"
                onClick={(e) => {
                  e.preventDefault(); // stop actual route navigation
                  const booksSection = document.getElementById("books");
                  if (booksSection) {
                    booksSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <motion.button
                  className="px-8 py-4 rounded-full bg-zinc-800 text-white font-medium text-lg shadow-md border border-zinc-700 flex items-center gap-2 hover:bg-zinc-700 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Explore Library</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Floating book illustration */}
          <motion.div
            className="relative mx-auto w-full max-w-2xl aspect-[16/9] glass rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "20%"]) }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-950"></div>

            {/* Book pages effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-3/4 h-3/4 bg-zinc-800 rounded-lg shadow-lg overflow-hidden"
                animate={{
                  rotateY: [0, 5, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                <div className="h-full w-full p-6 flex flex-col">
                  <div className="w-full h-2 bg-orange-500/20 rounded-full mb-4"></div>
                  <div className="w-3/4 h-2 bg-pink-500/20 rounded-full mb-6"></div>

                  {/* Text lines */}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-full h-1.5 bg-white/10 rounded-full mb-3"
                      style={{ width: `${Math.random() * 30 + 70}%` }}
                    ></div>
                  ))}

                  {/* Glowing cursor */}
                  <motion.div
                    className="w-1 h-4 bg-orange-500 rounded-full mt-2 glow-border-orange"
                    animate={{
                      opacity: [1, 0, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  ></motion.div>
                </div>
              </motion.div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-4 right-4 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
              <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
              <div className="w-3 h-3 rounded-full bg-orange-500 glow-border-orange"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
