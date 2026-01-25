import React, { useState, useEffect } from "react";
import PersonalInfo from "./_components/PersonalInfo";
import Terms from "./_components/Terms";
import Privacy from "./_components/Privacy";
import {
  useGetSiteAdminGeneralSettingsQuery,
  useUpdateSiteAdminGeneralSettingsMutation,
  useGetTeacherTermsAndConditionsQuery,
  useGetTeacherPrivacyPolicyQuery,
} from "../../../../redux/api/authApi";
import toast from "react-hot-toast";

const Header = ({ isEditing, onAction, isLoading, showButton }) => {
  return (
    <div className="flex w-[80vw] mx-auto justify-between items-center">
      <div className="">
        <p className="text-[20px] text-[#1F1F1F] font-semibold headerFont">
          Settings
        </p>
        <p className="text-[16px] text-[#4A5565] normalFont">
          Manage platform preferences and configurations
        </p>
      </div>
      {showButton && (
        <button
          onClick={onAction}
          disabled={isLoading}
          className="px-8 py-2 rounded-2xl text-white font-medium hover:opacity-90 transition-opacity headerFont text-sm flex items-center justify-center min-w-[120px]"
          style={{
            background: "linear-gradient(90deg, #294637 0%, #95D4C4 100%)",
          }}
        >
          {isLoading ? "Saving..." : isEditing ? "Save Changes" : "Edit"}
        </button>
      )}
    </div>
  );
};

const TeacherSettings = () => {
  const [active, setActive] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  // General Settings API
  const { data: generalData, isLoading: isFetchingGeneral } =
    useGetSiteAdminGeneralSettingsQuery();
  const [updateGeneralSettings, { isLoading: isUpdatingGeneral }] =
    useUpdateSiteAdminGeneralSettingsMutation();

  const [generalFormData, setGeneralFormData] = useState({
    platform_name: "",
    contact_email: "",
    support_email: "",
  });

  useEffect(() => {
    if (generalData) {
      setGeneralFormData({
        platform_name: generalData.platform_name || "",
        contact_email: generalData.contact_email || "",
        support_email: generalData.support_email || "",
      });
    }
  }, [generalData]);

  const handleGeneralChange = (e) => {
    const { name, value } = e.target;
    setGeneralFormData((prev) => ({ ...prev, [name]: value }));
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

    // If saving General settings
    if (active === 0) {
      try {
        await updateGeneralSettings(generalFormData).unwrap();
        toast.success("General settings updated successfully!");
        setIsEditing(false);
      } catch (err) {
        toast.error(err?.data?.message || "Failed to update general settings");
      }
    }
  };

  const tabOptions = ["General", "Terms & Conditions", "Privacy Policy"];

  const renderComponent = () => {
    if (active === 0) {
      return (
        <PersonalInfo
          data={generalFormData}
          isEditing={isEditing}
          onChange={handleGeneralChange}
          isLoading={isFetchingGeneral}
        />
      );
    } else if (active === 1) {
      return <Terms data={termsData} isLoading={isFetchingTerms} />;
    } else {
      return <Privacy data={privacyData} isLoading={isFetchingPrivacy} />;
    }
  };

  // When changing tabs, turn off editing mode
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
          isLoading={isUpdatingGeneral}
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
