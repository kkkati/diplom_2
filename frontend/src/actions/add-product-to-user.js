import { ACTION_TYPE } from "./action-type";

export const addProdutToUser = (basket) => {
  return {
    type: ACTION_TYPE.ADD_PRODUCT_TO_USER,
    payload: basket,
  };
};
