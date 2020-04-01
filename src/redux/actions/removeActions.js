import axios from "axios";

const removeSpot = (removeData) => {
  const startRemoveSpot = () => {
    const sendingData = {
      spot_id: removeData.spot_id,
      user_id: removeData.user_id,
      idToken: ""
    };
    axios
      .post("http://192.168.1.76:5000/removespot", {
        spot: { spot_id: sendingData.spot_id },
        user: { user_id: sendingData.user_id }
      })
      .then((response) => {
        alert("spot removed");
      })
      .catch((error) => {
        alert("Something went wrong");
      });
  };
  return startRemoveSpot;
};

export { removeSpot };
