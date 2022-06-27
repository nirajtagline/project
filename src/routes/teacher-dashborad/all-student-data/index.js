import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getfetchAllStudentsData } from "../../../redux/actions";
import Table from "../../../shared/Table/Table";
import Loader from "../../../shared/Loader";
import "./student-list-table.scss";

const AllStudentData = () => {
  const dispatch = useDispatch();

  const {
    allStudentsList: { data = [] },
    allStudentsListLoading,
  } = useSelector(({ allStudentData }) => allStudentData);

  useEffect(() => {
    !data.length && dispatch(getfetchAllStudentsData());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return !allStudentsListLoading ? (
    <div className="student-list-table-wrapper">
      <Table
        tableHeadData={["Id", "Email", "Name", "Status"]}
        tableData={data}
      />
    </div>
  ) : (
    <Loader />
  );
};

export default AllStudentData;
