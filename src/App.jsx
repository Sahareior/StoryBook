import Hero from "./components/homepage/Hero";
import GradeLevel from "./components/homepage/GradeLevel";
import Carousel from "./components/homepage/Carousel/Carousel";
import AboutCard from "./components/homepage/AboutCard";
import AchivementCard from "./components/homepage/AchivementCard";
import Footer from "./pages/Footer";

function App() {
  return (
    <div>
      <Hero />

      <div
        className="py-8 pb-12"
        style={{
          background: "linear-gradient(180deg, #EBF6FF 0%, #F5FAFF 100%)",
        }}
      >
        <GradeLevel />
        <h2 className="headerFont text-2xl md:text-[30px] px-4 sm:px-8 md:px-16 lg:px-24 py-8 md:py-12 lg:py-16 font-semibold text-center lg:text-left">
          Populer Stories
        </h2>
        <Carousel />

        <div className="flex flex-col items-center justify-center gap-3 mt-6 lg:mt-0">
          <button
            className="w-80 h-14 py-2 text-white text-sm px-7 rounded-full headerFont"
            style={{
              background:
                "linear-gradient(270deg, #98D8C8 -0.1%, #1F3A2B 100.1%)",
            }}
          >
            Start Reading Now!
          </button>
          <p className="text-[#6A7282] normalFont">
            Sign up to unlock all stories
          </p>
        </div>
      </div>
      <AboutCard />
      <AchivementCard />
      <Footer />
    </div>
  );
}

export default App;
