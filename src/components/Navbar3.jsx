import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Moon, Sun, BookOpen } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState("light");
  const location = useLocation();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    document.documentElement.classList.toggle("dark");
  };

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/trending", label: "Trending Stories" },
    { href: "/feedback", label: "Feedback" },
  ];

  return (
    <header
      className={`w-full py-4 px-4 md:px-8 sticky top-0 z-50 transition-all duration-500 ${
        isScrolled ? "glass" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <motion.a
          href="/"
          className="flex items-center gap-1 text-2xl font-bold"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <BookOpen className="w-6 h-6 text-orange-500" />
          <span className="text-white">Story</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 glow-text-orange">
            Wave
          </span>
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <motion.div
              key={item.href}
              className="relative"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link
                to={item.href}
                className="text-sm font-medium text-zinc-300 hover:text-white transition-colors duration-300"
              >
                {item.label}
              </Link>
              {location.pathname === item.href && (
                <motion.div
                  layoutId="navIndicator"
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-pink-500 glow-border-orange"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.div>
          ))}

          {/* {mounted && (
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-zinc-800 text-zinc-300 hover:text-white transition-colors duration-300 glow-border-orange"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <AnimatedThemeIcon theme={theme} />
            </motion.button>
          )} */}
          {/* Sign in button */}
          {/* <motion.button
            className="ml-2 px-5 py-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-medium text-sm shadow-md hover:shadow-lg transition-all duration-300 glow-border-orange"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign In
          </motion.button> */}
        </nav>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center gap-2">
          {/* {mounted && (
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-zinc-800 text-zinc-300 hover:text-white transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatedThemeIcon theme={theme} />
            </motion.button>
          )} */}

          <motion.button
            className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800 text-zinc-300 hover:text-white transition-colors duration-300"
            onClick={toggleMobileMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={`md:hidden absolute top-full left-0 right-0 glass py-4 px-6 ${
          isMobileMenuOpen ? "block" : "hidden"
        }`}
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          height: isMobileMenuOpen ? "auto" : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <nav className="flex flex-col space-y-4">
          {navItems.map((item, index) => (
            <motion.div
              key={item.href}
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={item.href}
                className={`block p-2 rounded-lg transition-colors duration-200 ${
                  location.pathname === item.href
                    ? "bg-zinc-800/80 text-white"
                    : "text-zinc-300 hover:text-white hover:bg-zinc-800/50"
                }`}
              >
                {item.label}
              </Link>
              {location.pathname === item.href && (
                <motion.div
                  layoutId="mobileNavIndicator"
                  className="absolute left-0 top-1/2 w-1 h-1/2 bg-gradient-to-b from-orange-500 to-pink-500 rounded-full transform -translate-y-1/2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.div>
          ))}
          {/* <motion.button
            className="mt-2 w-full py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-medium text-sm shadow-md hover:shadow-lg transition-all duration-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign In
          </motion.button> */}
        </nav>
      </motion.div>
    </header>
  );
}

function AnimatedThemeIcon({ theme }) {
  return (
    <motion.div className="relative w-5 h-5">
      <motion.div
        initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
        animate={{
          opacity: theme === "dark" ? 0 : 1,
          rotate: theme === "dark" ? -90 : 0,
          scale: theme === "dark" ? 0.5 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0"
      >
        <Sun className="w-5 h-5" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
        animate={{
          opacity: theme === "dark" ? 1 : 0,
          rotate: theme === "dark" ? 0 : 90,
          scale: theme === "dark" ? 1 : 0.5,
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0"
      >
        <Moon className="w-5 h-5" />
      </motion.div>
    </motion.div>
  );
}
