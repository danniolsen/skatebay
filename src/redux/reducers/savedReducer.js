import { SAVE_NEW_SPOT, GET_SAVED_SPOTS } from "../types/savedTypes";

const initialState = {
  spots: []
};

const savedReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_NEW_SPOT:
      return {
        ...state,
        spots: action.payload.spot
      };
    case GET_SAVED_SPOTS:
      return {
        ...state,
        spots: action.payload.spots
      };
    default:
      return state;
  }
};

export default savedReducer;
