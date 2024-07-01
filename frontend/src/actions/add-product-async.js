import { request } from "../utils";
import { setProductData } from "./set-product-data";

export const addProductAsync = (productData) => (dispatch) => {
  request("/products", "POST", productData).then((productData) => {
    dispatch(setProductData(productData.data));

    return productData.data;
  });
};
