import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { LuSend } from "react-icons/lu";
import { BsBook, BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { useNavigate } from "react-router";
import StorySelectModal from "./StorySelectModal";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useGetSiteAdminStudentDetailQuery } from "../../../../redux/api/authApi";
const fakeStudent = {
  name: "Sarah Johnson",
  lastActive: "30min ago",
  grade: 4,
  vocabulary: "Advanced",
  totalStory: 10,
  readingLevel: 10,
  recommendedStory: "Category story",
  dictionaryViews: [
    { word: "magnificent", from: "The Magic Garden", times: 3 },
    { word: "adventure", from: "Space Adventure", times: 6 },
    { word: "mysterious", from: "Ocean Friends", times: 4 },
    { word: "brilliant", from: "Mountain Climbers", times: 2 },
  ],
  recommendedStories: [
    {
      title: "The Enchanted Forest",
      author: "Sarah Williams",
      pages: 15,
      grade: 3,
      rating: 2,
      published: true,
      img: "https://res.cloudinary.com/dwycwft99/image/upload/v1767092695/image_65_e3axbs.png",
    },
    {
      title: "The Enchanted Forest",
      author: "Sarah Williams",
      pages: 15,
      grade: 3,
      rating: 2,
      published: true,
      img: "https://res.cloudinary.com/dwycwft99/image/upload/v1767092705/image_66_ggmyt2.png",
    },
  ],
};
export default function StudentDetail() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const { id } = useParams();
  const { data: student, isLoading, error } = useGetSiteAdminStudentDetailQuery(id);
  const navigate = useNavigate();
  // Star Rating Component
  const StarRating = ({ rating = 3, maxStars = 5 }) => {
    const stars = [];

    for (let i = 1; i <= maxStars; i++) {
      if (i <= Math.floor(rating)) {
        // Full star
        stars.push(<BsStarFill key={i} className="text-yellow-400" />);
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        // Half star
        stars.push(<BsStarHalf key={i} className="text-yellow-400" />);
      } else {
        // Empty star
        stars.push(<BsStar key={i} className="text-gray-300" />);
      }
    }

    return <div className="flex items-center gap-0.5">{stars}</div>;
  };
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="p-6">
      <Toaster position="top-right" />
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="mb-4 text-base text-[#222222] hover:underline inter roboto flex items-center gap-1"
      >
        <IoArrowBack /> Back to Student
      </button>

      {/* Student Info */}
      {isLoading ? (
        <div className="text-center p-10">Loading student details...</div>
      ) : error ? (
        <div className="text-center p-10 text-red-500">Error loading student details</div>
      ) : (
        <>
          <div className="flex items-center gap-4 p-6 mb-20 border rounded-lg">
            <div className="flex items-center justify-center w-12 h-12 text-base text-white green rounded-full border border-[#EBEBEB] headerFont">
              {(student?.first_name || student?.email || "S").charAt(0).toUpperCase()}
            </div>
            <div className="normalFont">
              <h2 className="text-sm text-[#1F1F1F] headerFont">
                {student?.first_name || student?.last_name 
                  ? `${student.first_name} ${student.last_name}`.trim() 
                  : student?.email}
              </h2>
              <p className="text-sm text-[#2E2E2E] inter mt-1">
                Last active: {fakeStudent.lastActive}
              </p>
              <div className="flex gap-2 mt-2">
                <span className="px-2 py-1 text-xs inter text-[#F39F05] bg-[#FFEDC5] rounded-full">
                  Grade {student?.grade_level || fakeStudent.grade}
                </span>
                <span className="px-2 py-1 text-xs  inter text-[#F39F05] bg-[#FFEDC5] rounded-full capitalize">
                  {student?.vocabulary_proficiency || fakeStudent.vocabulary}
                </span>
              </div>
            </div>
          </div>

          {/* Story & Reading Level */}
          <div className="flex justify-between gap-4 mb-6">
            <div className="flex flex-col items-start justify-center gap-3 ">
              <label className="text-xs font-bold text-[#2E2E2E] headerFont">
                Total Story:
              </label>
              <input
                type="number"
                value={fakeStudent.totalStory}
                readOnly
                className="px-3 py-1 mt-1 text-center border rounded-lg normalFont"
              />
            </div>
            <div className="flex flex-col items-start justify-center gap-3 ">
              <label className="text-xs font-bold text-[#2E2E2E] headerFont">
                Reading level:
              </label>
              <input
                type="number"
                value={fakeStudent.readingLevel}
                readOnly
                className="px-3 py-1 mt-1 text-center border rounded-lg normalFont"
              />
            </div>
            <div className="flex flex-col items-start justify-center gap-3 ">
              <label className="text-xs font-bold text-[#2E2E2E] headerFont">
                Recommend Story:
              </label>
              <div className="flex items-center justify-start gap-2 normalFont">
                {/* No story selected */}
                {!selectedStory && (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-1 text-sm text-black inter bg-[#FFFFFF] rounded-lg border border-[#E5E5E5]"
                  >
                    Select story
                  </button>
                )}

                {/* Story selected */}
                {selectedStory && (
                  <>
                    <div className="flex items-center gap-2 px-4 py-1 text-sm bg-[#F5F5F5] border border-[#E5E5E5] rounded-lg">
                      <span className="text-black normalFont">
                        {selectedStory.title}
                      </span>
                      <button
                        onClick={() => setSelectedStory(null)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <IoClose size={16} />
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        toast.success("Story recommended successfully!");
                        setSelectedStory(null);
                      }}
                      className="flex items-center justify-center gap-2 px-4 py-1 text-xs text-black bg-[#E8CC13] rounded-lg headerFont"
                    >
                      <LuSend /> Recommend
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Dictionary Views */}
      <div className="mb-20 bg-white border border-[#F3F3F3] p-6 rounded-xl mt-24">
        <h3 className="mb-2 font-medium text-[#000000] headerFont text-sm">
          Dictionary Views
        </h3>
        <p className="mb-2 text-sm text-[#000000] font-normal normalFont">
          Words this student looked up ({fakeStudent.dictionaryViews.length}{" "}
          total views)
        </p>
        <div className="grid grid-cols-1 gap-4 mt-3 sm:grid-cols-2">
          {fakeStudent.dictionaryViews.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between px-3 py-6 border border-[#EBEBEB] bg-white rounded-lg inter"
            >
              <div>
                <p className="font-normal text-[10px] text-[#1F1F1F] headerFont">{item.word}</p>
                <p className="text-xs text-[#1F1F1F] normalFont">From: {item.from}</p>
              </div>
              <p className="text-[10px] text-green-600 headerFont">{item.times} times</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Stories */}
      <div className="">
        <h3 className="mb-8 font-normal headerFont text-lg text-[#1E2939]">
          Recommended Story
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          {fakeStudent.recommendedStories.map((story, idx) => (
            <div key={idx} className="overflow-hidden border rounded-xl">
              <img
                src={story.img}
                alt={story.title}
                className="w-full rounded-t-xl"
              />
              <div className="px-3 py-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-normal text-[#0A0A0A] text-sm headerFont pb-2">
                    {story.title}
                  </h4>
                  <p
                    className={`text-xs normalFont ${
                      story.published
                        ? "text-green-600 bg-[#e1f8f0] px-3 py-1 rounded-full"
                        : "text-red-600"
                    }`}
                  >
                    {story.published ? "Published" : "Draft"}
                  </p>
                </div>
                <p className="text-xs text-[#4A5565] mb-3 normalFont">by {story.author}</p>
                <div className="flex items-center justify-between normalFont">
                  <p className="flex items-center gap-2 text-sm text-[#4A5565]">
                    {" "}
                    <BsBook />
                    {story.pages} Pages
                  </p>
                  <p className="flex items-center gap-2 text-sm text-[#4A5565]">
                    {" "}
                    Grade: {story.grade}
                  </p>
                  <div className="flex items-center gap-2">
                    <StarRating rating={story.rating || 3} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <StorySelectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectStory={(story) => setSelectedStory(story)}
      />
    </div>
  );
}
