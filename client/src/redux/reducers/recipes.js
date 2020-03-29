import {
  GET_RECIPES,
  GET_RECIPES_FAIL,
  GET_RECIPES_SUCCESS,
  GET_RECIPE,
  GET_RECIPE_FAIL,
  GET_RECIPE_SUCCESS
} from "../actions/types";

const initialState = {
  loading: null,
  titles: [],
  recipe: ""
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_RECIPES:
      return { ...state, loading: true };
    case GET_RECIPES_SUCCESS:
      return { ...state, titles: payload, loading: false };
    case GET_RECIPES_FAIL:
      return { ...state, loading: false };
    case GET_RECIPE:
      return { ...state, loading: true };
    case GET_RECIPE_SUCCESS:
      return { ...state, recipe: payload, loading: false };
    case GET_RECIPE_FAIL:
      return { ...state, loading: false };

    default:
      return state;
  }
};
