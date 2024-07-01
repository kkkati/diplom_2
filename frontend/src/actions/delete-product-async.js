import { request } from "../utils/request";

export const deleteProductAsync = (id) => (dispatch) =>
  request(`/products/${id}`, "DELETE");
