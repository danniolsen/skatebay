import axios from "axios";
import { getSavedSpots, saveNewSpot } from "../types/savedTypes";

const getSavedSpotsList = user => {
  const savedSpots = (dispatch, err) => {
    axios
      .post("http://192.168.1.76:5000/savedlist", {
        user: {
          user_id: user.user_id,
          idToken: "verify token later"
        }
      })
      .then(response => {
        dispatch(getSavedSpots({ spots: response.data }));
      })
      .catch(err => {
        console.log(err.stack);
        dispatch(getSavedSpots({ spots: [] }));
      });
  };
  return savedSpots;
};

const saveSpot = saveData => {
  const saveNow = (dispatch, err) => {
    return axios
      .post(`http://192.168.1.76:5000/savespot`, {
        spot: { spot_id: saveData.spot_id },
        user: { user_id: saveData.user_id }
      })
      .then(function(response) {})
      .catch(error => {
        alert("Something went wrong");
      });
  };
  return saveNow;
};

const saveCount = spot_id => {
  return axios
    .post(`http://192.168.1.76:5000/savecount`, {
      spot_id: spot_id
    })
    .then(response => {
      return response.data[0].count;
    })
    .catch(err => {
      return "Not avalible";
    });
};

export { getSavedSpotsList, saveSpot, saveCount };
