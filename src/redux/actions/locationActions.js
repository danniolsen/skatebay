import { setLocation } from "../types/locationTypes";

const setNewLocation = (location) => {
  const locationSet = (dispatch, error) => {
    dispatch(setLocation({ location }));
  };
  return locationSet;
};

export { setNewLocation };
