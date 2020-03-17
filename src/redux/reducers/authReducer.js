import {
  SET_AUTH_BEGIN,
  SET_AUTH_SUCCESS,
  SET_AUTH_FAILURE
} from "../types/authTypes";

const initialState = {
  auth: false,
  authLoading: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_BEGIN:
      return {
        auth: false,
        authLoading: true
      };
    case SET_AUTH_SUCCESS:
      return {
        auth: true,
        authLoading: true
      };
    case SET_AUTH_FAILURE:
      return {
        auth: false,
        authLoading: false
      };
    default:
      return state;
  }
};

export default authReducer;
