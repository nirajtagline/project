import {
  FETCH_USER_LOGIN_DETAILS,
  FETCH_USER_LOGIN_DETAILS_SUCCESS,
  FETCH_USER_LOGIN_DETAILS_FAILURE,
  USER_FORGOT_PASSWORD,
  USER_FORGOT_PASSWORD_SUCCESS,
  USER_FORGOT_PASSWORD_FAILURE,
  USER_SIGN_UP,
  USER_SIGN_UP_SUCCESS,
  USER_SIGN_UP_FAILURE,
  USER_RESET_PASSWORD,
  USER_RESET_PASSWORD_SUCCESS,
  USER_RESET_PASSWORD_FAILURE,
} from "../constants/actionTypes";

import axios from "../../config/axios";

// fetch login data
export const fetchUserLoginDetails = (payload) => {
  return {
    type: FETCH_USER_LOGIN_DETAILS,
    payload: payload,
  };
};
export const fetchUserLoginDetailsSuccess = (payload) => {
  return {
    type: FETCH_USER_LOGIN_DETAILS_SUCCESS,
    payload: payload,
  };
};
export const fetchUserLoginDetailsFailure = (payload) => {
  return {
    type: FETCH_USER_LOGIN_DETAILS_FAILURE,
    payload: payload,
  };
};

export const getUserLoginDetails = (body) => async (dispatch) => {
  dispatch(fetchUserLoginDetails());
  axios
    .post("/users/Login", body)
    .then((res) => {
      dispatch(fetchUserLoginDetailsSuccess(res.data));
      localStorage.setItem("user-token", res.data.data.token);
      localStorage.setItem("user-role", res.data.data.role);
    })
    .catch((error) => {
      dispatch(fetchUserLoginDetailsFailure(error.data.message));
    });
};

// forget user password
export const userForgotPassword = (payload) => {
  return {
    type: USER_FORGOT_PASSWORD,
    payload: payload,
  };
};
export const userForgotPasswordSuccess = (payload) => {
  return {
    type: USER_FORGOT_PASSWORD_SUCCESS,
    payload: payload,
  };
};
export const userForgotPasswordFailure = (payload) => {
  return {
    type: USER_FORGOT_PASSWORD_FAILURE,
    payload: payload,
  };
};

export const forgotUserPassword =
  (body, searchParams = "") =>
  async (dispatch) => {
    dispatch(userForgotPassword());

    axios
      .post(
        `/users/ForgotPassword${
          searchParams ? `/Verify?token=${searchParams}` : ""
        }`,
        body
      )
      .then((res) => {
        dispatch(userForgotPasswordSuccess(res));
      })
      .catch((error) => {
        dispatch(userForgotPasswordFailure({ error: error.data.message }));
      });
  };

// Signup
export const userSignUp = (payload) => {
  return {
    type: USER_SIGN_UP,
    payload: payload,
  };
};
export const userSignUpSuccess = (payload) => {
  return {
    type: USER_SIGN_UP_SUCCESS,
    payload: payload,
  };
};
export const userSignUpFailure = (payload) => {
  return {
    type: USER_SIGN_UP_FAILURE,
    payload: payload,
  };
};

export const getUserSignUpDetails = (body) => async (dispatch) => {
  dispatch(userSignUp());

  axios
    .post("/users/SignUp", body)
    .then((res) => {
      dispatch(userSignUpSuccess(res.data));
      return;
    })
    .catch((error) => {
      dispatch(userSignUpFailure({ error: error.data.message }));
    });
};

// Reset password
export const userPasswordReset = (payload) => {
  return {
    type: USER_RESET_PASSWORD,
    payload: payload,
  };
};
export const userPasswordResetSuccess = (payload) => {
  return {
    type: USER_RESET_PASSWORD_SUCCESS,
    payload: payload,
  };
};
export const userPasswordResetFailure = (payload) => {
  return {
    type: USER_RESET_PASSWORD_FAILURE,
    payload: payload,
  };
};

export const getUserPasswordReset = (body) => async (dispatch) => {
  dispatch(userPasswordReset());

  axios
    .post("/users/ResetPassword", body, {
      headers: { "access-token": `${localStorage.getItem("user-token")}` },
    })
    .then((res) => {
      dispatch(userPasswordResetSuccess(res.data));
    })
    .catch((error) => {
      dispatch(userPasswordResetFailure({ error: error.data.message }));
    });
};
