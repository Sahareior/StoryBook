import React from "react";

const EditSection = ({ data }) => {
  // Extract the actual HTML content from the data prop
  const contentValue =
    typeof data === "object" && data.content
      ? data.content
      : typeof data === "string"
        ? data
        : "";

  return (
    <div
      className="flex bg-white flex-col gap-6 p-8 relative normalFont overflow-y-auto"
      style={{
        minHeight: "500px",
        boxShadow: "0px 0px 10px 0px #0000001A",
        borderRadius: "12px",
      }}
    >
      <div
        className="prose prose-sm max-w-none text-[#1F2937] leading-relaxed"
        dangerouslySetInnerHTML={{ __html: contentValue }}
      />

      {!contentValue && (
        <div className="flex items-center justify-center h-full text-gray-400">
          No content available to display.
        </div>
      )}
    </div>
  );
};

export default EditSection;
