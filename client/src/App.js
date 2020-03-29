import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import "normalize.css";
import "./styles/App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Alerts from "./components/Alerts";
import Add from "./components/Add";
import Recipes from "./components/Recipes";
import AddStatus from "./components/AddStatus";
import Recipe from "./components/Recipe";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Alerts />
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/add" component={Add} />
            <Route exact path="/recipes" component={Recipes} />
            <Route exact path="/recipe/:id" component={Recipe} />

            <Route exact path="/addstatus" component={AddStatus} />
          </Switch>
        </Router>
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
