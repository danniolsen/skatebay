import {
  fetchUserBegin,
  fetchUserSuccess,
  fetchuUserFailure
} from "../types/userTypes";

const setUserState = user => {
  const setUser = (dispatch, error) => {
    dispatch(fetchUserBegin);

    const userStructure = {
      displayName: user.displayName,
      email: user.email,
      photo: user.photoURL
    };
    dispatch(fetchUserSuccess({ user: userStructure }));
  };
  return setUser;
};

export { setUserState };
