import { request } from "../utils/request";
import { addProdutToUser } from "./add-product-to-user";

export const addProductToBasketAsync =
  (userId, productId, count) => (dispatch) => {
    request(`/users/${userId}`, "PATCH", { productId, count }).then(
      ({ data }) => {
        // dispatch(addProdutToUser({ product: productId, count }));
        dispatch(addProdutToUser(data.basket));
      }
    );
  };
