import { request } from "../utils/request";
import { setUser } from "./set-user";

export const loadUserAsync = (userId) => (dispatch) =>
  request(`/users/${userId}`).then((userData) => {
    if (userData.data) {
      dispatch(setUser(userData.data));
    }
    return userData;
  });
