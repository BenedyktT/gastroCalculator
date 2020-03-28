import { SUBMIT_SUCCESS, SUBMIT_FAIL, SUBMIT } from "./types";
import Axios from "axios";

export const submitRecipe = recipe => async dispatch => {
  dispatch({ type: SUBMIT });
  try {
    const res = await Axios.post("/recipes", recipe);
    dispatch({ type: SUBMIT_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: SUBMIT_FAIL });
  }
};
