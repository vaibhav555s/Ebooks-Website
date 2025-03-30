import { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi"; // Menu icon for mobile

export default function Navbar() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="navbar bg-[#f8edeb] px-4 md:px-10 flex justify-between">
      {/* Logo */}
      <div className="flex">
        <a href="/" className="text-xl font-bold">
          📖 Ebooks
        </a>
      </div>

      {/* Centered Search Bar */}
      <div className="flex-grow flex justify-center">
        <label className="input bg-white/50 rounded-md flex items-center px-3 py-1 shadow-md w-full max-w-md">
          <svg
            className="h-5 w-5 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            required
            placeholder="Search"
            className="bg-transparent outline-none ml-2 w-full"
          />
        </label>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6">
        <a href="#browse" className="btn border-none bg-[#ced4da]">
          Browse
        </a>
        <a href="#about" className="btn border-none bg-[#ced4da]">
          About
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
