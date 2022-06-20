import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const EditExamDetails = () => {
  const { viewExamInDetailsData, viewExamData } = useSelector(
    ({ exam }) => exam
  );
  console.log("viewExamInDetailsData", viewExamInDetailsData);
  const { examid } = useParams();

  const examSubjectName = viewExamData?.find((exam) => exam._id === examid);

  console.log("viewExamData", viewExamData);

  const [editSubjectName, setEditSubjectName] = useState(
    examSubjectName?.subjectName
  );
  const [examDuration, setExamDuration] = useState(examSubjectName?.notes[0]);
  const [examTime, setExamTime] = useState(examSubjectName?.notes[1]);
  const [question, setQuestion] = useState("");
  const [option, setOption] = useState("");

  const [editExamBody, setEditExamBody] = useState({
    subjectName: editSubjectName,
    questions: viewExamInDetailsData?.questions,
    notes: [`${examDuration} exam`, `start time ${examTime}`],
  });

  const handleSelectQuestion = (e) => {
    console.log("option", e.target.value);
    setEditExamBody({ editExamBody, ...viewExamInDetailsData?.questions });
  };
  const handleUpdateExamDetails = () => {};

  console.log("editExamBody", editExamBody);

  return (
    <div>
      <h2>Edit exam</h2>
      <li>subject name : {examSubjectName?.subjectName}</li>
      <input
        type="text"
        onChange={(e) => setEditSubjectName(e.target.value)}
        value={editSubjectName}
        placeholder="Enter subject name"
      />

      <li>Exam duration : </li>

      <input
        onChange={(e) => setExamDuration(e.target.value)}
        value={examDuration}
        placeholder="Exam duration ex(5mins)"
      />
      <li>Exam start time : </li>

      <input
        onChange={(e) => setExamTime(e.target.value)}
        value={examTime}
        placeholder="Exam start time ex(10am)"
      />
      <table>
        <tbody>
          <tr>
            <th>Question</th>
            <th>Answer</th>
            <th>Options</th>
          </tr>
          {editExamBody?.questions?.map((que, i) => {
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
        <h3>Please select option for edit</h3>
        <select onChange={(e) => handleSelectQuestion(e)}>
          {editExamBody?.questions?.map((que, i) => {
            const { question, answer, options } = que;
            return (
              <option value={i} key={i}>
                {question}
              </option>
            );
          })}
        </select>
        <div>
          <input
            type="text"
            placeholder="Select answer"
            value={option}
            readOnly="true"
          />
          <label htmlFor="opions1">opions 1</label>
          <input
            type="radio"
            name="opions"
            id="opions1"
            onChange={(e) => setOption(e.target.value)}
            value="ans 1"
          />

          <label htmlFor="opions2">opions 2</label>
          <input
            type="radio"
            name="opions"
            id="opions2"
            onChange={(e) => setOption(e.target.value)}
            value="ans 2"
          />

          <label htmlFor="opions3">opions 3</label>

          <input
            type="radio"
            name="opions"
            id="opions3"
            onChange={(e) => setOption(e.target.value)}
            value="ans 3"
          />

          <label htmlFor="opions4">opions 4</label>

          <input
            type="radio"
            name="opions"
            id="opions4"
            onChange={(e) => setOption(e.target.value)}
            value="ans 4"
          />
        </div>
      </div>
      <div>
        <Link className="auth-link" to="/view-exam">
          Back to view exam page
        </Link>
      </div>
      <button
        className="submit-form"
        type="button"
        onClick={handleUpdateExamDetails}
      >
        Update changes
      </button>
    </div>
  );
};

export default EditExamDetails;
