import { SET_LOCATION } from "../types/locationTypes";

const initialState = {
  latitude: 0.0,
  longitude: 0.0
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCATION:
      return {
        ...state,
        latitude: action.payload.location.latitude,
        longitude: action.payload.location.longitude
      };
    default:
      return state;
  }
};

export default locationReducer;
