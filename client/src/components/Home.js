import React, { useEffect } from "react";
import { connect } from "react-redux";
import NutritionTable from "./NutritionTable";
import Form from "./Form";

const Home = ({ nutrients, loading }) => {
  return (
    <div className="home">
      <Form />
      <div className="table">
        <NutritionTable
          nutrients={{
            Fat: 0,
            Saturated: 0,
            Monounsaturated: 0,
            Polyunsaturated: 0,
            Carbs: 0,
            Fiber: 0,
            Water: 0,
            Protein: 0,
            Sugars: 0
          }}
        />
      </div>
    </div>
  );
};

export default connect(state => ({
  nutrients: state.nutritionValues.nutrients,
  loading: state.nutritionValues.loading
}))(Home);
