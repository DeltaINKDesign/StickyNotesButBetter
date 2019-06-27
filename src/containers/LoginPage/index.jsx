import React from "react";
import style from "./style.less";
import classnames from "classnames";
import { Link, Redirect } from "react-router-dom";
import { loginAPI, registerAPI, recoverAPI } from "../../Api/index";

export default class LoginPage extends React.Component {
  state = {
    login: "",
    password: "",
    email: "",
    loginTooShort: false,
    passwordTooShort: false,
    emailTooShort: false,
    loginError: false,
    newPassword: ""
  };

  handleRedirection = e => {
    e.preventDefault();
  };

  handleInputChange = e => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
  };

  checkForErrors(type) {
    const {password, email } = this.state;
    let loginError = false,
      passwordError = false,
      emailError = false;
    if (email.length < 5) {
      loginError = true;
    }
    if (password.length < 5 && !type === "recover") {
      passwordError = true;
    }
    if (type === "register" && email.length < 5 && email.search("@")) {
      emailError = true;
    }
    console.log(loginError, emailError, passwordError);
    this.setState({
      loginTooShort: loginError,
      passwordTooShort: passwordError,
      emailTooShort: emailError
    });
    if (!loginError && !passwordError && !emailError) {
      return false;
    }
    return true;
  }

  async handleSubmit(type) {
    const { login, password, email } = this.state;
    let areErrors = this.checkForErrors(type);

    if (!areErrors) {
      if (type === "login") {
        await loginAPI(email, password);
      } else if (type === "register") {
        try {
          await registerAPI(login, password, email);
          await loginAPI(email, password);
        } catch (e) {
          console.log(e);
        }
      } else if (type === "recover") {
        let recoveredPassword = await recoverAPI(login, email);
        this.setState({ newPassword: recoveredPassword.data.password });
      }

      if (localStorage.getItem("acces_token")) {
        this.setState({ goFurther: true });
      }
    }
  }

  render() {
    const { pathname } = this.props.location;
    const isLoginPage = pathname === "/login";
    const isSigninPage = pathname === "/signin";
    const isRecoverPage = pathname === "/login/recoverpassword";
    const {
      goFurther,
      loginTooShort,
      passwordTooShort,
      emailTooShort,
      newPassword
    } = this.state;
    return (
      <div className={style.box}>
        {goFurther ? <Redirect to="/loginsuccesful" /> : null}
        <form onSubmit={this.handleRedirection}>
          <div className={style.inputContainer}>
            {isSigninPage || isRecoverPage ? (
              <>
                <input
                  type="text"
                  name="login"
                  className={style.inputBox}
                  placeholder="login"
                  onChange={e => this.handleInputChange(e)}
                />
                <label
                  className={classnames(
                    loginTooShort ? style.errorLabel : style.errorLabel__hidden
                  )}
                >
                  Podaj login który ma więcej jak 5 znaków.
                </label>
              </>
            ) : null}
            <input
              name="email"
              type="email"
              className={style.inputBox}
              placeholder="mail"
              onChange={e => this.handleInputChange(e)}
            />
            <label
              className={classnames(
                emailTooShort ? style.errorLabel : style.errorLabel__hidden
              )}
            >
              Podaj poprawny email
            </label>
            {!isRecoverPage ? (
              <>
                <input
                  type="password"
                  name="password"
                  className={style.inputBox}
                  placeholder="password"
                  onChange={e => this.handleInputChange(e)}
                />
                <label
                  className={classnames(
                    passwordTooShort
                      ? style.errorLabel
                      : style.errorLabel__hidden
                  )}
                >
                  Podaj haslo ktore ma wiecej jak 5 znakow
                </label>
              </>
            ) : null}
            {isLoginPage ? (
              <h2 className={style.przypominajka}>
                <Link to="/login/recoverpassword">Zapomniałeś hasła?</Link>
              </h2>
            ) : null}
            {isLoginPage ? (
              <ul className={style.buttonList}>
                <li>
                  <button
                    className={style.highlightedButton}
                    onClick={() => this.handleSubmit("login")}
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
            ) : (
              <>
                <ul className={style.buttonList}>
                  <li>
                    <button
                      className={style.highlightedButton}
                      onClick={e => {
                        !isRecoverPage
                          ? this.handleSubmit("register")
                          : this.handleSubmit("recover");
                      }}
                    >
                      {!isRecoverPage ? "Zarejestruj" : "Pokaż hasło"}
                    </button>
                  </li>
                  <li>
                    <Link to="/login">
                      <button className={style.button}>Wróć?</button>
                    </Link>
                  </li>
                </ul>

                {newPassword.length > 0 ? (
                  <label className={style.passwordLabel}>
                    Twoje nowe hasło to: <b>{newPassword}</b>
                  </label>
                ) : null}
              </>
            )}
          </div>
        </form>
      </div>
    );
  }
}
