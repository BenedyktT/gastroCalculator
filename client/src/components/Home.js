import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import NutritionTable from "./NutritionTable";
import Form from "./Form";
import Loader from "./Loader";
import RecipeFact from "./RecipeFact";
import Help from "./Help";
import { Link } from "react-router-dom";

const Home = ({ values, loading }) => {
  const [portion, setPortion] = useState(300);
  const [isHelpActive, setHelpActive] = useState(false);
  const { nutrients, totalWeight } = values;
  return (
    <Fragment>
      <div className="home__head">
        <h1>Enter recipy and generate nutrition table</h1>
      </div>
      <div className="home">
        <Form />
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
              <span>Total weight: {parseInt(totalWeight)}</span>
            </div>

            <NutritionTable
              nutrients={nutrients}
              totalWeight={totalWeight}
              portion={portion}
            />
            {values.healthLabels.length ? (
              <RecipeFact title="Health labels" label={values.healthLabels} />
            ) : null}
            {values.dietLabels.length ? (
              <RecipeFact title="Diet type" label={values.dietLabels} />
            ) : null}
            <div className="share">
              <Link to="/add" className="btn">
                Share this recipe with others
              </Link>
            </div>
          </div>
        )}
      </div>
      {!loading && (
        <div className="help-container">
          <Help active={isHelpActive} />
          <button
            className="help-btn"
            onClick={() => setHelpActive(!isHelpActive)}
          >
            Help
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default connect(state => ({
  values: state.nutritionValues.nutrients,
  loading: state.nutritionValues.loading
}))(Home);
