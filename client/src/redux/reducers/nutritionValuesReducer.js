import { GET_NUTRITION_VALUES } from "../actions/types";
const initialState = {};
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_NUTRITION_VALUES:
      console.log("redux");
      return state;
    default:
      return state;
  }
};
