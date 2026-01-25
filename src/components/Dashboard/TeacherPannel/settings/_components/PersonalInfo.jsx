import React from "react";

const PersonalInfo = ({ data, isEditing, onChange, isLoading }) => {
  if (isLoading)
    return <div className="p-10 text-center">Loading teacher profile...</div>;

  return (
    <div className="max-w-8xl bg-white rounded-2xl border border-gray-200 p-9">
      {/* Title */}
      <h2 className="text-sm font-medium text-gray-900 mb-6 headerFont">
        Personal Information
      </h2>

      {/* Form */}
      <div className="grid grid-cols-2 gap-6">
        {/* First Name */}
        <div>
          <label className="block text-[10px] font-medium text-gray-700 mb-1 headerFont">
            First Name
          </label>
          <input
            type="text"
            name="first_name"
            value={data.first_name || ""}
            onChange={onChange}
            readOnly={!isEditing}
            placeholder="Enter first name"
            className={`w-full rounded-md px-4 py-4 text-gray-900 text-sm outline-none normalFont transition-all ${
              isEditing ? "bg-white border border-green-200" : "bg-gray-100"
            }`}
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-[10px] font-medium text-gray-700 mb-1 headerFont">
            Last Name
          </label>
          <input
            type="text"
            name="last_name"
            value={data.last_name || ""}
            onChange={onChange}
            readOnly={!isEditing}
            placeholder="Enter last name"
            className={`w-full rounded-md px-4 py-4 text-gray-900 text-sm outline-none normalFont transition-all ${
              isEditing ? "bg-white border border-green-200" : "bg-gray-100"
            }`}
          />
        </div>

        {/* Email - Read Only */}
        <div>
          <label className="block text-[10px] font-medium text-gray-700 mb-1 headerFont">
            Email address
          </label>
          <input
            type="email"
            value={data.email || ""}
            readOnly
            className="w-full rounded-md px-4 py-4 text-gray-500 text-sm outline-none normalFont bg-gray-100 border border-gray-200 cursor-not-allowed"
          />
        </div>

        {/* Username - Read Only */}
        <div>
          <label className="block text-[10px] font-medium text-gray-700 mb-1 headerFont">
            Username
          </label>
          <input
            type="text"
            value={data.username ? data.username.split("@")[0] : ""}
            readOnly
            className="w-full rounded-md px-4 py-4 text-gray-500 text-sm outline-none normalFont bg-gray-100 border border-gray-200 cursor-not-allowed"
          />
        </div>

        {/* Grade Level */}
        <div>
          <label className="block text-[10px] font-medium text-gray-700 mb-1 headerFont">
            Grade Level
          </label>
          <input
            type="number"
            name="grade_level"
            value={data.grade_level || ""}
            onChange={onChange}
            readOnly={!isEditing}
            placeholder="e.g. 4"
            className={`w-full rounded-md px-4 py-4 text-gray-900 text-sm outline-none normalFont transition-all ${
              isEditing ? "bg-white border border-green-200" : "bg-gray-100"
            }`}
          />
        </div>

        {/* Bio - Full width */}
        <div className="col-span-2">
          <label className="block text-[10px] font-medium text-gray-700 mb-1 headerFont">
            Bio
          </label>
          <textarea
            name="bio"
            value={data.bio || ""}
            onChange={onChange}
            readOnly={!isEditing}
            placeholder="Tell us about yourself..."
            rows={12}
            className={`w-full rounded-md px-4 py-4 text-gray-900 text-sm outline-none normalFont transition-all resize-none ${
              isEditing ? "bg-white border border-green-200" : "bg-gray-100"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
