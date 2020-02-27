import { fetchSpotList } from "../types/spotListTypes";
import axios from "axios";

// add user as params later
let user = {
  latitude: "",
  longitude: "",
  idToken: ""
};

const getSpotList = () => {
  const spotlistSet = (dispatch, error) => {
    axios
      .post(`http://192.168.1.76:5000/spotlist`, {
        latitude: user.latitude,
        longitude: user.longitude,
        idToken: user.idToken
      })
      .then(function(response) {
        let spotlist = response.data;
        dispatch(fetchSpotList(spotlist));
      })
      .catch(function(error) {
        alert("fetch error");
      });
  };
  return spotlistSet;
};

export { getSpotList };
