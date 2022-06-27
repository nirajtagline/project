import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getEditExamForStudent,
  getViewExamForStudent,
  getViewExamInDetails,
  editExamForStudentSuccess,
} from "../../../redux/actions/exam";
import CustomButton from "../../../shared/Button/CustomButton";
import InputField from "../../../shared/InputField/InputField";
import TableWithMultiData from "../../../shared/TableWithMultiData/TableWithMultiData";
import Loader from "../../../shared/Loader";
import "./edit-exam.scss";

const EditExamDetails = () => {
  const dispatch = useDispatch();
  const { examId } = useParams();
  const {
    viewExamInDetailsData,
    viewExamData,
    isEditExamData,
    isFetchExamInDetailsData,
    editExamDataLoading,
    editExamData,
    viewExamDataLoading,
  } = useSelector(({ exam }) => exam);

  const initialState = { subjectName: "", questions: [], notes: [] };

  const selectedExamForEdit =
    viewExamData && viewExamData?.find((exam) => exam._id === examId);

  const [examDuration, setExamDuration] = useState({ 0: "", 1: "" });
  const [option, setOption] = useState("");
  const [optionIndex, setOptionIndex] = useState();
  const [text, setText] = useState({ 1: "", 2: "", 3: "", 4: "" });
  const [examForm, setExamForm] = useState(initialState);

  useEffect(() => {
    dispatch(getViewExamForStudent());
    dispatch(getViewExamInDetails(examId));
    dispatch(editExamForStudentSuccess({}));
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
    !!value && setOption(value);
    !!value && setText({ ...text, ...{ [id]: value } });
  };

  const handelAnswer = (e) => {
    const { value, id } = e.target;
    setText({ ...text, ...{ [id]: value } });
  };
  const handleUpdateOptions = () => {
    const { questions } = examForm;
    questions[optionIndex].options = Object.values(text);
    questions[optionIndex].answer = option;

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
    const cloneExamDuration = { ...examDuration };

    if (cloneExamDuration[0] === "") {
      cloneExamDuration[0] = examForm?.notes[0];
    }
    if (cloneExamDuration[1] === "") {
      cloneExamDuration[1] = examForm?.notes[1];
    }

    setExamForm({ ...examForm, notes: Object.values(cloneExamDuration) });
  };

  const handleDuration = (e) => {
    const { value, id } = e.target;

    setExamDuration({ ...examDuration, ...{ [id]: value } });
  };

  return !editExamDataLoading && !viewExamDataLoading ? (
    <div>
      <h2>Edit exam</h2>
      {editExamData?.data?.message ? (
        <h2>{editExamData?.data?.message}</h2>
      ) : (
        ""
      )}
      <li>subject name : {selectedExamForEdit?.subjectName}</li>{" "}
      <InputField
        type="text"
        placeholder="Enter subject name"
        name="subjectName"
        value={examForm?.subjectName}
        handleChange={(e) => handleEditExam(e)}
      />
      <li>Exam duration : {examForm?.notes[0]}</li>
      <li>Exam start time : {examForm?.notes[1]}</li>
      <div>
        <InputField
          name="notes"
          placeholder=" Update Exam duration"
          value={examDuration[0]}
          id={0}
          handleChange={(e) => handleDuration(e)}
        />
      </div>
      <div>
        <InputField
          name="notes"
          placeholder="Update Exam start time"
          value={examDuration[1]}
          id={1}
          handleChange={(e) => handleDuration(e)}
        />

        <CustomButton
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
              <div className="flex">
                {Object.values(text)?.map((opt, i) => {
                  return (
                    <React.Fragment key={i}>
                      <label htmlFor={i + 1} className="flex">
                        <InputField
                          type="radio"
                          name="opions"
                          id={i + 1}
                          value={opt}
                          handleChange={(e) => handleOptionChange(e)}
                        />
                        <InputField
                          type="text"
                          name="option_Answer1"
                          placeholder="Enter option 1 answer"
                          value={opt}
                          id={i + 1}
                          handleChange={(e) => handelAnswer(e)}
                        />
                      </label>
                    </React.Fragment>
                  );
                })}
              </div>
              <InputField
                type="text"
                placeholder="Selected answer"
                value={option}
                readOnly={true}
                label="Selected option :-  "
              />
            </div>

            <CustomButton
              type="button"
              className={!!option ? "submit-form" : "submit-form disable"}
              onClick={handleUpdateOptions}
              buttonText="Update options"
              disabled={!!option ? false : true}
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
      <CustomButton
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
  ) : (
    <Loader />
  );
};
export default EditExamDetails;
