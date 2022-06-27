import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router";
import { getExamPaper, submitExamOfStudent } from "../../../redux/actions";
import TableWithMultiData from "../../../shared/TableWithMultiData/TableWithMultiData";
import CustomButton from "../../../shared/Button/CustomButton";
import Loader from "../../../shared/Loader";

const ExamPaper = () => {
  const dispatch = useDispatch();
  const { examId } = useParams();
  const {
    examPaperData,
    submitExamData,
    submitExamDataLoading,
    examPaperLoading,
  } = useSelector(({ exam }) => exam);

  useEffect(() => {
    dispatch(getExamPaper(examId));
  }, [examId]); // eslint-disable-line react-hooks/exhaustive-deps

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
        <h2>{examPaperData?.message ? examPaperData?.message : ""}</h2>

        {!!examPaperData?.data?.length ? (
          <>
            <TableWithMultiData
              tableHeadData={["Question Id", "Question", "Options"]}
              tableData={examPaperData?.data}
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
