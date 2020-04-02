import {
  SHOW_BANNER,
  HIDE_BANNER,
  SHOW_BANNER_ALERT,
  HIDE_BANNER_ALERT
} from "../types/bannerTypes";

const initialState = {
  banner: {
    msg: null,
    style: null,
    show: false
  },
  alert: {
    title: "",
    msg: "",
    style: "",
    options: false,
    show: false
  }
};

const bannerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_BANNER:
      return {
        ...state,
        banner: action.payload.banner
      };
    case HIDE_BANNER:
      return initialState;
    case SHOW_BANNER_ALERT:
      return {
        ...state,
        alert: action.payload.banner
      };
    case HIDE_BANNER_ALERT:
      return initialState;
    default:
      return state;
  }
};

export default bannerReducer;
