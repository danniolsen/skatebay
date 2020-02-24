import {
  FETCH_USER_BEGIN,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  CLEAR_USER_SUCCESS
} from "../types/userTypes";

const initialState = {
  user: {},
  userLoading: false,
  userError: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_BEGIN:
      return {
        ...state,
        userLoading: true,
        userError: null
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        userLoading: false,
        userError: action.payload.error
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        userLoading: false,
        user: action.payload.user,
        userError: null
      };
    case CLEAR_USER_SUCCESS:
      return {
        ...state,
        user: {},
        userLoading: false,
        userError: null
      };
    default:
      return state;
  }
};

export default userReducer;
