import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer
      style={{
        background:
          "linear-gradient(90deg, #1F3A2B 0%, rgba(31, 58, 43, 0.8) 50%, #FFE87C 100%)",
        width: "100%",
      }}
      className="bg-[#0f172a] text-gray-300"
    >
      <div className="max-w-7xl mx-auto px-4 py-8 md:px-6 md:py-12 flex flex-col items-center justify-center gap-11 text-center md:text-left">
        <div className="text-sm headerFont font-normal text-white flex gap-20">
          <Link to="/terms">Terms & Conditions</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </div>
        <div>
          <p className="font-normal text-4xl text-[#D7AB42] headerFont">StoryTime</p>
        </div>
        {/* Bottom bar */}
        <div className="text-center text-base font-normal text-[#CFCFCF] normalFont">
          © {new Date().getFullYear()} StoryTime Kids. Made with love for young
          readers everywhere.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
