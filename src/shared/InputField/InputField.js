import React from "react";
import "./input-field.scss";

const InputField = ({
  label,
  handleChange,
  isShowValidate,
  message,
  className = "",
  disable,
  ...props
}) => {
  return (
    <div>
      {label ? <label>{label}</label> : null}
      <input
        {...props}
        className={className}
        onChange={(e) => handleChange && handleChange(e)}
        disabled={disable}
      />
      {isShowValidate ? <span>{message}</span> : null}
    </div>
  );
};
export default InputField;
