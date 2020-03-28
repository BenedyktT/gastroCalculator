import { GET_NUTRITION_VALUES } from "./types";

export const getNutritionValues = () => async dispatch => {
  dispatch({ type: GET_NUTRITION_VALUES });
};
