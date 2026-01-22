import React from "react";
import { AiOutlineStock, AiTwotoneThunderbolt } from "react-icons/ai";
import { FiShield, FiTarget } from "react-icons/fi";
import { GoPeople } from "react-icons/go";
import { LuBrain } from "react-icons/lu";
import { RiBookMarkedLine } from "react-icons/ri";

const Header = ({ heading, subheading }) => {
  return (
    <div className="flex justify-center items-center flex-col mb-10 lg:mb-20 px-4">
      <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center leading-tight headerFont">
        {heading}
      </p>
      <p className="text-base md:text-lg lg:text-[20px] text-[#4A5565] text-center mt-4 max-w-2xl normalFont">
        {subheading}
      </p>
    </div>
  );
};

const Card = ({ cardData, position, image }) => {
  return (
    <div
      className={`flex justify-center flex-col-reverse ${position === "left" ? "lg:flex-row-reverse" : "lg:flex-row"} items-center lg:items-stretch mt-10 lg:mt-20 gap-6 lg:gap-9 px-4 lg:px-0`}
    >
      <div className="grid grid-cols-1 lg:grid-rows-4 gap-6 w-full lg:w-[40vw] h-auto lg:h-full">
        {cardData.map((item, index) => (
          <div
            key={index}
            className="flex p-6 rounded-2xl shadow-xl bg-[#FFF] gap-4 w-full h-auto lg:h-full"
          >
            <div
              className="p-2 h-12 w-12 flex items-center text-white justify-center rounded-xl flex-shrink-0"
              style={{
                background: item.backgroundColor,
              }}
            >
              {item.icon}
            </div>

            <div className="flex-1">
              <h3 className="text-sm lg:text-base font-semibold headerFont">
                {item.text1}
              </h3>
              <p className="text-xs lg:text-sm text-[#4A5565] mt-2 normalFont w-[504px]">
                {item.text2}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Image container that matches the cards height */}
      <div className="w-full lg:w-[40vw] h-auto lg:h-full flex items-center">
        <img
          className="w-full h-auto lg:h-full object-cover rounded-xl shadow-md"
          src={image}
          alt="Children reading books"
        />
      </div>
    </div>
  );
};

const AboutCard = () => {
  const cards1 = [
    {
      icon: <GoPeople size={30} />,
      text1: "Parent & Teacher Dashboards",
      text2:
        "Monitor student progress, assign reading goals, and track comprehension with detailed analytics.",
      backgroundColor: "linear-gradient(180deg, #87CEEB 0%, #98D8C8 100%)",
    },
    {
      icon: <LuBrain size={30} />,
      text1: "Research-Based Learning",
      text2:
        "Our curriculum aligns with Common Core standards and uses proven literacy development methods.",
      backgroundColor: " linear-gradient(180deg, #FFE87C 0%, #FFD700 100%)",
    },
    {
      icon: <AiTwotoneThunderbolt size={30} />,
      text1: "Adaptive AI Technology",
      text2:
        "Smart algorithms adjust difficulty and recommend stories based on each childs unique learning pace.",
      backgroundColor: "linear-gradient(180deg, #FFB6C1 0%, #E6E6FA 100%)",
    },
    {
      icon: <FiShield size={30} />,
      text1: "Safe & Secure Environment",
      text2:
        "COPPA compliant platform with age-appropriate content filtering and privacy protection.",
      backgroundColor: "linear-gradient(180deg, #98D8C8 0%, #87CEEB 100%)",
    },
  ];
  const cards2 = [
    {
      icon: <FiTarget size={30} />,
      text1: "Personalized Reading Levels",
      text2:
        "Stories adapt to your childs reading ability, ensuring theyre always challenged but never frustrated.",
      backgroundColor: "linear-gradient(180deg, #87CEEB 0%, #98D8C8 100%)",
    },

    {
      icon: <RiBookMarkedLine size={30} />,
      text1: "Built-in Dictionary",
      text2:
        "Click any word to see kid-friendly definitions with pictures. Build vocabulary while reading!",
      backgroundColor: "linear-gradient(180deg, #FFE87C 0%, #FFD700 100%)",
    },
    {
      icon: <AiOutlineStock size={30} />,
      text1: "Progress Tracking",
      text2:
        "Watch reading skills grow with detailed progress reports and achievement milestones.",
      backgroundColor: "linear-gradient(180deg, #FFB6C1 0%, #E6E6FA 100%)",
    },
    {
      icon: <FiShield size={30} />,
      text1: "Gamified Learning",
      text2:
        "Earn badges, unlock achievements, and celebrate reading milestones with fun rewards!",
      backgroundColor: "linear-gradient(180deg, #98D8C8 0%, #87CEEB 100%)",
    },
  ];

  return (
    <div className=" flex  flex-col-reverse ">
      {/* section 2 */}
      <div
        className="py-8 pb-12 lg:py-16 lg:pb-20"
        style={{
          background: "linear-gradient(180deg, #fffefe 0%, #fff8ef 100%)",
        }}
      >
        <Header
          heading={"Support Our Learners"}
          subheading={
            "We provide personalized tools and features to help every child become a confident, lifelong reader!"
          }
        />
        <Card image={"/images/homepage/img1.png"} cardData={cards1} />
      </div>
      {/* section 2 */}

      <div
        className="py-8 pb-12 lg:py-16 lg:pb-28"
        style={{
          background: "linear-gradient(180deg, #E6F3FF 0%, ##F0FFF4 100%)",
        }}
      >
        <Header
          heading={"Support Your Reading Journey"}
          subheading={
            "We provide personalized tools and features to help every child become a confident, lifelong reader!"
          }
        />
        <Card
          image={"/images/homepage/img2.png"}
          position={"left"}
          cardData={cards2}
        />
      </div>
    </div>
  );
};

export default AboutCard;
