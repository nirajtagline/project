import React from "react";
import { Link } from "react-router-dom";

const Table = ({ tableHeadData, tableData, link }) => {
  const { path = "", linkText = "" } = link || false;
  return (
    <>
      <table>
        <tbody>
          <tr>
            {tableHeadData?.map((head, index) => {
              return <th key={index}>{head}</th>;
            })}
          </tr>
          {tableData?.map((student, i) => {
            const { _id } = student;
            return (
              <tr key={i}>
                {Object.keys(student)
                  .sort()
                  .map((data, i) => {
                    return <td key={i}>{student[data]}</td>;
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
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
