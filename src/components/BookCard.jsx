import React from "react";
import { Link } from "react-router-dom";
import "./Style.css"; // Import your CSS file for styles

export default function BookCard({ book }) {
  return (
    <div className="card md:card-side bg-base-100 shadow-sm border border-orange-300 w-[64vw] md:max-w-2xl md:w-full mx-auto font-poppins hover:shadow-lg transition duration-200 ease-in-out flex flex-col md:flex-row pt-3 md:pt-0 hover:scale-105 hover:cursor-pointer">
      {/* Image Section - Full width on mobile, Half width on larger screens */}
      <figure className="w-full md:w-1/2 flex-shrink-0">
        <img
          src={book.image}
          alt="Book Cover"
          className="h-48 md:h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
        />
      </figure>

      {/* Text Section */}
      <div className="card-body flex-grow hover:bg-orange-100 transition duration-200 ease-in-out items-center md:items-start p-4 md:p-6">
        <h2 className="card-title text-lg md:text-[22px] font-extrabold">
          {book.title}
        </h2>
        <p className="text-sm md:text-[13px] text-gray-600 text-center md:text-justify">
          {book.desc}
        </p>
        <div className="card-actions justify-center md:justify-start mt-4">
          <Link to={`/story/${book.id}`}>
            <button className="btn bg-orange-400 hover:bg-orange-500 text-white tracking-wider px-5 py-2">
              Read Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
