import axios from "axios";

const getUserById = user_id => {
  const userByPost = (dispatch, err) => {
    return axios
      .post("http://192.168.1.76:5000/getuserbyid", {
        user_id: user_id
      })
      .then(result => {
        return result.data;
      })
      .catch(err => {
        return {
          displayName: "User not found",
          photo: "Not found"
        };
      });
  };
  return userByPost;
};

export { getUserById };
