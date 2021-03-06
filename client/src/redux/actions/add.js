import { ADD_SUCCESS, ADD_FAIL, ADD } from "./types";
import Axios from "axios";
import { setAlert } from "./alerts";

export const add = recipe => async dispatch => {
  try {
    dispatch({ type: ADD });
    await Axios.post("/save", recipe);
    dispatch({ type: ADD_SUCCESS });
  } catch (error) {
    dispatch({ type: ADD_FAIL, payload: error.response.data.errors[0] });
    if (error.response && error.response.data.errors) {
      error.response.data.errors.forEach(e =>
        dispatch(setAlert(e.msg, "danger"))
      );
      return;
    } else {
      dispatch(setAlert("Something went wrong", "danger"));
    }
  }
};

export const addFail = message => dispatch =>
  dispatch({ type: ADD_FAIL, payload: { msg: message } });
