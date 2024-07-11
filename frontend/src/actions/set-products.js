import { ACTION_TYPE } from "./action-type";

export const setProducts = (productsData) => ({
  type: ACTION_TYPE.SET_PRODUCTS,
  payload: productsData,
});
