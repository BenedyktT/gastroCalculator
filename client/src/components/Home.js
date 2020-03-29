import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import NutritionTable from "./NutritionTable";
import Form from "./Form";
import Loader from "./Loader";
import RecipeFact from "./RecipeFact";

const Home = ({ values, loading }) => {
  const [portion, setPortion] = useState(300);
  const { nutrients, totalWeight } = values;
  return (
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
            <span>Total weight: {totalWeight}</span>
          </div>

          <NutritionTable
            nutrients={nutrients}
            totalWeight={totalWeight}
            portion={portion}
          />
          {values.healthLabels.length ? (
            <RecipeFact title="Health labels" label={values.healthLabels} />
          ) : null}
          {values.cautions.length ? (
            <RecipeFact title="Cautions" label={values.cautions} />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default connect(state => ({
  values: state.nutritionValues.nutrients,
  loading: state.nutritionValues.loading
}))(Home);
