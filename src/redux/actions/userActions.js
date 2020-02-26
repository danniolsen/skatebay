import {
  fetchUserBegin,
  fetchUserSuccess,
  fetchuUserFailure,
  clearUserBegin,
  clearUserSuccess
} from "../types/userTypes";
import axios from "axios";

import { SignOut } from "../../features/AuthSocial";

const setUserState = idToken => {
  const setUser = (dispatch, error) => {
    axios
      .post(`http://192.168.1.76:5000/auth`, {
        idToken: idToken
      })
      .then(function(response) {
        let user = response.data;
        dispatch(fetchUserSuccess({ user: user }));
        dispatch({ type: "SET_AUTH_SUCCESS", payload: true });
        dispatch({ type: "LOADING_STOP" });
      })
      .catch(function(error) {
        dispatch(fetchuUserFailure({ error: "Invalid request" }));
        dispatch({ type: "LOADING_STOP" });
      });
  };
  return setUser;
};

const clearUserState = () => {
  const clearUser = dispatch => {
    dispatch({ type: "LOADING_START" });
    dispatch(clearUserSuccess);
    SignOut();
    dispatch({ type: "LOADING_STOP" });
  };
  return clearUser;
};

export { setUserState, clearUserState };

/*
let provider = user.providerData[0] ? user.providerData[0].providerId : null;
console.log("-> ", provider);
const setUser = (dispatch, error) => {
  dispatch(fetchUserBegin);
  const userStructure = {
    displayName: user.displayName,
    email: user.email,
    photo: user.photoURL,
    uid: user.uid,
    provider: provider
  };
  dispatch(fetchUserSuccess({ user: userStructure }));
*/
