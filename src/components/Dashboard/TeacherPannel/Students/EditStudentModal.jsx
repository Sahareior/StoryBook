import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { FiUsers } from "react-icons/fi";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { useUpdateStudentMutation } from "../../../../redux/api/authApi";

export default function EditStudentModal({ isOpen, onClose, userData }) {
  const [showPassword, setShowPassword] = useState(false);
  const [updateStudent, { isLoading }] = useUpdateStudentMutation();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    grade_level: 3,
    vocabulary_proficiency: "",
  });

  // Populate form with userData when modal opens
  useEffect(() => {
    if (userData && isOpen) {
      setFormData({
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
        email: userData.email || "",
        password: "", // Usually we don't pre-fill password for security
        grade_level: userData.grade_level || 3,
        vocabulary_proficiency: userData.vocabulary_proficiency
          ? userData.vocabulary_proficiency.charAt(0).toUpperCase() +
            userData.vocabulary_proficiency.slice(1).toLowerCase()
          : "",
      });
    }
  }, [userData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGradeSelect = (grade) => {
    setFormData((prev) => ({ ...prev, grade_level: grade }));
  };

  const handleEditStudent = async (e) => {
    e.preventDefault();

    if (
      !formData.vocabulary_proficiency ||
      formData.vocabulary_proficiency === "Select"
    ) {
      toast.error("Please select a vocabulary level");
      return;
    }

    try {
      const response = await updateStudent({
        id: userData.id,
        ...formData,
        vocabulary_proficiency: formData.vocabulary_proficiency.toLowerCase(),
      }).unwrap();

      toast.success(response.message || "Student profile updated successfully");
      onClose();
    } catch (err) {
      toast.error(
        err?.data?.error || err?.data?.message || "Failed to update student",
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative w-full max-w-6xl p-6 bg-white shadow-lg rounded-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 text-white rounded-full green">
              <FiUsers />
            </div>
            <h2 className="text-lg font-medium text-[#1F1F1F] headerFont">
              Update Student Info
            </h2>
          </div>

          <button onClick={onClose}>
            <X className="text-gray-500 hover:text-red-500" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleEditStudent} className="p-6 border rounded-xl">
          {/* Top Row: Grade & Vocabulary */}
          <div className="grid items-end grid-cols-5 gap-4 mb-9">
            <div className="col-span-2">
              <label className="block mb-2 text-xs text-[#364153] font-medium headerFont">
                Select Your Grade
              </label>
              <div className="flex gap-3 normalFont">
                {[3, 4, 5].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => handleGradeSelect(g)}
                    className={`px-8 py-2 border rounded-lg transition-colors ${
                      formData.grade_level === g
                        ? "bg-[#1F3A2B] text-white"
                        : "bg-[#F3F4F6] hover:bg-gray-200"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
            <div className="">
              <label className="block mb-2 text-xs text-[#364153] font-medium headerFont">
                Vocabulary Level
              </label>
              <select
                name="vocabulary_proficiency"
                value={formData.vocabulary_proficiency}
                onChange={handleChange}
                className="w-48 px-3 py-2 border rounded-lg border-[#E5E7EB] normalFont focus:outline-none focus:ring-1 focus:ring-green-500"
              >
                <option value="">Select</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-xs text-[#0A0A0A] font-semibold headerFont">
                First Name:
              </label>
              <input
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg normalFont focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="First Name"
              />
            </div>

            <div>
              <label className="block mb-1 text-xs text-[#0A0A0A] font-semibold headerFont">
                Last Name:
              </label>
              <input
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg normalFont focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="Last Name"
              />
            </div>
          </div>

          {/* Bottom Row: Inputs */}
          <div className="w-full grid items-end grid-cols-5 gap-4">
            <div className="col-span-2">
              <label className="block mb-1 text-xs text-[#0A0A0A] font-semibold headerFont">
                Students Mail:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg normalFont focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="student@gmail.com"
              />
            </div>

            <div className="col-span-2 relative">
              <label className="block mb-1 text-xs text-[#0A0A0A] font-semibold headerFont">
                Password:
              </label>

              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 pr-10 border rounded-lg normalFont focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="Leave blank to keep current"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute text-gray-400 -translate-y-1/2 right-3 top-[67%]"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-white bg-gradient-to-r from-[#2B4839] to-[#92D1C1] rounded-lg hover:opacity-90 disabled:opacity-50 normalFont transition-all"
            >
              {isLoading ? "Updating..." : "Update Students"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
