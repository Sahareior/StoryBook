import React from "react";
import EditSection from "../../editor/EditSection";

const Terms = ({ data, isLoading }) => {
  if (isLoading)
    return (
      <div className="p-10 text-center">Loading terms & conditions...</div>
    );

  return (
    <div>
      <EditSection data={data} />
    </div>
  );
};

export default Terms;
