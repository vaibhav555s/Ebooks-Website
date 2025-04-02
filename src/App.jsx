import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar1 from "./components/Navbar1";
import Hero1 from "./components/Hero1";
import BooksSection from "./components/BooksSection";
import StoryReader1 from "./components/StoryReader1";
import StoryReader2 from "./components/StoryReader2";
import StoryReader3 from "./components/StoryReader3";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar1 />
              <Hero1 />
              <BooksSection />
            </>
          }
        />
        <Route
          path="/story/:id"
          element={
            <>
              <Navbar1 />
              <StoryReader3 />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
