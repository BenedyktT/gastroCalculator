import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getNutritionValues } from "../redux/actions/nutritionValues";

const Home = ({ getNutritionValues }) => {
  useEffect(() => {
    getNutritionValues();
  }, [getNutritionValues]);
  return <div>Hello</div>;
};

export default connect(null, { getNutritionValues })(Home);
