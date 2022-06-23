import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  getViewExamForStudent,
  getDeleteExamForStudent,
  getViewExamInDetails,
} from "../../../redux/actions/exam";
import CustomButton from "../../../shared/Button/CustomButton";
import Modal from "../../../shared/Modal/Modal";

const ViewExam = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { viewExamData, isDeleteExamData } = useSelector(({ exam }) => exam);

  const [showPoppup, setShowPoppup] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

  useEffect(() => {
    dispatch(getViewExamForStudent());
  }, [isDeleteExamData]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDeleteExam = (id) => {
    setShowPoppup(true);
    setSelectedExam(id);
  };
  const handleViewExamInDetails = (id) => {
    dispatch(getViewExamInDetails(id));
    navigate(`/view-exam-details/${id}`);
  };

  const handleEditExam = (id) => {
    navigate(`/edit-exam-details/${id}`);
  };

  const handleCancle = () => {
    setShowPoppup(false);
  };
  const handleConfirm = (id) => {
    setShowPoppup(false);
    setSelectedExam(null);
    dispatch(getDeleteExamForStudent(id));
  };

  return (
    <div>
      <h2>Exam data</h2>
      <table>
        <tbody>
          <tr>
            <th>Subject Name</th>
            <th>Exam Id</th>
            <th>Email</th>
            <th>Time</th>
          </tr>
          {viewExamData?.map((data, i) => {
            const { subjectName, _id, email, notes } = data;
            return (
              <tr key={i}>
                <td>{subjectName}</td>
                <td>{_id}</td>
                <td>{email}</td>

                {notes?.map((note, i) => {
                  return (
                    <tr key={i}>
                      <td>{note}</td>
                    </tr>
                  );
                })}
                <td>
                  <CustomButton
                    type="button"
                    onClick={() => handleViewExamInDetails(_id)}
                    className="submit-form mt-0 mb-0"
                    buttonText="View exam Details"
                  />
                </td>
                <td>
                  <CustomButton
                    type="button"
                    onClick={() => handleEditExam(_id)}
                    className="submit-form mt-0 mb-0"
                    buttonText=" Edit exam"
                  />
                </td>
                <td>
                  <CustomButton
                    type="button"
                    onClick={() => handleDeleteExam(_id)}
                    className="submit-form mt-0 mb-0"
                    buttonText="   Delete exam"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal
        title="Delete exam"
        message="Are you sure want to delete ?"
        isShow={showPoppup}
        selectedExam={selectedExam}
        handleCancle={handleCancle}
        handleConfirm={(id) => handleConfirm(id)}
      />
    </div>
  );
};

export default ViewExam;
