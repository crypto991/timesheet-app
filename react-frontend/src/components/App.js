import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import TaskManager from "./TaskManager";
import getDate from "../utils/getDate.js";

const App = () => {
  return (
    <Router>
      <Route path="/:date" exact={true} component={TaskManager} />
      <Route
        path="/"
        exact
        strict
        render={() => {
          return <Redirect to={`/${getDate()}`} />;
        }}
      />
    </Router>
  );
};

export default App;
