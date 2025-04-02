import { useState, useEffect } from "react";
import { Home, Info, PhoneCall, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar2() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  return (
    <header
      className={`w-full py-4 px-6 md:px-10 sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-lg shadow-lg"
          : "bg-white/60 backdrop-blur-md"
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
          <span className="text-gray-800">Readers</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
            .lib
          </span>
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { href: "/", icon: <Home className="h-5 w-5" />, label: "Home" },
            {
              href: "/about",
              icon: <Info className="h-5 w-5" />,
              label: "About",
            },
            {
              href: "/contact",
              icon: <PhoneCall className="h-5 w-5" />,
              label: "Contact Us",
            },
          ].map((item, index) => (
            <motion.a
              key={item.href}
              href={item.href}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 relative group"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {item.icon}
              <span>{item.label}</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
            </motion.a>
          ))}

          {/* <motion.button
            className="ml-4 px-5 py-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-medium text-sm shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            whileHover={{
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Sign In
          </motion.button> */}
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-orange-50 text-orange-500 hover:bg-orange-100 transition-colors duration-300"
          onClick={toggleMobileMenu}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 bg-white/90 backdrop-blur-lg shadow-lg py-4 px-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col space-y-4">
              {[
                {
                  href: "/",
                  icon: <Home className="h-5 w-5" />,
                  label: "Home",
                },
                {
                  href: "/about",
                  icon: <Info className="h-5 w-5" />,
                  label: "About",
                },
                {
                  href: "/contact",
                  icon: <PhoneCall className="h-5 w-5" />,
                  label: "Contact Us",
                },
              ].map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-orange-50 transition-colors duration-200"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </motion.a>
              ))}
              <motion.button
                className="mt-2 w-full py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-medium text-sm shadow-md hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
