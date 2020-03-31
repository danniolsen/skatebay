import { NEW_SPOT_SET, NEW_SPOT_RESET } from "../types/newSpotTypes";

const initialState = {
  newSpot: {
    title: "",
    images: [{ set: false, location: {} }],
    tags: [],
    location: {
      latitude: null,
      longitude: null
    },
    user: null
  }
};

const newSpotReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_SPOT_SET:
      return {
        ...state,
        newSpot: action.payload.newSpot
      };
    case NEW_SPOT_RESET:
      return {
        newSpot: {
          title: "",
          images: [{ set: false, location: {} }],
          tags: [],
          location: {
            latitude: null,
            longitude: null
          },
          user: null
        }
      };
    default:
      return state;
  }
};

export default newSpotReducer;
