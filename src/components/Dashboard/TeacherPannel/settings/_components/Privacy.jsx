import React from "react";
import EditSection from "../../editor/EditSection";

const Privacy = ({ data, isLoading }) => {
  if (isLoading)
    return <div className="p-10 text-center">Loading privacy policy...</div>;

  return (
    <div>
      <EditSection data={data} />
    </div>
  );
};

export default Privacy;
