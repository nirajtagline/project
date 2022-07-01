import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  forgotUserPassword,
  userForgotPasswordSuccess,
} from "../../redux/actions/userAuth";
import CustomButton from "../../shared/Button/CustomButton";
import CustomForm from "../../shared/Form/Form";
import InputField from "../../shared/InputField/InputField";
import Loader from "../../shared/Loader/Loader";
import { Validation } from "../../Validation";
import "./forgot-password.scss";

const initialState = {
  email: "",
};

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { forgotPassword, forgotPasswordLoading } = useSelector(
    ({ userAuth }) => userAuth
  );

  const [error, setError] = useState({});
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: Validation(name, value) });
  };

  useEffect(() => {
    return () => {
      dispatch(userForgotPasswordSuccess({}));
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const validateError = {};
    Object.keys(formData).forEach((key) => {
      const message = Validation(key, formData[key]);
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

  return !forgotPasswordLoading ? (
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

      <span
        className={
          forgotPassword?.data?.statusCode === 500
            ? "error-message"
            : "message-green"
        }
      >
        {forgotPassword?.data?.message}
      </span>
    </div>
  ) : (
    <Loader />
  );
};

export default ForgotPassword;
