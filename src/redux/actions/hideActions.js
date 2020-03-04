import { hideSpotSuccess, hideSpotFailure } from "../types/HideTypes";

const hideSpot = hideSpotData => {
  const startHidingSpot = (dispatch, error) => {
    let newHiddenList = Object.assign([], hideSpotData.hiddenSpotList);

    newHiddenList.push({ spot: hideSpotData.spot });

    let newState = {
      hidden: newHiddenList,
      error: null
    };
    try {
      dispatch(hideSpotSuccess(newState));
    } catch (error) {
      dispatch(hideSpotFailure(newState));
    }
  };
  return startHidingSpot;
};

export { hideSpot };
