import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router";
import {
  getExamPaper,
  submitExamOfStudent,
  submitExamSuccess,
} from "../../../redux/actions";
import TableWithMultiData from "../../../shared/TableWithMultiData/TableWithMultiData";
import CustomButton from "../../../shared/Button/CustomButton";
import Loader from "../../../shared/Loader";

const ExamPaper = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { examId } = useParams();
  const { examPaper, submitExamData, submitExamDataLoading, examPaperLoading } =
    useSelector(({ exam }) => exam);

  useEffect(() => {
    dispatch(getExamPaper(examId));
    if (submitExamData?.data?.statusCode === 200) {
      dispatch(submitExamSuccess({}));
      navigate("/all-exam-student");
    }
  }, [examId, submitExamData?.data?.statusCode]); // eslint-disable-line react-hooks/exhaustive-deps

  console.log("submitExamData :>> ", submitExamData);

  const [answerSheet, setAnswerSheet] = useState([]);

  const handleOptChange = ({ target }) => {
    const cloneData = [...answerSheet];
    const { name, id } = target;
    let answer = { question: name, answer: id };

    if (cloneData.map((data) => data.question).includes(name)) {
      const index = cloneData.findIndex((data) => data.question === name);
      cloneData[index] = answer;
      setAnswerSheet(cloneData);
    } else setAnswerSheet([...answerSheet, answer]);
  };

  const handleSubmitPaper = () => {
    dispatch(submitExamOfStudent(answerSheet, examId)).then(() => {
      Navigate("/all-exam-student");
    });
  };

  return !submitExamDataLoading && !examPaperLoading ? (
    <div className="flex">
      <h2>
        {submitExamData?.data?.message ? submitExamData?.data?.message : ""}
      </h2>
      <div>
        <h2>{examPaper?.message ? examPaper?.message : ""}</h2>

        {!!examPaper?.data?.length ? (
          <>
            <TableWithMultiData
              tableHeadData={["Question Id", "Question", "Options"]}
              tableData={examPaper?.data}
              isRadio={true}
              handleChange={(e) => handleOptChange(e)}
            />

            <CustomButton
              type="button"
              buttonText="Submit exam paper"
              onClick={handleSubmitPaper}
              className={
                answerSheet?.length > 6 ? "submit-form" : "submit-form disable"
              }
              disabled={answerSheet?.length > 6 ? false : true}
            />
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default ExamPaper;
