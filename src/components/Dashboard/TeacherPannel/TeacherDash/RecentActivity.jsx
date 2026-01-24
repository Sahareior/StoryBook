import React, { useState } from "react";

const ActivityRow = ({
  student_name,
  student_username,
  action_type,
  description,
  time_ago,
}) => {
  const displayName = student_name || student_username || "Unknown";
  const firstLetter = displayName.charAt(0).toUpperCase();

  // Helper to color action types
  const getActionColor = (type) => {
    switch (type) {
      case "STORY_CREATE":
        return "text-emerald-600 bg-emerald-50";
      case "STORY_UPDATE":
        return "text-blue-600 bg-blue-50";
      case "READ_COMPLETE":
        return "text-purple-600 bg-purple-50";
      case "READ_START":
        return "text-amber-600 bg-amber-50";
      case "VOCAB_SEARCH":
        return "text-rose-600 bg-rose-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-[#F8F8F8] border border-[#EBEBEB] transition-all hover:shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 font-bold text-white bg-[#1F3A2B] rounded-full">
          {firstLetter}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold">{displayName}</p>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-medium normalFont ${getActionColor(action_type)}`}
            >
              {action_type ? action_type.replace("_", " ") : "Activity"}
            </span>
          </div>
          <p className="text-sm text-gray-500 normalFont mt-0.5 line-clamp-1">
            {description}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xs text-gray-400 normalFont">{time_ago}</p>
      </div>
    </div>
  );
};

export default function RecentActivity({ activity }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(activity.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = activity.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="mt-8 p-6 bg-white border border-[#0000001A] rounded-xl shadow-sm">
      <h2 className="mb-6 text-base font-bold text-[#1F3A2B] headerFont">
        Recent Student Activity
      </h2>

      <div className="space-y-4">
        {currentItems.length > 0 ? (
          currentItems.map((item, idx) => (
            <ActivityRow key={item.timestamp || idx} {...item} />
          ))
        ) : (
          <p className="text-center text-gray-500 py-4 normalFont">
            No recent activity found.
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400 normalFont">
            Showing {startIndex + 1}-
            {Math.min(startIndex + itemsPerPage, activity.length)} of{" "}
            {activity.length}
          </p>
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-4 py-1.5 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg disabled:opacity-30 transition-colors hover:bg-gray-100"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-1.5 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg disabled:opacity-30 transition-colors hover:bg-gray-100"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
