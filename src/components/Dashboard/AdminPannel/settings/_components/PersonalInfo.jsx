import React from "react";

const PersonalInfo = ({ data, isEditing, onChange, isLoading }) => {
  if (isLoading)
    return (
      <div className="p-10 text-center">Loading platform information...</div>
    );

  return (
    <div className="max-w-8xl bg-white rounded-2xl border border-gray-200 p-9">
      {/* Title */}
      <h2 className="text-sm font-medium text-gray-900 mb-6 headerFont">
        Platform Information
      </h2>

      {/* Form */}
      <div className="space-y-6">
        {/* Platform Name */}
        <div>
          <label className="block text-[10px] font-medium text-gray-700 mb-1 headerFont">
            Platform Name
          </label>
          <input
            type="text"
            name="platform_name"
            value={data.platform_name}
            onChange={onChange}
            readOnly={!isEditing}
            className={`w-full rounded-md px-4 py-4 text-gray-900 text-sm outline-none normalFont transition-all ${
              isEditing ? "bg-white border border-green-200" : "bg-gray-100"
            }`}
          />
        </div>

        {/* Contact Email */}
        <div>
          <label className="block text-[10px] font-medium text-gray-700 mb-1 headerFont">
            Contact Email
          </label>
          <input
            type="email"
            name="contact_email"
            value={data.contact_email}
            onChange={onChange}
            readOnly={!isEditing}
            className={`w-full rounded-md px-4 py-4 text-gray-900 text-sm outline-none normalFont transition-all ${
              isEditing ? "bg-white border border-green-200" : "bg-gray-100"
            }`}
          />
        </div>

        {/* Support Email */}
        <div>
          <label className="block text-[10px] font-medium text-gray-700 mb-1 headerFont">
            Support Email
          </label>
          <input
            type="email"
            name="support_email"
            value={data.support_email}
            onChange={onChange}
            readOnly={!isEditing}
            className={`w-full rounded-md px-4 py-4 text-gray-900 text-sm outline-none normalFont transition-all ${
              isEditing ? "bg-white border border-green-200" : "bg-gray-100"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
