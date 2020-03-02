import { fetchSpotList } from "../types/spotListTypes";
import axios from "axios";

const getSpotList = spotData => {
  const spotlistSet = (dispatch, error) => {
    axios
      .post(`http://192.168.1.76:5000/spotlist`, {
        user: {
          user_id: spotData.user.uid,
          latitude: spotData.location.latitude,
          longitude: spotData.location.longitude,
          distance: 200,
          idToken: spotData.user.idToken
        }
      })
      .then(function(response) {
        let spotlist = response.data;
        dispatch(fetchSpotList(spotlist));
      })
      .catch(function(error) {
        console.log("fetch error", error);
      });
  };
  return spotlistSet;
};

export { getSpotList };
