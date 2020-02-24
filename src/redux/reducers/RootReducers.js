import { combineReducers } from "redux";
import User from "./userReducer";
import Loading from "./loadingReducer";

export default combineReducers({
  user: User,
  loading: Loading
});
