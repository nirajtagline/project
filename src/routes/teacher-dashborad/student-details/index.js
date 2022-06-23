import { useDispatch, useSelector } from "react-redux";
import { getStudentsDetails } from "../../../redux/actions";
import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
const StudentDetails = () => {
  const dispatch = useDispatch();
  const param = useParams();

  const {
    studentDetails: { data = [] },
  } = useSelector(({ allStudentData }) => allStudentData);

  useEffect(() => {
    param && dispatch(getStudentsDetails(param["id"]));
  }, [param]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="student-list-table-wrapper">
      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>email</th>
            <th>id</th>
          </tr>
          {data?.map((student, index) => {
            const { _id, name, email, Result } = student;
            return (
              <React.Fragment key={index}>
                <tr>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{_id}</td>
                </tr>
                <tr>
                  {Result?.map((value, id) => {
                    const {
                      studentAnswer,
                      rank,
                      subjectName,
                      score,
                      resultStatus,
                    } = value;
                    return (
                      <React.Fragment key={id}>
                        <li>{subjectName}</li>
                        <li>{rank}</li>
                        <li>{score}</li>
                        <li>{resultStatus}</li>
                        <tr>
                          <h3>Question and answer</h3>
                          {studentAnswer?.map((res, i) => {
                            const { question, answer } = res;
                            return (
                              <React.Fragment key={i}>
                                <li>Que :-{question}</li>
                                <li>Ans :-{answer}</li>
                                <hr />
                              </React.Fragment>
                            );
                          })}
                        </tr>
                      </React.Fragment>
                    );
                  })}
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StudentDetails;
