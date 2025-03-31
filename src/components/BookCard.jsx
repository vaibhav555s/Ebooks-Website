import React from "react";

export default function BookCard({ book }) {
  return (
    <div className="card md:card-side bg-base-100 shadow-sm border border-orange-300 w-[64vw] md:max-w-2xl md:w-full mx-auto poppins hover:shadow-lg transition duration-200 ease-in-out flex flex-col md:flex-row pt-3 md:pt-0">
      {/* Image Section - Full width on mobile, Half width on larger screens */}
      <figure className="w-full md:w-1/2 flex-shrink-0">
        <img
          src={book.image}
          alt="Book Cover"
          className="h-48 md:h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
        />
      </figure>

      {/* Text Section */}
      <div className="card-body flex-grow hover:bg-orange-100 transition duration-200 ease-in-out">
        <h2 className="card-title text-lg md:text-xl text-center md:text-start">{book.title}</h2>
        <p className="text-sm md:text-[13px] text-gray-600 text-center md:text-justify">
          {book.desc}
        </p>
        <div className="card-actions justify-center md:justify-start items-center mt-4">
          <button className="btn bg-orange-400 hover:bg-orange-500 text-white tracking-wider px-5 py-2">
            Read No
          </button>
        </div>
      </div>
    </div>
  );
}
