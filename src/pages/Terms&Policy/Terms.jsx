import { ArrowLeft } from "lucide-react";
import bgImg from "../../assets/bg.png";
import { useGetTermsAndConditionsQuery } from "../../redux/api/authApi";
import { ScrollRestoration, useNavigate } from "react-router-dom";

const TermsAndConditions = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetTermsAndConditionsQuery();

  return (
    <div className="relative w-full min-h-screen overflow-y-auto">
      {/* Background Image */}
      <img
        src={bgImg}
        alt="Background"
        className="fixed top-0 left-0 w-full h-full min-h-screen object-cover z-0"
        style={{ pointerEvents: "none", userSelect: "none" }}
      />
      {/* Overlay for opacity-50 */}
      <div className="absolute inset-0 bg-black opacity-50 z-10" />
      <div className="flex flex-col min-h-screen items-center justify-center px-4 md:px-12 lg:px-24 py-12 relative z-20">
        <ScrollRestoration />
        <div className="w-full max-w-6xl bg-white/80 rounded-[48px] shadow-[0px_25px_8px_-12px_rgba(0,0,0,0.25)] outline outline-8 outline-offset-[-8px] outline-white/50 p-8 md:p-16 lg:p-24 flex flex-col gap-8">
          {/* Back Button */}
          <button
            type="button"
            className="flex items-center gap-2 text-gray-600 text-sm pt-4 md:pt-6 hover:text-gray-800 transition"
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={16} />
            <p className="font-semibold text-base">Back</p>
          </button>
          <h1 className="text-center text-black text-3xl md:text-4xl font-bold font-['Nunito'] leading-tight mb-4">
            Terms & Condition
          </h1>

          {isLoading ? (
            <div className="text-center text-neutral-500 text-xl py-10 font-['Nunito']">
              Loading terms & conditions...
            </div>
          ) : (
            <div
              className="text-neutral-500 text-lg md:text-2xl font-normal font-['Nunito'] leading-relaxed dynamic-content prose max-w-none"
              dangerouslySetInnerHTML={{ __html: data?.content || "" }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
