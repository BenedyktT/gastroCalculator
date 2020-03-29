import { SUBMIT_FAIL, SUBMIT_SUCCESS, SUBMIT } from "../actions/types";

const initialState = {
  loading: null,
  nutrients: ""
};
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SUBMIT:
      return { ...state, loading: true };

    case SUBMIT_SUCCESS:
      return { ...state, loading: false, nutrients: payload };
    case SUBMIT_FAIL:
      return { ...state, loading: false, nutrients: "" };
    default:
      return state;
  }
};
