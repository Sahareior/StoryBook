import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, KeyRound, Eye, EyeOff, Mail, Hash } from "lucide-react";
import bgImg from "../../assets/bg.png";
import toast from "react-hot-toast";
import { useResetPasswordMutation } from "../../redux/api/authApi";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get data from location state (from OTP page)
  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState(location.state?.otp || "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !otp) {
      toast.error("Email and OTP are required!");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }

    try {
      const response = await resetPassword({
        email,
        otp: parseInt(otp),
        new_password: newPassword,
        confirm_password: confirmPassword,
      }).unwrap();

      toast.success(response.message || "Password reset successfully.");
      navigate("/congratulations");
    } catch (err) {
      toast.error(
        err?.data?.message ||
          err?.data?.error ||
          "Failed to reset password. Please try again.",
      );
    }
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
                <KeyRound className="text-white w-10 h-10 md:w-16 md:h-16" />
              </div>
              {/* Title */}
              <h1 className="text-2xl headerFont md:text-2xl font-bold text-[#1E2939] mt-6 md:mt-10 text-center">
                Reset Password
              </h1>
            </div>

            <div className="bg-gradient-to-b from-[#E6F3FF] to-[#F0FFF4] max-w-sm mx-auto border-2 border-[#87CEEB4D] rounded-2xl p-4 md:p-6 mb-6 flex items-center justify-center">
              {/* Instruction */}
              <p className="normalFont text-center text-[#364153] font-normal text-sm md:text-base">
                Secure your account with a new password.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4 max-w-sm mx-auto"
            >
              {/* Email - Hidden or Read-only if needed, but adding as per instruction to add fields */}
              <div>
                <label className="flex headerFont items-center gap-2 font-bold text-xs md:text-sm text-gray-700 mb-2">
                  <Mail size={16} className="text-teal-600" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  readOnly={!!location.state?.email}
                  className={`w-full normalFont px-4 py-3 md:px-6 md:py-4 text-sm border rounded-2xl outline-none transition-all ${
                    location.state?.email
                      ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                      : "focus:ring-2 focus:ring-teal-500"
                  }`}
                  required
                />
              </div>

              {/* OTP */}
              <div>
                <label className="flex headerFont items-center gap-2 font-bold text-xs md:text-sm text-gray-700 mb-2">
                  <Hash size={16} className="text-teal-600" />
                  OTP Code
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  readOnly={!!location.state?.otp}
                  className={`w-full normalFont px-4 py-3 md:px-6 md:py-4 text-sm border rounded-2xl outline-none transition-all ${
                    location.state?.otp
                      ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                      : "focus:ring-2 focus:ring-teal-500"
                  }`}
                  required
                />
              </div>

              {/* New Password */}
              <div className="relative">
                <label className="block mb-2 font-bold text-gray-700 text-xs md:text-sm headerFont">
                  New Password
                </label>
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password..."
                  className="w-full normalFont px-4 py-3 md:px-6 md:py-4 text-sm md:text-base border rounded-2xl focus:ring-2 focus:ring-teal-500 pr-12 outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-[38px] md:top-[46px] text-gray-400 hover:text-teal-600 focus:outline-none"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <label className="block mb-2 font-bold text-gray-700 text-xs md:text-sm headerFont">
                  Confirm Password
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password..."
                  className="w-full normalFont px-4 py-3 md:px-6 md:py-4 text-sm md:text-base border rounded-2xl focus:ring-2 focus:ring-teal-500 pr-12 outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-[38px] md:top-[46px] text-gray-400 hover:text-teal-600 focus:outline-none"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full headerFont bg-gradient-to-r from-[#98D8C8] to-[#1F3A2B] text-white font-bold text-xs md:text-sm py-3 md:py-4 rounded-2xl hover:opacity-90 transition-all shadow-lg mt-4 disabled:opacity-50"
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
