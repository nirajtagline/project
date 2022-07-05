import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getViewExamInDetails } from "../../../redux/actions/exam";
import Loader from "../../../shared/Loader/Loader";
import TableWithMultiData from "../../../shared/TableWithMultiData/TableWithMultiData";

const ViewExamDetails = () => {
  const { examId } = useParams();
  const dispatch = useDispatch();

  const { viewExamInDetailsData, viewExamInDetailsDataLoading } = useSelector(
    ({ exam }) => exam
  );

  useEffect(() => {
    !viewExamInDetailsData?.data?.questions?.length &&
      dispatch(getViewExamInDetails(examId));
  }, [viewExamInDetailsData?.data?.questions]); // eslint-disable-line react-hooks/exhaustive-deps

  return !viewExamInDetailsDataLoading ? (
    <div>
      <h2>Exam in details view</h2>
      {viewExamInDetailsData?.statusCode === 500 ? (
        <h3 className="error-message">{viewExamInDetailsData?.message}</h3>
      ) : (
        ""
      )}

      <TableWithMultiData
        tableHeadData={["Question", "Answer", "Options"]}
        tableData={viewExamInDetailsData?.data?.questions}
      />

      <div>
        <Link className="auth-link" to="/view-exam">
          Back to view exam page
        </Link>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default ViewExamDetails;
