import React from "react";
import "./modal.scss";

const Modal = ({
  title,
  message,
  isShow,
  handleConfirm,
  handleCancle,
  selectedExam,
}) => {
  return isShow ? (
    <div className="pop-wrapper">
      <div className="pop-wrapper-child">
        <h2>{title}</h2>
        <p>{message}</p>
        <button onClick={handleCancle}>Cancel</button>
        <button onClick={() => handleConfirm(selectedExam)}>delete</button>
      </div>
    </div>
  ) : (
    ""
  );
};
export default Modal;
