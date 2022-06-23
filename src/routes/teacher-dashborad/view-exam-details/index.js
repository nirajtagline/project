import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TableWithMultiData from "../../../shared/TableWithMultiData/TableWithMultiData";

const ViewExamDetails = () => {
  const { viewExamInDetailsData } = useSelector(({ exam }) => exam);

  return (
    <div>
      <h2>Exam in details view</h2>

      <TableWithMultiData
        tableHeadData={["Question", "Answer", "Options"]}
        tableData={viewExamInDetailsData?.questions}
      />

      <div>
        <Link className="auth-link" to="/view-exam">
          Back to view exam page
        </Link>
      </div>
    </div>
  );
};

export default ViewExamDetails;
