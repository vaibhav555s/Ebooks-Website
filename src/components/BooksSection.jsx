import React, { useState } from "react";
import BookCard from "./BookCard";
import StoryReader from "./StoryReader";
import { booksData } from "../data/data";

export default function BooksSection() {
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <section className="py-6 px-6 md:px-12 bg-gray-50">
      {selectedBook ? (
        <StoryReader
          title={selectedBook.title}
          content={selectedBook.content}
          onBack={() => setSelectedBook(null)}
        />
      ) : (
        <div className="container mx-auto space-y-16">
          <h2 className="text-3xl md:text-5xl font-semibold text-gray-800 md:mb-6 mb-0 text-center px-9">
            Explore Our Collection of{" "}
            <span className="text-orange-500">Short Stories!</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {booksData.slice(0, 9).map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onSelectBook={setSelectedBook}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
