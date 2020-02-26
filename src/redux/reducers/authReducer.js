import {
  SET_AUTH_BEGIN,
  SET_AUTH_SUCCESS,
  SET_AUTH_FAILURE
} from "../types/authTypes";

const initialState = {
  auth: false,
  authLoading: false,
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_BEGIN:
      return {
        ...state,
        authLoading: true
      };
    case SET_AUTH_SUCCESS:
      return {
        ...state,
        auth: true
      };
    case SET_AUTH_FAILURE:
      return {
        auth: false,
        authLoading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};

export default authReducer;
