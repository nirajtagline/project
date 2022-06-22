import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getExamForStudentsDetails } from "../../../redux/actions";
import "./exam-student.scss";

const AllExamStudent = () => {
  const dispatch = useDispatch();

  const { examForStudentData } = useSelector(({ student }) => student);

  useEffect(() => {
    dispatch(getExamForStudentsDetails());
  }, [examForStudentData]); // eslint-disable-line react-hooks/exhaustive-deps

  return !!examForStudentData?.length ? (
    <div className="exam-student-wrapper">
      <table>
        <tbody>
          <tr>
            <th>subjectName</th>
            <th>Exam id</th>
            <th>email</th>
            <th>notes</th>
            <th>Result</th>
          </tr>
          {!!examForStudentData.length &&
            examForStudentData?.map((student) => {
              const { subjectName, email, _id, notes, Result } = student;
              return (
                <tr key={_id}>
                  <td>{subjectName}</td>
                  <td>
                    <Link to={`exam-paper/${_id}`}>View Paper</Link>
                  </td>
                  <td>{_id}</td>
                  <td>{email}</td>
                  {notes?.map((note, i) => {
                    return (
                      <tr key={i}>
                        <td>{note}</td>
                      </tr>
                    );
                  })}
                  {!!Result.length && (
                    <td>
                      {Result?.map((res) => {
                        const { subjectName, _id, rank, score, resultStatus } =
                          res;
                        return (
                          <>
                            <tr>
                              <td>{resultStatus}</td>
                            </tr>
                            <tr>
                              <td>{subjectName}</td>
                            </tr>
                            <tr>
                              <td>{_id}</td>
                            </tr>
                            <tr>
                              <td>{rank}</td>
                            </tr>
                            <tr>
                              <td>{score}</td>
                            </tr>
                          </>
                        );
                      })}
                    </td>
                  )}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  ) : (
    <h2>Loading........</h2>
  );
};

export default AllExamStudent;
