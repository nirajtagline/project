import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getEditExamForStudent,
  getViewExamForStudent,
  getViewExamInDetails,
} from "../../../redux/actions/exam";
import Button from "../../../shared/Button/Button";
import TableWithMultiData from "../../../shared/TableWithMultiData/TableWithMultiData";
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

  const initialState = { subjectName: "", questions: [], notes: [] };

  const selectedExamForEdit =
    viewExamData && viewExamData?.find((exam) => exam._id === examId);

  const [examDuration, setExamDuration] = useState({});
  const [option, setOption] = useState("");
  const [optionIndex, setOptionIndex] = useState();
  const [text, setText] = useState({ 1: "", 2: "", 3: "", 4: "" });
  const [examForm, setExamForm] = useState(initialState);

  useEffect(() => {
    dispatch(getViewExamForStudent());
    dispatch(getViewExamInDetails(examId));
  }, [isEditExamData, isFetchExamInDetailsData]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const { questions } = viewExamInDetailsData || {};
    const { subjectName = "", notes = [] } = selectedExamForEdit || [];
    setExamForm({
      subjectName,
      questions,
      notes,
    });
  }, [viewExamInDetailsData]); // eslint-disable-line react-hooks/exhaustive-deps

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
    const { value, id } = e.target;
    setText({ ...text, ...{ [id]: value } });
  };
  const handleUpdateOptions = () => {
    const { questions } = examForm;
    questions[optionIndex].options = Object.values(text);
    setExamForm({
      ...examForm,
    });
  };

  const handleUpdateExamDetails = () => {
    dispatch(getEditExamForStudent(examId, examForm));
  };

  const handleEditExam = (e) => {
    const { value, name } = e.target;
    setExamForm({ ...examForm, ...{ [name]: value } });
  };

  const handleUpdateNotes = () => {
    if (!Object.values(examDuration)?.length) return;
    setExamForm({ ...examForm, notes: Object.values(examDuration) });
  };

  const handleDuration = (e) => {
    const { value, id } = e.target;

    setExamDuration({ ...examDuration, ...{ [id]: value } });
  };

  return (
    <div>
      <h2>Edit exam</h2>
      <li>subject name : {selectedExamForEdit?.subjectName}</li>{" "}
      <input
        type="text"
        name="subjectName"
        onChange={(e) => handleEditExam(e)}
        value={examForm?.subjectName}
        placeholder="Enter subject name"
      />
      <li>Exam duration : {examForm?.notes[0]}</li>
      <li>Exam start time : {examForm?.notes[1]}</li>
      <div>
        <input
          onChange={(e) => handleDuration(e)}
          value={examDuration[0]}
          id={0}
          name="notes"
          placeholder=" Update Exam duration"
        />
      </div>
      <div>
        <input
          onChange={(e) => handleDuration(e)}
          placeholder="Update Exam start time"
          id={1}
          value={examDuration[1]}
          name="notes"
        />
        <Button
          type="button"
          className={
            !Object.values(examDuration)?.length
              ? "submit-form disable"
              : "submit-form "
          }
          onClick={handleUpdateNotes}
          buttonText="Update notes"
        />
      </div>
      <div>
        <h3>Please select question for edit</h3>
        <select onChange={(e) => handleSelectQuestion(e)}>
          <option value="">--Please choose an ouestions--</option>
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
        {!!optionIndex ? (
          <>
            <div>
              <input
                type="text"
                placeholder="Selected answer"
                value={option}
                readOnly="true"
              />
              {Object.values(text)?.map((opt, i) => {
                return (
                  <React.Fragment key={i}>
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
                  </React.Fragment>
                );
              })}
            </div>

            <Button
              type="button"
              className="submit-form"
              onClick={handleUpdateOptions}
              buttonText="Update options"
            />
          </>
        ) : (
          ""
        )}
      </div>
      <div>
        <Link className="auth-link" to="/view-exam">
          {" "}
          Back to view exam page
        </Link>{" "}
      </div>{" "}
      <Button
        type="button"
        className="submit-form"
        onClick={handleUpdateExamDetails}
        buttonText="Update changes"
      />
      <TableWithMultiData
        tableHeadData={["Question", "Answer", "Options"]}
        tableData={examForm?.questions}
      />
    </div>
  );
};
export default EditExamDetails;
