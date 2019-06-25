import React from "react";
import style from "./style.less";
import LoginPage from "../../containers/LoginPage";
import { HashRouter as Router, Route, Link } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <>
        <div className={style.background} />
        <Router>
          <Route path="/" component={Main} />
        </Router>
      </>
    );
  }
}

const Main = () => (
  <div className={style.container}>
    <h1 className={style.logo}>Sticky Notes</h1>
    <Link to="/login">Login now</Link>
    <Route path="/login" component={LoginPage} />
    <Route path="/signin" component={LoginPage} />
  </div>
);

export default App;
