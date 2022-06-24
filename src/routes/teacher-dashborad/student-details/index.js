import { useDispatch, useSelector } from "react-redux";
import { getStudentsDetails } from "../../../redux/actions";
import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import TableWithMultiData from "../../../shared/TableWithMultiData/TableWithMultiData";
const StudentDetails = () => {
  const dispatch = useDispatch();
  const param = useParams();

  const {
    studentDetails: { data = [] },
  } = useSelector(({ allStudentData }) => allStudentData);

  useEffect(() => {
    param && dispatch(getStudentsDetails(param["id"]));
  }, [param]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="student-list-table-wrapper">
      <TableWithMultiData
        tableHeadData={["Student id", "Name", "Email", "Result"]}
        tableData={data}
      />
    </div>
  );
};

export default StudentDetails;
