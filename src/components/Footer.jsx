"use client";

import { motion } from "framer-motion";
import { BookOpen, Github, Instagram, Linkedin, Mail, Twitter } from "lucide-react";
// import { useTheme } from "next-themes";

export default function Footer() {
  const theme = "dark";

  return (
    <footer className="relative bg-orange-50 dark:bg-zinc-900 pt-16 pb-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-pink-500 dark:from-orange-400 dark:to-pink-400 opacity-80"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/5 dark:bg-orange-400/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/5 dark:bg-pink-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2"
            >
              <BookOpen className="w-8 h-8 text-orange-500 dark:text-orange-400" />
              <span className="text-2xl font-bold">
                <span className="text-zinc-900 dark:text-white">Story</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 dark:from-orange-400 dark:to-pink-400">
                  Wave
                </span>
              </span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-zinc-600 dark:text-zinc-400"
            >
              Reimagining storytelling for the digital age. Short stories, big
              adventures, all in the palm of your hand.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex gap-4"
            >
              {/* <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-500 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-orange-800/50 transition-colors duration-300"
              >
                <Twitter size={18} />
              </a> */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-500 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-orange-800/50 transition-colors duration-300"
              >
                <Github size={18} />
              </a>
              <a
                href="mailto:contact@storywave.com"
                className="p-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-500 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-orange-800/50 transition-colors duration-300"
              >
                <Mail size={18} />
              </a>
              <a
                href="https://www.instagram.com/vaibhavsonawane_05/#"
                className="p-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-500 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-orange-800/50 transition-colors duration-300"
              >
                <Instagram size={18} />
              </a>
            </motion.div>
          </div>

          {/* Meet the Developer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
              Meet the Developer
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              StoryWave is crafted with passion by developers who love
              storytelling and technology.
            </p>
            <a
              href="https://linkedin.com/in/vaibhavsonawane1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-orange-800/50 transition-colors duration-300"
            >
              <Linkedin size={16} />
              <span>Connect on LinkedIn</span>
            </a>
          </motion.div>

          {/* Contribute */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
              Your Contributions Welcome
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Have ideas to make StoryWave better? We'd love to hear from you
              and collaborate.
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="/"
                className="inline-flex items-center gap-2 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors duration-300"
              >
                <span>Share Feedback</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </a>
              <a
                href="mailto:vaibhavsonawane2345@gmail.com"
                className="inline-flex items-center gap-2 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors duration-300"
              >
                <span>Submit Story Ideas</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-sm text-zinc-500 dark:text-zinc-500"
          >
            © {new Date().getFullYear()} StoryWave. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
