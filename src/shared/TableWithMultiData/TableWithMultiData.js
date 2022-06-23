import React from "react";
import { Link } from "react-router-dom";
import InputField from "../InputField/InputField";

const TableWithMultiData = ({
  tableHeadData,
  tableData,
  link,
  isRadio = false,
  handleOptChange,
}) => {
  const { path = "", linkText = "" } = link || false;

  return (
    <div>
      <table>
        <tbody>
          <tr>
            {tableHeadData?.map((head, i) => {
              return <th key={i}>{head}</th>;
            })}
          </tr>
          {tableData?.map((que, index) => {
            const {
              question = "",
              answer = "",
              options = "",
              email = "",
              subjectName = "",
              _id = "",
              notes = [],
              Result = [],
            } = que;
            return (
              <tr key={index}>
                {question ? <td>{question} </td> : ""}
                {answer ? <td>{answer} </td> : ""}
                {subjectName ? <td>{subjectName} </td> : ""}
                {email ? <td>{email} </td> : ""}
                {_id ? <td>{_id} </td> : ""}
                {!!options.length &&
                  options.map((opt, i) => {
                    return (
                      <tr key={i}>
                        <td>{opt}</td>
                        {isRadio ? (
                          <InputField
                            type="radio"
                            onChange={(e) => handleOptChange(e)}
                            name={_id}
                            id={opt}
                          />
                        ) : (
                          ""
                        )}
                      </tr>
                    );
                  })}
                {!!notes.length &&
                  notes.map((note, i) => {
                    return (
                      <tr key={i}>
                        <td>{note}</td>
                      </tr>
                    );
                  })}

                {link ? (
                  <td>
                    <Link className="auth-link" to={`${path}/${_id}`}>
                      {linkText}
                    </Link>
                  </td>
                ) : (
                  ""
                )}
                {!!Result.length && (
                  <td>
                    <p>Result</p>
                    {Result?.map((res, id) => {
                      const { subjectName, _id, rank, score, resultStatus } =
                        res;
                      return (
                        <React.Fragment key={id}>
                          <tr>
                            <td>{resultStatus}</td>
                          </tr>
                          <tr>
                            <td>{subjectName}</td>
                          </tr>
                          <tr>
                            <td>{_id}</td>
                          </tr>
                          <tr>
                            <td>{rank}</td>
                          </tr>
                          <tr>
                            <td>{score}</td>
                          </tr>
                        </React.Fragment>
                      );
                    })}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableWithMultiData;
