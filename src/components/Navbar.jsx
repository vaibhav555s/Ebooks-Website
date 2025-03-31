import { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi"; // Menu icon for mobile
import "./Style.css"; // Import your CSS styles

export default function Navbar() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="navbar bg-[#eae0d5] px-4 md:px-22 flex justify-between roboto border border-red-700">
      {/* Logo */}
      <div className="flex">
        <a href="/" className="text-xl font-bold">
          📖 Ebooks
        </a>
      </div>

      
      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6  ">
        <a
          href="#browse"
          className="btn border-none text-md font-normal btn-ghost"
        >
          Browse
        </a>
        <a
          href="#about"
          className="btn border-none btn-ghost font-normal text-md"
        >
          About
        </a>
        <a
          href="#about"
          className="btn border-none btn-ghost font-normal text-md"
        >
          Contact Us
        </a>
      </div>

      {/* Dark Mode + Mobile Menu */}
      <div className="flex-none flex items-center gap-3">
        {/* Dark Mode Toggle */}
        <button
          className="btn btn-ghost"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        {/* Mobile Dropdown (Hidden on Desktop) */}
        <div className="dropdown dropdown-end md:hidden">
          <button tabIndex={0} className="btn btn-ghost">
            <FiMenu size={24} />
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-40"
          >
            <li>
              <a href="#browse">Browse</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
