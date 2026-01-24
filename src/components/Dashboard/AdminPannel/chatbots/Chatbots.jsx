import React, { useState, useEffect } from "react";
import {
  useGetSiteAdminAiAssistantSettingsQuery,
  useUpdateSiteAdminAiAssistantSettingsMutation,
} from "../../../../redux/api/authApi";
import toast from "react-hot-toast";

const Chatbots = () => {
  const {
    data: aiSettings,
    isLoading: isFetching,
    error: fetchError,
  } = useGetSiteAdminAiAssistantSettingsQuery();
  const [updateAiSettings, { isLoading: isUpdating }] =
    useUpdateSiteAdminAiAssistantSettingsMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    assistant_name: "",
    tone: "",
    reading_level_strictness: "",
    max_response_tokens: 500,
    forbidden_topics: "",
  });

  useEffect(() => {
    if (aiSettings) {
      setFormData({
        assistant_name: aiSettings.assistant_name || "",
        tone: aiSettings.ai_behaviour_settings?.tone || "",
        reading_level_strictness:
          aiSettings.ai_behaviour_settings?.reading_level_strictness || "",
        max_response_tokens:
          aiSettings.ai_behaviour_settings?.max_response_tokens || 500,
        forbidden_topics:
          aiSettings.ai_behaviour_settings?.forbidden_topics?.join(", ") || "",
      });
    }
  }, [aiSettings]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditToggle = (e) => {
    e.preventDefault();
    if (isEditing) {
      handleSave();
    } else {
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    try {
      const payload = {
        assistant_name: formData.assistant_name,
        ai_behaviour_settings: {
          tone: formData.tone,
          reading_level_strictness: formData.reading_level_strictness,
          max_response_tokens: parseInt(formData.max_response_tokens) || 500,
          forbidden_topics: formData.forbidden_topics
            .split(",")
            .map((topic) => topic.trim())
            .filter(Boolean),
        },
      };

      await updateAiSettings(payload).unwrap();
      toast.success("Configuration saved successfully!");
      setIsEditing(false);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to save configuration");
    }
  };

  if (isFetching)
    return <div className="p-10 text-center">Loading settings...</div>;
  if (fetchError)
    return (
      <div className="p-10 text-center text-red-500">
        Error loading settings
      </div>
    );

  return (
    <div className="max-w-8xl mx-auto p-6">
      {/* Header Section */}
      <header className="mb-8 mx-12 text-center md:text-left">
        <h1 className="text-[24px] font-bold text-[#1F1F1F] mb-2 headerFont">
          AI Assistant Configuration
        </h1>
        <p className="text-[14px] text-gray-600 normalFont">
          Configure the AI chatbot behavior for the Story Creator assistance
        </p>
      </header>

      {/* Settings Container */}
      <div className="mx-12 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-[16px] font-semibold text-gray-700 headerFont">
            AI Behaviour Settings
          </h2>
          <span
            className={`px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider ${isEditing ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}
          >
            {isEditing ? "Editing Mode" : "View Mode"}
          </span>
        </div>

        <div className="p-8 space-y-8">
          {/* Main Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Assistant Name */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-tight headerFont">
                Assistant Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="assistant_name"
                value={formData.assistant_name}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full p-3 rounded-lg border transition-all duration-200 normalFont ${
                  isEditing
                    ? "bg-white border-[#294637] ring-2 ring-[#4a7c61]"
                    : "bg-gray-50 border-gray-200 text-gray-600"
                }`}
                placeholder="e.g. StoryBuddy"
              />
            </div>

            {/* Response Tone */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-tight headerFont">
                Conversation Tone <span className="text-red-500">*</span>
              </label>
              <select
                name="tone"
                value={formData.tone}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full p-3 rounded-lg border transition-all duration-200 normalFont ${
                  isEditing
                    ? "bg-white border-[#294637] ring-2 ring-[#4a7c61]"
                    : "bg-gray-50 border-gray-200 text-gray-600"
                }`}
              >
                <option value="encouraging">Encouraging</option>
                <option value="formal">Formal</option>
                <option value="playful">Playful</option>
                <option value="didactic">Didactic</option>
              </select>
            </div>

            {/* Strictness Level */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-tight headerFont">
                Reading Strictness <span className="text-red-500">*</span>
              </label>
              <select
                name="reading_level_strictness"
                value={formData.reading_level_strictness}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full p-3 rounded-lg border transition-all duration-200 normalFont ${
                  isEditing
                    ? "bg-white border-[#294637] ring-2 ring-[#4a7c61]"
                    : "bg-gray-50 border-gray-200 text-gray-600"
                }`}
              >
                <option value="high">High (Strict adherence)</option>
                <option value="medium">Medium</option>
                <option value="low">Low (Flexible)</option>
              </select>
            </div>

            {/* Token Limit */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-tight headerFont">
                Max Response Tokens <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="max_response_tokens"
                value={formData.max_response_tokens}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full p-3 rounded-lg border transition-all duration-200 normalFont ${
                  isEditing
                    ? "bg-white border-[#294637] ring-2 ring-[#4a7c61]"
                    : "bg-gray-50 border-gray-200 text-gray-600"
                }`}
                placeholder="e.g. 500"
              />
            </div>
          </div>

          {/* Forbidden Topics Section */}
          <div className="space-y-2">
            <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-tight headerFont">
              Forbidden Topics (Comma separated)
            </label>
            <textarea
              name="forbidden_topics"
              rows={3}
              value={formData.forbidden_topics}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full p-4 rounded-lg border transition-all duration-200 normalFont resize-none ${
                isEditing
                  ? "bg-white border-[#294637] ring-2 ring-[#4a7c61]"
                  : "bg-gray-50 border-gray-200 text-gray-600"
              }`}
              placeholder="violence, horror, political content..."
            />
            <p className="text-[11px] text-gray-400 italic">
              Topics the AI should strictly avoid mentioning in responses.
            </p>
          </div>
        </div>

        {/* Action Button Container */}
        <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex justify-end">
          <button
            onClick={handleEditToggle}
            disabled={isUpdating}
            className={`py-3 px-10 rounded-lg text-white font-bold tracking-wide transition-all duration-300 shadow-md transform hover:-translate-y-0.5 active:scale-95 headerFont ${
              isUpdating ? "opacity-50 cursor-not-allowed" : ""
            }`}
            style={{
              background: "linear-gradient(90deg, #294637 0%, #4a7c61 100%)",
            }}
          >
            {isUpdating
              ? "Saving..."
              : isEditing
                ? "Save Changes"
                : "Edit Configuration"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbots;
