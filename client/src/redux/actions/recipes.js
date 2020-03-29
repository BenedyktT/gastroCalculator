import Axios from "axios";
import {
  GET_RECIPES,
  GET_RECIPES_SUCCESS,
  GET_RECIPES_FAIL,
  GET_RECIPE,
  GET_RECIPE_SUCCESS,
  GET_RECIPE_FAIL
} from "./types";
import { setAlert } from "./alerts";

export const getTitles = () => async dispatch => {
  dispatch({ type: GET_RECIPES });
  try {
    const res = await Axios.get("/save");
    dispatch({ type: GET_RECIPES_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_RECIPES_FAIL });
    dispatch(setAlert("Something went wrong", "danger"));
  }
};

export const getRecipe = id => async dispatch => {
  dispatch({ type: GET_RECIPE });
  try {
    const res = await Axios.get(`/save/${id}`);
    dispatch({ type: GET_RECIPE_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_RECIPE_FAIL });
    dispatch(setAlert("Something went wrong", "danger"));
  }
};
