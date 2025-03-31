import React from "react";
// import Image from "";
import { IoIosArrowRoundForward } from "react-icons/io";
import heroimage from "../assets/hero2.jpg"; // Replace with your image path

const Hero1 = () => {
  return (
    <section className="w-full py-12 md:py-20 bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20 lg:justify-between ">
        {/* Left Column - Text Content */}
        <div className="max-w-lg text-center lg:text-left space-y-10">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
            📖 Bite-Sized Stories, <br /> Big-Time Thrills!
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Read thrilling, interactive short stories in minutes—crafted for
            your fast-paced life. 🚀
          </p>
          {/* CTA Button */}
          <div className="flex justify-center lg:justify-start">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 text-lg font-semibold rounded-full flex items-center gap-2 shadow-lg transition">
              🚀 Start Reading <IoIosArrowRoundForward size={28} />
            </button>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="relative w-full max-w-md lg:max-w-lg">
          <div className="absolute -top-6 -left-6 w-16 h-16 bg-orange-100 rounded-full"></div>
          <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-cyan-100 rounded-full"></div>
          <img
            src={heroimage}
            alt="Ebook Illustration"
            className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-lg shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero1;
