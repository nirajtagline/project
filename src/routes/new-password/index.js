import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { forgotUserPassword } from "../../redux/actions/userAuth";
import CustomForm from "../../shared/Form/Form";
import InputField from "../../shared/InputField/InputField";
import Loader from "../../shared/Loader";
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
    setError({ ...error, [name]: checkValidations(name, value) });
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

  const checkValidations = (key, value) => {
    if (key === "Password") {
      const passwordRegex = /^[0-9]{8,16}$/;

      if (!value && value.trim() === "") {
        return "Password is required";
      } else if (!passwordRegex.test(value)) {
        return "Password is invalid, password should be number and minimum 8 character and maximum 16 character.";
      }
    } else if (key === "ConfirmPassword") {
      const passwordRegex = /^[0-9]{8,16}$/;

      if (!value && value.trim() === "") {
        return "Confirm Password is required";
      } else if (!passwordRegex.test(value)) {
        return "Password is invalid, password should be number and manimum 8 character and maximum 16 character and match with new password.";
      } else if (value !== formData?.Password) {
        return "Password is invalid, password should be match with new password.";
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
    dispatch(forgotUserPassword(formData, searchParams[1]));
  };

  return !forgotPasswordLoading ? (
    <div className="login-page-wrapper">
      <h2 className="form-heading">New password</h2>
      <CustomForm
        handleSubmit={(e) => handleSubmit(e)}
        buttonText="Update password"
      >
        {newPasswordFormData.map((data, id) => {
          return <InputField key={id} {...data} />;
        })}
      </CustomForm>

      <div>
        <Link className="auth-link" to="/forgot-password">
          Forgot Password
        </Link>
      </div>
      <span>{forgotPassword?.data?.message}</span>
    </div>
  ) : (
    <Loader />
  );
};

export default NewPassword;
