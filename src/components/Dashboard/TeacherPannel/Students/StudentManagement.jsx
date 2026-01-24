import React, { useState, useMemo, useEffect } from "react";
import { Check, Trash, X } from "lucide-react";
import { FiUserPlus } from "react-icons/fi";
import { LuEye } from "react-icons/lu";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { useNavigate } from "react-router";
import AddStudentModal from "./AddStudentModal";
import EditStudentModal from "./EditStudentModal";
import { useGetAllStudentsListQuery } from "../../../../redux/api/authApi";

export default function StudentManagementTable() {
  const {
    data: apiStudents = [],
    isLoading,
    error,
  } = useGetAllStudentsListQuery();
  const [search, setSearch] = useState("");
  const [grade, setGrade] = useState("All Grades");
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const navigate = useNavigate();

  const itemsPerPage = 10;

  const handleView = (id) => {
    console.log("Viewing student:", id);
    navigate(`/dashboard/students/details/${id}`);
  };

  const handleEdit = (user) => {
    console.log("Editing student:", user);
    setOpenEdit(true);
  };

  // Get unique grades from the data and sort them
  const uniqueGrades = useMemo(() => {
    const grades = Array.from(new Set(apiStudents.map((s) => s.grade_level)));
    return grades.filter((g) => g !== undefined).sort((a, b) => a - b);
  }, [apiStudents]);

  const filteredStudents = useMemo(() => {
    return apiStudents
      .filter((s) => {
        const fullName =
          `${s.first_name || ""} ${s.last_name || ""}`.trim() || s.email;
        const matchName = fullName.toLowerCase().includes(search.toLowerCase());
        const matchGrade =
          grade === "All Grades" || s.grade_level === Number(grade);
        return matchName && matchGrade;
      })
      .sort((a, b) => a.grade_level - b.grade_level);
  }, [apiStudents, search, grade]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStudents = filteredStudents.slice(
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
  }, [search, grade]);

  if (isLoading)
    return <div className="p-10 text-center">Loading students...</div>;
  if (error)
    return (
      <div className="p-10 text-center text-red-500">
        Error loading students list
      </div>
    );

  return (
    <div className="mt-5 bg-white ">
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4 w-full">
        <input
          type="text"
          placeholder="Search students..."
          className="w-2/3 px-3 py-2 text-sm border rounded-lg bg-[#F3F3F5] normalFont"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="px-3 py-2 text-sm border rounded-lg bg-[#F3F3F5] normalFont"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        >
          <option>All Grades</option>
          {uniqueGrades.map((g) => (
            <option key={g} value={g}>
              Grade {g}
            </option>
          ))}
        </select>

        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 ml-auto text-xs font-medium bg-[#E8CC13] rounded-lg flex items-center gap-2 text-green headerFont"
        >
          <FiUserPlus /> Add Students
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-[#0000001A] rounded-xl">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-[#272727] font-normal bg-white headerFont text-xs">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3">Grade</th>
              <th className="p-3">Vocabulary</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedStudents.map((s) => {
              const fullName =
                `${s.first_name || ""} ${s.last_name || ""}`.trim();
              const displayName = fullName || s.email.split("@")[0];
              const avatarLetter = (fullName ? fullName : s.email)
                .charAt(0)
                .toUpperCase();

              return (
                <tr key={s.id} className="border-t hover:bg-gray-50 normalFont">
                  <td className="flex items-center gap-2 p-3">
                    <div className="flex items-center justify-center text-xs text-white bg-[#1F3A2B] rounded-full w-7 h-7">
                      {avatarLetter}
                    </div>
                    {displayName}
                  </td>
                  <td className="p-3 text-left ">{s.email}</td>
                  <td className="p-3 text-center">{s.grade_level}</td>
                  <td className="p-3 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs capitalize ${
                        s.vocabulary_proficiency === "advanced"
                          ? "bg-green-100 text-green"
                          : s.vocabulary_proficiency === "intermediate"
                            ? "bg-[#E8CC1330] text-[#857200]"
                            : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {s.vocabulary_proficiency}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleView(s.id)}
                        className="p-2 rounded hover:bg-green-100 text-[#4A5565] flex items-center justify-center"
                      >
                        <LuEye size={20} />
                      </button>

                      <button
                        onClick={() => handleEdit(s)}
                        className="p-2 rounded hover:bg-green-100 text-[#4A5565] flex items-center justify-center"
                      >
                        <MdOutlineModeEditOutline size={18} />
                      </button>
                      <button className="p-2 rounded hover:bg-red-100 text-red-500 flex items-center justify-center">
                        <Trash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {filteredStudents.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="py-6 text-center text-gray-400 normalFont"
                >
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 px-2 normalFont">
          <p className="text-sm text-gray-500">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, filteredStudents.length)} of{" "}
            {filteredStudents.length} entries
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg disabled:opacity-30 transition-colors hover:bg-gray-50"
            >
              Previous
            </button>
            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
                    currentPage === i + 1
                      ? "bg-[#1F3A2B] text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg disabled:opacity-30 transition-colors hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      <AddStudentModal isOpen={open} onClose={() => setOpen(false)} />
      <EditStudentModal isOpen={openEdit} onClose={() => setOpenEdit(false)} />
    </div>
  );
}
