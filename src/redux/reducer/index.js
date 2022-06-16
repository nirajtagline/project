import { combineReducers } from "redux";
import userAuth from "./userAuth";

const appReducer = combineReducers({
  userAuth,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
