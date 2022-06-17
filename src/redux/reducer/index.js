import { combineReducers } from "redux";
import userAuth from "./userAuth";
import allStudentData from "./allStudentData";

const appReducer = combineReducers({
  userAuth,
  allStudentData,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
