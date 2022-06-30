import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  getViewExamForStudent,
  getDeleteExamForStudent,
  getViewExamInDetails,
} from "../../../redux/actions/exam";
import Modal from "../../../shared/Modal/Modal";
import Loader from "../../../shared/Loader";
import TableWithMultiData from "../../../shared/TableWithMultiData/TableWithMultiData";
import CustomButton from "../../../shared/Button/CustomButton";

const ViewExam = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { viewExamData, isDeleteExamData, viewExamDataLoading } = useSelector(
    ({ exam }) => exam
  );

  const [showPoppup, setShowPoppup] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

  useEffect(() => {
    !viewExamData?.length && dispatch(getViewExamForStudent());
  }, [isDeleteExamData]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDeleteExam = (id, index) => {
    setShowPoppup(true);
    setSelectedExam({ id, index });
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
  const handleConfirm = (data) => {
    setSelectedExam(null);
    dispatch(getDeleteExamForStudent(data)).then(() => {
      setTimeout(() => {
        setShowPoppup(false);
      }, 1500);
    });
  };

  const handleRefreshList = () => {
    dispatch(getViewExamForStudent());
  };

  const buttonArray = [
    {
      type: "button",
      handleEvent: handleViewExamInDetails,
      className: "submit-form mt-0 mb-0",
      buttonText: "View exam Details",
    },
    {
      type: "button",
      handleEvent: handleEditExam,
      className: "submit-form mt-0 mb-0",
      buttonText: "Edit exam",
    },
    {
      type: "button",
      handleEvent: handleDeleteExam,
      className: "submit-form mt-0 mb-0",
      buttonText: "Delete exam",
    },
  ];

  return (
    <>
      <div>
        <h2>Exam data</h2>
        {!viewExamDataLoading ? (
          <>
            {viewExamData?.length ? (
              <>
                <CustomButton
                  type="button"
                  onClick={handleRefreshList}
                  className="submit-form button-align"
                  buttonText="Refresh list"
                />
                <TableWithMultiData
                  tableHeadData={["Subject Name", "Exam Id", "Email", "Notes"]}
                  tableData={viewExamData}
                  buttonArray={buttonArray}
                />
              </>
            ) : (
              <h3>No exam available</h3>
            )}
          </>
        ) : (
          <Loader />
        )}
      </div>
      <Modal
        title="Delete exam"
        message="Are you sure want to delete ?"
        isShow={showPoppup}
        selectedExam={selectedExam}
        handleCancle={handleCancle}
        handleConfirm={({ id, index }) => handleConfirm({ id, index })}
        loading={viewExamDataLoading}
        confirmButtonText="Delete"
      />
    </>
  );
};

export default ViewExam;
