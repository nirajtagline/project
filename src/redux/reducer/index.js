import { combineReducers } from "redux";
import userAuth from "./userAuth";
import allStudentData from "./allStudentData";
import exam from "./exam";
import student from "./student";
import { RESET_STORE } from "../constants/actionTypes";

const appReducer = combineReducers({
  userAuth,
  allStudentData,
  exam,
  student,
});

const rootReducer = (state, action) => {
  if (action.type === RESET_STORE) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
