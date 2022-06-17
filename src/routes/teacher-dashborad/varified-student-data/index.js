import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getVarifiedStudentsData } from "../../../redux/actions";

const VarifiedStudentData = () => {
  const dispatch = useDispatch();

  const {
    varifiedStudentList: { data = [] },
  } = useSelector(({ allStudentData }) => allStudentData);

  useEffect(() => {
    dispatch(getVarifiedStudentsData());
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
            <th></th>
          </tr>
          {data?.map((student) => {
            const { status, _id, name, email } = student;
            return (
              <tr>
                <td>{status}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{_id}</td>
                <td>
                  <Link to={`student-details/${_id}`}>Student Details</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default VarifiedStudentData;
