import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCreateExamForStudent,
  createdExamBody,
} from "../../../redux/actions/exam";
import "./create-exam.scss";

const CreateExam = () => {
  const dispatch = useDispatch();

  const { createExamBody } = useSelector(({ exam }) => exam);

  const [subjectName, setSubjectName] = useState("");
  const [paper, setPaper] = useState([]);
  const [question, setQuestion] = useState("");
  const [option, setOption] = useState("");
  const [examBody, setExamBody] = useState({});
  const [examDuration, setExamDuration] = useState("");
  const [examTime, setExamTime] = useState("");
  const [optionAnswer, setOptionAnswer] = useState({});

  const handleSubmit = () => {
    setExamBody({
      subjectName,
      questions: [...paper],
      notes: [`${examDuration} exam`, `start time ${examTime}`],
    });

    dispatch(getCreateExamForStudent(examBody));
  };

  const handleSetQueations = (e) => {
    const { value } = e.target;
    setQuestion(value);
  };

  const handleAddQuestions = () => {
    const paperObj = [
      {
        question: question,
        answer: option,
        options: Object.values(optionAnswer),
      },
    ];
    setPaper([...paper, ...paperObj]);
    const createdExam = {
      subjectName,
      questions: [...paper, ...paperObj],
      notes: [`${examDuration}`, `${examTime}`],
    };
    dispatch(createdExamBody(createdExam));
    setQuestion("");
  };

  const handleClearForm = () => {
    setSubjectName("");
    setPaper([]);
    setQuestion("");
    setOption("");
    setExamDuration("");
    setExamTime("");
  };

  const handelAnswer = (e) => {
    const { value, id } = e.target;

    const objName = id;

    setOptionAnswer({ ...optionAnswer, ...{ [objName]: value } });
    console.log("event", e.target.id);
  };

  console.log("examBody", examBody);
  return (
    <div>
      {paper.length > 13 ? (
        <h2>Please click create exam button for submit exam paper</h2>
      ) : (
        ""
      )}
      {paper.length > 13 ? (
        ""
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter subject name"
            onChange={(e) => setSubjectName(e.target.value)}
            value={subjectName}
          />

          <input
            type="text"
            placeholder="Exam duration ex(5mins)"
            onChange={(e) => setExamDuration(e.target.value)}
            value={examDuration}
          />
          <input
            type="text"
            placeholder="Exam start time ex(10am)"
            onChange={(e) => setExamTime(e.target.value)}
            value={examTime}
          />

          <input
            type="text"
            placeholder="Enter question"
            value={question}
            onChange={handleSetQueations}
          />

          <label htmlFor="opions1">
            <input
              type="radio"
              name="opions"
              id="opions1"
              onChange={(e) => setOption(e.target.value)}
              value={optionAnswer["opt-ans-1"]}
            />
            <input
              type="text"
              name="option_Answer1"
              placeholder="Enter option 1 answer"
              value={optionAnswer["opt-ans-1"]}
              id="opt-ans-1"
              onChange={handelAnswer}
            />
          </label>
          <label htmlFor="opions2">
            <input
              type="radio"
              name="opions"
              id="opions2"
              onChange={(e) => setOption(e.target.value)}
              value={optionAnswer["opt-ans-2"]}
            />
            <input
              type="text"
              name="option_Answer2"
              placeholder="Enter option 2 answer"
              value={optionAnswer["opt-ans-2"]}
              id="opt-ans-2"
              onChange={handelAnswer}
            />
          </label>
          <label htmlFor="opions3">
            <input
              type="radio"
              name="opions"
              id="opions3"
              onChange={(e) => setOption(e.target.value)}
              value={optionAnswer["opt-ans-3"]}
            />
            <input
              type="text"
              name="option_Answer3"
              placeholder="Enter option 3 answer"
              value={optionAnswer["opt-ans-3"]}
              id="opt-ans-3"
              onChange={handelAnswer}
            />
          </label>
          <label htmlFor="opions4">
            <input
              type="radio"
              name="opions"
              id="opions4"
              onChange={(e) => setOption(e.target.value)}
              value={optionAnswer["opt-ans-4"]}
            />
            <input
              type="text"
              name="option_Answer4"
              placeholder="Enter option 4 answer"
              value={optionAnswer["opt-ans-4"]}
              id="opt-ans-4"
              onChange={handelAnswer}
            />
          </label>
          <input
            type="text"
            placeholder="Select answer"
            value={option}
            readOnly="true"
          />

          {paper.length > 15 ? (
            ""
          ) : (
            <>
              {!!subjectName &&
              !!question &&
              !!option &&
              !!examDuration &&
              !!examTime ? (
                <button
                  type="button"
                  onClick={handleAddQuestions}
                  className="submit-form"
                >
                  Add question
                </button>
              ) : (
                <button type="button" className="submit-form disable">
                  Add question
                </button>
              )}
              <button
                type="button"
                onClick={handleClearForm}
                className="submit-form"
              >
                Clear form
              </button>
            </>
          )}
        </>
      )}

      {paper.length > 13 ? "" : <h4>Please add maximum 15 questions.</h4>}
      <button
        type="button"
        onClick={handleSubmit}
        className={paper.length > 13 ? "submit-form" : "submit-form disable"}
        disabled={paper.length > 13 ? false : true}
      >
        Create exam
      </button>
      <hr />
      <div>
        <li>subject name : {createExamBody?.subjectName}</li>
        {createExamBody?.notes?.map((time, i) => {
          return <li key={i}>{time} </li>;
        })}

        <table>
          <tbody>
            <tr>
              <th>Question</th>
              <th>Answer</th>
              <th>Options</th>
            </tr>
            {createExamBody?.questions?.map((que, i) => {
              const { question, answer, options } = que;
              return (
                <tr key={i}>
                  <td>{question} </td>
                  <td>{answer}</td>
                  {options.map((opt) => {
                    return (
                      <tr>
                        <td>{opt}</td>
                      </tr>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreateExam;
