import React, { useState, useEffect } from "react";
import PersonalInfo from "./_components/PersonalInfo";
import Terms from "./_components/Terms";
import Privacy from "./_components/Privacy";
import {
  useGetTeacherProfileQuery,
  useUpdateTeacherProfileMutation,
  useDeleteTeacherProfileMutation,
  useGetTeacherTermsAndConditionsQuery,
  useGetTeacherPrivacyPolicyQuery,
} from "../../../../redux/api/authApi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../../redux/features/authSlice";

const Header = ({
  isEditing,
  onAction,
  onDelete,
  isLoading,
  isDeleting,
  showButton,
}) => {
  return (
    <div className="flex w-[80vw] mx-auto justify-between items-center">
      <div className="">
        <p className="text-[20px] text-[#1F1F1F] font-semibold headerFont">
          Settings
        </p>
        <p className="text-[16px] text-[#4A5565] normalFont">
          Manage your profile and platform preferences
        </p>
      </div>
      {showButton && (
        <div className="flex gap-3">
          <button
            onClick={onAction}
            disabled={isLoading || isDeleting}
            className="px-8 py-2 rounded-2xl text-white font-medium hover:opacity-90 transition-opacity headerFont text-sm flex items-center justify-center min-w-[120px]"
            style={{
              background: "linear-gradient(90deg, #294637 0%, #95D4C4 100%)",
            }}
          >
            {isLoading ? "Saving..." : isEditing ? "Save Changes" : "Edit"}
          </button>
          <button
            onClick={onDelete}
            disabled={isDeleting || isLoading}
            className="px-6 py-2 rounded-2xl text-red-600 border border-red-200 font-medium hover:bg-red-50 transition-all headerFont text-sm flex items-center justify-center min-w-[120px]"
          >
            {isDeleting ? "Deleting..." : "Delete Profile"}
          </button>
        </div>
      )}
    </div>
  );
};

const TeacherSettings = () => {
  const [active, setActive] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Teacher Profile API
  const { data: profileData, isLoading: isFetchingProfile } =
    useGetTeacherProfileQuery();
  const [updateProfile, { isLoading: isUpdatingProfile }] =
    useUpdateTeacherProfileMutation();
  const [deleteProfile, { isLoading: isDeletingProfile }] =
    useDeleteTeacherProfileMutation();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    grade_level: "",
    bio: "",
  });

  useEffect(() => {
    if (profileData) {
      setFormData({
        first_name: profileData.first_name || "",
        last_name: profileData.last_name || "",
        email: profileData.email || "",
        username: profileData.username || "",
        grade_level: profileData.grade_level || "",
        bio: profileData.bio || "",
      });
    }
  }, [profileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Terms & Conditions API
  const { data: termsData, isLoading: isFetchingTerms } =
    useGetTeacherTermsAndConditionsQuery();

  // Privacy Policy API
  const { data: privacyData, isLoading: isFetchingPrivacy } =
    useGetTeacherPrivacyPolicyQuery();

  const handleAction = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    try {
      const response = await updateProfile({
        first_name: formData.first_name,
        bio: formData.bio,
        grade_level: parseInt(formData.grade_level),
      }).unwrap();

      toast.success(response.message || "Profile updated successfully");
      setIsEditing(false);
    } catch (err) {
      toast.error(
        err?.data?.message || err?.data?.error || "Failed to update profile",
      );
    }
  };

  const handleDeleteProfile = () => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3 p-1">
          <p className="text-sm font-medium text-[#1F3A2B] normalFont">
            Are you sure you want to delete your profile? This action is
            permanent.
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-4 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors normalFont"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  const response = await deleteProfile().unwrap();
                  toast.success(
                    response.message || "Account deleted successfully",
                  );
                  // Reset/Clear everything and redirect
                  dispatch(logout());
                  navigate("/login");
                } catch (err) {
                  toast.error(
                    err?.data?.message ||
                      err?.data?.error ||
                      "Failed to delete account",
                  );
                }
              }}
              className="px-4 py-1.5 text-xs font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors normalFont"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        duration: 5000,
        position: "top-center",
      },
    );
  };

  const tabOptions = ["General", "Terms & Conditions", "Privacy Policy"];

  const renderComponent = () => {
    if (active === 0) {
      return (
        <PersonalInfo
          data={formData}
          isEditing={isEditing}
          onChange={handleChange}
          isLoading={isFetchingProfile}
        />
      );
    } else if (active === 1) {
      return <Terms data={termsData} isLoading={isFetchingTerms} />;
    } else {
      return <Privacy data={privacyData} isLoading={isFetchingPrivacy} />;
    }
  };

  const handleTabChange = (index) => {
    setActive(index);
    setIsEditing(false);
  };

  return (
    <div className="p-4">
      <div className="mb-8">
        <Header
          isEditing={isEditing}
          onAction={handleAction}
          onDelete={handleDeleteProfile}
          isLoading={isUpdatingProfile}
          isDeleting={isDeletingProfile}
          showButton={active === 0}
        />
      </div>

      <div className="grid grid-cols-3 w-[80vw] mx-auto justify-items-center bg-[#ECECF0] p-1 rounded-lg headerFont text-sm">
        {tabOptions.map((item, index) => (
          <button
            key={index}
            onClick={() => handleTabChange(index)}
            className={`px-6 py-1 rounded-2xl w-full text-center transition-all ${
              index === active
                ? "bg-white rounded-2xl shadow-sm font-medium"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="px-12 mt-10">{renderComponent()}</div>
    </div>
  );
};

export default TeacherSettings;
