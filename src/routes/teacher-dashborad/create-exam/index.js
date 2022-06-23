import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCreateExamForStudent,
  createdExamBody,
} from "../../../redux/actions/exam";
import Button from "../../../shared/Button/Button";
import TableWithMultiData from "../../../shared/TableWithMultiData/TableWithMultiData";
import "./create-exam.scss";

const initialState = { subjectName: "", questions: [], notes: [] };

const CreateExam = () => {
  const dispatch = useDispatch();
  const { createExamBody } = useSelector(({ exam }) => exam);

  const [question, setQuestion] = useState("");
  const [option, setOption] = useState({ answer: "", key: null });
  const [optionAnswer, setOptionAnswer] = useState({});
  const [examForm, setExamForm] = useState(initialState);

  const handleSubmit = () => {
    const { subjectName, notes, questions } = examForm;
    if (examForm?.questions?.length > 14) return;
    dispatch(getCreateExamForStudent({ subjectName, notes, questions }));
  };

  const handleSetQuestions = (e) => {
    const { value } = e.target;
    setQuestion(value);
  };

  const handleAddQuestions = () => {
    const { subjectName, notes, questions } = examForm;
    let cloneQuestions = [...questions];
    const paperObj = {
      question: question,
      answer: option?.answer,
      options: Object.values(optionAnswer),
    };
    cloneQuestions.push(paperObj);
    setExamForm({
      ...examForm,
      questions: cloneQuestions,
    });
    dispatch(
      createdExamBody({ subjectName, notes, questions: cloneQuestions })
    );
    setQuestion("");
  };

  const handleClearForm = () => {
    setExamForm({
      ...examForm,
      questions: [],
      subjectName: "",
      notes: [],
    });
    setQuestion("");
    setOption({});
    setOptionAnswer({});
  };

  const handelAnswer = (e, key) => {
    const { value, id, name } = e.target;
    name === "options" && setOption({ answer: value, key: id });
    id === key && setOption({ answer: value, key: id });
    setOptionAnswer({ ...optionAnswer, ...{ [id]: value } });
  };
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setExamForm({
      ...examForm,
      [name]: value,
    });
  };
  const handleAddNotes = (value) => {
    if (!value) return;
    const cloneNotes = [...examForm?.notes];
    cloneNotes.push(value);
    setExamForm({
      ...examForm,
      notes: cloneNotes,
      note: "",
    });
  };
  return (
    <div>
      {examForm?.questions?.length > 14 ? (
        <h2>Please click create exam button for submit exam paper</h2>
      ) : (
        ""
      )}
      {examForm?.questions?.length > 14 ? (
        ""
      ) : (
        <>
          <input
            type="text"
            name="subjectName"
            placeholder="Enter subject name"
            onChange={(e) => handleChange(e)}
            value={examForm?.subjectName}
          />{" "}
          <input
            type="text"
            placeholder="Enter question"
            value={question}
            onChange={handleSetQuestions}
          />
          <label className="text-radio" htmlFor="options1">
            {" "}
            <input
              type="radio"
              name="options"
              id="opt-ans-1"
              onChange={(e) => handelAnswer(e)}
              value={optionAnswer["opt-ans-1"]}
            />{" "}
            <input
              type="text"
              name="option_Answer1"
              placeholder="Enter option 1 answer"
              value={optionAnswer["opt-ans-1"]}
              id="opt-ans-1"
              onChange={(e) => handelAnswer(e, option.key)}
            />
          </label>
          <label className="text-radio" htmlFor="options2">
            <input
              type="radio"
              name="options"
              id="opt-ans-2"
              onChange={(e) => handelAnswer(e)}
              value={optionAnswer["opt-ans-2"]}
            />{" "}
            <input
              type="text"
              name="option_Answer2"
              placeholder="Enter option 2 answer"
              value={optionAnswer["opt-ans-2"]}
              id="opt-ans-2"
              onChange={(e) => handelAnswer(e, option.key)}
            />
          </label>
          <label className="text-radio" htmlFor="options3">
            <input
              type="radio"
              name="options"
              id="opt-ans-3"
              onChange={(e) => handelAnswer(e)}
              value={optionAnswer["opt-ans-3"]}
            />{" "}
            <input
              type="text"
              name="option_Answer3"
              placeholder="Enter option 3 answer"
              value={optionAnswer["opt-ans-3"]}
              id="opt-ans-3"
              onChange={(e) => handelAnswer(e, option.key)}
            />
          </label>
          <label className="text-radio" htmlFor="options4">
            <input
              type="radio"
              name="options"
              id="opt-ans-4"
              onChange={(e) => handelAnswer(e)}
              value={optionAnswer["opt-ans-4"]}
            />{" "}
            <input
              type="text"
              name="option_Answer4"
              placeholder="Enter option 4 answer"
              value={optionAnswer["opt-ans-4"]}
              id="opt-ans-4"
              onChange={(e) => handelAnswer(e, option.key)}
            />{" "}
          </label>{" "}
          <input
            type="text"
            placeholder="Select answer"
            value={option?.answer}
            readOnly="true"
          />
          {examForm?.notes?.length === 2 ? (
            ""
          ) : (
            <div>
              {" "}
              <input
                type="text"
                name="note"
                placeholder="Notes"
                onChange={(e) => handleChange(e)}
                value={examForm?.note}
              />
              <Button
                onClick={() => handleAddNotes(examForm?.note)}
                className="submit-form"
                buttonText="Add note +"
              />
            </div>
          )}
          {examForm?.questions?.length > 14 ? (
            ""
          ) : (
            <>
              <Button
                buttonText="Add question"
                onClick={handleAddQuestions}
                type="button"
                isDisable={
                  !!examForm?.subjectName &&
                  !!question &&
                  !!option &&
                  !!examForm?.notes?.length
                    ? false
                    : true
                }
                className={
                  !!examForm?.subjectName &&
                  !!question &&
                  !!option &&
                  !!examForm?.notes?.length
                    ? "submit-form"
                    : "submit-form disable"
                }
              />
              <Button
                type="button"
                onClick={handleClearForm}
                className="submit-form"
                buttonText=" Clear form"
              />
            </>
          )}{" "}
        </>
      )}
      {examForm?.questions?.length > 14 ? (
        ""
      ) : (
        <h4>Please add maximum 15 questions.</h4>
      )}
      <Button
        type="button"
        onClick={handleSubmit}
        className={
          examForm?.questions?.length > 14
            ? "submit-form"
            : "submit-form disable"
        }
        isDisable={examForm?.questions?.length > 14 ? false : true}
        buttonText="Create exam"
      />

      <hr />
      <div>
        <li>subject name : {createExamBody?.subjectName}</li>{" "}
        {createExamBody?.notes?.map((time, i) => {
          return <li key={i}>{time} </li>;
        })}
        <TableWithMultiData
          tableHeadData={["Question", "Answer", "Options"]}
          tableData={createExamBody?.questions}
        />
      </div>
    </div>
  );
};
export default CreateExam;
