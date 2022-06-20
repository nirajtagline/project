import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { forgotUserPassword } from "../../redux/actions/userAuth";
import "./new-password.scss";

const NewPassword = () => {
  const { handleSubmit } = useForm({});
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams()[0];
  const { forgotPassword } = useSelector(({ userAuth }) => userAuth);

  let err = "";

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const handelPassword = (e) => {
    setPassword(e.target.value);
  };

  const handelConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const onSubmit = async () => {
    if (password !== confirmPassword) {
      err = "Password dones not match";
      return;
    }
    const body = {
      Password: password,
      ConfirmPassword: confirmPassword,
    };
    dispatch(forgotUserPassword(body, searchParams[1]));
  };

  return (
    <div className="login-page-wrapper">
      <h2 className="form-heading">New password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="password"
          type="password"
          placeholder="New password"
          onChange={handelPassword}
          maxLength={16}
          minLength={8}
        />

        <input
          name="password_repeat"
          type="password"
          placeholder="Confirm password"
          maxLength={16}
          minLength={8}
          onChange={handelConfirmPassword}
        />
        {<p>{err ? err : ""}</p>}
        <input className="submit-form" type="submit" />
      </form>
      <div>
        <Link className="auth-link" to="/forgot-password">
          Forgot Password
        </Link>
      </div>
      <span>{forgotPassword?.message}</span>
    </div>
  );
};

export default NewPassword;
