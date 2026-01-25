import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CircleCheckBig } from "lucide-react";
import bgImg from "../../assets/bg.png";

const Otp = () => {
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.value !== "" && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add OTP validation here if needed
    navigate("/reset-password");
  };

  return (
    <div className="relative w-full min-h-screen">
      {/* Background Image */}
      <img
        src={bgImg}
        alt="Background"
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
        style={{ pointerEvents: "none", userSelect: "none" }}
      />
      {/* Overlay for opacity-50 */}
      <div className="fixed inset-0 bg-black opacity-50 z-10" />
      <div className="py-8 px-4 md:py-20 md:px-24 flex items-center justify-center gap-10 relative z-20 min-h-screen">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-[524px] h-auto overflow-hidden">
          {/* Back Button */}
          <button
            type="button"
            className="flex items-center gap-2 text-gray-600 text-sm px-4 pt-4 md:px-6 md:pt-6 hover:text-gray-800 transition"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={16} />
            <p className="font-semibold text-base">Back</p>
          </button>

          <div className="px-4 py-8 md:px-8 md:py-10">
            {/* Logo */}
            <div className="flex flex-col items-center justify-center gap-3 mb-6 md:mb-8">
              <div className="bg-gradient-to-b from-[#87CEEB] to-[#98D8C8] rounded-full w-20 h-20 md:w-32 md:h-32 flex items-center justify-center">
                <CircleCheckBig className="text-white w-10 h-10 md:w-16 md:h-16" />
              </div>
              {/* Title */}
              <h1 className="text-2xl headerFont md:text-2xl font-bold text-[#1E2939] mt-6 md:mt-10 text-center">
                Email Sent!
              </h1>
            </div>

            <div className="bg-gradient-to-b from-[#E6F3FF] to-[#F0FFF4] max-w-sm mx-auto border-2 border-[#87CEEB4D] rounded-2xl p-4 md:p-6 mb-6 flex items-center justify-center">
              {/* Instruction */}
              <p className="normalFont text-center text-[#364153] font-normal text-sm md:text-base">
                We've sent a password reset OTP to your email address.
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="space-y-6 max-w-sm mx-auto"
            >
              {/* OTP Input */}
              <div>
                <div className="flex gap-2 md:gap-4 justify-center">
                  {otp.map((data, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      ref={(el) => (inputRefs.current[index] = el)}
                      value={data}
                      onChange={(e) => handleChange(e.target, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onFocus={(e) => e.target.select()}
                      className={`w-14 h-12 md:w-24 md:h-14 rounded-2xl text-lg font-semibold text-center outline-none transition-all ${
                        data
                          ? "bg-teal-500 text-white shadow-lg scale-110"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:bg-teal-500 focus:text-white focus:shadow-lg focus:scale-110"
                      }`}
                    />
                  ))}
                </div>
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full headerFont bg-gradient-to-r from-[#98D8C8] to-[#1F3A2B] text-white font-bold text-xs md:text-sm py-3 md:py-4 rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-lg"
              >
                Confirm OTP
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
