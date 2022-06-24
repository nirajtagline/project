import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExamForStudentsDetails } from "../../../redux/actions";
import TableWithMultiData from "../../../shared/TableWithMultiData/TableWithMultiData";
import "./exam-student.scss";

const AllExamStudent = () => {
  const dispatch = useDispatch();

  const { examForStudentData } = useSelector(({ student }) => student);

  useEffect(() => {
    dispatch(getExamForStudentsDetails());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return !!examForStudentData?.length ? (
    <div className="exam-student-wrapper">
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
    <h2>Loading........</h2>
  );
};

export default AllExamStudent;
