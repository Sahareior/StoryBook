import React from "react";
import { FaBook, FaPen, FaStar } from "react-icons/fa6";
import { GiSelfLove } from "react-icons/gi";
import { GoPeople, GoTrophy } from "react-icons/go";
import { IoBookOutline } from "react-icons/io5";
import { useNavigate } from "react-router";

const DuelCard = ({ data, onClick }) => {
  const handleKeyDown = (e) => {
    if (!onClick) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className="flex flex-col sm:flex-row w-full xl:w-[40vw] border-4 rounded-2xl p-5 lg:p-8 gap-4 cursor-pointer focus:outline-none hover:shadow-2xl transition-transform transform hover:-translate-y-1"
      style={{
        background: data.backgroundColor,
        borderColor: `${data.borderColor}40`, // Adding alpha (40 = 25% opacity)
      }}
    >
      <p
        className="p-4 h-14 w-fit flex justify-center items-center rounded-xl"
        style={{
          background: data.iconBgColor,
        }}
      >
        {data.icon}
      </p>
      <div className="space-y-2">
        <h2 className="text-xs lg:text-xl text-[#1E2939] font-semibold headerFont">
          {data.text1}
        </h2>
        <p className="text-[#4A5565] text-base lg:text-[18px] px-1 normalFont">
          {data.text2}
        </p>

        <div className="space-y-1">
          {data.nestedText.map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-[#364153] normal">
              <FaStar className="text-yellow-300" />
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AchievementCard = () => {
  const navigate = useNavigate();
  const cardData = [
    {
      icon: <IoBookOutline className="text-white font-bold" size={28} />,
      iconBgColor: "linear-gradient(180deg, #1F3A2B 0%, #98D8C8 100%)",
      backgroundColor: "linear-gradient(180deg, #E6F3FF 0%, #F0FFF4 100%)",
      borderColor: "#1F3A2B",
      text1: "Read Amazing Stories",
      text2:
        "Discover thousands of age-appropriate stories with our built-in dictionary to help you learn new words!",
      nestedText: [
        { text: "Interactive word definitions" },
        { text: "Progress tracking" },
        { text: "Beautiful illustrations" },
      ],
    },
    {
      icon: <FaPen className="text-white font-bold" size={28} />,
      borderColor: "#FFBF00",
      iconBgColor: "linear-gradient(180deg, #FFE87C 0%, #FFD700 100%)",
      backgroundColor: "linear-gradient(180deg, #FFF8E6 0%, #FFF0F5 100%)",
      text1: "Create Your Own Stories",
      text2:
        "Express yourself with our creative writing tools and share your stories with a safe community of young writers!",
      nestedText: [
        { text: "Creative writing prompts" },
        { text: "Safe sharing community" },
        { text: "Illustration tools" },
      ],
    },
  ];

  const cardData2 = [
    {
      icon: <GoPeople size={48} />,
      title: "50,000+",
      subTitle: "Happy Readers",
    },
    {
      icon: <IoBookOutline size={48} />,
      title: "1,000+",
      subTitle: "Stories",
    },
    {
      icon: <GoTrophy size={48} />,
      title: "100+",
      subTitle: "Achievements",
    },
    {
      icon: <GiSelfLove size={48} />,
      title: "100%",
      subTitle: "Safe & Fun",
    },
  ];

  return (
    <div className="bg-[#fff7ec] space-y-12 lg:space-y-24 pb-8 lg:py-16 px-4 lg:px-0">
      <div className="max-w-[1440px] mx-auto flex flex-col xl:flex-row gap-6 lg:gap-16 justify-center items-center lg:px-20">
        {cardData.map((data, index) => (
          <DuelCard
            key={index}
            data={data}
            onClick={() => {
              if (index === 0) navigate('/library');
              if (index === 1) navigate('/story-creator');
            }}
          />
        ))}
      </div>

      <div
        style={{
          background:
            "linear-gradient(90deg, #FFB6C1 0%, #E6E6FA 47.12%, #46785D 100%)",
        }}
        className="p-4 py-8 lg:p-5 lg:py-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full lg:w-[83vw] rounded-xl shadow-xl items-center justify-center mx-auto gap-6 justify-items-center"
      >
        {cardData2.map((items) => (
          <div
            key={items.title}
            className="flex flex-col justify-center items-center gap-3 text-white"
          >
            <p>{items.icon}</p>
            <p className="text-3xl lg:text-[40px] font-semibold">
              {items.title}
            </p>
            <p className="text-sm lg:text-base headerFont">{items.subTitle}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col justify-center items-center py-8 lg:py-12 gap-5 lg:gap-7 bg-[#FFFFFF] p-6 lg:p-8 w-full lg:w-[83vw] mx-auto rounded-xl shadow-xl text-center">
        <h2 className="text-xl lg:text-2xl font-semibold headerFont">
          Ready to Start Your Reading Adventure?
        </h2>
        <p className="text-base lg:text-lg text-[#4A5565] normalFont">
          Join thousands of kids learning to love reading and writing. Sign in
          now and get started for FREE!
        </p>

        {/* <button
          onClick={() => navigate("/signup")}
          className="text-lg px-10 lg:px-5 text-white py-3 rounded-full headerFont"
          style={{
            background:
              "linear-gradient(270deg, #98D8C8 -0.1%, #1F3A2B 100.1%)",
          }}
        >
          {" "}
          Sign Up Free!
        </button> */}
      </div>
    </div>
  );
};

export default AchievementCard;
