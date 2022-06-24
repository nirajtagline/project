import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUserLoginDetails } from "../../redux/actions/userAuth";
import CustomForm from "../../shared/Form/Form";
import InputField from "../../shared/InputField/InputField";
import "./login.scss";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogged = localStorage.getItem("user-token");
  const userRole = localStorage.getItem("user-role");
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState({});
  const { userLoginDetails } = useSelector(({ userAuth }) => userAuth);

  useEffect(() => {
    if (isLogged) {
      if (userRole === "teacher") {
        navigate("/teacher-dashboard");
      }
      if (userRole === "student") {
        navigate("/student-dashboard");
      }
    }
  }, [isLogged, userRole]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: checkValidations(name, value) });
  };

  const loginFormData = [
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
    {
      label: "Password",
      name: "password",
      value: formData?.password,
      placeholder: "Enter your password",
      type: "password",
      isShowValidate: true,
      handleChange,
      message: error?.password,
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
    } else if (key === "password") {
      const passwordRegex = /^[0-9]{8,16}$/;

      if (!value && value.trim() === "") {
        return "Password is required";
      } else if (!passwordRegex.test(value)) {
        return "Password is invalid, password should be number and minimum 8 character and maximum 16 character.";
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
    dispatch(getUserLoginDetails(formData));
  };

  return (
    <div className="login-page-wrapper">
      <h2 className="form-heading">Login here</h2>

      <CustomForm handleSubmit={(e) => handleSubmit(e)} buttonText="Login">
        {loginFormData.map((data, id) => {
          return <InputField key={id} {...data} />;
        })}
      </CustomForm>
      <div>
        <Link className="auth-link" to="/forgot-password">
          Forgot Password
        </Link>
      </div>
      <span>{userLoginDetails?.message ? userLoginDetails?.message : ""}</span>
    </div>
  );
};

export default Login;
