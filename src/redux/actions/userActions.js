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
    dispatch({ type: "SET_AUTH_BEGIN" });
    axios
      .post(`http://192.168.1.76:5000/auth`, {
        idToken: idToken
      })
      .then(function(response) {
        let user = response.data;
        user.idToken = idToken;
        dispatch(fetchUserSuccess({ user: user }));

        // check if user were returned
        if (Object.entries(user).length !== 0 && user.constructor === Object) {
          dispatch({ type: "SET_AUTH_SUCCESS", payload: { auth: true } });
        }
        dispatch({ type: "LOADING_STOP" });
      })
      .catch(function(error) {
        dispatch(fetchuUserFailure({ error: "Invalid request" }));
        dispatch({ type: "LOADING_STOP" });
        dispatch({ type: "SET_AUTH_FAILURE", payload: "error" });
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
