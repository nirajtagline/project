import React from "react";
import CustomButton from "../Button/CustomButton";

const CustomForm = ({
  children,
  handleSubmit,
  buttonText = "submit",
  ...props
}) => (
  <form {...props} onSubmit={(e) => handleSubmit && handleSubmit(e)}>
    {children}
    <CustomButton
      type="submit"
      className="submit-form"
      buttonText={buttonText}
    />
  </form>
);

export default CustomForm;
