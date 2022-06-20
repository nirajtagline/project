import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ViewExamDetails = () => {
  const { viewExamInDetailsData } = useSelector(({ exam }) => exam);
  return (
    <div>
      <h2>Exam in details view</h2>
      <table>
        <tbody>
          <tr>
            <th>Question</th>
            <th>Answer</th>
            <th>Options</th>
          </tr>
          {viewExamInDetailsData?.questions?.map((que, i) => {
            const { question, answer, options } = que;
            return (
              <tr key={i}>
                <td>{question} </td>
                <td>{answer}</td>
                <td>{options}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <Link className="auth-link" to="/view-exam">
          Back to view exam page
        </Link>
      </div>
    </div>
  );
};

export default ViewExamDetails;
