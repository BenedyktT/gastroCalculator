import React, { useState } from "react";
import { connect } from "react-redux";
import { submitRecipe } from "../redux/actions/nutritionValues";

const Form = ({ nutrients, submitRecipe }) => {
  const onSubmit = e => {
    e.preventDefault();
    const recipe = {
      ...value,
      ingr: value.ingr
        .replace(/\r?\n|\r/g, " ")
        .trim()
        .toLowerCase()
        .split(",")
    };
    console.log(recipe);
  };
  const [value, setValue] = useState(
    "2 slices of bread, 2 lettuce, 1 slice of ham, 50g tomato"
  );
  return (
    <form className="form" onSubmit={onSubmit}>
      <textarea
        className="home__textarea"
        onChange={e => setValue(e.target.value)}
        value={value}
      />
      <input className="btn" type="submit" />
    </form>
  );
};

export default connect(
  state => (
    {
      nutrients: state.nutritionValues.nutrients
    },
    { submitRecipe }
  )
)(Form);
