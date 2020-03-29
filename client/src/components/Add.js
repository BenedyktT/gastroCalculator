import React, { useState } from "react";
import { connect } from "react-redux";
import { add } from "../redux/actions/add";
import { setAlert } from "../redux/actions/alerts";

const Add = ({ loading, add, nutrients, history }) => {
  const [value, setValue] = useState({ title: "", prep: "" });
  const onChange = e => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const onSubmit = e => {
    e.preventDefault();
    const recipe = {
      ...nutrients,
      ...value
    };
    if (!nutrients) {
      setAlert("I have lost your recipe, can you start again?", "danger");
      history.push("/");
    }
    add(recipe);
  };
  return (
    <div>
      <form onSubmit={onSubmit} className="form add-form">
        <div className="add-element">
          <label htmlFor="title">Add title</label>
          <input
            value={value.title}
            className="add-element"
            onChange={onChange}
            name="title"
            type="text"
            placeholder="title"
          />
          <div className="add-element">
            <label htmlFor="prep">Add preparation method</label>
            <textarea
              value={value.prep}
              className="add-element"
              onChange={onChange}
              name="prep"
              placeholder="title"
            />
          </div>
          <input type="submit" className="btn" value=" Add this recipe" />
        </div>
      </form>
    </div>
  );
};

export default connect(
  state => ({
    loading: state.add.loading,
    nutrients: state.nutritionValues.nutrients
  }),
  { add }
)(Add);
