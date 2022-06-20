import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { forgotUserPassword } from "../../redux/actions/userAuth";

import "./forgot-password.scss";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { forgotPassword } = useSelector(({ userAuth }) => userAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // eslint-disable-next-line

  const onSubmit = (data) => {
    dispatch(forgotUserPassword(data));
  };
  return (
    <div className="forgot-password-page-wrapper">
      <h2 className="form-heading">Forgot Password</h2>
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
        <input className="submit-form" type="submit" />
      </form>
      <div>
        <Link className="auth-link" to="/">
          Back to Login
        </Link>
      </div>

      <span>{forgotPassword?.message}</span>
    </div>
  );
};

export default ForgotPassword;
