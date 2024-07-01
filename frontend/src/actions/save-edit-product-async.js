import { request } from "../utils";
import { setProductData } from "./set-product-data";

export const saveEditProductAsync = (id, newProductData) => (dispatch) => {
  request(`/products/${id}`, "PATCH", newProductData).then((updatedProduct) => {
    dispatch(setProductData(updatedProduct.data));
    return updatedProduct.data;
  });
};
