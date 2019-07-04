import React from "react";
import style from "./style.less";
import LoginPage from "../../containers/LoginPage";
import HomePage from "../../containers/HomePage";
import { Route, Redirect } from "react-router-dom";

export default class App extends React.Component {
  hello = () => <Redirect path="/" />;

  render() {
    return (
      <>
        <Route path="/loginsucces" component={this.hello} />
        <div className={style.background} />
        {localStorage.getItem("acces_token") ? (
          <Route path="/" component={HomePage} />
        ) : (
          <div className={style.container}>
            <h1 className={style.logo}>Sticky Notes</h1>
            <Route path="/" component={LoginPage} />
          </div>
        )}
      </>
    );
  }
}
