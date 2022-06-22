import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getExamPaper } from "../../../redux/actions";

const ExamPaper = () => {
  const dispatch = useDispatch();
  const { examId } = useParams();

  useEffect(() => {
    dispatch(getExamPaper(examId));
  }, [examId]); // eslint-disable-line react-hooks/exhaustive-deps

  const { examPaperData } = useSelector(({ exam }) => exam);

  return (
    <div>
      <h2>{examPaperData?.message ? examPaperData?.message : ""}</h2>
      <table>
        <tbody>
          <tr>
            <th>Questions</th>
            <th>ID</th>
            <th>Options</th>
          </tr>

          {examPaperData?.data?.map((que) => {
            const { question, _id, options } = que;
            return (
              <tr>
                <td>{question}</td>
                <td>{_id}</td>
                <td>
                  {options?.map((opt) => {
                    return (
                      <tr>
                        <td>{opt}</td>
                      </tr>
                    );
                  })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ExamPaper;
