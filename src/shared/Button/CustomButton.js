import React from "react";

const CustomButton = ({ buttonText, onClick, ...props }) => (
  <button {...props} onClick={() => onClick && onClick()}>
    {buttonText}
  </button>
);

export default CustomButton;
