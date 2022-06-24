import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { forgotUserPassword } from "../../redux/actions/userAuth";
import CustomButton from "../../shared/Button/CustomButton";
import CustomForm from "../../shared/Form/Form";
import InputField from "../../shared/InputField/InputField";
import "./forgot-password.scss";

const initialState = {
  email: "",
};

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { forgotPassword } = useSelector(({ userAuth }) => userAuth);

  const [error, setError] = useState({});
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: checkValidations(name, value) });
  };

  const forgotPasswordFormData = [
    {
      label: "Email",
      name: "email",
      value: formData?.email,
      type: "text",
      isShowValidate: true,
      placeholder: "Enter your email",
      handleChange,
      message: error?.email,
    },
  ];

  const checkValidations = (key, value) => {
    if (key === "email") {
      const emailRegex = /\S+@\S+\.\S+/;
      if (!value && value.trim() === "") {
        return "Email is required";
      } else if (!emailRegex.test(value)) {
        return "Email is invalid, email should be xyz@abcd.xyz";
      }
    } else return;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validateError = {};
    Object.keys(formData).forEach((key) => {
      const message = checkValidations(key, formData[key]);
      if (message) {
        validateError[key] = message;
      }
    });
    if (Object.keys(validateError).length) {
      setError({ ...error, ...validateError });
      return;
    }
    dispatch(forgotUserPassword(formData));
  };

  return (
    <div className="forgot-password-page-wrapper">
      <h2 className="form-heading">Forgot Password</h2>
      <CustomForm handleSubmit={(e) => handleSubmit(e)}>
        {forgotPasswordFormData.map((data, id) => {
          return <InputField key={id} {...data} />;
        })}
        <CustomButton
          type="submit"
          className="submit-form"
          buttonText="Submit email"
        />
      </CustomForm>

      <div>
        <Link className="auth-link" to="/">
          Back to Login
        </Link>
      </div>

      <span>{forgotPassword?.message}</span>
    </div>
  );
};

export default ForgotPassword;
