"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import BookCard from "./BookCard";
import BookCard1 from "./BookCard1";
import StoryReader from "./StoryReader";
import { booksData } from "../data/data";

export default function BooksSection1() {
  const [selectedBook, setSelectedBook] = useState(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="py-16 px-6 md:px-12 bg-gradient-to-b from-white to-orange-50 relative">
      {/* Top Wave SVG */}
      <div className="absolute top-0 left-0 w-full overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-auto"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,192L48,176C96,160,192,128,288,122.7C384,117,480,139,576,149.3C672,160,768,160,864,154.7C960,149,1056,139,1152,133.3C1248,128,1344,128,1392,128L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>

      {selectedBook ? (
        <StoryReader
          title={selectedBook.title}
          content={selectedBook.content}
          onBack={() => setSelectedBook(null)}
        />
      ) : (
        <div className="container mx-auto space-y-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Explore Our Collection of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
                Short Stories!
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Dive into our curated collection of captivating short stories that
              will transport you to new worlds in just minutes.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {booksData.slice(0, 9).map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <BookCard1 book={book} onSelectBook={setSelectedBook} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex justify-center mt-12"
          >
            <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              Load More Stories
            </button>
          </motion.div>
        </div>
      )}

      {/* Bottom Wave SVG */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-auto"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,192L48,176C96,160,192,128,288,122.7C384,117,480,139,576,149.3C672,160,768,160,864,154.7C960,149,1056,139,1152,133.3C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}
