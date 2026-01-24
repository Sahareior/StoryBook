import { UserPlus } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  useAddSiteAdminStudentMutation,
  useAddSiteAdminTeacherMutation,
} from "../../../../redux/api/authApi";

export default function AddUserModal({ isOpen, onClose }) {
  const [userType, setUserType] = useState("student");
  const [addStudent, { isLoading: isAddingStudent }] =
    useAddSiteAdminStudentMutation();
  const [addTeacher, { isLoading: isAddingTeacher }] =
    useAddSiteAdminTeacherMutation();

  const isAnyLoading = isAddingStudent || isAddingTeacher;

  const [studentData, setStudentData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    grade_level: "",
    vocabulary_proficiency: "beginner",
  });

  const [teacherData, setTeacherData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    grade_level: "",
  });

  if (!isOpen) return null;

  const handleInputChange = (type, field, value) => {
    if (type === "student") {
      setStudentData((prev) => ({ ...prev, [field]: value }));
    } else {
      setTeacherData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSave = async () => {
    if (userType === "student") {
      try {
        const payload = {
          ...studentData,
          grade_level: parseInt(studentData.grade_level) || 0,
        };
        const res = await addStudent(payload).unwrap();
        toast.success(res.message || "Student added and email sent");
        onClose();
        // Reset state
        setStudentData({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          grade_level: "",
          vocabulary_proficiency: "beginner",
        });
      } catch (err) {
        toast.error(err?.data?.message || "Failed to add student");
      }
    } else {
      try {
        const payload = {
          ...teacherData,
          grade_level: parseInt(teacherData.grade_level) || 0,
        };
        const res = await addTeacher(payload).unwrap();
        toast.success(res.message || "Teacher added and email sent");
        onClose();
        // Reset state
        setTeacherData({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          grade_level: "",
        });
      } catch (err) {
        toast.error(err?.data?.message || "Failed to add teacher");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 px-3 pt-3 bg-yellow-400/10 rounded-[10px] inline-flex flex-col justify-start items-start">
              <UserPlus color="#1F3A2B" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Add New User</h2>
              <p className="text-sm text-gray-500">
                Create a new student or teacher account
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 text-xl">
            ✕
          </button>
        </div>

        {/* User Type */}
        <div className="mb-6">
          <p className="text-sm font-medium mb-2">User Type</p>

          <div className="flex gap-4">
            <TypeCard
              label="Student"
              active={userType === "student"}
              onClick={() => setUserType("student")}
            />
            <TypeCard
              label="Teacher"
              active={userType === "teacher"}
              onClick={() => setUserType("teacher")}
            />
          </div>
        </div>

        {/* Form */}
        {userType === "student" ? (
          <StudentForm
            data={studentData}
            onChange={(f, v) => handleInputChange("student", f, v)}
          />
        ) : (
          <TeacherForm
            data={teacherData}
            onChange={(f, v) => handleInputChange("teacher", f, v)}
          />
        )}

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            disabled={isAnyLoading}
            className="px-4 py-2 border border-zinc-800 rounded-[10px] text-zinc-800 text-base font-normal disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={isAnyLoading}
            className="px-4 py-2 bg-gradient-to-r from-[#2B4839] to-[#95D3C3] text-white rounded-[10px] text-base font-normal disabled:opacity-50"
          >
            {isAnyLoading
              ? "Thinking..."
              : userType === "student"
                ? "Add Student"
                : "Add Teacher"}
          </button>
        </div>
      </div>
    </div>
  );
}

function TypeCard({ label, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex-1 cursor-pointer border rounded-lg p-4 text-center
        ${active ? "border-[#1F3A2B] bg-[#1F3A2B]/5" : "border-gray-200"}
      `}
    >
      <div className="text-2xl mb-1">{label === "Student" ? "🧒" : "👩‍🏫"}</div>
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
}

function StudentForm({ data, onChange }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="First Name"
          value={data.first_name}
          onChange={(e) => onChange("first_name", e.target.value)}
          placeholder="Enter first name"
        />
        <Input
          label="Last Name"
          value={data.last_name}
          onChange={(e) => onChange("last_name", e.target.value)}
          placeholder="Enter last name"
        />
      </div>
      <Input
        label="Email"
        type="email"
        value={data.email}
        onChange={(e) => onChange("email", e.target.value)}
        placeholder="Enter email address"
      />
      <Input
        label="Password"
        type="password"
        value={data.password}
        onChange={(e) => onChange("password", e.target.value)}
        placeholder="Create password"
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Grade Level"
          value={data.grade_level}
          onChange={(e) => onChange("grade_level", e.target.value)}
          placeholder="e.g. 4"
        />
        <div>
          <label className="block text-sm font-medium mb-1">
            Vocabulary Proficiency *
          </label>
          <select
            value={data.vocabulary_proficiency}
            onChange={(e) => onChange("vocabulary_proficiency", e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function TeacherForm({ data, onChange }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="First Name"
          value={data.first_name}
          onChange={(e) => onChange("first_name", e.target.value)}
          placeholder="Enter first name"
        />
        <Input
          label="Last Name"
          value={data.last_name}
          onChange={(e) => onChange("last_name", e.target.value)}
          placeholder="Enter last name"
        />
      </div>
      <Input
        label="Email"
        type="email"
        value={data.email}
        onChange={(e) => onChange("email", e.target.value)}
        placeholder="Enter email address"
      />
      <Input
        label="Password"
        type="password"
        value={data.password}
        onChange={(e) => onChange("password", e.target.value)}
        placeholder="Create password"
      />
      <Input
        label="Grade Level"
        value={data.grade_level}
        onChange={(e) => onChange("grade_level", e.target.value)}
        placeholder="e.g. 5"
      />
    </div>
  );
}

function Input({ label, type = "text", value, onChange, placeholder = "" }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label} *</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
      />
    </div>
  );
}
