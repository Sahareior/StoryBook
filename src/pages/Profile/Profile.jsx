import React from "react";
import {
  IoArrowBack,
  IoCameraOutline,
  IoLogOutOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router";
import { useGetStudentProfileQuery } from "../../redux/api/authApi";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/authSlice";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: profile, isLoading, isError } = useGetStudentProfileQuery();
  const handleLogout = () => {
    console.log("Student logout triggered");
    dispatch(logout());
    navigate("/login");
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
    <section className="min-h-screen bg-gradient-to-br from-[#F4F6FF] to-white py-12">
      <div className="w-[80vw] mx-auto space-y-10">
        {/* Header */}
        <header className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 bg-white rounded-full shadow"
          >
            <IoArrowBack />
          </button>
          <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2 headerFont">
            👤 My Profile
          </h2>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Avatar Card */}
          <AvatarCard profile={profile} />

          {/* Right: Personal Info */}
          <PersonalInfo profile={profile} />
        </div>

        {/* Reading Preferences */}
        <ReadingPreferences profile={profile} />

        {/* Actions */}
        <div className="flex gap-6">
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
            subtitle="See you next time!"
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

      <div className="relative mx-auto w-28 h-28 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-5xl text-white">
        👧
        <button className="absolute bottom-1 right-1 bg-white rounded-full p-1 shadow">
          <IoCameraOutline size={16} className="text-gray-600" />
        </button>
      </div>

      <div>
        <p className="text-lg text-[#1E2939] font-semibold headerFont">
          {name}
        </p>
        <p className="normalFont">Grade {profile.grade_level}</p>
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

const PersonalInfo = ({ profile }) => (
  <div className="lg:col-span-2 bg-white rounded-2xl shadow border border-cyan-200 p-6 space-y-6">
    <h3 className="font-semibold text-lg text-gray-800 flex items-center gap-2 headerFont">
      👤 Personal Information
    </h3>

    <Input label="Username" value={profile.username?.split("@")[0] || ""} />
    <Input label="Email" value={profile.email || ""} />

    <button
      className="w-full py-3 rounded-full text-white font-medium shadow headerFont"
      style={{
        background: "linear-gradient(90deg, #213C2D 0%, #98D8C8 100%)",
      }}
    >
      Save Changes
    </button>
  </div>
);

const ReadingPreferences = ({ profile }) => (
  <div className="bg-white rounded-2xl shadow border border-yellow-200 p-6 space-y-4">
    <h3 className="font-semibold text-gray-800 text-lg flex items-center gap-2 headerFont">
      🌟 Reading Preferences
    </h3>

    <PreferenceItem
      title="Books Read"
      subtitle={`Current: ${profile.total_books_read}`}
      bg="bg-yellow-50"
    />
    <PreferenceItem
      title="Words Learned"
      subtitle={`Total: ${profile.words_learned}`}
      bg="bg-blue-50"
    />
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
    className={`flex-1 bg-white rounded-2xl p-6 shadow border ${borderColor} cursor-pointer hover:scale-[1.02] transition`}
  >
    <div className={`text-xl mb-2 ${textColor}`}>{icon}</div>
    <p className={`font-semibold headerFont ${textColor}`}>{title}</p>
    <p className="text-sm text-gray-500 normalFont">{subtitle}</p>
  </div>
);

/* ---------------- Small UI ---------------- */

const Input = ({ label, value }) => (
  <div className="space-y-1">
    <label className="text-[10px] text-black font-semibold headerFont">
      {label}
    </label>
    <input
      defaultValue={value}
      className="w-full rounded-lg border border-gray-200 px-4 py-2 outline-none focus:ring-2 focus:ring-cyan-200 normalFont"
    />
  </div>
);

const StatMini = ({ value, label, highlight, textColor }) => (
  <div
    style={{
      background: highlight,
    }}
    className={`px-7 py-2 rounded-xl text-center shadow-sm`}
  >
    <p
      style={{
        color: textColor,
      }}
      className="text-lg font-semibold headerFont capitalize"
    >
      {value}
    </p>
    <p className="text-[12px] mt-2 normalFont">{label}</p>
  </div>
);

const PreferenceItem = ({ title, subtitle, bg }) => (
  <div className={`rounded-xl p-4 ${bg}`}>
    <p className="text-[14px] font-semibold text-gray-800 headerFont">
      {title}
    </p>
    <p className="text-[14px] text-gray-600 normalFont">{subtitle}</p>
  </div>
);

export default Profile;
