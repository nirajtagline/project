import { combineReducers } from "redux";
import userAuth from "./userAuth";
import allStudentData from "./allStudentData";
import exam from "./exam";
import student from "./student";

const appReducer = combineReducers({
  userAuth,
  allStudentData,
  exam,
  student,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
