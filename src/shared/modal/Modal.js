import React from "react";
import Button from "../Button/Button";
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
        <Button
          type="button"
          onClick={handleCancle}
          className="submit-form"
          buttonText="Cancle"
        />
        <Button
          type="button"
          className="submit-form"
          onClick={() => handleConfirm(selectedExam)}
          buttonText="Delete"
        />
      </div>
    </div>
  ) : (
    ""
  );
};
export default Modal;
