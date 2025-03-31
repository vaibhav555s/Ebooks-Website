import React from "react";
import BookCard from "./BookCard";
import { booksData } from "../data/data";

export default function BooksSection() {
  return (
    <section className="py-10 px-6 md:px-12 bg-gray-50">
      <div className="container mx-auto space-y-16">
        <h2 className="text-2xl md:text-5xl font-semibold text-gray-800 mb-6 text-center">
            Explore Our Collection of <span className="text-orange-500">Short Stories!</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {booksData.slice(0, 9).map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
}
