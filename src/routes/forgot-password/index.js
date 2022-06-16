import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { forgotUserPassword } from "../../redux/actions/userAuth";

import "./forgot-password.scss";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogged = localStorage.getItem("user-token");

  const { forgotPassword } = useSelector(({ userAuth }) => userAuth);
  useEffect(() => {
    if (isLogged) {
      navigate("/");
    }
  }, [isLogged, navigate]);

  const {
    register,
    handleSubmit,
    // formState: { errors },
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
        <input className="submit-form" type="submit" />
      </form>
      <div>
        <Link className="auth-link" to="/login">
          Login
        </Link>
      </div>

      <span>{forgotPassword?.message}</span>
    </div>
  );
};

export default ForgotPassword;
