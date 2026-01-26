import React, { useState, useEffect } from "react";
import {
  IoArrowBack,
  IoCameraOutline,
  IoLogOutOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router";
import {
  useGetStudentProfileQuery,
  useUpdateStudentProfileMutation,
} from "../../redux/api/authApi";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/authSlice";
import { toast } from "react-hot-toast";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: profile, isLoading, isError } = useGetStudentProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] =
    useUpdateStudentProfileMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    grade_level: "",
    vocabulary_proficiency: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        username: profile.username?.split("@")[0] || "",
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        grade_level: profile.grade_level || "",
        vocabulary_proficiency: profile.vocabulary_proficiency || "",
      });
    }
  }, [profile]);

  const handleLogout = () => {
    console.log("Student logout triggered");
    dispatch(logout());
    navigate("/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const payload = {
        username: formData.username,
        first_name: formData.first_name,
        last_name: formData.last_name,
        grade_level: parseInt(formData.grade_level) || 0,
        vocabulary_proficiency: formData.vocabulary_proficiency,
      };
      await updateProfile(payload).unwrap();
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-['Nunito']">
        <p className="text-xl text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center font-['Nunito']">
        <p className="text-xl text-red-500">
          Failed to load profile. Please try again.
        </p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#F4F6FF] to-white py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <header className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 bg-white rounded-full shadow hover:bg-gray-50 transition-colors"
          >
            <IoArrowBack />
          </button>
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 headerFont">
            👤 My Profile
          </h2>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Avatar Card */}
          <AvatarCard profile={profile} />

          {/* Right: Personal Info */}
          <PersonalInfo
            profile={profile}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            formData={formData}
            handleChange={handleChange}
            handleSave={handleSave}
            isUpdating={isUpdating}
          />
        </div>

        {/* Reading Preferences */}
        <ReadingPreferences profile={profile} />

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-6">
          <ActionCard
            icon={<IoLogOutOutline />}
            title="Log Out"
            subtitle="See you next time!"
            borderColor="border-red-300"
            textColor="text-red-500"
            onClick={handleLogout}
          />
          <ActionCard
            icon={<IoTrashOutline />}
            title="Delete Account"
            subtitle="Understand your data will be gone."
            borderColor="border-red-400"
            textColor="text-red-600"
          />
        </div>
      </div>
    </section>
  );
};

/* ---------------- Components ---------------- */

const AvatarCard = ({ profile }) => {
  const name =
    profile.first_name || profile.last_name
      ? `${profile.first_name} ${profile.last_name}`.trim()
      : profile.username?.split("@")[0] || "Student";

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 text-center space-y-4">
      <h3 className="text-xs font-semibold text-gray-600 headerFont">
        Your Avatar
      </h3>

      <div className="relative mx-auto w-28 h-28 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-5xl text-white shadow-inner">
        👧
        <button className="absolute bottom-1 right-1 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors border border-gray-100">
          <IoCameraOutline size={16} className="text-gray-600" />
        </button>
      </div>

      <div>
        <p className="text-lg text-[#1E2939] font-semibold headerFont">
          {name}
        </p>
        <p className="normalFont text-gray-500">Grade {profile.grade_level}</p>
      </div>

      <div className="flex gap-4 justify-center">
        <StatMini
          value={profile.vocabulary_proficiency || "Beginner"}
          textColor={"#FFD700"}
          label="Vocabulary Proficiency"
          highlight="linear-gradient(180deg, #E6F3FF 0%, #F0F8FF 100%)"
        />
      </div>
    </div>
  );
};

const PersonalInfo = ({
  profile,
  isEditing,
  setIsEditing,
  formData,
  handleChange,
  handleSave,
  isUpdating,
}) => (
  <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-cyan-100 p-8 space-y-6">
    <div className="flex justify-between items-center">
      <h3 className="font-semibold text-xl text-gray-800 flex items-center gap-2 headerFont">
        👤 Personal Information
      </h3>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Input
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        readOnly={!isEditing}
      />
      <Input
        label="Email"
        name="email"
        value={profile.email || ""}
        readOnly={true}
      />

      {isEditing && (
        <>
          <Input
            label="First Name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            readOnly={!isEditing}
          />
          <Input
            label="Last Name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            readOnly={!isEditing}
          />
          <Input
            label="Grade Level"
            name="grade_level"
            value={formData.grade_level}
            onChange={handleChange}
            readOnly={!isEditing}
          />
          <Input
            label="Vocabulary Proficiency"
            name="vocabulary_proficiency"
            value={formData.vocabulary_proficiency}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        </>
      )}
    </div>

    <div className="pt-4">
      {isEditing ? (
        <div className="flex gap-4">
          <button
            onClick={() => setIsEditing(false)}
            className="flex-1 py-3 rounded-full border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors headerFont"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isUpdating}
            className="flex-1 py-3 rounded-full text-white font-medium shadow-md hover:opacity-90 transition-all headerFont disabled:opacity-50"
            style={{
              background: "linear-gradient(90deg, #213C2D 0%, #98D8C8 100%)",
            }}
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="w-full py-3 rounded-full text-white font-medium shadow-md hover:opacity-90 transition-all headerFont"
          style={{
            background: "linear-gradient(90deg, #213C2D 0%, #98D8C8 100%)",
          }}
        >
          Edit Profile
        </button>
      )}
    </div>
  </div>
);

const ReadingPreferences = ({ profile }) => (
  <div className="bg-white rounded-2xl shadow-lg border border-yellow-100 p-8 space-y-6">
    <h3 className="font-semibold text-gray-800 text-xl flex items-center gap-2 headerFont">
      🌟 Reading Preferences
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <PreferenceItem
        title="Books Read"
        subtitle={`Current: ${profile.total_books_read || 0}`}
        bg="bg-yellow-50"
      />
      <PreferenceItem
        title="Words Learned"
        subtitle={`Total: ${profile.words_learned || 0}`}
        bg="bg-blue-50"
      />
    </div>
  </div>
);

const ActionCard = ({
  icon,
  title,
  subtitle,
  borderColor,
  textColor,
  onClick,
}) => (
  <div
    onClick={onClick}
    className={`flex-1 bg-white rounded-2xl p-6 shadow-md border ${borderColor} cursor-pointer hover:shadow-lg transition-all transform hover:-translate-y-1`}
  >
    <div className={`text-2xl mb-3 ${textColor}`}>{icon}</div>
    <p className={`font-semibold text-lg headerFont ${textColor}`}>{title}</p>
    <p className="text-sm text-gray-500 normalFont">{subtitle}</p>
  </div>
);

/* ---------------- Small UI ---------------- */

const Input = ({ label, value, readOnly, name, onChange }) => (
  <div className="space-y-1.5">
    <label className="text-xs text-gray-600 font-bold uppercase tracking-wider headerFont pl-1">
      {label}
    </label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      className={`w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all normalFont ${
        readOnly
          ? "bg-gray-50 text-gray-500 cursor-not-allowed border-transparent"
          : "bg-white text-gray-800 focus:ring-2 focus:ring-[#98D8C8] focus:border-transparent border-gray-200 shadow-sm"
      }`}
    />
  </div>
);

const StatMini = ({ value, label, highlight, textColor }) => (
  <div
    style={{
      background: highlight,
    }}
    className={`px-8 py-4 rounded-2xl text-center shadow-sm border border-white/50`}
  >
    <p
      style={{
        color: textColor,
      }}
      className="text-xl font-bold headerFont capitalize"
    >
      {value}
    </p>
    <p className="text-[12px] mt-1.5 font-medium text-gray-500 normalFont">
      {label}
    </p>
  </div>
);

const PreferenceItem = ({ title, subtitle, bg }) => (
  <div className={`rounded-2xl p-6 ${bg} shadow-sm border border-white/50`}>
    <p className="text-base font-bold text-gray-800 headerFont mb-1">{title}</p>
    <p className="text-sm text-gray-600 font-medium normalFont">{subtitle}</p>
  </div>
);

export default Profile;
