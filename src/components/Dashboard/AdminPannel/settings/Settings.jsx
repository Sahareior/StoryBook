import React, { useState, useEffect } from "react";
import PersonalInfo from "./_components/PersonalInfo";
import Terms from "./_components/Terms";
import Privacy from "./_components/Privacy";
import {
  useGetSiteAdminGeneralSettingsQuery,
  useUpdateSiteAdminGeneralSettingsMutation,
  useGetSiteAdminTermsAndConditionsQuery,
  useUpdateSiteAdminTermsAndConditionsMutation,
  useGetSiteAdminPrivacyPolicyQuery,
  useUpdateSiteAdminPrivacyPolicyMutation,
} from "../../../../redux/api/authApi";
import toast from "react-hot-toast";

const Header = ({ isEditing, onAction, isLoading }) => {
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
    </div>
  );
};

const Settings = () => {
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
    useGetSiteAdminTermsAndConditionsQuery();
  const [updateTerms, { isLoading: isUpdatingTerms }] =
    useUpdateSiteAdminTermsAndConditionsMutation();

  const [termsFormData, setTermsFormData] = useState({
    content: "",
  });

  useEffect(() => {
    if (termsData) {
      setTermsFormData({
        content: termsData.content || "",
      });
    }
  }, [termsData]);

  const handleTermsChange = (newContent) => {
    setTermsFormData({ content: newContent });
  };

  // Privacy Policy API
  const { data: privacyData, isLoading: isFetchingPrivacy } =
    useGetSiteAdminPrivacyPolicyQuery();
  const [updatePrivacy, { isLoading: isUpdatingPrivacy }] =
    useUpdateSiteAdminPrivacyPolicyMutation();

  const [privacyFormData, setPrivacyFormData] = useState({
    content: "",
  });

  useEffect(() => {
    if (privacyData) {
      setPrivacyFormData({
        content: privacyData.content || "",
      });
    }
  }, [privacyData]);

  const handlePrivacyChange = (newContent) => {
    setPrivacyFormData({ content: newContent });
  };

  const handleAction = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    // If saving
    if (active === 0) {
      try {
        await updateGeneralSettings(generalFormData).unwrap();
        toast.success("General settings updated successfully!");
        setIsEditing(false);
      } catch (err) {
        toast.error(err?.data?.message || "Failed to update general settings");
      }
    } else if (active === 1) {
      try {
        await updateTerms(termsFormData).unwrap();
        toast.success("Terms & Conditions updated successfully!");
        setIsEditing(false);
      } catch (err) {
        toast.error(
          err?.data?.message || "Failed to update terms & conditions",
        );
      }
    } else if (active === 2) {
      try {
        await updatePrivacy(privacyFormData).unwrap();
        toast.success("Privacy Policy updated successfully!");
        setIsEditing(false);
      } catch (err) {
        toast.error(err?.data?.message || "Failed to update privacy policy");
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
      return (
        <Terms
          data={termsFormData}
          isEditing={isEditing}
          onChange={handleTermsChange}
          isLoading={isFetchingTerms}
        />
      );
    } else {
      return (
        <Privacy
          data={privacyFormData}
          isEditing={isEditing}
          onChange={handlePrivacyChange}
          isLoading={isFetchingPrivacy}
        />
      );
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
          isLoading={isUpdatingGeneral || isUpdatingTerms || isUpdatingPrivacy}
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

export default Settings;
