import { request } from "../utils/request";
import { ACTION_TYPE } from "./action-type";

export const deleteBasketAsync = (userId) => (dispatch) => {
  request(`/users/${userId}/basket`, "PATCH").then(() => {
    return { type: ACTION_TYPE.DELETE_BASKET };
  });
};
