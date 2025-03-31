import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Navbar1 from "./components/Navbar1";
import Hero1 from "./components/Hero1";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar1/>
      <Hero1/>
    </>
  );
}

export default App;
