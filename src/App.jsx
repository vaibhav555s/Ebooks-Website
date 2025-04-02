import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar1 from "./components/Navbar1";
import Navbar2 from "./components/Navbar2";
import Hero1 from "./components/Hero1";
import Hero2 from "./components/Hero2";
import BooksSection from "./components/BooksSection";
import BooksSection1 from "./components/BooksSection1";
import StoryReader1 from "./components/StoryReader1";
import StoryReader2 from "./components/StoryReader2";
import StoryReader3 from "./components/StoryReader3";
import StoryReader4 from "./components/StoryReader4";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar2 />
              <Hero2 />
              <BooksSection1 />
            </>
          }
        />
        <Route
          path="/story/:id"
          element={
            <>
              {/* <Navbar1 /> */}
              <StoryReader4 />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
