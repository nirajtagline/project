import React from "react";

const CustomForm = ({
  children,
  handleSubmit,

  ...props
}) => (
  <form {...props} onSubmit={(e) => handleSubmit && handleSubmit(e)}>
    {children}
  </form>
);

export default CustomForm;
