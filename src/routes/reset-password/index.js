import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserPasswordReset } from "../../redux/actions/userAuth";
import CustomForm from "../../shared/Form/Form";
import InputField from "../../shared/InputField/InputField";
import Loader from "../../shared/Loader";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError({ ...error, [name]: checkValidations(name, value) });
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

  const checkValidations = (key, value) => {
    if (key === "oldPassword" || key === "Password") {
      const passwordRegex = /^[0-9]{8,16}$/;

      if (!value && value.trim() === "") {
        return "Password is required";
      } else if (!passwordRegex.test(value)) {
        return "Password is invalid, password should be number and manimum 8 character and maximum 16 character.";
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
