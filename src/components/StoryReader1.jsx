import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { booksData } from "../data/data";
// import { Button, Progress } from "@/components/ui";
import { motion } from "framer-motion";
import { IoArrowBackOutline } from "react-icons/io5";

export default function StoryReader() {
  const navigate = useNavigate();
  const { id } = useParams();
  const book = booksData.find((b) => b.id === parseInt(id));

  if (!book) {
    return (
      <div className="text-center text-xl text-gray-600 mt-10">
        Story Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-orange-300 p-6 md:p-12 flex flex-col items-center">
      {/* Navbar with Back Button */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-ghost flex items-center gap-2"
        >
          <IoArrowBackOutline size={24} /> Back
        </button>

        <h1 className="text-2xl font-bold text-gray-800">{book.title}</h1>
      </div>

      {/* Story Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-xl rounded-2xl p-6 md:p-8 max-w-3xl w-full border-l-4 border-orange-500"
      >
        <p className="text-gray-700 text-lg leading-relaxed">{book.story}</p>
      </motion.div>

      {/* Progress Bar */}
      <div className="w-full max-w-3xl mt-6">
        <progress className="progress w-full" value="50" max="100"></progress>
      </div>
    </div>
  );
}
