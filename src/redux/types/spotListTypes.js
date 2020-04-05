export const FETCH_SPOTLIST = "FETCH_SPOTLIST";
export const FETCH_SPOTLIST_FAILURE = "FETCH_SPOTLIST_FAILURE";
export const REMOVE_SPOT_FROM_LIST = "REMOVE_SPOT_FROM_LIST";

export const fetchSpotList = spotlist => ({
  type: FETCH_SPOTLIST,
  payload: spotlist
});

export const fetchSpotListError = () => ({
  type: FETCH_SPOTLIST_FAILURE,
  payload: []
});

export const removeSpotFromList = spotList => ({
  type: REMOVE_SPOT_FROM_LIST
});
