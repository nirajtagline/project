import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchUserLoginDetailsSuccess,
  getUserLoginDetails,
} from "../../redux/actions/userAuth";
import CustomButton from "../../shared/Button/CustomButton";
import CustomForm from "../../shared/Form/Form";
import InputField from "../../shared/InputField/InputField";
import Loader from "../../shared/Loader";
import { Validation } from "../../Validation";
import "./login.scss";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState({});
  const { userLoginDetails, userLoginDetailsLoading, isUserLogged } =
    useSelector(({ userAuth }) => userAuth);

  useLayoutEffect(() => {
    if (isUserLogged) {
      navigate("/dashboard");
    }
  }, [isUserLogged]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    return () => {
      dispatch(fetchUserLoginDetailsSuccess({}));
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: Validation(name, value) });
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
    dispatch(getUserLoginDetails(formData));
  };

  return !userLoginDetailsLoading ? (
    <div className="login-page-wrapper">
      <h2 className="form-heading">Login here</h2>

      <CustomForm handleSubmit={(e) => handleSubmit(e)}>
        {loginFormData.map((data, id) => {
          return <InputField key={id} {...data} />;
        })}
        <CustomButton
          type="submit"
          className="submit-form"
          buttonText="Login"
        />
      </CustomForm>
      <div>
        <Link className="auth-link" to="/forgot-password">
          Forgot Password
        </Link>
      </div>
      <span className="error-message">
        {userLoginDetails?.message ? userLoginDetails?.message : ""}
      </span>
    </div>
  ) : (
    <Loader />
  );
};

export default Login;
