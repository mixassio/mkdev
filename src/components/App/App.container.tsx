import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from "./App";
import Statistics from "../Statistics";

const AppContainer = () => {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/records">Records</Link>
          </li>
        </ul>
        <Route exact path="/" component={App} />
        <Route path="/records" component={Statistics} />
      </div>
    </Router>
  );
};

export default AppContainer;
