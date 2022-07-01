import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCreateExamForStudent,
  createdExamBody,
  createExamForStudentSuccess,
} from "../../../redux/actions/exam";
import CustomButton from "../../../shared/Button/CustomButton";
import InputField from "../../../shared/InputField/InputField";
import TableWithMultiData from "../../../shared/TableWithMultiData/TableWithMultiData";
import Loader from "../../../shared/Loader";
import { useNavigate } from "react-router";
import "./create-exam.scss";

const initialState = { subjectName: "", questions: [], notes: [] };

const CreateExam = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { createExamBody, createExamDataLoading, createExamData } = useSelector(
    ({ exam }) => exam
  );

  const [question, setQuestion] = useState({ que: "", err: "" });
  const [option, setOption] = useState({ answer: "", key: null });
  const [optionAnswer, setOptionAnswer] = useState({});
  const [examForm, setExamForm] = useState(initialState);

  useEffect(() => {
    if (createExamData?.data?.statusCode === 200) {
      dispatch(createExamForStudentSuccess({}));
      navigate("/view-exam");
    }
    dispatch(createdExamBody({ initialState }));
  }, [createExamData?.data?.statusCode]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = () => {
    const { subjectName, notes, questions } = examForm;
    if (examForm?.questions?.length < 15) return;
    dispatch(getCreateExamForStudent({ subjectName, notes, questions }));
    setExamForm(initialState);
  };

  const handleSetQuestions = (e) => {
    const { value } = e.target;
    setQuestion({ ...question, que: value });
  };

  const handleAddQuestions = () => {
    const { subjectName, notes, questions } = examForm;
    let cloneQuestions = [...questions];
    const paperObj = {
      question: question?.que,
      answer: option?.answer,
      options: Object.values(optionAnswer),
    };
    if (
      createExamBody?.questions
        ?.map((ele) => ele.question)
        .includes(paperObj?.question)
    ) {
      setQuestion({ ...question, err: "Please add unique question" });
      return;
    }

    cloneQuestions.push(paperObj);
    setExamForm({
      ...examForm,
      questions: cloneQuestions,
    });
    dispatch(
      createdExamBody({ subjectName, notes, questions: cloneQuestions })
    );
    setQuestion({ que: "", err: "" });
  };

  const handleClearForm = () => {
    setQuestion({ que: "", err: "" });
    setOption({ answer: "", key: null });
    setOptionAnswer({
      "opt-ans-1": "",
      "opt-ans-2": "",
      "opt-ans-3": "",
      "opt-ans-4": "",
    });
    let radio = document.querySelector(
      "input[type=radio][name=options]:checked"
    );
    radio.checked = false;
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

      {createExamData?.data?.statusCode === 500 ||
      createExamData?.data?.statusCode === 401 ? (
        ""
      ) : (
        <>
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
                disable={createExamBody?.subjectName ? true : false}
                value={createExamBody?.subjectName || examForm?.subjectName}
              />
              <InputField
                type="text"
                placeholder="Enter question"
                name="subjectName"
                handleChange={(e) => handleSetQuestions(e)}
                value={question?.que}
              />
              {question?.err ? (
                <span className="error-message">{question?.err}</span>
              ) : (
                ""
              )}
              {[1, 2, 3, 4]?.map((ele, i) => {
                return (
                  <label
                    className="text-radio"
                    htmlFor={`options${i + 1}`}
                    key={i}
                  >
                    <InputField
                      type="radio"
                      name="options"
                      id={`opt-ans-${i + 1}`}
                      handleChange={(e) => handelAnswer(e)}
                      value={optionAnswer[`opt-ans-${i + 1}`]}
                    />
                    <InputField
                      type="text"
                      name="option_Answer1"
                      placeholder={`Enter option ${i + 1} answer`}
                      value={optionAnswer[`opt-ans-${i + 1}`]}
                      id={`opt-ans-${i + 1}`}
                      handleChange={(e) => handelAnswer(e, option.key)}
                    />
                  </label>
                );
              })}

              <InputField
                type="text"
                placeholder="Select answer"
                readOnly={true}
                value={option?.answer}
              />
              {createExamBody?.notes?.length === 2 ||
              examForm?.notes?.length === 2 ? (
                ""
              ) : (
                <div>
                  {createExamBody?.notes?.length === 1 ||
                  examForm?.notes?.length === 1 ? (
                    <h4>Please add exam time in minutes below.</h4>
                  ) : (
                    <h4>Please add exam duration below.</h4>
                  )}
                  <InputField
                    type="text"
                    name="note"
                    placeholder={
                      createExamBody?.notes?.length === 1 ||
                      examForm?.notes?.length === 1
                        ? "Please add exam time ex:- 10am"
                        : "Please add exam duration ex:- 20mins"
                    }
                    handleChange={(e) => handleChange(e)}
                    value={examForm?.note || ""}
                  />

                  <CustomButton
                    onClick={() => handleAddNotes(examForm?.note)}
                    className={
                      !!examForm?.note ? "submit-form" : "submit-form disable"
                    }
                    buttonText="Add note +"
                    disabled={!!examForm?.note ? false : true}
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
                      (!!examForm?.subjectName ||
                        !!createExamBody?.subjectName) &&
                      !!question?.que &&
                      !!option &&
                      !!option?.answer &&
                      (examForm?.notes?.length > 1 ||
                        createExamBody?.notes?.length > 1)
                        ? false
                        : true
                    }
                    className={
                      (!!examForm?.subjectName ||
                        !!createExamBody?.subjectName) &&
                      !!question?.que &&
                      !!option &&
                      !!option?.answer &&
                      (examForm?.notes?.length > 1 ||
                        createExamBody?.notes?.length > 1)
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
        </>
      )}
    </div>
  ) : (
    <Loader />
  );
};
export default CreateExam;
