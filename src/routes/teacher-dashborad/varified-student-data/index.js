import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVarifiedStudentsData } from "../../../redux/actions";
import Table from "../../../shared/Table/Table";
import Loader from "../../../shared/Loader";

const VarifiedStudentData = () => {
  const dispatch = useDispatch();

  const { varifiedStudentList, varifiedStudentListLoading } = useSelector(
    ({ allStudentData }) => allStudentData
  );

  useEffect(() => {
    !varifiedStudentList?.data?.length && dispatch(getVarifiedStudentsData());
  }, [varifiedStudentList?.data?.length]); // eslint-disable-line react-hooks/exhaustive-deps

  const tableLink = {
    path: "student-details",
    linkText: "Student Details",
  };

  return !varifiedStudentListLoading ? (
    <div className="student-list-table-wrapper">
      {varifiedStudentList?.message ? (
        <h2>{varifiedStudentList?.message}</h2>
      ) : (
        ""
      )}

      <Table
        tableHeadData={["Id", "Email", "Name", "Status"]}
        tableData={varifiedStudentList?.data}
        link={tableLink}
      />
    </div>
  ) : (
    <Loader />
  );
};

export default VarifiedStudentData;
