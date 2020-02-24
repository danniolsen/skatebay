import {
  fetchUserBegin,
  fetchUserSuccess,
  fetchuUserFailure,
  clearUserBegin,
  clearUserSuccess
} from "../types/userTypes";

import { SignOut } from "../../features/AuthSocial";

const setUserState = user => {
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
  };
  return setUser;
};

const clearUserState = () => {
  const clearUser = dispatch => {
    dispatch(clearUserSuccess);
    SignOut();
  };
  return clearUser;
};

export { setUserState, clearUserState };
