import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage"; // <-- if you placed the v0 layout here
import StoryReader4 from "./components/StoryReader4";
import AboutPage from "./components/AboutPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/story/:id" element={<StoryReader4 />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}
