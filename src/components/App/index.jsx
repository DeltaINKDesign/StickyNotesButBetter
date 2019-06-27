import React from "react";
import style from "./style.less";
import LoginPage from "../../containers/LoginPage";
import HomePage from "../../containers/HomePage";
import { HashRouter as Router, Route, Link, Redirect } from "react-router-dom";

export default class App extends React.Component {
  state = {
    refresh: false
  };

  hello = () => {
    this.setState({ refresh: true });
    return <Redirect path="/" />;
  };
  render() {
    const { pathname } = this.props.location;
    console.log(pathname);
    return (
      <>
        <Route path="/loginsucces" component={this.hello}/>
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
