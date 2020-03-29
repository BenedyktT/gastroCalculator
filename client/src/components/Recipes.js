import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { getTitles } from "../redux/actions/recipes";
import Loader from "./Loader";
import { Link } from "react-router-dom";

const Recipes = ({ titles, loading, getTitles }) => {
  useEffect(() => {
    getTitles();
  }, []);
  const render = () => {
    return (
      <Fragment>
        <h1 className="recipe-head">Our users recipes</h1>
        <ul className="recipe-grid">
          {titles.map(title => (
            <li className="recipe__element" key={title.id}>
              <Link className="recipe__link" to={`/recipe/${title.id}`}>
                {title.title}
              </Link>
            </li>
          ))}
        </ul>
      </Fragment>
    );
  };

  return <div>{!loading && titles ? render() : <Loader />}</div>;
};

export default connect(
  state => ({ titles: state.recipes.titles, loading: state.recipes.loading }),
  { getTitles }
)(Recipes);
