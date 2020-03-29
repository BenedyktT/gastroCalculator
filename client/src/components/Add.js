import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { add, addFail } from "../redux/actions/add";
import { setAlert } from "../redux/actions/alerts";
import Loader from "./Loader";

const Add = ({ loading, add, nutrients, history, error, setAlert }) => {
  const [value, setValue] = useState({ title: "", prep: "" });
  const [isSubmitted, setSubmitted] = useState(false);
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
      return;
    }
    if (error) {
      setAlert(error.msg, "danger");
      history.push("/");
      return;
    }
    add(recipe);
    setSubmitted(true);
  };
  useEffect(() => {
    if (isSubmitted && !loading) {
      history.push("/addStatus");
      setSubmitted(false);
    }
  }, [loading, isSubmitted, history]);
  return (
    <div>
      {loading && isSubmitted && <Loader />}
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
    nutrients: state.nutritionValues.nutrients,
    error: state.add.error
  }),
  { add, addFail, setAlert }
)(Add);
