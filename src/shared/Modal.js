import React from "react";
import "./modal.scss";

const ConfirmModal = ({ title, message, hide, isShow, callbackFunction }) => {
  return isShow ? (
    <div className="pop-wrapper">
      <div className="pop-wrapper-child">
        <h2>{title}</h2>
        <p>{message}</p>
        <button onClick={hide}>Cancel</button>
        <button onClick={callbackFunction}>delete</button>
      </div>
    </div>
  ) : (
    ""
  );
};
export default ConfirmModal;
