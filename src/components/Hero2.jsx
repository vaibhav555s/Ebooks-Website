"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Globe, MessageCircle, Tag } from "lucide-react";
import { IoIosArrowRoundForward } from "react-icons/io";
import heroimage from "../assets/hero2.jpg"; // Replace with your image path

const Hero2 = () => {
  const imageRef = useRef(null);

  // 3D tilt effect for the image
  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    const handleMouseMove = (e) => {
      const { left, top, width, height } = image.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      image.style.transform = `perspective(1000px) rotateY(${
        x * 10
      }deg) rotateX(${y * -10}deg) scale3d(1.05, 1.05, 1.05)`;
    };

    const handleMouseLeave = () => {
      image.style.transform =
        "perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)";
    };

    image.addEventListener("mousemove", handleMouseMove);
    image.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      image.removeEventListener("mousemove", handleMouseMove);
      image.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-b from-orange-50 to-white overflow-hidden">
      {/* Top Wave SVG */}
      <div className="absolute top-0 left-0 w-full overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-auto"
        >
          <path
            fill="#FFF7ED"
            fillOpacity="0.3"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-16 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20 lg:justify-between relative z-10">
        {/* Left Column - Text Content */}
        <motion.div
          className="max-w-lg text-center lg:text-left space-y-10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block mb-2">📖</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
              Short Stories, <br /> Big Adventures!
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-2xl text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Read thrilling, interactive short stories in minutes—crafted for
            your fast-paced life. 🚀
          </motion.p>

          {/* CTA Button */}
          <motion.div
            className="flex justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.button
              className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-4 text-lg font-semibold rounded-full flex items-center gap-2 shadow-lg"
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">🚀 Start Reading</span>
              <IoIosArrowRoundForward size={32} className="relative z-10" />

              {/* Ripple effect */}
              <span className="absolute top-0 left-0 w-full h-full bg-white opacity-0 hover:opacity-20 transition-opacity duration-300"></span>
            </motion.button>
          </motion.div>

          {/* Features */}
          <motion.div
            className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {[
              {
                bg: "bg-orange-100",
                icon: <Globe className="h-4 w-4 text-orange-500" />,
                text: "Over 2000 travel offers",
              },
              {
                bg: "bg-purple-100",
                icon: <MessageCircle className="h-4 w-4 text-purple-500" />,
                text: "Advice from our experts",
              },
              {
                bg: "bg-pink-100",
                icon: <Tag className="h-4 w-4 text-pink-500" />,
                text: "Best prices & special deals",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`${feature.bg} p-2 rounded-full shadow-sm`}>
                  {feature.icon}
                </div>
                <span className="text-sm font-medium text-gray-600">
                  {feature.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column - Image */}
        <motion.div
          className="relative w-full max-w-md lg:max-w-lg"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.div
            className="absolute -top-6 -left-6 w-16 h-16 bg-orange-100 rounded-full"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-6 -right-6 w-12 h-12 bg-cyan-100 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />

          <div
            ref={imageRef}
            className="relative overflow-hidden rounded-lg shadow-2xl transition-all duration-200 ease-out"
            style={{
              transformStyle: "preserve-3d",
              transition: "transform 0.3s ease-out",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-pink-500/10 z-10 rounded-lg"></div>
            <img
              src={heroimage || "/placeholder.svg"}
              alt="Ebook Illustration"
              className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-lg"
            />
          </div>
        </motion.div>
      </div>

      {/* Bottom Wave SVG */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden transform rotate-180">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-auto"
        >
          <path
            fill="#FFF7ED"
            fillOpacity="0.3"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero2;
