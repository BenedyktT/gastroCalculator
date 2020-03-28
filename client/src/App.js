import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";

import "./App.scss";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <p>GASTRO CALC</p>
        </header>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
