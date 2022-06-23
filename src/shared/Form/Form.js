import React from "react";
import Button from "../Button/Button";

const Form = ({ handleSubmit, inputArray = [], buttonText = "" }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Button type="submit" buttonText={buttonText} className="submit-form" />
      </form>
    </div>
  );
};

export default Form;
