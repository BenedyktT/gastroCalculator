import { SUBMIT_SUCCESS, SUBMIT_FAIL, SUBMIT } from "./types";
import Axios from "axios";
import { setAlert } from "./alerts";

export const submitRecipe = recipe => async dispatch => {
  dispatch({ type: SUBMIT });
  try {
    const res = await Axios.post("/recipes", recipe);
    dispatch({ type: SUBMIT_SUCCESS, payload: res.data });
    dispatch(setAlert("Bingo!", "success"));
  } catch (error) {
    dispatch({ type: SUBMIT_FAIL });
    if (error.response && error.response.data) {
      if (
        error.response.data &&
        error.response.data.errors.find(e => e.msg.includes("555"))
      ) {
        dispatch(
          setAlert(
            "I couldn't processed this one, could you try again?",
            "danger"
          )
        );
        return;
      }
      error.response.data.errors.forEach(e =>
        dispatch(setAlert(e.msg, "danger"))
      );
      return;
    } else {
      dispatch(setAlert("Something went wrong", "danger"));
    }
  }
};
