import { useDispatch, useSelector } from "react-redux";
import { getStudentsDetails } from "../../../redux/actions";
import { Link, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import TableWithMultiData from "../../../shared/TableWithMultiData/TableWithMultiData";
import Loader from "../../../shared/Loader/Loader";
const StudentDetails = () => {
  const dispatch = useDispatch();
  const param = useParams();

  const {
    studentDetails: { data = [] },
    studentDetailsLoading,
  } = useSelector(({ allStudentData }) => allStudentData);

  useEffect(() => {
    param && dispatch(getStudentsDetails(param["id"]));
  }, [param]); // eslint-disable-line react-hooks/exhaustive-deps
  return !studentDetailsLoading ? (
    <div className="student-list-table-wrapper">
      <TableWithMultiData
        tableHeadData={["Student id", "Name", "Email", "Result"]}
        tableData={data}
      />
      <hr />

      <Link to="/varified-student-data">Back</Link>
    </div>
  ) : (
    <Loader />
  );
};

export default StudentDetails;
