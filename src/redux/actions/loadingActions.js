import { loadingStart, loadingStop } from "../types/loadingTypes";

const setLoadingStart = () => {
  const startLoading = (dispatch, error) => {
    dispatch(fetchUserSuccess(loadingStart()));
  };
  return startLoading;
};

const setLoadingStop = () => {
  const stopLoading = (dispatch, error) => {
    dispatch(fetchUserSuccess(loadingStop()));
  };
  return stopLoading;
};

export { setLoadingStart, setLoadingStop };
