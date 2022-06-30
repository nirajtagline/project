import React from "react";
import { Link } from "react-router-dom";
import CustomButton from "../Button/CustomButton";
import InputField from "../InputField/InputField";

const TableWithMultiData = ({
  tableHeadData,
  tableData,
  link,
  isRadio = false,
  handleChange,
  buttonArray,
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
                {Object.keys(que).map((data, i) => {
                  if (
                    data === "options" ||
                    data === "notes" ||
                    data === "Result" ||
                    data === "__v"
                  ) {
                    return true;
                  }

                  return (
                    <React.Fragment key={i}>
                      <td>{que[data]} </td>
                    </React.Fragment>
                  );
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
                      <tr key={`nts${i}`}>
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
                          {Object.keys(res).map((ele, i) => {
                            if (
                              ele === "studentAnswer" ||
                              ele === "_id" ||
                              ele === "__v"
                            ) {
                              return true;
                            }
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
                {!!buttonArray?.length ? (
                  <React.Fragment>
                    {buttonArray?.map((btn, i) => {
                      return (
                        <td key={`btn${i}`}>
                          <CustomButton
                            type="button"
                            onClick={() => btn?.handleEvent(_id, index)}
                            buttonText={btn?.buttonText}
                            className={btn?.className}
                          />
                        </td>
                      );
                    })}
                  </React.Fragment>
                ) : (
                  ""
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
