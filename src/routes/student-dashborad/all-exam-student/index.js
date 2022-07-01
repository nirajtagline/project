import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExamForStudentsDetails } from "../../../redux/actions";
import CustomButton from "../../../shared/Button/CustomButton";
import TableWithMultiData from "../../../shared/TableWithMultiData/TableWithMultiData";
import Loader from "../../../shared/Loader/Loader";
import "./exam-student.scss";

const AllExamStudent = () => {
  const dispatch = useDispatch();

  const { examForStudentData, examForStudentDataLoading } = useSelector(
    ({ student }) => student
  );

  useEffect(() => {
    !examForStudentData?.length && dispatch(getExamForStudentsDetails());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRefreshList = () => {
    dispatch(getExamForStudentsDetails());
  };

  return !examForStudentDataLoading ? (
    <>
      {examForStudentData?.length ? (
        <div className="exam-student-wrapper">
          <CustomButton
            type="button"
            onClick={handleRefreshList}
            className="submit-form button-align"
            buttonText="Refresh list"
          />
          <TableWithMultiData
            tableHeadData={[
              "Exam id",
              "Subject name",
              "Email",
              "Notes",
              "Give exam",
            ]}
            tableData={examForStudentData}
            link={{ path: "exam-paper", linkText: "Give exam" }}
          />
        </div>
      ) : (
        <h3>No data available</h3>
      )}
    </>
  ) : (
    <Loader />
  );
};

export default AllExamStudent;
