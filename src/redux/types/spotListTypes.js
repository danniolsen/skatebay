export const FETCH_SPOTLIST = "FETCH_SPOTLIST";
export const FETCH_SPOTLIST_FAILURE = "FETCH_SPOTLIST_FAILURE";

export const fetchSpotList = (spotlist) => ({
  type: FETCH_SPOTLIST,
  payload: spotlist
});

export const fetchSpotListError = () => ({
  type: FETCH_SPOTLIST_FAILURE,
  payload: []
});
