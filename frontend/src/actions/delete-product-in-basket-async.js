import { request } from "../utils/request";
import { deleteProductInBasket } from "./delete-product-in-basket";

export const deleteProductInBasketAsync = (userId, productId) => (dispatch) => {
  request(`/users/${userId}/basket/${productId}`, "PATCH").then(() => {
    dispatch(deleteProductInBasket(productId));
  });
};
