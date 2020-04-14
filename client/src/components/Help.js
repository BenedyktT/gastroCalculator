import React from "react";

const Help = ({ active }) => {
  return (
    <div className={active ? "help active" : "help"}>
      Enter an ingredient list for what you are cooking, like "1 cup rice, 10 oz
      chickpeas, 150g beef, 2 slices of bread", etc. Separate each ingredient
      with coma.
    </div>
  );
};

export default Help;
