import React from "react";
import classnames from "classnames";
import style from "./style.less";
import { Link, Redirect } from "react-router-dom";
import { loginAPI } from "../../Api/index";

export default class LoginPage extends React.Component {
  state = {
    login: "",
    password: "",
    canRedirect: false,
    noLoginEntered: false,
    noPasswordEntered: false,
    loginTooShort: false,
    passwordTooShort: false
  };

  handleLoginAttempt(e) {
    const { login, password } = this.state;
    if (login === "") {
      if (login.length >= 5) {
        this.setState({ noLoginEntered: true });
      } else {
        this.setState({ loginTooShort: true });
      }
    }
    if (password === "") {
      if (password.length >= 5) {
        this.setState({ noPasswordEntered: true });
      } else {
        this.setState({ passwordTooShort: true });
      }
    }

    if (login !== "" && password !== "") loginAPI(login, password);

    // this.setState({
    //   canRedirect: true
    // });
  }



  handleRedirection = e => {
    e.preventDefault();
  };

  render() {
    console.log(this.props)
    const { canRedirect, noLoginEntered, noPasswordEntered } = this.state;
    return (
      <>
        {canRedirect ? <Redirect to="/home" /> : null}
        <div className={style.warningMessage}>
          Uzupełnij pola: {noLoginEntered}
        </div>
        <form onSubmit={this.handleRedirection}>
          <div className={style.inputContainer}>
            <input
              type="text"
              name="login"
              className={classnames(
                style.inputBox,
                noLoginEntered ? style.isError : null
              )}
              placeholder={noLoginEntered ? "enter login" : "login"}
              onChange={e => this.handleInputChange(e)}
            />
            <input
              type="password"
              name="password"
              className={classnames(
                style.inputBox,
                noPasswordEntered ? style.isError : null
              )}
              placeholder={noPasswordEntered ? "enter password" : "password"}
              onChange={e => this.handleInputChange(e)}
            />
            <h2 className={style.przypominajka}>
              <Link to="#">Zapomniałeś hasła?</Link>
            </h2>
            <ul className={style.buttonList}>
              <li>
                <button
                  className={style.highlightedButton}
                  onClick={e => this.handleLoginAttempt(e)}
                >
                  Zaloguj
                </button>
              </li>
              <li>
                <Link to="/signin">
                  <button className={style.button}>Nie masz konta?</button>
                </Link>
              </li>
            </ul>
          </div>
        </form>
      </>
    );
  }
}
