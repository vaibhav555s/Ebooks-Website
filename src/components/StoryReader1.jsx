import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { booksData } from "../data/data";

export default function StoryReader1() {
  const { id } = useParams(); // Get the book ID from the URL
  const book = booksData.find((b) => b.id === parseInt(id)); // Find the book by ID

  const navigate = useNavigate();

  if (!book) {
    return <div>Book not found!</div>; // In case the book is not found
  }

  return (
    <div className="story-reader">
      <button onClick={() => navigate(-1)} className="btn btn-primary">
        Back
      </button>
      <h1>{book.title}</h1>
      <div>{book.story}</div>
    </div>
  );
}
