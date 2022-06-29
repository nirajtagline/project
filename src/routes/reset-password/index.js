import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserPasswordReset,
  userPasswordResetSuccess,
} from "../../redux/actions/userAuth";
import CustomForm from "../../shared/Form/Form";
import InputField from "../../shared/InputField/InputField";
import Loader from "../../shared/Loader";
import { Validation } from "../../Validation";
import "./reset-password.scss";

const initialState = {
  oldPassword: "",
  Password: "",
  ConfirmPassword: "",
};

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { userPasswordReset, userPasswordResetLoading } = useSelector(
    ({ userAuth }) => userAuth
  );

  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState({});

  useEffect(() => {
    return () => {
      dispatch(userPasswordResetSuccess({}));
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError({ ...error, [name]: Validation(name, value, formData) });
    setFormData({ ...formData, [name]: value });
  };

  const resetFormData = [
    {
      label: "Old Password",
      name: "oldPassword",
      value: formData?.oldPassword,
      placeholder: "Enter your old password",
      type: "password",
      isShowValidate: true,
      handleChange,
      message: error?.oldPassword,
    },
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
    dispatch(getUserPasswordReset(formData));
  };

  return !userPasswordResetLoading ? (
    <div className="login-page-wrapper">
      <h2 className="form-heading">Reset password</h2>
      <CustomForm handleSubmit={(e) => handleSubmit(e)} buttonText="Submit">
        {resetFormData.map((data, id) => {
          return <InputField key={id} {...data} />;
        })}
      </CustomForm>

      <span>{userPasswordReset?.message}</span>
    </div>
  ) : (
    <Loader />
  );
};

export default ResetPassword;
