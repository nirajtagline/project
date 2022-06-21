import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getEditExamForStudent,
  getViewExamForStudent,
  getViewExamInDetails,
} from "../../../redux/actions/exam";
import "./edit-exam.scss";

const EditExamDetails = () => {
  const dispatch = useDispatch();
  const { examid } = useParams();

  const {
    viewExamInDetailsData,
    viewExamData,
    isEditExamData,
    isFetchExamInDetailsData,
  } = useSelector(({ exam }) => exam);

  const examSubjectName = viewExamData?.find((exam) => exam._id === examid);
  const { subjectName = "", notes = [] } = examSubjectName || [];
  const questions = viewExamInDetailsData?.questions;

  const [editSubjectName, setEditSubjectName] = useState();
  const [examDuration, setExamDuration] = useState();
  const [examTime, setExamTime] = useState();
  const [option, setOption] = useState("");
  const [optionIndex, setOptionIndex] = useState(0);

  const [editExamBody, setEditExamBody] = useState();

  console.log("editExamBody", editExamBody);
  console.log("questions", questions);

  useEffect(() => {
    setEditSubjectName(subjectName);
    setExamDuration(notes[0]);
    setExamTime(notes[1]);
    setEditExamBody({
      subjectName: editSubjectName,
      questions,
      notes: [
        `${examDuration ?? notes[0]} exam`,
        `start time ${examTime ?? notes[1]}`,
      ],
    });
  }, [subjectName, notes]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    dispatch(getViewExamForStudent());
    dispatch(getViewExamInDetails(examid));
  }, [isEditExamData, isFetchExamInDetailsData]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSelectQuestion = (e) => {
    const { value } = e.target;
    setOptionIndex(value);
  };

  const handleOptionChange = (e) => {
    const { value } = e.target;
    setOption(value);
    questions[optionIndex].answer = value;
  };
  const handelAnswer = (e) => {
    const { value, id } = e.target;
    console.log(value);

    questions[optionIndex].options[id] = value;
  };

  const handleUpdateExamDetails = async () => {
    setEditExamBody({
      subjectName: editSubjectName,
      questions,
      notes: [`${examDuration}`, `${examTime}`],
    });

    const body = {
      subjectName: editSubjectName,
      questions,
      notes: [`${examDuration} exam`, `start time ${examTime}`],
    };

    dispatch(getEditExamForStudent(examid, body));
  };

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

      <div>
        <h3>Please select question for edit</h3>
        <select onChange={(e) => handleSelectQuestion(e)}>
          {questions?.map((que, i) => {
            const { question } = que;
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
          {questions &&
            questions[optionIndex]?.options?.map((opt, i) => {
              return (
                <>
                  <input
                    type="radio"
                    name="opions"
                    id={`opions${i}`}
                    onChange={(e) => handleOptionChange(e)}
                    value={opt}
                  />
                  <label htmlFor={`opions${i}`}>
                    <input
                      type="text"
                      name="option_Answer1"
                      placeholder="Enter option 1 answer"
                      value={opt}
                      id={i + 1}
                      onChange={handelAnswer}
                    />
                  </label>
                </>
              );
            })}
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

      <table>
        <tbody>
          <tr>
            <th>Question</th>
            <th>Answer</th>
            <th>Options</th>
          </tr>
          {questions?.map((que, i) => {
            const { question, answer, options } = que;
            return (
              <tr key={i}>
                <td>{question} </td>
                <td>{answer}</td>
                {options.map((opt) => {
                  return (
                    <tr>
                      <td>{opt}</td>
                    </tr>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EditExamDetails;
