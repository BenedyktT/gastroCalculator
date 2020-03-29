import React from "react";

const RecipeFact = ({ label, title }) => {
  return (
    <div className="labels-container">
      <p className="label__title">{title}</p>
      <ul className="labels">
        {label.map(label => (
          <li key={Math.random()} className="labels__element">
            {label.toLowerCase().replace(/_+/g, " ")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeFact;
