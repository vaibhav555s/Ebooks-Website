"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Clock, Star, BookOpen } from "lucide-react";
import {Link} from "react-router-dom";

export default function BookCard1({ book }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  // Handle mouse move for 3D effect
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    setRotation({ x: y * 10, y: x * -10 });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={cardRef}
      className="h-full"
      style={{
        perspective: "1000px",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ z: 10 }}
    >
      <Link href={`/reader/${book.id}`}>
        <motion.div
          className="relative h-full rounded-2xl overflow-hidden glass border border-zinc-800 shadow-lg"
          animate={{
            rotateX: rotation.x,
            rotateY: rotation.y,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
            mass: 0.1,
          }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Glow effect on hover */}
          <motion.div
            className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 opacity-0 blur-sm z-0"
            animate={{ opacity: isHovered ? 0.5 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Card content */}
          <div className="relative h-full flex flex-col z-10">
            {/* Cover image */}
            <div className="relative h-56 overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent z-10"
                animate={{ opacity: isHovered ? 0.8 : 0.5 }}
                transition={{ duration: 0.3 }}
              />

              <motion.img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-full object-cover"
                animate={{ scale: isHovered ? 1.1 : 1 }}
                transition={{ duration: 0.5 }}
                style={{
                  transformStyle: "preserve-3d",
                  transform: "translateZ(20px)",
                }}
              />

              {/* Category badge */}
              <div className="absolute top-3 left-3 z-20 px-3 py-1 rounded-full glass-light text-xs font-medium text-white border border-zinc-700">
                {book.category}
              </div>

              {/* Rating */}
              <div className="absolute top-3 right-3 z-20 px-2 py-1 rounded-full glass-light flex items-center gap-1 text-xs font-medium text-white border border-zinc-700">
                <Star className="w-3 h-3 text-orange-500" fill="#f97316" />
                <span>{book.rating}</span>
              </div>
            </div>

            {/* Content */}
            <div
              className="flex-grow p-5 flex flex-col"
              style={{ transform: "translateZ(30px)" }}
            >
              <h3 className="text-xl font-bold mb-1 text-white line-clamp-1">
                {book.title}
              </h3>

              <p className="text-sm text-zinc-400 mb-3">by {book.author}</p>

              <p className="text-sm text-zinc-300 mb-4 line-clamp-2 flex-grow">
                {book.desc}
              </p>

              <div className="flex items-center justify-between text-xs text-zinc-400 mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{book.readTime}</span>
                </div>
              </div>

              {/* Read button */}
              <Link to={`/story/${book.id}`}>
              
                <motion.button
                  className="w-full py-2.5 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 text-white font-medium flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ transform: "translateZ(40px)" }}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Read Now</span>
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
