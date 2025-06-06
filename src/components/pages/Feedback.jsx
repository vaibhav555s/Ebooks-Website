import React from 'react'
import Navbar3 from '../Navbar3'
import FeedbackSection from '../FeedbackSection'
import Footer from '../Footer'
import { useEffect } from "react";

const Feedback = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div>
      <Navbar3 />
      <FeedbackSection />
        <Footer />
    </div>
  )
}

export default Feedback
