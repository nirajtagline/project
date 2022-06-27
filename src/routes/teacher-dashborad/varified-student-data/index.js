import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVarifiedStudentsData } from "../../../redux/actions";
import Table from "../../../shared/Table/Table";
import Loader from "../../../shared/Loader";

const VarifiedStudentData = () => {
  const dispatch = useDispatch();

  const {
    varifiedStudentList: { data = [] },
    varifiedStudentListLoading,
  } = useSelector(({ allStudentData }) => allStudentData);

  useEffect(() => {
    !data?.length && dispatch(getVarifiedStudentsData());
  }, [data?.length]); // eslint-disable-line react-hooks/exhaustive-deps

  const tableLink = {
    path: "student-details",
    linkText: "Student Details",
  };

  return !varifiedStudentListLoading ? (
    <div className="student-list-table-wrapper">
      <Table
        tableHeadData={["Id", "Email", "Name", "Status"]}
        tableData={data}
        link={tableLink}
      />
    </div>
  ) : (
    <Loader />
  );
};

export default VarifiedStudentData;
