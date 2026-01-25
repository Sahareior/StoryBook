import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";
import bgImg from "../../assets/bg.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add your API call here if needed
    navigate("/otp");
  };
  return (
    <div className="relative w-full min-h-screen">
      {/* Background Image */}
      <img
        src={bgImg}
        alt="Background"
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      />
      {/* Overlay for opacity-50 */}
      <div className="fixed inset-0 bg-black opacity-50 z-10" />
      <div className="py-8 px-4 md:py-20 md:px-24 flex items-center justify-center gap-10 relative z-20 min-h-screen">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-[524px] h-auto  overflow-hidden">
          {/* Back Button */}
          <button
            type="button"
            className="flex items-center gap-2 text-gray-600 text-sm px-4 pt-4 md:px-6 md:pt-6 hover:text-gray-800 transition"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={16} />
            <p className="font-semibold text-base">Back</p>
          </button>

          <div className="px-4 py-8 md:px-8 md:pt-6 md:pb-10">
            {/* Logo */}
            <div className="flex flex-col items-center justify-center gap-3 mb-6 md:mb-8">
              <div className="bg-gradient-to-b from-[#87CEEB] to-[#98D8C8] rounded-full w-16 h-16 md:w-24 md:h-24 flex items-center justify-center">
                <Mail className="text-white w-8 h-8 md:w-12 md:h-12" />
              </div>
              {/* Title */}
              <h1 className="text-base md:text-2xl font-bold text-[#1E2939] text-center headerFont">
                Forgot Password?
              </h1>

              {/* Subtitle */}
              <p className="text-[#4A5565] text-base md:text-lg font-normal text-center normalFont">
                No worries! We'll help you reset it.
              </p>
            </div>

            <div className="bg-gradient-to-b from-[#E6F3FF] to-[#F0FFF4] max-w-sm mx-auto border-2 border-[#87CEEB4D] rounded-2xl p-4 md:p-6 mb-6 flex items-center justify-center">
              {/* Instruction */}
              <p className="text-center text-[#364153] font-normal text-sm md:text-base normalFont">
                📧 Enter your email address below, and we'll send them OTP to
                reset your password!
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 md:space-y-6 max-w-sm mx-auto"
            >
              {/* Email Field */}
              <div className="relative">
                <label className="flex headerFont items-center gap-2 font-bold text-xs md:text-sm text-gray-700 mb-2">
                  <Mail size={16} className="text-teal-600" />
                  Your Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 md:px-6 md:py-4 border border-gray-300 rounded-2xl text-base md:text-lg font-normal focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                  required
                />
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full pb-16 headerFont bg-gradient-to-r from-[#98D8C8] to-[#1F3A2B] text-white font-bold text-base md:text-sm py-3 md:py-4 rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-lg"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
