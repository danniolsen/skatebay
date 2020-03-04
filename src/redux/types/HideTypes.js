export const HIDE_SPOT_SUCCESS = "HIDE_SPOT_SUCCESS";
export const HIDE_SPOT_FAILURE = "HIDE_SPOT_FAILURE";

export const hideSpotSuccess = hiddenList => ({
  type: HIDE_SPOT_SUCCESS,
  payload: hiddenList
});

export const hideSpotFailure = error => ({
  type: HIDE_SPOT_FAILURE,
  payload: error
});
