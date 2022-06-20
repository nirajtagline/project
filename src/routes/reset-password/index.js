import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getUserPasswordReset } from "../../redux/actions/userAuth";
import "./reset-password.scss";

const ResetPassword = () => {
  const { handleSubmit } = useForm({});
  const dispatch = useDispatch();
  const { userPasswordReset } = useSelector(({ userAuth }) => userAuth);

  let err = "";

  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const handelOldPassword = (e) => {
    setOldPassword(e.target.value);
  };
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
      oldPassword,
      Password: password,
      ConfirmPassword: confirmPassword,
    };
    dispatch(getUserPasswordReset(body));
  };

  return (
    <div className="login-page-wrapper">
      <h2 className="form-heading">New password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="password_old"
          type="password"
          placeholder="Old password"
          onChange={handelOldPassword}
          maxLength={16}
          minLength={8}
        />
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

      <span>{userPasswordReset?.message}</span>
    </div>
  );
};

export default ResetPassword;
