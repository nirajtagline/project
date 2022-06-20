import { combineReducers } from "redux";
import userAuth from "./userAuth";
import allStudentData from "./allStudentData";
import exam from "./exam";

const appReducer = combineReducers({
  userAuth,
  allStudentData,
  exam,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
