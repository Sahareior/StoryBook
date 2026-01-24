import { Eye, Pencil, Trash2 } from "lucide-react";
import EditUserModal from "./EditUserModal";
import { useState, useMemo, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useGetSiteAdminTeachersOverviewQuery } from "../../../../redux/api/authApi";

export default function TeachersTable({
  searchQuery = "",
  selectedGrade = "all",
}) {
  const {
    data: apiTeachers,
    isLoading,
    error,
  } = useGetSiteAdminTeachersOverviewQuery();
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const tableData = useMemo(() => {
    return apiTeachers
      ? apiTeachers.map((teacher) => {
          const name =
            teacher.first_name || teacher.last_name
              ? `${teacher.first_name} ${teacher.last_name}`.trim()
              : teacher.email.split("@")[0];

          return {
            id: teacher.id,
            name: name,
            avatar: name.charAt(0).toUpperCase(),
            email: teacher.email,
            totalStudent: 0,
            lastActivity: "-",
            grade: teacher.grade_level,
            status: "Active",
          };
        })
      : [];
  }, [apiTeachers]);

  const filteredData = useMemo(() => {
    return tableData.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesGrade =
        selectedGrade === "all" || item.grade.toString() === selectedGrade;
      return matchesSearch && matchesGrade;
    });
  }, [tableData, searchQuery, selectedGrade]);

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

  const handleDelete = (id) => {
    toast.error(
      `Delete functionality for ID ${id} not integrated with API yet.`,
    );
  };

  if (isLoading)
    return <div className="p-10 text-center">Loading teachers...</div>;
  if (error)
    return (
      <div className="p-10 text-center text-red-500">
        Error loading teachers
      </div>
    );

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto bg-white rounded-xl border border-[#0000001A]">
        <table className="w-full text-sm">
          <thead className="border-b bg-gray-50 text-gray-600 headerFont text-xs">
            <tr className="text-center">
              <th className="px-6 py-4 font-medium text-left align-middle">
                Name
              </th>
              <th className="px-6 py-4 font-medium text-center align-middle">
                Total student
              </th>
              <th className="px-6 py-4 font-medium text-center align-middle">
                Last Activity
              </th>
              <th className="px-6 py-4 font-medium text-center align-middle">
                Grade
              </th>
              <th className="px-6 py-4 font-medium text-center align-middle">
                Status
              </th>
              <th className="px-6 py-4 font-medium text-center align-middle">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y normalFont">
            {paginatedData.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50 text-center align-middle"
              >
                {/* Name */}
                <td className="px-6 py-4 flex items-center gap-3 justify-start align-middle">
                  <div className="w-9 h-9 rounded-full bg-green-900 text-white flex items-center justify-center font-semibold">
                    {item.avatar}
                  </div>
                  <span className="font-medium">{item.name}</span>
                </td>

                {/* Total student */}
                <td className="px-6 py-4 align-middle">{item.totalStudent}</td>

                {/* Last activity */}
                <td className="px-6 py-4 text-gray-500 align-middle">
                  {item.lastActivity}
                </td>

                {/* Grade */}
                <td className="px-6 py-4 font-semibold text-green-600 align-middle">
                  {item.grade}
                </td>

                {/* Status */}
                <td className="px-6 py-4 align-middle">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    {item.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 flex items-center gap-4 justify-center align-middle">
                  <Eye
                    size={16}
                    onClick={() =>
                      navigate(`/dashboard/user-details/${item.id}`)
                    }
                    className="cursor-pointer text-gray-600 hover:text-black transition-colors"
                  />
                  <Pencil
                    size={16}
                    onClick={() => {
                      setSelectedUser(item);
                      setOpen(true);
                    }}
                    className="cursor-pointer text-gray-600 hover:text-black transition-colors"
                  />
                  <Trash2
                    size={16}
                    onClick={() => handleDelete(item.id)}
                    className="cursor-pointer text-red-500 hover:text-red-700 transition-colors"
                  />
                </td>
              </tr>
            ))}
            {paginatedData.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-10 text-center text-gray-500"
                >
                  No teachers found
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
