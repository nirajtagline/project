import React from "react";

const noop = () => {};

const Button = ({
  type = "button",
  buttonText,
  onClick = noop,
  className = "",
  isDisable = false,
}) => {
  const handleClick = (e) => {
    onClick(e);
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={isDisable}
      className={className}
    >
      {buttonText}
    </button>
  );
};

export default Button;
