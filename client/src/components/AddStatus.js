import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const AddStatus = ({ error }) => {
  return (
    <div style={{ textAlign: "center" }}>
      {error ? (
        <h2>We couldn't processed your recipe</h2>
      ) : (
        <h2
          style={{ fontSize: "3rem", color: "white" }}
          className="alert-success"
        >
          Success!
        </h2>
      )}
      {error && <p>{error.msg}</p>}
      <div className="links">
        <Link className="btn" to="/">
          Start again
        </Link>
        <Link className="btn" to="/recipes">
          See users recipes
        </Link>
      </div>
    </div>
  );
};

export default connect(state => ({ error: state.add.error }))(AddStatus);
