import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getRecipe } from "../redux/actions/recipes";
import Loader from "./Loader";
import NutritionTable from "./NutritionTable";
import RecipeFact from "./RecipeFact";
import { Link } from "react-router-dom";

const Recipe = ({ match, getRecipe, recipe, loading }) => {
  const [portion, setPortion] = useState(300);
  useEffect(() => {
    getRecipe(match.params.id);
  }, []);
  const render = () => {
    const {
      nutrients,
      healthLabels,
      dietLabels,
      totalWeight,
      title,
      prep,
      ingr
    } = recipe;
    return (
      <div className="home">
        <div className="desc">
          <h1>{title}</h1>

          <article className="prep">
            <h2>Preparation:</h2>
            {prep}
          </article>
          <div>
            <h2>Ingredienties:</h2>
            <ul className="ingr">
              {ingr.map(e => (
                <li key={Math.random()}>{e}</li>
              ))}
            </ul>
          </div>
        </div>
        {loading && <Loader />}
        {!loading && nutrients && (
          <div className="table">
            <div className="overall">
              <span>
                <input
                  className="portion"
                  type="number"
                  value={portion}
                  name="portion"
                  onChange={e => setPortion(e.target.value)}
                />
                g
              </span>
              <span>Total weight: {totalWeight}</span>
            </div>

            <NutritionTable
              nutrients={nutrients}
              totalWeight={totalWeight}
              portion={portion}
            />
            {healthLabels.length ? (
              <RecipeFact title="Health labels" label={healthLabels} />
            ) : null}
            {dietLabels.length ? (
              <RecipeFact title="Diet type" label={dietLabels} />
            ) : null}
          </div>
        )}
      </div>
    );
  };
  return (
    <div>
      {recipe && !loading ? render() : <Loader />}
      <div className="links">
        <Link className="btn" to="/">
          Create your own
        </Link>
        <Link className="btn" to="/recipes">
          See more recipes
        </Link>
      </div>
    </div>
  );
};

export default connect(
  state => ({ recipe: state.recipes.recipe, loading: state.recipes.loading }),
  { getRecipe }
)(Recipe);
