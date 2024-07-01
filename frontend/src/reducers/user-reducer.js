import { ACTION_TYPE } from "../actions";
import { ROLE } from "../constans";

const InitialUserState = {
  id: null,
  login: null,
  roleId: ROLE.GUEST,
  session: null,
  basket: [],
};

export const userReducer = (state = InitialUserState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_USER:
      return {
        ...state,
        ...action.payload,
      };

    case ACTION_TYPE.ADD_PRODUCT_TO_USER:
      return {
        ...state,
        basket: [
          // ...state.basket,
          ...action.payload,
          // {
          // ...state.basket.product,
          // ...action.payload,
          // ...state.basket.count,
          // ...action.payload.count,
          // },
        ],
      };

    case ACTION_TYPE.DELETE_PRODUCT_IN_BASKET:
      return {
        ...state,
        basket: state.basket.filter(
          (product) => product._id !== action.payload
        ),
      };

    case ACTION_TYPE.DELETE_BASKET:
      return {
        ...state,
        basket: [],
      };

    case ACTION_TYPE.LOGOUT:
      return InitialUserState;
    default:
      return state;
  }
};
