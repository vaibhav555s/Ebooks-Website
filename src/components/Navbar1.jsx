import { useState, useEffect } from "react";
import { Home, Info, PhoneCall } from "lucide-react";

export default function Navbar1() {
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <header
      className={`w-full py-4 px-6 md:px-10 sticky top-0 z-50 bg-white transition-all duration-300 ${
        isScrolled ? "shadow-md" : "shadow-none"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <a href="/" className="flex items-center gap-1 text-2xl fon t-semibold">
          <span className="text-gray-800">Readers</span>
          <span className="text-orange-600">.lib</span>
        </a>

        <nav className="hidden md:flex items-center gap-6">
          <a
            href="/"
            className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900"
          >
            <Home className="h-5 w-5" />
            <span>Home</span>
          </a>
          <a
            href="/about"
            className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900"
          >
            <Info className="h-5 w-5" />
            <span>About</span>
          </a>
          <a
            href="/pricing"
            className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900"
          >
            <PhoneCall className="size-5" />
            <span>Contact Us</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
