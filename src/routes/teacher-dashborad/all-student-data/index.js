import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getfetchAllStudentsData } from "../../../redux/actions";
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
      <table>
        <tbody>
          <tr>
            <th>Status</th>
            <th>name</th>
            <th>email</th>
            <th>id</th>
          </tr>
          {data?.map((student) => {
            const { status, _id, name, email } = student;
            return (
              <tr>
                <td>{status}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{_id}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllStudentData;
