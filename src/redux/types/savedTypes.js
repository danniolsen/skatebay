export const GET_SAVED_SPOTS = "GET_SAVED_SPOTS";
export const SAVE_NEW_SPOT = "SAVE_NEW_SPOT";

export const getSavedSpots = (spots) => ({
  type: GET_SAVED_SPOTS,
  payload: spots
});

export const saveNewSpot = (spot) => ({
  type: SAVE_NEW_SPOT,
  payload: spot
});
