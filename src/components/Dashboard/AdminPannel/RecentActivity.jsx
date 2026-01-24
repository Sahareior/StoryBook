import React, { useState } from "react";
import {
  BookOpen,
  Search,
  PlusCircle,
  RotateCcw,
  CheckCircle,
} from "lucide-react";

const ActivityRow = ({ action_type, description, time_ago }) => {
  // Helper to color and icon action types
  const getActionConfig = (type) => {
    switch (type) {
      case "STORY_CREATE":
        return {
          color: "text-emerald-600 bg-emerald-50",
          icon: <PlusCircle size={16} />,
          label: "Story Create",
        };
      case "STORY_UPDATE":
        return {
          color: "text-blue-600 bg-blue-50",
          icon: <RotateCcw size={16} />,
          label: "Story Update",
        };
      case "READ_COMPLETE":
        return {
          color: "text-purple-600 bg-purple-50",
          icon: <CheckCircle size={16} />,
          label: "Read Complete",
        };
      case "READ_START":
        return {
          color: "text-amber-600 bg-amber-50",
          icon: <BookOpen size={16} />,
          label: "Read Start",
        };
      case "VOCAB_SEARCH":
        return {
          color: "text-rose-600 bg-rose-50",
          icon: <Search size={16} />,
          label: "Vocab Search",
        };
      default:
        return {
          color: "text-gray-600 bg-gray-50",
          icon: <BookOpen size={16} />,
          label: action_type?.replace("_", " ") || "Activity",
        };
    }
  };

  const config = getActionConfig(action_type);

  return (
    <div className="flex items-start justify-between p-4 rounded-lg bg-[#F8F8F8] border border-[#EBEBEB] transition-all hover:shadow-sm">
      <div className="flex items-start gap-3">
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full shrink-0 ${config.color}`}
        >
          {config.icon}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-medium normalFont ${config.color}`}
            >
              {config.label}
            </span>
            <p className="text-xs text-gray-400 normalFont">{time_ago}</p>
          </div>
          <p className="text-sm text-gray-700 normalFont mt-1 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function RecentActivity({ activity = [] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Showing more items for admin as rows are smaller
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
    <div className="mt-8 mb-10 p-6 bg-white border border-[#0000001A] rounded-xl shadow-sm">
      <h2 className="mb-6 text-base font-bold text-[#1F3A2B] headerFont">
        Recent Platform Activity
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentItems.length > 0 ? (
          currentItems.map((item, idx) => <ActivityRow key={idx} {...item} />)
        ) : (
          <p className="col-span-full text-center text-gray-500 py-10 normalFont">
            No recent activity found.
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-100">
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
