import React from "react";
import style from "./style.less";
import LoginPage from "../../containers/LoginPage";
import HomePage from "../../containers/HomePage";
import { HashRouter as Router, Route, Link } from "react-router-dom";

class App extends React.Component {
  state = {
    isLoggedIn: false
  };

  render() {
    const { isLoggedIn } = this.state;

    // if (localStorage.getItem("acces_token") && !isLoggedIn) {
    //   this.setState({ isLoggedIn: true });
    // }
    return (
      <>
        <div className={style.background} />
        <Router>
          {isLoggedIn ? (
            <Route path="/" component={LoggedIn} />
          ) : (
            <Route path="/" component={NotLoggedIn} />
          )}
        </Router>
      </>
    );
  }
}

const NotLoggedIn = () => (
  <div className={style.container}>
    <h1 className={style.logo}>Sticky Notes</h1>
    <Link to="/login">Login now</Link>
    <Route path="/login" component={LoginPage} />
    <Route path="/signin" component={LoginPage} />
  </div>
);

const LoggedIn = () => {
  const { isLoggedIn } = this.state;
  
  return <div className={style.container}>dupa zalogowana</div>;
};
export default App;
