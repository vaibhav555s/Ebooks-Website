
import React from 'react'
import Navbar from '../Navbar3'
import BooksSection2 from '../BooksSection2'
import Footer from '../Footer'
import BackToHomeButton from '../BackToHomeButton'
import { useEffect } from "react";

const Trending = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div>
      <Navbar />
      <BackToHomeButton variant="floating" />
      <BooksSection2 />
      <Footer />
    </div>
  )
}

export default Trending
