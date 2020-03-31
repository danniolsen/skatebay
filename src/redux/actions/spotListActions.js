import { fetchSpotList, fetchSpotListError } from "../types/spotListTypes";
import { fetchUploadedSpots } from "../types/uploadedSpotsTypes";
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

const getUploadedSpots = user => {
  const uploadedSpots = (dispatch, err) => {
    console.log("called now");
    console.log(user.user_id);
    axios
      .post("http://192.168.1.76:5000/getuploads", {
        user: {
          user_id: user.user_id,
          idToken: "verify token later"
        }
      })
      .then(response => {
        console.log(response);
        dispatch(fetchUploadedSpots({ spots: response.data }));
      })
      .catch(err => {
        dispatch(fetchUploadedSpots({ spots: [] }));
      });
  };
  return uploadedSpots;
};

export { getSpotList, getUploadedSpots };
