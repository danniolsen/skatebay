import { SHOW_BANNER, HIDE_BANNER } from "../types/bannerTypes";

const initialState = {
  banner: {
    msg: null,
    style: null,
    show: false
  }
};

const bannerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_BANNER:
      return {
        banner: action.payload.banner
      };
    case HIDE_BANNER:
      return initialState;
    default:
      return state;
  }
};

export default bannerReducer;
