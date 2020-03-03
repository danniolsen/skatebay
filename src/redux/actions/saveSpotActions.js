import axios from "axios";

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

export { saveSpot };
