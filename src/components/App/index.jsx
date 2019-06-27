import React from "react";
import style from "./style.less";
import LoginPage from "../../containers/LoginPage";
import HomePage from "../../containers/HomePage";
import { HashRouter as Router, Route, Link, Redirect } from "react-router-dom";

export default class App extends React.Component {
  state = {
    isLoggedIn: false
  };

  setLogIn = () => {
    this.setState({ isLoggedIn: true });
  };

  componentDidMount() {
    const { isLoggedIn } = this.state;
    if (localStorage.getItem("acces_token") && !isLoggedIn) {
      this.setState({ isLoggedIn: true });
    } else if (!localStorage.getItem("acces_token")) {
      this.setState({ isLoggedIn: false });
    }
  }

  componentDidUpdate() {
    const { isLoggedIn } = this.state;
    if (localStorage.getItem("acces_token") && !isLoggedIn) {
      this.setState({ isLoggedIn: true });
    } else if (!localStorage.getItem("acces_token")) {
      this.setState({ isLoggedIn: false });
    }
  }

  Succes = () => {
    this.setLogIn();
    return <Redirect to="/home" />;
  };

  NotLoggedIn = () => (
    <div className={style.container}>
      <h1 className={style.logo}>Sticky Notes</h1>
      <Link to="/login">Login now</Link>
      <Route path="/login" component={LoginPage} />
      <Route path="/signin" component={LoginPage} />
      <Route path="/loginsuccesful" component={this.Succes} />
    </div>
  );

  render() {
    const { isLoggedIn } = this.state;

    return (
      <>
        <div className={style.background} />
        <Router>
          {isLoggedIn ? (
            <Route path="/" component={HomePage} />
          ) : (
            <Route path="/" component={this.NotLoggedIn} />
          )}
        </Router>
      </>
    );
  }
}
