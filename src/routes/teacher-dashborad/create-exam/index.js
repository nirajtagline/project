import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCreateExamForStudent,
  createdExamBody,
  createExamForStudentSuccess,
  getViewExamForStudent,
  viewExamInDetailsSuccess,
  getViewExamInDetails,
  editExamForStudentSuccess,
  getEditExamForStudent,
} from "../../../redux/actions/exam";
import CustomButton from "../../../shared/Button/CustomButton";
import InputField from "../../../shared/InputField/InputField";
import TableWithMultiData from "../../../shared/TableWithMultiData/TableWithMultiData";
import Loader from "../../../shared/Loader/Loader";
import { useNavigate, useParams } from "react-router";
import "./create-exam.scss";

const initialState = { subjectName: "", questions: [], notes: [] };

const CreateExam = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { examId } = useParams();

  const {
    viewExamInDetailsData,
    viewExamData,
    editExamDataLoading,
    editExamData,
    viewExamDataLoading,
    createExamBody,
    createExamDataLoading,
    createExamData,
    viewExamInDetailsDataLoading,
  } = useSelector(({ exam }) => exam);

  const selectedExamForEdit =
    viewExamData && viewExamData?.find((exam) => exam._id === examId);

  const [question, setQuestion] = useState({ que: "", err: "" });
  const [option, setOption] = useState({ answer: "", key: null });
  const [optionAnswer, setOptionAnswer] = useState({});
  const [optionIndex, setOptionIndex] = useState();
  const [examForm, setExamForm] = useState(initialState);

  useEffect(() => {
    if (createExamData?.data?.statusCode === 200) {
      dispatch(createExamForStudentSuccess({}));
      navigate("/view-exam");
    }

    if (!!examId) {
      dispatch(getViewExamInDetails(examId));
      dispatch(getViewExamForStudent());
      dispatch(createdExamBody({ initialState }));
      dispatch(editExamForStudentSuccess({}));
    } else {
      dispatch(createdExamBody({ initialState }));
    }
    if (editExamData?.data?.statusCode === 200) {
      dispatch(editExamForStudentSuccess({}));
      navigate("/view-exam");
    }

    return () => {
      dispatch(createdExamBody({ initialState }));
      dispatch(viewExamInDetailsSuccess({}));
      setOptionAnswer({
        "opt-ans-1": "",
        "opt-ans-2": "",
        "opt-ans-3": "",
        "opt-ans-4": "",
      });
      setQuestion({ que: "", err: "" });
      setOption({ answer: "", key: null });
    };
  }, [
    examId,
    editExamData?.data?.statusCode,
    createExamData?.data?.statusCode,
  ]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!!examId) {
      const { questions = [] } = viewExamInDetailsData?.data || {};
      const { subjectName = "", notes = [] } = selectedExamForEdit || {};

      dispatch(createdExamBody({ subjectName, notes, questions }));
    }
  }, [
    viewExamInDetailsData?.data?.questions?.length,
    selectedExamForEdit?.subjectName,
    selectedExamForEdit?.notes?.length,
  ]); // eslint-disable-line react-hooks/exhaustive-deps

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
    handleClearForm();
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

  // edit exam section
  const handleSelectQuestion = (e) => {
    const { value } = e.target;
    if (value === "") {
      handleClearForm();
      return;
    }
    setOptionIndex(value);

    let cloneQuestionsAry = viewExamInDetailsData?.data?.questions[value];
    setQuestion({
      ...question,
      que: cloneQuestionsAry?.question,
    });

    const { options } = cloneQuestionsAry;
    setOptionAnswer({
      "opt-ans-1": options[0],
      "opt-ans-2": options[1],
      "opt-ans-3": options[2],
      "opt-ans-4": options[3],
    });
  };

  const handleUpdateOptions = () => {
    const { questions } = createExamBody;
    let cloneQuestions = [...questions];

    cloneQuestions[optionIndex].options = Object.values(optionAnswer);
    cloneQuestions[optionIndex].answer = option?.answer;

    setOptionIndex();
    handleClearForm();
    let permissionDropdown = document.getElementById("question_dropdown");
    permissionDropdown.selectedIndex = 0;
  };

  const handleUpdateExamDetails = () => {
    dispatch(getEditExamForStudent(examId, createExamBody));
  };
  return !createExamDataLoading &&
    !editExamDataLoading &&
    !viewExamDataLoading &&
    !viewExamInDetailsDataLoading ? (
    <div>
      <h1>{examId ? "Edit Exam" : "Create Exam"}</h1>
      {!!createExamData?.data?.message ? (
        <h2>{createExamData?.data?.message}</h2>
      ) : (
        ""
      )}
      {viewExamInDetailsData?.statusCode === 500 ? (
        <h3 className="error-message">{viewExamInDetailsData?.message}</h3>
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

              {!!examId && !viewExamDataLoading ? (
                <>
                  <h3>Please select question for edit</h3>
                  <select
                    onChange={handleSelectQuestion}
                    id="question_dropdown"
                  >
                    <option value="">--Please Choose an Questions--</option>
                    {createExamBody?.questions?.map((que, i) => {
                      const { question } = que;
                      return (
                        <option value={i} key={i}>
                          {question}
                        </option>
                      );
                    })}
                  </select>
                </>
              ) : (
                ""
              )}
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
                      disable={optionAnswer[`opt-ans-${i + 1}`] ? false : true}
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
                  {!!examId ? (
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
                          Object.keys(optionAnswer).filter(
                            (k) => optionAnswer[k] !== ""
                          )?.length > 3 &&
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
                          Object.keys(optionAnswer).filter(
                            (k) => optionAnswer[k] !== ""
                          )?.length > 3 &&
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
              {!!examId ? (
                <CustomButton
                  type="button"
                  className={
                    !!optionIndex ? "submit-form" : "submit-form disable"
                  }
                  onClick={handleUpdateOptions}
                  buttonText="Update options"
                  disabled={!!optionIndex ? false : true}
                />
              ) : (
                ""
              )}
            </>
          )}
          {!!examId ? (
            ""
          ) : (
            <>
              {examForm?.questions?.length > 14 ? (
                ""
              ) : (
                <h4>Please add maximum 15 unique questions to create exam.</h4>
              )}
            </>
          )}
          {!!examId ? (
            <CustomButton
              type="button"
              className="submit-form"
              onClick={handleUpdateExamDetails}
              buttonText="Update changes"
            />
          ) : (
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
          )}

          <hr />
          <div>
            <li>Subject name : {createExamBody?.subjectName}</li>
            {createExamBody?.notes?.map((time, i) => {
              return <li key={i}>{time} </li>;
            })}
            {!viewExamInDetailsDataLoading ? (
              <TableWithMultiData
                tableHeadData={["Question", "Answer", "Options"]}
                tableData={
                  createExamBody?.questions && createExamBody?.questions
                }
              />
            ) : (
              "Loading data"
            )}
          </div>
        </>
      )}
    </div>
  ) : (
    <Loader />
  );
};
export default CreateExam;
