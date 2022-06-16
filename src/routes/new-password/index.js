import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "./new-password.scss";

const NewPassword = () => {
  const { register, errors, handleSubmit, watch } = useForm({});
  const password = useRef({});
  password.current = watch("password", "");
  const onSubmit = async (data) => {
    // alert(JSON.stringify(data));
  };

  return (
    <div className="login-page-wrapper">
      <h2 className="form-heading">New password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="password"
          type="password"
          placeholder="New password"
          {...register("password", {
            required: "You must specify a password",
            minLength: {
              value: 8,
              message: "Password must have at least 8 characters",
            },
          })}
        />
        {errors?.password && <p>{errors.password?.message}</p>}

        <input
          name="password_repeat"
          type="password"
          placeholder="Confirm password"
          //   ref={register({
          //     validate: (value) =>
          //       value === password.current || "The passwords do not match",
          //   })}
          {...register("password_repeat", {
            validate: (value) =>
              value === password.current || "The passwords do not match",
          })}
        />
        {errors?.password_repeat && <p>{errors?.password_repeat?.message}</p>}
        <input className="submit-form" type="submit" />
      </form>
      <div>
        <Link className="auth-link" to="/forgot-password">
          Forgot Password
        </Link>
      </div>
    </div>
  );
};

export default NewPassword;
