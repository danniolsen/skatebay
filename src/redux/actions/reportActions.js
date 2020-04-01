import axios from "axios";

const reportSpot = (report) => {
  const reporting = (dispatch, error) => axios
    .post("http://192.168.1.76:5000/reportspot", {
      report: {
        spot: report.spot.spot_id,
        user: report.user.user.user_id,
        reason: report.reason,
        idToken: report.user.user.idToken
      }
    })
    .then((response) => response.data)
    .catch((error) => error);
  return reporting;
};

export { reportSpot };
