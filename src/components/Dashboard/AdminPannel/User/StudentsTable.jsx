import { Check, Eye, Pencil, X } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import EditUserModal from "./EditUserModal";
import { useGetSiteAdminStudentsOverviewQuery } from "../../../../redux/api/authApi";

export default function StudentsTable({
  searchQuery = "",
  selectedGrade = "all",
}) {
  const {
    data: apiStudents,
    isLoading,
    error,
  } = useGetSiteAdminStudentsOverviewQuery();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleDecision = (id, value) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, decision: value } : item,
      ),
    );
  };

  useEffect(() => {
    if (!apiStudents) return;
    // Map API response shape to the table row shape
    const mapped = apiStudents.map((s) => {
      const name =
        s.first_name || s.last_name
          ? `${s.first_name} ${s.last_name}`.trim()
          : s.email.split("@")[0];
      const vocab = s.vocabulary_proficiency
        ? s.vocabulary_proficiency.charAt(0).toUpperCase() +
          s.vocabulary_proficiency.slice(1)
        : "-";
      const readingLevel =
        s.vocabulary_proficiency === "advanced"
          ? "5/5"
          : s.vocabulary_proficiency === "intermediate"
            ? "3/5"
            : s.vocabulary_proficiency === "beginner"
              ? "1/5"
              : "-";
      return {
        id: s.id,
        name,
        email: s.email,
        avatar: name.charAt(0).toUpperCase(),
        grade: s.grade_level,
        vocabulary: vocab,
        dictionary: 0,
        story: 0,
        readingLevel,
        decision: null,
      };
    });
    setData(mapped);
  }, [apiStudents]);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesGrade =
        selectedGrade === "all" || item.grade.toString() === selectedGrade;
      return matchesSearch && matchesGrade;
    });
  }, [data, searchQuery, selectedGrade]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Reset to first page when search or grade changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedGrade]);

  if (isLoading)
    return <div className="p-10 text-center">Loading students...</div>;
  if (error)
    return (
      <div className="p-10 text-center text-red-500">
        Error loading students
      </div>
    );

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto border border-[#0000001A] rounded-xl bg-white">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-[#272727] font-normal bg-white headerFont text-xs border-b">
              <th className="p-3 text-left">Name</th>
              <th className="p-3">Grade</th>
              <th className="p-3">Vocabulary</th>
              <th className="p-3">Dictionary</th>
              <th className="p-3">Story</th>
              <th className="p-3">Reading Level</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((item) => (
              <tr
                key={item.id}
                className="border-t hover:bg-gray-50 normalFont"
              >
                <td className="flex items-center gap-2 p-3">
                  <div className="flex items-center justify-center text-xs text-white bg-[#1F3A2B] rounded-full w-7 h-7">
                    {item.name.charAt(0)}
                  </div>
                  {item.name}
                </td>

                <td className="p-3 text-center">{item.grade}</td>

                <td className="p-3 text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      item.vocabulary === "Advanced"
                        ? "bg-green-100 text-green-700"
                        : item.vocabulary === "Intermediate"
                          ? "bg-[#E8CC1330] text-yellow-700"
                          : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {item.vocabulary}
                  </span>
                </td>

                <td className="p-3 text-center text-[#059669]">
                  {item.dictionary}
                </td>

                <td className="p-3 text-center text-[#4A5565]">{item.story}</td>

                <td className="p-3 text-center text-[#4A5565]">
                  {item.readingLevel}
                </td>

                <td className="p-3">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() =>
                        navigate(`/dashboard/students/details/${item.id}`)
                      }
                      className="p-2 rounded hover:bg-green-100 text-[#4A5565] flex items-center justify-center transition-colors"
                    >
                      <Eye size={20} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedUser(item);
                        setOpen(true);
                      }}
                      className="p-2 rounded hover:bg-green-100 text-[#4A5565] flex items-center justify-center transition-colors"
                    >
                      <Pencil size={18} />
                    </button>

                    {/* decision logic */}
                    {item.decision === null && (
                      <div className="flex items-center gap-1 border-l pl-2">
                        <button
                          onClick={() => handleDecision(item.id, "approved")}
                          className="flex items-center justify-center p-2 text-green-600 rounded hover:bg-green-100 transition-colors"
                        >
                          <Check size={18} />
                        </button>
                        <button
                          onClick={() => handleDecision(item.id, "rejected")}
                          className="flex items-center justify-center p-2 text-red-600 rounded hover:bg-red-100 transition-colors"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    )}

                    {item.decision === "approved" && (
                      <span className="px-3 py-1 text-xs text-green-700 bg-green-100 rounded-full">
                        Approved
                      </span>
                    )}

                    {item.decision === "rejected" && (
                      <span className="px-3 py-1 text-xs text-red-700 bg-red-100 rounded-full">
                        Rejected
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {paginatedData.length === 0 && (
              <tr>
                <td colSpan={7} className="py-10 text-center text-gray-400">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-2 py-4 normalFont">
          <p className="text-sm text-gray-500">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, filteredData.length)} of{" "}
            {filteredData.length} entries
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg disabled:opacity-30 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <div className="hidden sm:flex gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all ${
                    currentPage === i + 1
                      ? "bg-[#1F3A2B] text-white shadow-md scale-105"
                      : "text-gray-600 hover:bg-gray-100 bg-white"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg disabled:opacity-30 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}

      <EditUserModal
        isOpen={open}
        onClose={() => setOpen(false)}
        userData={selectedUser}
      />
    </div>
  );
}
