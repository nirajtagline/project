import React from "react";

const InputField = ({
  label,
  handleChange,
  isShowValidate,
  message,
  className = "",
  ...props
}) => {
  return (
    <div>
      {label ? <label>{label}</label> : null}
      <input
        {...props}
        className={className}
        onChange={(e) => handleChange && handleChange(e)}
      />
      {isShowValidate ? <span>{message}</span> : null}
    </div>
  );
};
export default InputField;
