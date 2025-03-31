import { Home, Info, PhoneCall } from "lucide-react";

export default function Navbar1() {
  return (
    <header className="w-full py-4 px-6 md:px-10">
      <div className="container mx-auto flex items-center justify-between">
        <a href="/" className="flex items-center gap-1 text-xl font-semibold">
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
            <PhoneCall className = "size-5"/>
            <span>Contact Us</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
