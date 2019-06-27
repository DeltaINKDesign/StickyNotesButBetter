import "./styles/index.less";
import "../dist/reset.css";

import { HashRouter as Router, Route, Link, Redirect } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";

ReactDOM.render(
  <Router>
    <Route path="/" component={App} />
  </Router>,
  document.getElementById("app")
);

module.hot.accept();
