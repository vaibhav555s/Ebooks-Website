import React from "react";
import heroimage from "../assets/hero2.jpg";
import "./Style.css";
import { IoIosArrowRoundForward } from "react-icons/io";


const Hero = () => {
  return (
    <div className="hero min-h-screen text-center px-6  bg-[#] roboto">
      <div className="hero-content flex flex-col lg:flex-row items-center lg:justify-between w-full gap-14 border border-red-600">

        {/* Text Content */}
        <div className="max-w-lg text-center lg:text-left border border-blue-500 p-8 flex flex-col gap-6 ">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-center ">
            📖 Bite-Sized Stories, Big-Time Thrills!
          </h1>
          <p className="py-4 text-lg sm:text-xl text-gray-600 text-center ">
            Read thrilling, interactive short stories in minutes—crafted for
            your fast-paced life. 🚀
          </p>

          {/* CTA Buttons */}
          <div className="flex sm:flex-row gap-4 justify-center border-yellow-700">
            <button className="btn btn-primary btn-wide text-white px-6 py-3 text-lg ">
              🚀 Start Reading <IoIosArrowRoundForward size={38}/>
            </button>
          </div>
        </div>
        {/* Image/Illustration */}
        <img
          src={heroimage}
          loading="lazy"
          className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-lg shadow-2xl"
          alt="Ebook Illustration"
        />
      </div>
    </div>
  );
};

export default Hero;
