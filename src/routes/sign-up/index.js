import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getUserSignUpDetails,
  userSignUpSuccess,
} from "../../redux/actions/userAuth";
import CustomButton from "../../shared/Button/CustomButton";
import CustomForm from "../../shared/Form/Form";
import InputField from "../../shared/InputField/InputField";
import Loader from "../../shared/Loader";
import { getLocalItems } from "../../utils/localStorage";
import { Validation } from "../../Validation";

import "./sign-up.scss";

const initialState = {
  name: "",
  email: "",
  password: "",
  role: "Student",
};

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRole = getLocalItems("user-role");

  const { userSignUpDetailsLoading, userSignUpDetails, isUserLogged } =
    useSelector(({ userAuth }) => userAuth);

  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState({});

  useEffect(() => {
    if (isUserLogged) {
      navigate(`/${userRole}-dashboard`);
    }
    if (userSignUpDetails?.statusCode === 200) {
      navigate("/");
    }
  }, [isUserLogged, userSignUpDetails?.statusCode === 200]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    return () => {
      dispatch(userSignUpSuccess({}));
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: Validation(name, value) });
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
    dispatch(getUserSignUpDetails(formData));
  };

  return !userSignUpDetailsLoading ? (
    <div className="sign-up-page-wrapper">
      <h2 className="form-heading">Signup here</h2>

      <CustomForm handleSubmit={(e) => handleSubmit(e)}>
        {loginFormData.map((data, id) => {
          return <InputField key={id} {...data} />;
        })}
        <CustomButton
          type="submit"
          className="submit-form"
          buttonText="Sign up"
        />
      </CustomForm>
      {userSignUpDetails?.message ? (
        <span className="error-message">{userSignUpDetails?.message}</span>
      ) : (
        ""
      )}
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
