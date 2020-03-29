import { combineReducers } from "redux";
import nutritionValues from "./nutritionValues";
import alerts from "./alerts";
import add from "./add";
import recipes from "./recipes";

export default combineReducers({
  nutritionValues,
  alerts,
  add,
  recipes
});
