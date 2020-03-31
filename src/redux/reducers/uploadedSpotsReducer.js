import { FETCH_UPLOADED_SPOTS } from "../types/uploadedSpotsTypes";

const initialState = {
  spots: []
};

const uploadedSpotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_UPLOADED_SPOTS:
      return {
        ...state,
        spots: action.payload.spots
      };
    default:
      return state;
  }
};

export default uploadedSpotsReducer;
