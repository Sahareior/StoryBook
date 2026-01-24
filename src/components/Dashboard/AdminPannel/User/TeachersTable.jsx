import { Eye, Pencil, Trash2 } from "lucide-react";
import EditUserModal from "./EditUserModal";
import { useState } from "react";
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
  const navigate = useNavigate();

  const tableData = apiTeachers
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

  const filteredData = tableData.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesGrade =
      selectedGrade === "all" || item.grade.toString() === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  const handleDelete = (id) => {
    toast.error(
      `Delete functionality for ID ${id} not integrated with API yet.`,
    );
  };

  return (
    <div className="overflow-x-auto bg-white rounded-xl border">
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
          {isLoading && (
            <tr>
              <td colSpan={6} className="px-6 py-10 text-center">
                Loading teachers...
              </td>
            </tr>
          )}
          {error && (
            <tr>
              <td colSpan={6} className="px-6 py-10 text-center text-red-500">
                Error loading teachers
              </td>
            </tr>
          )}
          {!isLoading && !error && filteredData.length === 0 && (
            <tr>
              <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                No teachers found
              </td>
            </tr>
          )}
          {!isLoading &&
            !error &&
            filteredData.length > 0 &&
            filteredData.map((item) => (
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
                    className="cursor-pointer text-gray-600 hover:text-black"
                  />
                  <Pencil
                    size={16}
                    onClick={() => {
                      setSelectedUser(item);
                      setOpen(true);
                    }}
                    className="cursor-pointer text-gray-600 hover:text-black"
                  />
                  <Trash2
                    size={16}
                    onClick={() => handleDelete(item.id)}
                    className="cursor-pointer text-red-500 hover:text-red-700"
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <EditUserModal
        isOpen={open}
        onClose={() => setOpen(false)}
        userData={selectedUser}
      />
    </div>
  );
}
