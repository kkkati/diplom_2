import { ACTION_TYPE } from "../actions";

const InitialProductsState = [];

export const productsReducer = (state = InitialProductsState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_PRODUCTS:
      return [...action.payload];
    default:
      return state;
  }
};
