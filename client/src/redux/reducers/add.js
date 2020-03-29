import { ADD_FAIL, ADD_SUCCESS, ADD } from "../actions/types";
const initialState = {
  loading: null,
  error: ""
};
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD:
      return { ...state, loading: true };
    case ADD_SUCCESS:
      return { ...state, loading: false };
    case ADD_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};
