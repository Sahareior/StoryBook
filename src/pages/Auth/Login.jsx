import { useState } from "react";
import { BookOpen, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import bgImg from "../../assets/bg.png";
import { useLoginMutation } from "../../redux/api/authApi";
import { setCredentials } from "../../redux/features/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login({ email, password }).unwrap();

      // Dispatch to Redux (this also sets localStorage for access, refresh, and user)
      dispatch(
        setCredentials({
          access: response.access,
          refresh: response.refresh,
          user: response.user,
        }),
      );

      toast.success("Login successful");

      // Navigate based on user role
      if (response.user.is_admin_user) {
        localStorage.setItem("role", "ADMIN");
        navigate("/dashboard/admin");
      } else if (response.user.is_teacher) {
        localStorage.setItem("role", "TEACHER");
        navigate("/dashboard/teacher");
      } else if (response.user.is_student) {
        localStorage.setItem("role", "student");
        navigate("/student-dashboard");
      }
    } catch (err) {
      console.error("Login failed:", err);
      toast.error(
        err?.data?.detail || err?.data?.message || "Invalid email or password",
      );
    }
  };

  return (
    <div className="relative w-full min-h-screen">
      {/* Background Image */}
      <img
        src={bgImg}
        alt="Background"
        className="fixed inset-0 w-full h-full object-cover z-0"
        style={{ pointerEvents: "none", userSelect: "none" }}
      />
      {/* Overlay for opacity-50 */}
      <div className="fixed inset-0 bg-black opacity-50 z-10" />
      <div className="flex items-center justify-center min-h-screen px-4 py-8 md:px-24 md:py-20 relative z-20">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-[524px]  overflow-hidden">
          <div className="p-6 sm:p-10 md:p-14">
            {/* Logo */}
            <div className="flex flex-col items-center justify-center gap-3 mb-6 md:mb-8">
              <div className="bg-gradient-to-b from-[#87CEEB] to-[#98D8C8] rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
                <BookOpen className="text-white w-6 h-6 md:w-9 md:h-9" />
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-2xl font-bold text-[#1E2939] text-center headerFont">
                Welcome Back!
              </h1>

              <p className="text-[#4A5565] text-base md:text-lg text-center normalFont">
                Ready to read some amazing stories?
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              {/* Email */}
              <div>
                <label className="block mb-2 font-bold text-gray-700 text-xs md:text-sm headerFont">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="w-full normalFont px-4 py-3 md:px-6 md:py-4 text-base md:text-lg border rounded-2xl focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              {/* Password */}
              <div className="relative">
                <label className="block mb-2 font-bold text-gray-700 text-xs md:text-sm headerFont">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password..."
                  className="w-full normalFont px-4 py-3 md:px-6 md:py-4 text-base md:text-lg border rounded-2xl focus:ring-2 focus:ring-teal-500 pr-12"
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-[52px] md:top-16 -translate-y-1/2 text-gray-400 hover:text-teal-600"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff color="#99A1AF" />
                  ) : (
                    <Eye color="#99A1AF" />
                  )}
                </button>
              </div>

              {/* Forgot Password */}
              <p className="text-right text-[#87CEEB] font-bold text-sm md:text-base normalFont">
                <a href="/forgot">Forgot Password?</a>
              </p>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#98D8C8] to-[#1F3A2B] text-white font-bold text-base md:text-lg py-3 md:py-4 rounded-2xl shadow-lg headerFont disabled:opacity-50"
              >
                {isLoading ? "Logging in..." : "Log in"}
              </button>
            </form>

            <p className="mt-6 text-center text-gray-600 text-sm md:text-base normalFont">
              Are you a parent or teacher?{" "}
              <a
                href="/login"
                className="text-[#87CEEB] hover:underline normalFont"
              >
                Click here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
