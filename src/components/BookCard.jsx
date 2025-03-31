import React from "react";

export default function BookCard({ book }) {
  return (
    <div className="card lg:card-side bg-base-100 shadow-sm border border-orange-300 w-[25vw] poppins hover:shadow-lg transition duration-200 ease-in-out">
      {/* Set a fixed width for the image */}
      <figure className="w-1/2 flex-shrink-0">
        <img
          src={book.image}
          alt="Book Cover"
          className="h-full object-cover rounded-l-lg"
        />
      </figure>

      {/* Ensure the text section takes up remaining space */}
      <div className="card-body flex-grow hover:bg-orange-100 transition duration-200 ease-in-out">
        <h2 className="card-title text-xl">{book.title}</h2>
        <p className="text-[13px] text-justify text-gray-600">{book.desc}</p>
        <div className="card-actions justify-center items-center mt-4">
          <button className="btn bg-orange-400 hover:bg-orange-500 text-white tracking-wider">
            Read Now
          </button>
        </div>
      </div>
    </div>
  );
}
