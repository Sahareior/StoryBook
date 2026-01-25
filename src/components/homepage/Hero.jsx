import React from "react";
import { FaBookBible } from "react-icons/fa6";
import { IoBookOutline } from "react-icons/io5";
import { MdMenuBook } from "react-icons/md";
import { SlMagicWand } from "react-icons/sl";
import { useNavigate } from "react-router";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        background:
          "linear-gradient(90deg, #1F3A2B 0%, rgba(31, 58, 43, 0.8) 50%, #FFE87C 100%)",
        width: "100%",
      }}
    >
      <div className="px-4 py-12 md:p-16 lg:p-28 lg:px-36">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
          <div className="flex items-center gap-4">
            <p className="bg-white p-2 rounded-xl">
              {" "}
              <IoBookOutline size={33} />
            </p>
            <p className="text-2xl md:text-[30px] font-semibold text-white">StoryTime</p>
          </div>
          <div className="flex gap-4 md:gap-6">
            <button
              onClick={() => navigate("/login")}
              className="bg-white px-6 py-2 md:py-2 md:px-8 font-semibold rounded-3xl text-sm md:text-base headerFont" 
            >
              Sign In
            </button>
            {/* <button
              onClick={() => navigate("/signup")}
              style={{
                background:
                  "linear-gradient(90deg, #FFB6C1 0.13%, #FFE87C 100.19%)",
              }}
              className="bg-white px-6 py-2 md:py-0 md:px-9 font-semibold rounded-3xl text-sm md:text-base headerFont"
            >
              Sign Up Free
            </button> */}
          </div>
        </div>
        <div className="mt-10 md:mt-5 relative">
          <p className="headerFont py-6 text-3xl sm:text-4xl md:text-4xl xl:text-5xl font-semibold flex flex-wrap justify-center items-center gap-2 md:gap-5 text-white text-center leading-tight">
            Read, Write, and Explore <MdMenuBook />{" "}
            <span className="text-3xl sm:text-5xl animate-pulse">✨</span>
          </p>
          <p className="normalFont text-center text-base sm:text-lg md:text-xl w-full sm:w-[80%] lg:w-[75%] 2xl:w-[40%] mx-auto text-white mt-3 font-thin px-2">
            Join thousands of young readers discovering magical stories and
            creating their own adventures!
          </p>

          <div className="flex flex-wrap justify-center items-center gap-3 mt-9 normalFont">
            {[
              "1000+ stories",
              "story creator",
              "earn badges",
              "built in dictonary",
            ].map((items) => (
              <button className="bg-white/20 text-white px-4 md:px-5 border border-white/40 py-2 text-sm md:text-[18px] rounded-3xl whitespace-nowrap">
                {items}
              </button>
            ))}
          </div>
          <p className="hidden lg:block absolute left-[-2%] top-[94%] xl:left-[12%] 2xl:left-[27%] text-5xl animate-pulse">✨</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
