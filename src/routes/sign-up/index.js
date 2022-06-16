import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUserSignUpDetails } from "../../redux/actions/userAuth";

import "./sign-up.scss";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLogged = localStorage.getItem("user-token");
  useEffect(() => {
    if (isLogged) {
      navigate("/");
    }
  }, [isLogged, navigate]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(getUserSignUpDetails(data)).then(() => {
      navigate("/login");
    });
  };

  return (
    <div className="sign-up-page-wrapper">
      <h2 className="form-heading">Signup here</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Name"
          {...register("name", {
            required: true,
            pattern: /[a-z]{2,10}/,
          })}
        />
        {errors.email && errors.email.type === "required" && (
          <span>Please enter name.</span>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <span>The name should have morethan 2 character.</span>
        )}
        <input
          type="text"
          placeholder="Email"
          {...register("email", {
            required: true,
            pattern: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
          })}
        />
        {errors.email && errors.email.type === "required" && (
          <span>Please enter email.</span>
        )}
        {errors.email && errors.email.type === "pattern" && (
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
        {errors.password && errors.password.type === "required" && (
          <span>Please enter password.</span>
        )}
        {errors.password && errors.email.password === "pattern" && (
          <span>Password length min 8 character and max 16 character.</span>
        )}
        <input
          type="text"
          placeholder="Role"
          {...register("role", {
            required: true,
          })}
        />
        {errors.password && errors.password.type === "required" && (
          <span>Please enter your role.</span>
        )}

        <input className="submit-form" type="submit" />
      </form>
      <div>
        <Link className="auth-link" to="/login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
