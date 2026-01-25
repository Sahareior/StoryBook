import React from "react";
import EditSection from "../../editor/EditSection";

const Privacy = ({ data, isEditing, onChange, isLoading }) => {
  if (isLoading)
    return <div className="p-10 text-center">Loading privacy policy...</div>;

  return (
    <div>
      <EditSection data={data} isEditing={isEditing} onChange={onChange} />
    </div>
  );
};

export default Privacy;
