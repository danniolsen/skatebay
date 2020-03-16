export const SET_AUTH_BEGIN = "SET_AUTH_BEGIN";
export const SET_AUTH_SUCCESS = "SET_AUTH_SUCCESS";
export const SET_AUTH_FAILURE = "SET_AUTH_FAILURE";

export const setAuthBegin = () => ({
  type: SET_AUTH_BEGIN,
  payload: { authLoading: true }
});

export const setAuthSuccess = auth => ({
  type: SET_AUTH_SUCCESS,
  payload: { auth: auth }
});

export const setAuthFailure = () => ({
  type: SET_AUTH_FAILURE
});
