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

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Alerts />
        <Header />
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </Router>
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
