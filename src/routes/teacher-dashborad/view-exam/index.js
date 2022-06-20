import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  getViewExamForStudent,
  getDeleteExamForStudent,
  getViewExamInDetails,
} from "../../../redux/actions/exam";

const ViewExam = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { viewExamData, isDeleteExamData } = useSelector(({ exam }) => exam);
  console.log("viewExamData", viewExamData);

  const handleDeleteExam = (id) => {
    dispatch(getDeleteExamForStudent(id));
  };
  const handleViewExamInDetails = (id) => {
    dispatch(getViewExamInDetails(id));
    navigate(`/view-exam-details/${id}`);
  };

  const handleEditExam = (id) => {
    navigate(`/edit-exam-details/${id}`);
  };

  useEffect(() => {
    dispatch(getViewExamForStudent());
  }, [isDeleteExamData]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <h2>Exam data</h2>
      <table>
        <tbody>
          <tr>
            <th>Subject Name</th>
            <th>Exam Id</th>
            <th>Email</th>
            <th>Time</th>
          </tr>
          {viewExamData?.map((data, i) => {
            const { subjectName, _id, email, notes } = data;
            return (
              <tr key={i}>
                <td>{subjectName}</td>
                <td>{_id}</td>
                <td>{email}</td>

                {notes?.map((note, i) => {
                  return (
                    <tr key={i}>
                      <td>{note}</td>
                    </tr>
                  );
                })}
                <td>
                  <button
                    type="button"
                    onClick={() => handleViewExamInDetails(_id)}
                  >
                    View exam Details
                  </button>
                </td>
                <td>
                  <button type="button" onClick={() => handleEditExam(_id)}>
                    Edit exam
                  </button>
                </td>
                <td>
                  <button type="button" onClick={() => handleDeleteExam(_id)}>
                    Delete exam
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ViewExam;
