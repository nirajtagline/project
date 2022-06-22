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
  const { examId } = useParams();
  const {
    viewExamInDetailsData,
    viewExamData,
    isEditExamData,
    isFetchExamInDetailsData,
  } = useSelector(({ exam }) => exam);

  const selectedExamForEdit =
    viewExamData && viewExamData?.find((exam) => exam._id === examId);

  const { subjectName = "", notes = [] } = selectedExamForEdit || [];
  const [editSubjectName, setEditSubjectName] = useState();
  const [examDuration, setExamDuration] = useState();
  const [examTime, setExamTime] = useState();
  const [option, setOption] = useState("");
  const [optionIndex, setOptionIndex] = useState(0);
  const [text, setText] = useState({ 1: "", 2: "", 3: "", 4: "" });

  useEffect(() => {
    // const { questions = [] } = viewExamInDetailsData || {};
    let ans =
      viewExamInDetailsData?.questions?.length &&
      viewExamInDetailsData?.questions[optionIndex]?.options;
    const { notes = {} } = selectedExamForEdit || {};
    setEditSubjectName(subjectName);
    setExamDuration(notes[0]);
    setExamTime(notes[1]);
    ans && setText({ 1: ans[0], 2: ans[1], 3: ans[2], 4: ans[3] });
  }, [subjectName, notes]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    dispatch(getViewExamForStudent());
    dispatch(getViewExamInDetails(examId));
  }, [isEditExamData, isFetchExamInDetailsData]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSelectQuestion = (e) => {
    const { value } = e.target;

    setOptionIndex(value);
  };

  const handleOptionChange = (e) => {
    const { value, id } = e.target;
    const { questions } = viewExamInDetailsData;
    setOption(value);
    setText({ ...text, ...{ [id]: value } });
    questions[optionIndex].answer = value;
  };

  const handelAnswer = (e) => {
    const { questions } = viewExamInDetailsData;
    const { value, id } = e.target;

    setText({ ...text, ...{ [id]: value } });

    console.log("value :>> ", value);
    // console.log("text :>> ", text);

    questions[optionIndex].options = Object.values(text);
  };

  console.log("text :>> ", text);

  const handleUpdateExamDetails = () => {
    const { questions } = viewExamInDetailsData;
    const body = {
      subjectName: editSubjectName,
      questions,
      notes: [`${examDuration}`, `${examTime}`],
    };
    console.log("body", body);
    dispatch(getEditExamForStudent(examId, body));
  };

  return (
    <div>
      <h2>Edit exam</h2>
      <li>subject name : {selectedExamForEdit?.subjectName}</li>{" "}
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
          {viewExamInDetailsData?.questions?.map((que, i) => {
            const { question } = que;
            return (
              <option value={i} key={i}>
                {" "}
                {question}
              </option>
            );
          })}{" "}
        </select>{" "}
        <div>
          <input
            type="text"
            placeholder="Selected answer"
            value={option}
            readOnly="true"
          />
          {Object.values(text)?.map((opt, i) => {
            return (
              <>
                <label htmlFor={i + 1}>
                  <input
                    type="radio"
                    name="opions"
                    id={i + 1}
                    onChange={(e) => handleOptionChange(e)}
                    value={opt}
                  />
                  <input
                    type="text"
                    name="option_Answer1"
                    placeholder="Enter option 1 answer"
                    value={opt}
                    id={i + 1}
                    onChange={(e) => handelAnswer(e)}
                  />{" "}
                </label>
              </>
            );
          })}
        </div>{" "}
      </div>{" "}
      <div>
        <Link className="auth-link" to="/view-exam">
          {" "}
          Back to view exam page
        </Link>{" "}
      </div>{" "}
      <button
        className="submit-form"
        type="button"
        onClick={handleUpdateExamDetails}
      >
        Update changes
      </button>
      <table>
        {" "}
        <tbody>
          <tr>
            {" "}
            <th>Question</th> <th>Answer</th>
            <th>Options</th>
          </tr>
          {viewExamInDetailsData?.questions?.map((que, i) => {
            const { question, answer, options } = que;
            return (
              <tr key={i}>
                {" "}
                <td>{question} </td> <td>{answer}</td>{" "}
                {options.map((opt) => {
                  return (
                    <tr>
                      <td>{opt}</td>{" "}
                    </tr>
                  );
                })}
              </tr>
            );
          })}{" "}
        </tbody>
      </table>{" "}
    </div>
  );
};
export default EditExamDetails;
