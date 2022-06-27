import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCreateExamForStudent,
  createdExamBody,
} from "../../../redux/actions/exam";
import CustomButton from "../../../shared/Button/CustomButton";
import InputField from "../../../shared/InputField/InputField";
import TableWithMultiData from "../../../shared/TableWithMultiData/TableWithMultiData";
import Loader from "../../../shared/Loader";
import "./create-exam.scss";

const initialState = { subjectName: "", questions: [], notes: [] };

const CreateExam = () => {
  const dispatch = useDispatch();
  const { createExamBody, createExamDataLoading, createExamData } = useSelector(
    ({ exam }) => exam
  );

  const [question, setQuestion] = useState("");
  const [option, setOption] = useState({ answer: "", key: null });
  const [optionAnswer, setOptionAnswer] = useState({});
  const [examForm, setExamForm] = useState(initialState);

  const handleSubmit = () => {
    const { subjectName, notes, questions } = examForm;
    if (examForm?.questions?.length < 15) return;
    dispatch(getCreateExamForStudent({ subjectName, notes, questions }));
    setExamForm(initialState);
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
    if (
      createExamBody?.questions
        ?.map((ele) => ele.question)
        .includes(paperObj?.question)
    )
      return;

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

  const isUnique = (value, index, array) => {
    return array.indexOf(value) === array.lastIndexOf(value);
  };

  const handelAnswer = (e, key) => {
    const { value, id, name } = e.target;

    if (name === "options" && Object.values(optionAnswer).every(isUnique)) {
      setOption({ answer: value, key: id });
    } else {
      setOption({ answer: "", key: "" });
    }
    if (id === key) {
      setOption({ answer: value, key: id });
    }
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

  return !createExamDataLoading ? (
    <div>
      {!!createExamData?.data?.message ? (
        <h2>{createExamData?.data?.message}</h2>
      ) : (
        ""
      )}
      {examForm?.questions?.length > 14 ? (
        <h2>Please click create exam button for submit exam paper</h2>
      ) : (
        ""
      )}
      {examForm?.questions?.length > 14 ? (
        ""
      ) : (
        <>
          <InputField
            type="text"
            placeholder="Enter subject name"
            name="subjectName"
            handleChange={(e) => handleChange(e)}
          />
          <InputField
            type="text"
            placeholder="Enter question"
            name="subjectName"
            handleChange={(e) => handleSetQuestions(e)}
            value={question}
          />
          <label className="text-radio" htmlFor="options1">
            <InputField
              type="radio"
              name="options"
              id="opt-ans-1"
              handleChange={(e) => handelAnswer(e)}
              value={optionAnswer["opt-ans-1"]}
            />
            <InputField
              type="text"
              name="option_Answer1"
              placeholder="Enter option 1 answer"
              value={optionAnswer["opt-ans-1"]}
              id="opt-ans-1"
              handleChange={(e) => handelAnswer(e, option.key)}
            />
          </label>
          <label className="text-radio" htmlFor="options2">
            <InputField
              type="radio"
              name="options"
              id="opt-ans-2"
              handleChange={(e) => handelAnswer(e)}
              value={optionAnswer["opt-ans-2"]}
            />
            <InputField
              type="text"
              name="option_Answer2"
              placeholder="Enter option 2 answer"
              value={optionAnswer["opt-ans-2"]}
              id="opt-ans-2"
              handleChange={(e) => handelAnswer(e, option.key)}
            />
          </label>
          <label className="text-radio" htmlFor="options3">
            <InputField
              type="radio"
              name="options"
              id="opt-ans-3"
              handleChange={(e) => handelAnswer(e)}
              value={optionAnswer["opt-ans-3"]}
            />
            <InputField
              type="text"
              name="option_Answer3"
              placeholder="Enter option 3 answer"
              value={optionAnswer["opt-ans-3"]}
              id="opt-ans-3"
              handleChange={(e) => handelAnswer(e, option.key)}
            />
          </label>
          <label className="text-radio" htmlFor="options4">
            <InputField
              type="radio"
              name="options"
              id="opt-ans-4"
              handleChange={(e) => handelAnswer(e)}
              value={optionAnswer["opt-ans-4"]}
            />
            <InputField
              type="text"
              name="option_Answer4"
              placeholder="Enter option 4 answer"
              value={optionAnswer["opt-ans-4"]}
              id="opt-ans-4"
              handleChange={(e) => handelAnswer(e, option.key)}
            />
          </label>
          <InputField
            type="text"
            placeholder="Select answer"
            readOnly={true}
            value={option?.answer}
          />
          {examForm?.notes?.length === 2 ? (
            ""
          ) : (
            <div>
              <InputField
                type="text"
                name="note"
                placeholder="Notes"
                handleChange={(e) => handleChange(e)}
              />

              {examForm?.notes?.length === 1 ? (
                <h4>Please add 1 more notes.</h4>
              ) : (
                <h4>Please add 2 notes.</h4>
              )}
              <CustomButton
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
              <CustomButton
                buttonText="Add question"
                onClick={handleAddQuestions}
                type="button"
                disabled={
                  !!examForm?.subjectName &&
                  !!question &&
                  !!option &&
                  !!option?.answer &&
                  !!examForm?.notes?.length
                    ? false
                    : true
                }
                className={
                  !!examForm?.subjectName &&
                  !!question &&
                  !!option &&
                  !!option?.answer &&
                  !!examForm?.notes?.length
                    ? "submit-form"
                    : "submit-form disable"
                }
              />
              <CustomButton
                type="button"
                onClick={handleClearForm}
                className="submit-form"
                buttonText=" Clear form"
              />
            </>
          )}
        </>
      )}
      {examForm?.questions?.length > 14 ? (
        ""
      ) : (
        <h4>Please add maximum 15 unique questions.</h4>
      )}
      <CustomButton
        type="button"
        onClick={handleSubmit}
        className={
          examForm?.questions?.length > 14
            ? "submit-form"
            : "submit-form disable"
        }
        disabled={examForm?.questions?.length > 14 ? false : true}
        buttonText="Create exam"
      />

      <hr />
      <div>
        <li>subject name : {createExamBody?.subjectName}</li>
        {createExamBody?.notes?.map((time, i) => {
          return <li key={i}>{time} </li>;
        })}
        <TableWithMultiData
          tableHeadData={["Question", "Answer", "Options"]}
          tableData={createExamBody?.questions}
        />
      </div>
    </div>
  ) : (
    <Loader />
  );
};
export default CreateExam;
