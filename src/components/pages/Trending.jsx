import React from 'react'
import Navbar from '../Navbar3'
import BooksSection2 from '../BooksSection2'
import Footer from '../Footer'
import { useEffect } from "react";

const Trending = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
        <Navbar />
      <BooksSection2 />
      <Footer />
    </div>
  )
}

export default Trending
