import React, { useRef, useState, useEffect } from "react";
import Editor from "./Editor";

const EditSection = ({ data, isEditing, onChange }) => {
  const [range, setRange] = useState();
  const [readOnly, setReadOnly] = useState(true);

  const quillRef = useRef(null);

  // Extract the actual content from the data prop
  const contentValue =
    typeof data === "object" && data.content
      ? data.content
      : typeof data === "string"
        ? data
        : "";

  // Sync internal readOnly with parent isEditing
  useEffect(() => {
    setReadOnly(!isEditing);
  }, [isEditing]);

  // Sync internal quill content with external data
  useEffect(() => {
    if (quillRef.current && contentValue !== undefined) {
      if (quillRef.current.root.innerHTML !== contentValue) {
        quillRef.current.root.innerHTML = contentValue;
      }
    }
  }, [contentValue]);

  const handleEditorChange = (delta, oldDelta, source) => {
    if (source === "user" && onChange) {
      const content = quillRef.current?.root.innerHTML || "";
      onChange(content);
    }
  };

  return (
    <div
      className="flex bg-white flex-col gap-4 p-3 relative normalFont"
      style={{
        minHeight: "500px",
        boxShadow: "0px 0px 10px 0px #0000001A",
      }}
    >
      <Editor
        ref={quillRef}
        readOnly={readOnly}
        defaultValue={contentValue}
        onSelectionChange={setRange}
        onTextChange={handleEditorChange}
      />
    </div>
  );
};

export default EditSection;
