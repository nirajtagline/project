import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUserLoginDetails } from "../../redux/actions/userAuth";
import "./login.scss";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogged = localStorage.getItem("user-token");
  const userRole = localStorage.getItem("user-role");

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(getUserLoginDetails(data));
  };

  return (
    <div className="login-page-wrapper">
      <h2 className="form-heading">Login here</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Email"
          {...register("email", {
            required: true,
            pattern: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
          })}
        />
        {errors?.email && errors?.email?.type === "required" && (
          <span>Please enter email.</span>
        )}
        {errors?.email && errors?.email?.type === "pattern" && (
          <span>
            The email address entered is invalid, please check the formatting
            (e.g. email@domain.com)
          </span>
        )}
        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: true,
            pattern: /^[0-9]{8,16}$/,
          })}
        />
        {errors?.password && errors?.password?.type === "required" && (
          <span>Please enter password.</span>
        )}
        {errors?.password && errors?.email?.password === "pattern" && (
          <span>Password length min 8 character and max 16 character.</span>
        )}
        <input className="submit-form" type="submit" />
      </form>
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
