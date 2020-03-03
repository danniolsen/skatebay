import axios from "axios";
import { getSavedSpots } from "../types/savedTypes";

const getSavedSpotsList = user => {
  const savedSpots = (dispatch, err) => {
    axios
      .post("http://192.168.1.76:5000/savedlist", {
        user: {
          user_id: user.user.user_id,
          idToken: "verify token later"
        }
      })
      .then(response => {
        dispatch(getSavedSpots({ spots: response.data }));
      })
      .catch(err => {
        console.log(err.stack);
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
      .then(function(response) {
        alert(response.data.msg);
      })
      .catch(error => {
        alert("Something went wrong");
      });
  };
  return saveNow;
};

export { getSavedSpotsList, saveSpot };
