import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getfetchAllStudentsData } from "../../../redux/actions";
import Table from "../../../shared/Table/Table";
import Loader from "../../../shared/Loader";
import "./student-list-table.scss";

const AllStudentData = () => {
  const dispatch = useDispatch();

  const { allStudentsList, allStudentsListLoading } = useSelector(
    ({ allStudentData }) => allStudentData
  );

  useEffect(() => {
    !allStudentsList?.data?.length && dispatch(getfetchAllStudentsData());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return !allStudentsListLoading ? (
    <div className="student-list-table-wrapper">
      {allStudentsList?.message ? <h2>{allStudentsList?.message}</h2> : ""}
      <Table
        tableHeadData={["Id", "Email", "Name", "Status"]}
        tableData={allStudentsList?.data}
      />
    </div>
  ) : (
    <Loader />
  );
};

export default AllStudentData;
