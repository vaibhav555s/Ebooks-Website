"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import BookCard1 from "./BookCard1";
import { ArrowRight, ArrowLeft } from "lucide-react";

// Sample book data
const booksData = [
  {
    id: 1,
    title: "The Enigmatic Forest",
    author: "Elara Nightshade",
    coverImage: "/placeholder.svg?height=400&width=300",
    category: "Fantasy",
    readTime: "5 min read",
    rating: 4.8,
    desc: "A young herbalist ventures into a mysterious forest, uncovering ancient secrets and facing shadowy creatures.",
  },
  {
    id: 2,
    title: "Whispers in the Void",
    author: "Orion Black",
    coverImage: "/placeholder.svg?height=400&width=300",
    category: "Sci-Fi",
    readTime: "7 min read",
    rating: 4.5,
    desc: "An astronaut on a solo mission begins hearing strange whispers from the void of space.",
  },
  {
    id: 3,
    title: "Midnight Melodies",
    author: "Luna Crescendo",
    coverImage: "/placeholder.svg?height=400&width=300",
    category: "Mystery",
    readTime: "6 min read",
    rating: 4.7,
    desc: "A pianist discovers that her midnight compositions are somehow altering reality in unexpected ways.",
  },
  {
    id: 4,
    title: "The Last Lighthouse",
    author: "Marin Wavecrest",
    coverImage: "/placeholder.svg?height=400&width=300",
    category: "Adventure",
    readTime: "8 min read",
    rating: 4.6,
    desc: "When all lighthouses mysteriously go dark, one keeper must discover what's causing the phenomenon before ships perish.",
  },
  {
    id: 5,
    title: "Echoes of Yesterday",
    author: "Thea Timeless",
    coverImage: "/placeholder.svg?height=400&width=300",
    category: "Romance",
    readTime: "5 min read",
    rating: 4.9,
    desc: "A woman begins receiving love letters from her past self, warning her about a future heartbreak she might prevent.",
  },
  {
    id: 6,
    title: "Quantum Memories",
    author: "Dr. Axel Infinity",
    coverImage: "/placeholder.svg?height=400&width=300",
    category: "Sci-Fi",
    readTime: "9 min read",
    rating: 4.7,
    desc: "A scientist develops technology to extract and view memories, but discovers some memories exist from futures that haven't happened yet.",
  },
];

export default function BooksSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const containerRef = useRef(null);
  const carouselRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const categories = [
    "All",
    "Fantasy",
    "Sci-Fi",
    "Mystery",
    "Adventure",
    "Romance",
  ];

  const filteredBooks =
    activeCategory === "All"
      ? booksData
      : booksData.filter((book) => book.category === activeCategory);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth / 2
          : scrollLeft + clientWidth / 2;

      carouselRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };

  return (
    <section ref={containerRef} className="relative py-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950"></div>
        <div className="absolute inset-0 paper-texture opacity-5"></div>

        {/* Animated gradient */}
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-orange-500/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          style={{ y }}
        />

        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-pink-500/5 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 1,
          }}
          style={{ y: useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]) }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 glow-text-orange">
              Discover Stories
            </span>
          </h2>
          <p className="text-zinc-300 text-lg max-w-2xl mx-auto">
            Explore our curated collection of captivating short stories that
            will transport you to new worlds in just minutes.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white glow-border-orange"
                  : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Books carousel */}
        <div className="relative">
          <motion.div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {filteredBooks.map((book, index) => (
              <motion.div
                key={book.id}
                className="min-w-[300px] md:min-w-[350px] snap-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <BookCard1 book={book} />
              </motion.div>
            ))}
          </motion.div>

          {/* Navigation arrows */}
          <div className="hidden md:block">
            <motion.button
              onClick={() => scrollCarousel("left")}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-zinc-800/80 backdrop-blur-sm flex items-center justify-center text-white border border-zinc-700 hover:bg-zinc-700 transition-colors duration-300"
              whileHover={{ scale: 1.1, x: "-40%" }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, x: "-60%" }}
              animate={{ opacity: 1, x: "-50%" }}
              transition={{ duration: 0.3 }}
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>

            <motion.button
              onClick={() => scrollCarousel("right")}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 w-12 h-12 rounded-full bg-zinc-800/80 backdrop-blur-sm flex items-center justify-center text-white border border-zinc-700 hover:bg-zinc-700 transition-colors duration-300"
              whileHover={{ scale: 1.1, x: "40%" }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, x: "60%" }}
              animate={{ opacity: 1, x: "50%" }}
              transition={{ duration: 0.3 }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* View all button */}
        <motion.div
          className="flex justify-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.button
            className="px-8 py-3 rounded-full bg-zinc-800 text-white font-medium border border-zinc-700 flex items-center gap-2 hover:bg-zinc-700 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View All Stories</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
