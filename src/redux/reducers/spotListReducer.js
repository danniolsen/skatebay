import { FETCH_SPOTLIST } from "../types/spotListTypes";
const initialState = {
  spotList: [],
  sptListError: null
};

const spotListReducer = (state = initialState, action) => {
  let data = action.payload;
  switch (action.type) {
    case FETCH_SPOTLIST:
      return {
        ...state,
        spotList: action.payload.spots
      };
    default:
      return state;
  }
};

export default spotListReducer;
