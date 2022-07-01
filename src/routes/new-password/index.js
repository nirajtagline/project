import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { forgotUserPassword } from "../../redux/actions/userAuth";
import CustomButton from "../../shared/Button/CustomButton";
import CustomForm from "../../shared/Form/Form";
import InputField from "../../shared/InputField/InputField";
import Loader from "../../shared/Loader/Loader";
import { Validation } from "../../Validation";
import "./new-password.scss";

const initialState = {
  Password: "",
  ConfirmPassword: "",
};
const NewPassword = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams()[0];
  const { forgotPassword, forgotPasswordLoading } = useSelector(
    ({ userAuth }) => userAuth
  );
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: Validation(name, value, formData) });
  };

  const newPasswordFormData = [
    {
      label: "New Password",
      name: "Password",
      value: formData?.Password,
      placeholder: "Enter your new password",
      type: "password",
      isShowValidate: true,
      handleChange,
      message: error?.Password,
    },
    {
      label: "Confirm Password",
      name: "ConfirmPassword",
      value: formData?.ConfirmPassword,
      placeholder: "Enter confirm password",
      type: "password",
      isShowValidate: true,
      handleChange,
      message: error?.ConfirmPassword,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const validateError = {};
    Object.keys(formData).forEach((key) => {
      const message = Validation(key, formData[key], formData);
      if (message) {
        validateError[key] = message;
      }
    });
    if (Object.keys(validateError).length) {
      setError({ ...error, ...validateError });
      return;
    }
    dispatch(forgotUserPassword(formData, searchParams[1]));
  };

  return !forgotPasswordLoading ? (
    <div className="login-page-wrapper">
      <h2 className="form-heading">New password</h2>
      <CustomForm handleSubmit={(e) => handleSubmit(e)}>
        {newPasswordFormData.map((data, id) => {
          return <InputField key={id} {...data} />;
        })}
        <CustomButton
          type="submit"
          className="submit-form"
          buttonText="Update Password"
        />
      </CustomForm>

      <div>
        <Link className="auth-link" to="/">
          Back to Login
        </Link>
      </div>
      <span>{forgotPassword?.data?.message}</span>
    </div>
  ) : (
    <Loader />
  );
};

export default NewPassword;
