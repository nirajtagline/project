import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUserSignUpDetails } from "../../redux/actions/userAuth";
import CustomForm from "../../shared/Form/Form";
import InputField from "../../shared/InputField/InputField";
import Loader from "../../shared/Loader";

import "./sign-up.scss";

const initialState = {
  name: "",
  email: "",
  password: "",
};

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLogged = localStorage.getItem("user-token");

  const { userSignUpDetailsLoading } = useSelector(({ userAuth }) => userAuth);

  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState({});

  useEffect(() => {
    if (isLogged) {
      navigate("/");
    }
  }, [isLogged]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: checkValidations(name, value) });
  };

  const loginFormData = [
    {
      label: "Name",
      name: "name",
      value: formData?.name,
      type: "text",
      isShowValidate: true,
      placeholder: "Enter your name",
      handleChange,
      message: error?.name,
    },
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
    {
      label: "Teacher",
      name: "role",
      value: "Teacher",
      type: "radio",
      isShowValidate: false,
      handleChange,
    },
    {
      label: "Student",
      name: "role",
      value: "Student",
      type: "radio",
      checked: true,
      isShowValidate: false,
      handleChange,
    },
  ];

  const checkValidations = (key, value) => {
    if (key === "name") {
      const nameRegex = /[a-z]{3,10}/;

      if (!value && value.trim() === "") {
        return "Name is required";
      } else if (!nameRegex.test(value)) {
        return "Name should be maximum 3 character";
      }
    } else if (key === "email") {
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
    dispatch(getUserSignUpDetails(formData)).then(() => {
      navigate("/");
    });
  };

  return !userSignUpDetailsLoading ? (
    <div className="sign-up-page-wrapper">
      <h2 className="form-heading">Signup here</h2>

      <CustomForm handleSubmit={(e) => handleSubmit(e)} buttonText="Sign up">
        {loginFormData.map((data, id) => {
          return <InputField key={id} {...data} />;
        })}
      </CustomForm>
      <div>
        <Link className="auth-link" to="/">
          Back to Login
        </Link>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default SignUp;
