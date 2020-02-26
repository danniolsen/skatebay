import { loadingStart, loadingStop } from "../types/loadingTypes";

const setLoadingStart = () => {
  const startLoading = (dispatch, error) => {
    dispatch(loadingStart());

    setTimeout(() => {
      dispatch(loadingStop());
    }, 3000);
  };
  return startLoading;
};

const setLoadingStop = () => {
  const stopLoading = (dispatch, error) => {
    dispatch(loadingStop());
  };
  return stopLoading;
};

export { setLoadingStart, setLoadingStop };
