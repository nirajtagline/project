import React from "react";
import CustomButton from "../Button/CustomButton";
import Loader from "../Loader";
import "./modal.scss";

const Modal = ({
  title,
  message,
  isShow,
  handleConfirm,
  handleCancle,
  selectedExam,
  loading,
}) => {
  return isShow ? (
    <div className="pop-wrapper">
      <div className="pop-wrapper-child">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="flex">
          <CustomButton
            type="button"
            onClick={handleCancle}
            className="submit-form"
            buttonText="Cancel"
          />
          <CustomButton
            type="button"
            className="submit-form"
            onClick={() => handleConfirm(selectedExam)}
            buttonText="Delete"
          />
          {loading ? (
            <span>
              <Loader />
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};
export default Modal;
