"use client";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import "./Style.css"; // Import your CSS file for styles

export default function BookCard({ book, onSelectBook }) {
  return (
    <motion.div
      className="group h-full"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/story/${book.id}`} className="block h-full">
        <div className="relative h-full overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">
          {/* Glowing border effect on hover */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-orange-500/20 to-pink-500/20 blur-sm -z-10"></div>

          {/* Image Section with gradient overlay */}
          <div className="relative w-full h-48 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
            <img
              src={book.image || "/placeholder.svg"}
              alt="Book Cover"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Category tag */}
            <div className="absolute top-3 left-3 z-20 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-orange-600">
              {book.category || "Fiction"}
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-grow flex flex-col p-5 bg-white/80 backdrop-blur-sm">
            <h2 className="text-xl font-bold mb-2 text-gray-800 line-clamp-1 group-hover:text-orange-600 transition-colors duration-200">
              {book.title}
            </h2>

            <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow">
              {book.desc}
            </p>

            {/* Author and time info */}
            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
              {/* <span className="flex items-center">
                <span className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center mr-2">
                  {book.author ? book.author.charAt(0) : "A"}
                </span>
                {book.author || "Anonymous"}
              </span> */}
              <span className="text-center border">{book.readTime || "5 min read"}</span>
            </div>

            {/* Read Now Button */}
            <motion.button
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 text-white font-medium flex items-center justify-center gap-2 group-hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Read Now
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
