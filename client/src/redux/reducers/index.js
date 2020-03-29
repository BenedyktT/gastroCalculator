import { combineReducers } from "redux";
import nutritionValues from "./nutritionValues";
import alerts from "./alerts";
import add from "./alerts";

export default combineReducers({
  nutritionValues,
  alerts,
  add
});
