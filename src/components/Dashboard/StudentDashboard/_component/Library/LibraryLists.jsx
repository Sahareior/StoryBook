import { Pagination } from "antd";
import { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoArrowBack, IoBookOutline, IoSearch } from "react-icons/io5";
import { Link, ScrollRestoration, useNavigate } from "react-router";
import { useGetStoriesLibraryQuery } from "../../../../../redux/api/authApi";

const recommendedStories = [
  {
    title: "The Enchanted Forest",
    author: "Luna Moonbeam",
    grade: "Grade 3",
    pages: 18,
    rating: 5,
    image: "https://covers.openlibrary.org/b/id/14384469-L.jpg", // Magical forest cover
  },
  {
    title: "Space Adventures with Zog",
    author: "Captain Cosmo",
    grade: "Grade 3",
    pages: 22,
    rating: 5,
    image: "https://covers.openlibrary.org/b/id/13293614-L.jpg", // Space adventure cover
  },
  {
    title: "Underwater Treasure",
    author: "Marina Pearl",
    grade: "Grade 3",
    pages: 16,
    rating: 4,
    image: "https://covers.openlibrary.org/b/id/13725757-L.jpg", // Underwater adventure
  },
  {
    title: "Dragon's Best Friend",
    author: "Ember Spark",
    grade: "Grade 3",
    pages: 20,
    rating: 4,
    image: "https://covers.openlibrary.org/b/id/14504153-L.jpg", // Dragon story cover
  },
  {
    title: "The Little Robot Who Could",
    author: "Chip Circuit",
    grade: "Grade 3",
    pages: 14,
    rating: 4,
    image: "https://covers.openlibrary.org/b/id/14729274-L.jpg", // Robot adventure cover
  },
];

const LibraryLists = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGrade, setSelectedGrade] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 12;

  const {
    data: libraryStories,
    isLoading,
    isError,
  } = useGetStoriesLibraryQuery();

  // Reset to page 1 when filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedGrade, searchQuery]);

  // Filtering Logic
  const filteredRecommended = recommendedStories.filter((story) => {
    const matchesGrade =
      selectedGrade === "All" || story.grade === selectedGrade;
    const matchesSearch =
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGrade && matchesSearch;
  });

  const filteredLibrary = libraryStories?.filter((story) => {
    const matchesGrade =
      selectedGrade === "All" || `Grade ${story.grade}` === selectedGrade;
    const matchesSearch =
      story.story_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.author_name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGrade && matchesSearch;
  });

  // Pagination logic based on filtered library stories
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStories =
    filteredLibrary?.slice(indexOfFirstItem, indexOfLastItem) || [];

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#FFF6EA] to-[#FFFDF9]">
      <ScrollRestoration />
      <div className="w-[80vw] mx-auto py-20 space-y-10">
        {/* Header */}
        <header className="flex items-center gap-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 bg-white rounded-full shadow"
          >
            <IoArrowBack />
          </button>

          <h2 className="text-xl font-semibold flex items-center gap-3 text-gray-800 headerFont">
            <IoBookOutline className="text-[#FFB6C1] mt-1" size={44} />
            Story Library
          </h2>
        </header>

        {/* Search */}
        <div className="relative">
          <IoSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a story or author..."
            className="w-full normalFont pl-12 pr-4 py-3 rounded-full bg-white shadow outline-none"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <FilterPill
            label="Grade"
            options={["All", "Grade 3", "Grade 4", "Grade 5"]}
            selected={selectedGrade}
            onSelect={setSelectedGrade}
          />
        </div>

        {/* Recommended */}
        <Section title="Recommended Story">
          {filteredRecommended.length > 0 ? (
            filteredRecommended.map((story, i) => (
              <StoryCard key={i} {...story} />
            ))
          ) : (
            <p className="col-span-full py-4 text-center text-gray-500 font-['Nunito']">
              No recommended stories for this grade.
            </p>
          )}
        </Section>

        {/* All Story */}
        <Section title="All Story">
          {isLoading ? (
            <div className="col-span-full py-10 text-center text-gray-500 font-medium font-['Nunito']">
              Loading stories...
            </div>
          ) : isError ? (
            <div className="col-span-full py-10 text-center text-red-500 font-medium font-['Nunito']">
              Failed to load stories.
            </div>
          ) : currentStories.length > 0 ? (
            currentStories.map((story) => (
              <StoryCard
                key={story.story_id}
                id={story.story_id}
                title={story.story_title}
                author={story.author_name}
                grade={`Grade ${story.grade}`}
                pages={story.total_pages}
                rating={parseFloat(story.rating)}
                image={
                  story.cover_image ||
                  "https://ih1.redbubble.net/image.1119561633.3087/flat,750x,075,f-pad,750x1000,f8f8f8.jpg"
                }
              />
            ))
          ) : (
            <div className="col-span-full py-10 text-center text-gray-500 font-medium font-['Nunito']">
              No stories found for this grade.
            </div>
          )}
        </Section>

        {/* Pagination for All Story */}
        {!isLoading && !isError && filteredLibrary?.length > itemsPerPage && (
          <div className="flex justify-center mt-10">
            <Pagination
              current={currentPage}
              total={filteredLibrary.length}
              pageSize={itemsPerPage}
              onChange={handlePageChange}
              showSizeChanger={false}
              align="center"
            />
          </div>
        )}
      </div>
    </section>
  );
};

/* ---------------- Small Components ---------------- */

const Section = ({ title, children }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold  text-gray-700 headerFont">{title}</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4  gap-6">
      {children}
    </div>
  </div>
);

const FilterPill = ({ label, options, selected, onSelect }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* Pill */}
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center gap-6 bg-white rounded-full shadow cursor-pointer transition-all hover:shadow-md"
      >
        <p
          className="px-4 py-3 text-white text-sm rounded-l-full headerFont min-w-[80px] text-center"
          style={{
            background: "linear-gradient(90deg, #213C2D 0%, #98D8C8 100%)",
          }}
        >
          {label}
        </p>

        <span className="flex items-center gap-2 pr-6 text-gray-600 text-lg font-medium">
          {selected}
          <IoMdArrowDropdown
            size={18}
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        </span>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute normalFont z-50 mt-2 w-full bg-white rounded-2xl shadow-xl py-2 animate-in fade-in slide-in-from-top-2 duration-200">
          {options.map((item) => (
            <button
              key={item}
              onClick={() => {
                onSelect(item);
                setOpen(false);
              }}
              className={`w-full text-center py-3 text-sm font-semibold transition
                ${
                  selected === item
                    ? "text-[#213C2D] bg-teal-50"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const StoryCard = ({ title, author, grade, pages, rating, image }) => (
  <Link
    to="/23"
    className="bg-white rounded-2xl shadow p-4 space-y-3 hover:shadow-lg transition"
  >
    <img
      src={image}
      alt={title}
      className="w-full h-[330px] object-cover rounded-xl"
    />

    <h4 className="font-semibold text-gray-800 text-xs headerFont">{title}</h4>

    <div className="flex justify-between">
      <p className="text-xs text-gray-500 normalFont">by {author}</p>
      <RatingStars rating={rating} />
    </div>

    <div className="flex items-center justify-between text-gray-500 headerFont">
      <span
        className="px-3 py-2 text-[10px] rounded-full"
        style={{
          background: "linear-gradient(180deg, #FFE87C 0%, #FFDAB9 100%)",
        }}
      >
        {grade}
      </span>
      <span className="text-[10px] headerFont">📖 {pages} Pages</span>
    </div>
  </Link>
);

const RatingStars = ({ rating }) => (
  <div className="flex gap-1 text-yellow-400 text-xl">
    {[1, 2, 3, 4, 5].map((i) => (
      <span key={i}>{i <= rating ? "★" : "☆"}</span>
    ))}
  </div>
);

export default LibraryLists;
