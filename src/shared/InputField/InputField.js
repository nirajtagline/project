import React from "react";
const noop = () => {};

const InputField = ({
  type = "text",
  placeholder = "",
  onChange = noop,
  className = "",
  isDisable = false,
  name = "",
  id = "",
  label = "",
  isReadOnly = false,
  value,
}) => {
  const handleChange = (e) => {
    onChange(e);
  };

  return (
    <div>
      {label && <label>{label}</label>}
      <input
        type={type}
        onChange={handleChange}
        disabled={isDisable}
        className={className}
        placeholder={placeholder}
        name={name}
        id={id}
        readOnly={isReadOnly}
        value={value}
      />
    </div>
  );
};

export default InputField;
