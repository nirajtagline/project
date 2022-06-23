import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVarifiedStudentsData } from "../../../redux/actions";
import Table from "../../../shared/Table/Table";

const VarifiedStudentData = () => {
  const dispatch = useDispatch();

  const {
    varifiedStudentList: { data = [] },
  } = useSelector(({ allStudentData }) => allStudentData);

  useEffect(() => {
    dispatch(getVarifiedStudentsData());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const tableLink = {
    path: "student-details",
    linkText: "Student Details",
  };

  return (
    <div className="student-list-table-wrapper">
      <Table
        tableHeadData={["Status", "name", "email", "id"]}
        tableData={data}
        link={tableLink}
      />
    </div>
  );
};

export default VarifiedStudentData;
