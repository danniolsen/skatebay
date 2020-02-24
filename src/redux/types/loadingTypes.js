export const LOADING_START = "LOADING_START";
export const LOADING_STOP = "LOADING_STOP";

const loadingStart = () => ({
  type: LOADING_START,
  payload: true
});

const loadingStop = () => ({
  type: LOADING_STOP,
  payload: false
});
