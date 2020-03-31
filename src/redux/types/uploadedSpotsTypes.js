export const FETCH_UPLOADED_SPOTS = "FETCH_UPLOADED_SPOTS";

export const fetchUploadedSpots = spots => ({
  type: FETCH_UPLOADED_SPOTS,
  payload: spots
});
