import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getfetchAllStudentsData } from "../../../redux/actions";
import Table from "../../../shared/Table/Table";
import "./student-list-table.scss";

const AllStudentData = () => {
  const dispatch = useDispatch();

  const {
    allStudentsList: { data = [] },
  } = useSelector(({ allStudentData }) => allStudentData);

  useEffect(() => {
    dispatch(getfetchAllStudentsData());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="student-list-table-wrapper">
      <Table
        tableHeadData={["Status", "name", "email", "id"]}
        tableData={data}
      />
    </div>
  );
};

export default AllStudentData;
