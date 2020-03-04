import { fetchSpotList, fetchSpotListError } from "../types/spotListTypes";
import axios from "axios";

const getSpotList = spotData => {
  const spotlistSet = (dispatch, error) => {
    axios
      .post(`http://192.168.1.76:5000/spotlist`, {
        user: {
          user_id: spotData.user.user_id,
          latitude: spotData.location.latitude,
          longitude: spotData.location.longitude,
          distance: 10,
          idToken: spotData.user.idToken
        }
      })
      .then(function(response) {
        let spotlist = response.data;
        dispatch(fetchSpotList(spotlist));
      })
      .catch(function(error) {
        dispatch(fetchSpotListError([]));
      });
  };
  return spotlistSet;
};

export { getSpotList };
