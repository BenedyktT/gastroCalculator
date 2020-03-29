import React, { useState } from "react";
import { connect } from "react-redux";
import { submitRecipe } from "../redux/actions/nutritionValues";
import { setAlert } from "../redux/actions/alerts";

const Form = ({ nutrients, submitRecipe, setAlert }) => {
  const onSubmit = e => {
    e.preventDefault();
    if (!value) {
      setAlert("Include your recipe", "danger");
      return;
    }
    const recipe = {
      ingr: value
        .replace(/\r?\n|\r/g, " ")
        .trim()
        .toLowerCase()
        .split(",")
    };
    submitRecipe(recipe);
  };
  const [value, setValue] = useState("");
  return (
    <form className="form" onSubmit={onSubmit}>
      <textarea
        className="home__textarea"
        onChange={e => setValue(e.target.value)}
        value={value}
        placeholder={"2 slices of bread, 2 lettuce, 1 slice of ham, 50g tomato"}
      />
      <input className="btn" type="submit" />
    </form>
  );
};

export default connect(
  state => ({
    nutrients: state.nutritionValues.nutrients
  }),
  { submitRecipe, setAlert }
)(Form);
