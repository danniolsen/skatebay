import { HIDE_SPOT_SUCCESS, HIDE_SPOT_FAILURE } from "../types/HideTypes";

const initialState = {
  hidden: [],
  error: null
};

const hideReducer = (state = initialState, action) => {
  switch (action.type) {
    case HIDE_SPOT_SUCCESS:
      return {
        hidden: action.payload.hidden ? action.payload.hidden : state.hidden,
        error: action.payload.error ? action.payload.error : state.error
      };
    case HIDE_SPOT_FAILURE:
      return {
        hidden: action.payload.hidden ? action.payload.hidden : state.hidden,
        error: action.payload.error ? action.payload.error : state.error
      };
    default:
      return state;
  }
};

export default hideReducer;
