import axios from "axios";
import {
  fetchUserBegin,
  fetchUserSuccess,
  fetchuUserFailure,
  clearUserBegin,
  clearUserSuccess
} from "../types/userTypes";


import { SignOut } from "../../features/AuthSocial";

const setUserState = (idToken) => {
  const setUser = (dispatch, error) => {
    dispatch({ type: "SET_AUTH_BEGIN" });
    axios
      .post("http://192.168.1.76:5000/auth", {
        idToken
      })
      .then((response) => {
        const user = response.data;
        user.idToken = idToken;
        dispatch(fetchUserSuccess({ user }));

        // check if user were returned
        if (Object.entries(user).length !== 0 && user.constructor === Object) {
          dispatch({ type: "SET_AUTH_SUCCESS", payload: { auth: true } });
        }
      })
      .catch((error) => {
        dispatch(fetchuUserFailure({ error: "Invalid request" }));
        dispatch({ type: "SET_AUTH_FAILURE", payload: { auth: false } });
      })
      .finally((fin) => {
        dispatch({ type: "LOADING_STOP" });
      });
  };
  return setUser;
};

const clearUserState = () => {
  const clearUser = (dispatch) => {
    dispatch({ type: "LOADING_START" });
    try {
      dispatch(clearUserSuccess);
      SignOut();
    } catch (e) {
      alert("Could not sign out");
    } finally {
      dispatch({ type: "LOADING_STOP" });
    }
  };
  return clearUser;
};

export { setUserState, clearUserState };
