import {
  FETCH_SPOTLIST,
  FETCH_SPOTLIST_FAILURE,
  REMOVE_SPOT_FROM_LIST
} from "../types/spotListTypes";

const initialState = {
  spotList: [],
  spotListError: null
};

const spotListReducer = (state = initialState, action) => {
  const data = action.payload;
  switch (action.type) {
    case FETCH_SPOTLIST:
      return {
        ...state,
        spotList: action.payload
      };
    case FETCH_SPOTLIST_FAILURE:
      return {
        ...state,
        spotList: action.payload
      };
    case REMOVE_SPOT_FROM_LIST:
      return {
        ...state,
        spotList: action.payload
      };
    default:
      return state;
  }
};

export default spotListReducer;
