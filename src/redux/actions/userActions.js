import {
  fetchUserBegin,
  fetchUserSuccess,
  fetchuUserFailure,
  clearUserBegin,
  clearUserSuccess
} from "../types/userTypes";

import { SignOut } from "../../features/AuthSocial";

const setUserState = user => {
  const setUser = (dispatch, error) => {
    dispatch(fetchUserBegin);
    console.log(user.photoURL);
    const userStructure = {
      displayName: user.displayName,
      email: user.email,
      photo: user.photoURL,
      uid: user.uid
    };
    dispatch(fetchUserSuccess({ user: userStructure }));
  };
  return setUser;
};

const clearUserState = () => {
  const clearUser = dispatch => {
    dispatch(clearUserSuccess);
  };
  return clearUser;
};

export { setUserState, clearUserState };
