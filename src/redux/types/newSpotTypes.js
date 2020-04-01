export const NEW_SPOT_SET = "NEW_SPOT_SET";
export const NEW_SPOT_RESET = "NEW_SPOT_RESET";

export const setNewSpot = (newSpotData) => ({
  type: NEW_SPOT_SET,
  payload: newSpotData
});

export const resetNewSpot = () => ({
  type: NEW_SPOT_RESET
});
