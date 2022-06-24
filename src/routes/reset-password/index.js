import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserPasswordReset } from "../../redux/actions/userAuth";
import CustomButton from "../../shared/Button/CustomButton";
import CustomForm from "../../shared/Form/Form";
import InputField from "../../shared/InputField/InputField";
import "./reset-password.scss";

const initialState = {
  oldPassword: "",
  Password: "",
  ConfirmPassword: "",
};

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { userPasswordReset } = useSelector(({ userAuth }) => userAuth);

  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: checkValidations(name, value) });
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
      const passwordRegex = /^[0-9]{10}$/;

      if (!value && value.trim() === "") {
        return "Password is required";
      } else if (!passwordRegex.test(value)) {
        return "Password is invalid, password should be number and maximum 9 character.";
      }
    } else if (key === "ConfirmPassword") {
      const passwordRegex = /^[0-9]{10}$/;

      if (!value && value.trim() === "") {
        return "Confirm Password is required";
      } else if (
        !passwordRegex.test(value) &&
        formData?.ConfirmPassword === formData?.Password
      ) {
        return "Password is invalid, password should be number and maximum 9 character and match with new password.";
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

  return (
    <div className="login-page-wrapper">
      <h2 className="form-heading">Reset password</h2>
      <CustomForm handleSubmit={(e) => handleSubmit(e)}>
        {resetFormData.map((data, id) => {
          return <InputField key={id} {...data} />;
        })}
        <CustomButton
          type="submit"
          className="submit-form"
          buttonText="Submit"
        />
      </CustomForm>

      <span>{userPasswordReset?.message}</span>
    </div>
  );
};

export default ResetPassword;
