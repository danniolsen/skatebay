import { LOADING_START, LOADING_STOP } from "../types/loadingTypes";

const initialState = {
  loading: false
};

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_START:
      return { loading: true };

    case LOADING_STOP:
      return { loading: false };
    default:
      return { loading: false };
  }
};

export default loadingReducer;
