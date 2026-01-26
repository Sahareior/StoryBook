import React, { useState } from "react";
import { GiBookshelf } from "react-icons/gi";
import { IoBookOutline } from "react-icons/io5";
import { FaBook, FaPenNib, FaTrophy, FaUser } from "react-icons/fa";
import { Link } from "react-router";
import { FaArrowRight, FaBell } from "react-icons/fa6";
import Reusable_Modal from "../../reusable_components/Reusable_Modal";
import {
  useGetContinueReadingQuery,
  useGetDashboardStatsQuery,
} from "../../../redux/api/authApi";

const DashboardHome = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: continueReadingData, isLoading } = useGetContinueReadingQuery();
  const { data: statsData } = useGetDashboardStatsQuery();

  console.log("continueReadingData", continueReadingData);
  console.log("statsData", statsData);

  const quickActions = [
    {
      title: "Library",
      subtitle: "Find new books",
      bg: "linear-gradient(90deg, #FFB6C1 0%, #FFDAB9 100%)",
      icon: <FaBook size={20} />,
      link: "/library",
    },
    {
      title: "My Stories",
      subtitle: "Write & create",
      bg: "linear-gradient(90.14deg, #FFE87C 1.43%, #FFDAB9 99.13%)",
      icon: <FaPenNib size={20} />,
      link: "/myStories",
    },
    {
      title: "Achievements",
      subtitle: "View progress",
      bg: "linear-gradient(89.85deg, #E6E6FA 0.12%, #98D8C8 99.87%)",
      icon: <FaTrophy size={20} />,
      link: "/achivement",
    },
    {
      title: "Profile",
      subtitle: "Your info",
      bg: "linear-gradient(90deg, #98D8C8 0%, #87CEEB 100%)",
      icon: <FaUser size={20} />,
      link: "/profile",
    },
  ];

  const stats = [
    {
      value: statsData?.edited_totday || "0",
      label: "Edited Today",
      borderColor: "#FFE87C4D",
      textColor: "#87CEEB",
      nestedLocation: "bookmarks",
    },
    {
      value: statsData?.total_Stories || "0",
      label: "Total Stories",
      borderColor: "#98D8C84D",
      textColor: "#98D8C8",
      nestedLocation: "wordCount",
    },
    {
      value: statsData?.total_page || "0",
      label: "Total Pages",
      borderColor: "#FFB6C14D",
      textColor: "#FFB6C1",
      nestedLocation: "readingLevel",
    },
  ];

  const readingList = continueReadingData?.reading_list || [];
  const mainStory = readingList[0];
  const recentStories = readingList.slice(0, 3);

  return (
    <section className="min-h-screen bg-gradient-to-br from-sky-50 to-white">
      <div className="w-full lg:w-[90vw] xl:w-[80vw] mx-auto px-4 py-8 md:p-12 lg:p-24">
        {/* Header */}
        <header className="mb-8 flex justify-between w-full ">
          <h2 className="headerFont text-base md:text-xl font-semibold text-gray-800">
            ☀️ Hi, Emma! <span className="ml-1">👋</span>
          </h2>
          <FaBell onClick={() => setIsModalOpen(true)} size={20} />
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Continue Reading */}
          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="h-64 bg-white rounded-2xl animate-pulse flex items-center justify-center">
                <p className="text-gray-400">Loading stories...</p>
              </div>
            ) : mainStory ? (
              <ContinueReadingCard
                id={mainStory.story_id}
                title={mainStory.title}
                progress={parseFloat(mainStory.completion_percentage)}
                image={mainStory.cover_image}
              />
            ) : (
              <div className="h-52 bg-white rounded-2xl border-4 border-dashed border-gray-200 flex flex-col items-center justify-center text-center p-6">
                <GiBookshelf size={40} className="text-gray-300 mb-2" />
                <p className="text-gray-500 headerFont">
                  No stories in progress yet.
                </p>
                <Link
                  to="/library"
                  className="text-teal-600 text-sm underline mt-1"
                >
                  Browse library
                </Link>
              </div>
            )}

            {/* Recent Stories Section */}
            {recentStories.length > 0 && (
              <div className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recentStories.map((story) => (
                    <RecentStoryCard
                      key={story.story_id}
                      id={story.story_id}
                      title={story.title}
                      progress={parseFloat(story.completion_percentage)}
                      image={story.cover_image}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {quickActions.map((action, index) => (
              <QuickActionCard
                key={index}
                title={action.title}
                subtitle={action.subtitle}
                bg={action.bg}
                icon={action.icon}
                link={action.link}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              value={stat.value}
              label={stat.label}
              borderColor={stat.borderColor}
              textColor={stat.textColor}
              nestedLocation={stat.nestedLocation}
            />
          ))}
        </div>
      </div>
      <Reusable_Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        nestedLocation={"notification"}
        location={"notification"}
      />
    </section>
  );
};

/* ------------------ Internal Components ------------------ */

const ContinueReadingCard = ({ id, title, progress, image }) => (
  <div>
    <div className="lg:col-span-2 bg-white border-[#87CEEB4D]/40 border-4 rounded-2xl shadow-xl p-4 md:p-6 flex flex-col md:flex-row gap-6 md:gap-0">
      <div className="w-full md:w-auto">
        <p className="flex gap-3 mb-3 text-sm md:text-base headerFont justify-center font-semibold items-center text-[#1E2939]">
          <IoBookOutline className="text-blue-500 mt-1" size={22} /> Continue
          Reading
        </p>
        <img
          src={
            image ||
            "https://ih1.redbubble.net/image.1119561633.3087/flat,750x,075,f-pad,750x1000,f8f8f8.jpg"
          }
          alt={title}
          className="w-full md:w-48 h-[200px] object-cover rounded-xl shadow"
        />
      </div>

      <div className="flex-1 md:pl-8 mt-4 md:mt-12">
        <h3 className="text-xl md:text-base headerFont font-semibold text-gray-800 mb-2">
          {title}
        </h3>
        <p className="text-gray-600 w-full md:w-auto lg:w-96 mb-4 normalFont">
          You're doing great! Keep reading to discover what happens next.
        </p>

        <div className="mt-6 md:mt-8">
          <ProgressBar value={progress} />
        </div>

        <Link to={`/${id}`} state={{ title }}>
          <button
            className="mt-6 md:mt-9 inline-flex items-center justify-center gap-2 rounded-full px-8 md:px-14 py-3 text-xs headerFont font-medium text-white hover:opacity-90 transition w-full md:w-auto"
            style={{
              background: "linear-gradient(90deg, #213C2D 0%, #98D8C8 99.91%)",
            }}
          >
            Continue Reading →
          </button>
        </Link>
      </div>
      {/*  */}
    </div>
  </div>
);

const RecentStoryCard = ({ id, title, progress, image }) => (
  <div className="bg-white rounded-xl shadow-sm border-2 border-[#87CEEB4D] p-4 hover:shadow-md transition-shadow">
    <div className="flex gap-3">
      <img
        className="w-16 h-16 object-cover rounded-lg"
        src={
          image ||
          "https://ih1.redbubble.net/image.1119561633.3087/flat,750x,075,f-pad,750x1000,f8f8f8.jpg"
        }
        alt={title}
      />
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800 headerFont text-[10px] truncate w-24">
          {title}
        </h3>
        <p className="text-[10px] text-gray-500 mt-1 normalFont">
          Your Progress {progress}%
        </p>
        <Link to={`/${id}`} state={{ title }}>
          <button
            className="mt-2 headerFont flex items-center gap-1 text-[10px] font-medium text-white px-4 py-1 rounded-3xl hover:text-teal-200 transition"
            style={{
              background: "linear-gradient(90deg, #213C2D 0%, #98D8C8 99.91%)",
            }}
          >
            Read <FaArrowRight size={10} />
          </button>
        </Link>
      </div>
    </div>
  </div>
);

const ProgressBar = ({ value }) => (
  <div className="w-full">
    <div className="flex justify-between mb-1 text-xs text-gray-500 normalFont">
      <span>Your Progress</span>
      <span>{value}%</span>
    </div>
    <div className="h-3 w-full rounded-full bg-gray-200 overflow-hidden">
      <div
        className="h-full rounded-full bg-[#213C2D] transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

const QuickActionCard = ({ title, subtitle, bg, icon, link }) => (
  <Link
    to={link}
    className="rounded-2xl p-5 text-gray-800 cursor-pointer hover:scale-[1.02] transition-transform shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.1),_0px_10px_15px_-3px_rgba(0,0,0,0.1)]"
    style={{ background: bg }}
  >
    <div className="flex items-center gap-2">
      <p className="bg-[#FFFFFFCC]/80 p-3 rounded-3xl">{icon}</p>
      <div>
        <h4 className="font-semibold text-sm headerFont ">{title}</h4>
        <p className="text-sm opacity-80 normalFont">{subtitle}</p>
      </div>
    </div>
  </Link>
);

const StatCard = ({ value, label, borderColor, textColor, nestedLocation }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      // onClick={() => setIsModalOpen(true)}
      className="rounded-2xl p-6 text-center shadow-sm border-4 bg-white cursor-pointer hover:border-gray-200 transition-colors"
      style={{
        borderColor: borderColor,
        color: textColor,
      }}
    >
      <h3 className="text-xl font-bold headerFont">{value}</h3>
      <p className="mt-1 text-sm text-gray-500 normalFont">{label}</p>
      <Reusable_Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        nestedLocation={nestedLocation}
        location={"notification"}
      />
    </div>
  );
};

export default DashboardHome;
