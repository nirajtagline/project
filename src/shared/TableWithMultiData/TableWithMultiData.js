import React from "react";
import { Link } from "react-router-dom";
import InputField from "../InputField/InputField";

const TableWithMultiData = ({
  tableHeadData,
  tableData,
  link,
  isRadio = false,
  handleChange,
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
            const { options = [], _id = "", notes = [], Result = [] } = que;
            return (
              <tr key={index}>
                {Object.keys(que)
                  .filter(
                    (flt) =>
                      flt !== "options" && flt !== "notes" && flt !== "Result"
                  )
                  .map((data) => {
                    return <td>{que[data]} </td>;
                  })}

                {!!options.length &&
                  options.map((opt, i) => {
                    return (
                      <tr key={i}>
                        <td>{opt}</td>
                        {isRadio ? (
                          <InputField
                            type="radio"
                            handleChange={(e) => handleChange(e)}
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
                      return (
                        <React.Fragment key={id}>
                          {Object.keys(res)
                            .filter((ele) => ele !== "studentAnswer")
                            .map((ele, i) => {
                              return (
                                <tr key={i}>
                                  <td>
                                    {ele} - {res[ele]}
                                  </td>
                                </tr>
                              );
                            })}
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
