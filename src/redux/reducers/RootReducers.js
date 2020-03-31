import { combineReducers } from "redux";
import User from "./userReducer";
import Loading from "./loadingReducer";
import Auth from "./authReducer";
import Location from "./locationReducer";
import SpotList from "./spotListReducer";
import Saved from "./savedReducer";
import Banner from "./bannerReducer";
import NewSpot from "./newSpotReducer";
import Uploads from "./uploadedSpotsReducer";
import { SignOut } from "../../features/AuthSocial";

const appReducer = combineReducers({
  user: User,
  newSpot: NewSpot,
  spotList: SpotList,
  saved: Saved,
  uploads: Uploads,
  loading: Loading,
  auth: Auth,
  location: Location,
  banner: Banner
});

const rootReducer = (state, action) => {
  if (action.type === "SIGN_OUT") {
    SignOut();
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
