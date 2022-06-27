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

let initialState = {
  userLoginDetails: {},
  userLoginDetailsLoading: false,
  userLoginDetailsError: "",
  isUserLogged: "false",
  forgotPassword: {},
  forgotPasswordLoading: false,
  forgotPasswordError: "",
  userSignUpDetails: {},
  userSignUpDetailsLoading: false,
  userSignUpDetailsError: "",
  userPasswordReset: {},
  userPasswordResetLoading: false,
  userPasswordResetError: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // User login details
    case FETCH_USER_LOGIN_DETAILS:
      return {
        ...state,
        userLoginDetailsLoading: true,
      };
    case FETCH_USER_LOGIN_DETAILS_SUCCESS:
      return {
        ...state,
        userLoginDetailsLoading: false,
        userLoginDetails: action.payload,
        isUserLogged: true,
      };
    case FETCH_USER_LOGIN_DETAILS_FAILURE:
      return {
        ...state,
        userLoginDetailsError: action.payload.error,
      };

    // User forgot password
    case USER_FORGOT_PASSWORD:
      return {
        ...state,
        forgotPasswordLoading: true,
      };
    case USER_FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPasswordLoading: false,
        forgotPassword: action.payload,
      };
    case USER_FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        forgotPasswordError: action.payload.error,
      };
    // User Signup
    case USER_SIGN_UP:
      return {
        ...state,
        userSignUpDetailsLoading: true,
      };
    case USER_SIGN_UP_SUCCESS:
      return {
        ...state,
        userSignUpDetailsLoading: false,
        userSignUpDetails: action.payload,
      };
    case USER_SIGN_UP_FAILURE:
      return {
        ...state,
        userSignUpDetailsLoading: false,
        userSignUpDetailsError: action.payload.error,
      };
    // User password reset
    case USER_RESET_PASSWORD:
      return {
        ...state,
        userPasswordResetLoading: true,
      };
    case USER_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        userPasswordResetLoading: false,
        userPasswordReset: action.payload,
      };
    case USER_RESET_PASSWORD_FAILURE:
      return {
        ...state,
        userPasswordResetError: action.payload.error,
      };

    default:
      return state;
  }
};

export default authReducer;
