import { combineReducers } from "redux";
import nutritionValues from "./nutritionValues";
import alerts from "./alerts";

export default combineReducers({
  nutritionValues,
  alerts
});
