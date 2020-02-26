import { combineReducers } from "redux";
import User from "./userReducer";
import Loading from "./loadingReducer";
import Auth from "./authReducer";
import Location from "./locationReducer";
import { SignOut } from "../../features/AuthSocial";

const appReducer = combineReducers({
  user: User,
  loading: Loading,
  auth: Auth,
  location: Location
});

const rootReducer = (state, action) => {
  if (action.type === "SIGN_OUT") {
    SignOut();
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
